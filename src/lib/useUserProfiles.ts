"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { collection, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import type { UserProfile } from "@/lib/types";

type SetValue<T> = Dispatch<SetStateAction<T>>;

type UserProfilesOptions = {
  uid?: string | null;
  isMaster?: boolean;
  initialValue?: UserProfile[];
};

const resolveUid = (uid?: string | null) => {
  if (uid) return uid;
  return getFirebaseAuth()?.currentUser?.uid ?? null;
};

const hydrateProfile = (data: Partial<UserProfile> | undefined, id: string): UserProfile | null => {
  if (!data) return null;
  return {
    ...data,
    id,
  } as UserProfile;
};

export function useUserProfiles({
  uid,
  isMaster = false,
  initialValue = [],
}: UserProfilesOptions = {}): [UserProfile[], SetValue<UserProfile[]>] {
  const [profiles, setProfilesState] = useState<UserProfile[]>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const db = getFirestoreDb();
    if (!db) {
      console.warn("Skipping user profile subscription (missing Firebase configuration).");
      return;
    }

    let unsubscribe = () => {};

    if (isMaster) {
      const collectionRef = collection(db, "users");
      unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
          const nextProfiles = snapshot.docs
            .map((docSnapshot) => hydrateProfile(docSnapshot.data() as UserProfile, docSnapshot.id))
            .filter(Boolean) as UserProfile[];
          setProfilesState(nextProfiles);
        },
        (error) => {
          console.error("Unable to subscribe to user profiles", error);
        }
      );
    } else {
      const resolvedUid = resolveUid(uid);
      if (!resolvedUid) {
        setProfilesState(initialValue);
        return () => unsubscribe();
      }
      const docRef = doc(db, "users", resolvedUid);
      unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setProfilesState([]);
            return;
          }
          const profile = hydrateProfile(snapshot.data() as UserProfile, snapshot.id);
          setProfilesState(profile ? [profile] : []);
        },
        (error) => {
          console.error("Unable to subscribe to user profile", error);
        }
      );
    }

    return () => unsubscribe();
  }, [initialValue, isMaster, uid]);

  const setProfiles: SetValue<UserProfile[]> = useCallback(
    (value) => {
      setProfilesState((prevProfiles) => {
        const nextProfiles = value instanceof Function ? value(prevProfiles) : value;
        const resolvedUid = resolveUid(uid);
        if (!resolvedUid) {
          return nextProfiles;
        }
        const profileToPersist = nextProfiles.find((profile) => profile.id === resolvedUid);
        if (!profileToPersist) {
          return nextProfiles;
        }
        const db = getFirestoreDb();
        if (!db) {
          console.warn("Skipping user profile update (missing Firebase configuration).");
          return nextProfiles;
        }

        try {
          const docRef = doc(db, "users", resolvedUid);
          void setDoc(
            docRef,
            {
              ...profileToPersist,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          ).catch((error) => {
            console.error("Unable to update user profile", error);
          });
        } catch (error) {
          console.error("Unable to update user profile", error);
        }

        return nextProfiles;
      });
    },
    [uid]
  );

  return [profiles, setProfiles];
}
