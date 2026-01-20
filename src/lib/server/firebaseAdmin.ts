import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore, type Firestore } from "firebase-admin/firestore";
import type { FirebaseFirestore } from "firebase-admin/firestore";

let adminDb: Firestore | null = null;

const getAdminApp = () => {
  if (getApps().length) {
    return getApps()[0];
  }
  return initializeApp({
    credential: applicationDefault(),
  });
};

export const getAdminDb = (): Firestore => {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
};

export const serverTimestamp = (): FirebaseFirestore.FieldValue => FieldValue.serverTimestamp();
