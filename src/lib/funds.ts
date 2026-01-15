"use client";

import { collection, doc, onSnapshot, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { getFirestoreDb } from "@/lib/firebase";
import type { FundApplication } from "@/lib/types";

const getFundsCollection = () => {
  const db = getFirestoreDb();
  if (!db) return null;
  return collection(db, "funds");
};

export function useFundsCollection() {
  const [funds, setFunds] = useState<FundApplication[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectionRef = getFundsCollection();
    if (!collectionRef) {
      console.warn("Skipping funds subscription (missing Firebase configuration).");
      return;
    }

    const fundQuery = query(collectionRef);
    const unsubscribe = onSnapshot(
      fundQuery,
      (snapshot) => {
        const nextFunds = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...(docItem.data() as Omit<FundApplication, "id">),
        }));
        setFunds(nextFunds);
      },
      (error) => {
        console.error("Unable to subscribe to funds collection", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return funds;
}

export async function upsertFundApplication(payload: FundApplication) {
  const db = getFirestoreDb();
  if (!db) {
    console.warn("Skipping fund application update (missing Firebase configuration).");
    return;
  }

  const docRef = doc(db, "funds", payload.id);
  await setDoc(
    docRef,
    {
      ...payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function updateFundApplicationStatus(id: string, status: FundApplication["status"]) {
  const db = getFirestoreDb();
  if (!db) {
    console.warn("Skipping fund status update (missing Firebase configuration).");
    return;
  }

  const docRef = doc(db, "funds", id);
  await setDoc(
    docRef,
    {
      status,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
