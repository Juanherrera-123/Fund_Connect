"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import type { UserProfile } from "@/lib/types";

type SetValue<T> = Dispatch<SetStateAction<T>>;

type UserProfilesOptions = {
  uid?: string | null;
  isMaster?: boolean;
  initialValue?: UserProfile[];
};

const DEFAULT_PROFILES: UserProfile[] = [];

const hydrateProfile = (data: Partial<UserProfile> | undefined, id: string): UserProfile | null => {
  if (!data) return null;
  return {
    ...data,
    id,
  } as UserProfile;
};

const areProfilesEqual = (prevProfiles: UserProfile[], nextProfiles: UserProfile[]): boolean => {
  if (prevProfiles === nextProfiles) return true;
  if (prevProfiles.length !== nextProfiles.length) return false;
  if (prevProfiles.length === 0) return true;

  const nextById = new Map(nextProfiles.map((profile) => [profile.id, profile]));
  for (const prevProfile of prevProfiles) {
    const nextProfile = nextById.get(prevProfile.id);
    if (!nextProfile) return false;
    const prevKeys = Object.keys(prevProfile) as Array<keyof UserProfile>;
    const nextKeys = Object.keys(nextProfile) as Array<keyof UserProfile>;
    if (prevKeys.length !== nextKeys.length) return false;
    for (const key of prevKeys) {
      if (prevProfile[key] !== nextProfile[key]) return false;
    }
  }
  return true;
};

export function useUserProfiles({
  uid,
  isMaster = false,
  initialValue = DEFAULT_PROFILES,
}: UserProfilesOptions = {}): [UserProfile[], SetValue<UserProfile[]>] {
  const [profiles, setProfilesState] = useState<UserProfile[]>(initialValue);
  const [authUid, setAuthUid] = useState<string | null>(null);
  const initialValueRef = useRef(initialValue);

  const setProfilesStateSafe = useCallback((nextProfiles: UserProfile[]) => {
    setProfilesState((prevProfiles) =>
      areProfilesEqual(prevProfiles, nextProfiles) ? prevProfiles : nextProfiles
    );
  }, []);

  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthUid((prev) => (prev === null ? prev : null));
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const nextUid = user?.uid ?? null;
      setAuthUid((prev) => (prev === nextUid ? prev : nextUid));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const db = getFirestoreDb();
    if (!db) {
      console.warn("Skipping user profile subscription (missing Firebase configuration).");
      return;
    }

    let unsubscribe = () => {};

    if (isMaster) {
      if (!authUid) {
        setProfilesStateSafe(initialValueRef.current);
        return () => unsubscribe();
      }
      const collectionRef = collection(db, "users");
      unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
          const nextProfiles = snapshot.docs
            .map((docSnapshot) => hydrateProfile(docSnapshot.data() as UserProfile, docSnapshot.id))
            .filter(Boolean) as UserProfile[];
          setProfilesStateSafe(nextProfiles);
        },
        (error) => {
          console.error("Unable to subscribe to user profiles", error);
        }
      );
    } else {
      const resolvedUid = uid ?? authUid;
      if (!resolvedUid || !authUid || authUid !== resolvedUid) {
        setProfilesStateSafe(initialValueRef.current);
        return () => unsubscribe();
      }
      const docRef = doc(db, "users", resolvedUid);
      unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setProfilesStateSafe([]);
            return;
          }
          const profile = hydrateProfile(snapshot.data() as UserProfile, snapshot.id);
          setProfilesStateSafe(profile ? [profile] : []);
        },
        (error) => {
          console.error("Unable to subscribe to user profile", error);
        }
      );
    }

    return () => unsubscribe();
  }, [authUid, isMaster, setProfilesStateSafe, uid]);

  const setProfiles: SetValue<UserProfile[]> = useCallback(
    (value) => {
      setProfilesState((prevProfiles) => {
        const nextProfiles = value instanceof Function ? value(prevProfiles) : value;
        const resolvedUid = uid ?? authUid;
        if (!resolvedUid || !authUid || authUid !== resolvedUid) {
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
    [authUid, uid]
  );

  return [profiles, setProfiles];
}
