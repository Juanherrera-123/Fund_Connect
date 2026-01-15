import type { Firestore } from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";

let cachedDb: Firestore | null = null;

export const getServerFirestore = () => {
  if (!cachedDb) {
    cachedDb = getFirestoreDb();
  }

  return cachedDb;
};
