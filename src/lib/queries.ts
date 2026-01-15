import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { requireFirestoreDb } from "@/lib/firebase";

const getFundsCollection = () => collection(requireFirestoreDb(), "funds");

export function fundsCollection() {
  return getFundsCollection();
}

export async function getFundById(id: string) {
  const db = requireFirestoreDb();
  const snapshot = await getDoc(doc(db, "funds", id));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function getApprovedFunds() {
  const fundsQuery = query(getFundsCollection(), where("status", "==", "approved"));
  const snapshot = await getDocs(fundsQuery);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}
