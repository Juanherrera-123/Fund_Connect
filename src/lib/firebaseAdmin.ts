import type { Firestore } from "firebase/firestore";

import { requireFirestoreDb } from "@/lib/firebase";

let cachedDb: Firestore | null = null;

export const getServerFirestore = () => {
  if (!cachedDb) {
    cachedDb = requireFirestoreDb();
  }

  return cachedDb;
};
