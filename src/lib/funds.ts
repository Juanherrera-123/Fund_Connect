"use client";

import { collection, doc, onSnapshot, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

import { getFirebaseStorage, getFirestoreDb } from "@/lib/firebase";
import type { FundApplication, FundApplicationFile } from "@/lib/types";

const getFundsCollection = () => {
  const db = getFirestoreDb();
  if (!db) return null;
  return collection(db, "fundApplications");
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

export async function uploadFundApplicationFile(
  applicationId: string,
  file: File,
  label: string
): Promise<FundApplicationFile> {
  const storage = getFirebaseStorage();
  if (!storage) {
    throw new Error("Missing Firebase Storage configuration.");
  }
  const safeName = file.name.replace(/\s+/g, "-");
  const path = `fundApplications/${applicationId}/${label}-${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return {
    name: file.name,
    url,
    path,
    size: snapshot.metadata.size,
    contentType: snapshot.metadata.contentType,
  };
}

export async function upsertFundApplication(payload: FundApplication) {
  const db = getFirestoreDb();
  if (!db) {
    console.warn("Skipping fund application update (missing Firebase configuration).");
    return;
  }

  const docRef = doc(db, "fundApplications", payload.id);
  await setDoc(
    docRef,
    {
      ...payload,
      createdAt: payload.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function updateFundApplicationStatus({
  id,
  status,
  reviewedBy,
}: {
  id: string;
  status: FundApplication["status"];
  reviewedBy?: FundApplication["reviewedBy"];
}) {
  const db = getFirestoreDb();
  if (!db) {
    console.warn("Skipping fund status update (missing Firebase configuration).");
    return;
  }

  const docRef = doc(db, "fundApplications", id);
  try {
    await setDoc(
      docRef,
      {
        status,
        reviewedAt: serverTimestamp(),
        reviewedBy: reviewedBy ?? null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("[Funds] Fund status updated:", id, status);
  } catch (error) {
    console.error("[Funds] Unable to update fund status:", id, error);
    throw error;
  }
}
