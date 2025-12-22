import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export function fundsCollection() {
  return collection(db, "funds");
}

export async function getFundById(id: string) {
  const snapshot = await getDoc(doc(db, "funds", id));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function getApprovedFunds() {
  const fundsQuery = query(fundsCollection(), where("status", "==", "approved"));
  const snapshot = await getDocs(fundsQuery);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}
