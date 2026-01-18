"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";

export type FirestoreUser = {
  uid: string;
  email: string | null;
  fullName?: string | null;
  role: string;
  status: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

const getUserDocRef = (uid: string) => {
  const db = getFirestoreDb();
  if (!db) return null;
  return doc(db, "users", uid);
};

export async function getUserProfile(uid: string): Promise<FirestoreUser | null> {
  const docRef = getUserDocRef(uid);
  if (!docRef) {
    console.warn("Skipping user lookup (missing Firebase configuration).");
    return null;
  }

  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as FirestoreUser;
}

export async function createManagerUserProfile({
  uid,
  email,
  fullName,
}: {
  uid: string;
  email: string | null;
  fullName?: string | null;
}): Promise<void> {
  const docRef = getUserDocRef(uid);
  if (!docRef) {
    console.warn("Skipping user creation (missing Firebase configuration).");
    return;
  }

  const existing = await getDoc(docRef);
  if (existing.exists()) return;

  await setDoc(
    docRef,
    {
      uid,
      email,
      fullName: fullName ?? null,
      role: "manager",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function updateUserStatus({
  uid,
  status,
}: {
  uid: string;
  status: string;
}): Promise<void> {
  const docRef = getUserDocRef(uid);
  if (!docRef) {
    console.warn("Skipping user status update (missing Firebase configuration).");
    return;
  }

  await setDoc(
    docRef,
    {
      status,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
