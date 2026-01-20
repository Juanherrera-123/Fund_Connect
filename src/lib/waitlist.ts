"use client";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { getFirestoreDb } from "@/lib/firebase";
import type { WaitlistRequest, WaitlistStatus } from "@/lib/types";

const getWaitlistCollection = () => {
  const db = getFirestoreDb();
  if (!db) return null;
  return collection(db, "waitlistRequests");
};

const normalizeTimestamp = (value?: unknown): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && "toDate" in (value as { toDate?: () => Date })) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return null;
};

const mapWaitlistDoc = (
  id: string,
  data: Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    decidedAt?: unknown;
    amount?: unknown;
  }
): WaitlistRequest => {
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const decidedAt = normalizeTimestamp(data.decidedAt);
  const amount =
    typeof data.amount === "number" || typeof data.amount === "string" ? data.amount : "";
  return {
    id,
    ...data,
    createdAt,
    decidedAt,
    amount,
  };
};

export function useWaitlistCollection(status?: WaitlistStatus) {
  const [waitlist, setWaitlist] = useState<WaitlistRequest[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectionRef = getWaitlistCollection();
    if (!collectionRef) {
      console.warn("Skipping waitlist subscription (missing Firebase configuration).");
      return;
    }

    const waitlistQuery = status
      ? query(collectionRef, where("status", "==", status), orderBy("createdAt", "desc"))
      : query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      waitlistQuery,
      (snapshot) => {
        const nextWaitlist = snapshot.docs.map((docItem) => {
          const data = docItem.data() as Omit<WaitlistRequest, "id"> & {
            createdAt?: Timestamp | string | null;
            decidedAt?: Timestamp | string | null;
            amount?: unknown;
          };
          return mapWaitlistDoc(docItem.id, data);
        });
        setWaitlist(nextWaitlist);
      },
      (error) => {
        console.error("Unable to subscribe to waitlist collection", error);
      }
    );

    return () => unsubscribe();
  }, [status]);

  return waitlist;
}

type CreateWaitlistRequestInput = Omit<
  WaitlistRequest,
  "id" | "createdAt" | "status" | "decidedAt" | "decidedBy"
> & {
  createdAt?: string;
  status?: WaitlistStatus;
};

export async function createWaitlistRequest(input: CreateWaitlistRequestInput) {
  const collectionRef = getWaitlistCollection();
  if (!collectionRef) {
    console.warn("Skipping waitlist request creation (missing Firebase configuration).");
    return null;
  }

  const createdAt = input.createdAt ?? new Date().toISOString();
  const payload: Omit<WaitlistRequest, "id"> = {
    fundId: input.fundId,
    fundName: input.fundName,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    amount: input.amount,
    note: input.note ?? null,
    status: input.status ?? "pending",
    createdAt,
    requesterUid: input.requesterUid ?? null,
    decidedAt: null,
    decidedBy: null,
  };

  const docRef = await addDoc(collectionRef, { ...payload, createdAt: serverTimestamp() });
  return { id: docRef.id, ...payload };
}

type UpdateWaitlistStatusInput = {
  id: string;
  status: WaitlistStatus;
  decidedBy?: string | null;
};

export async function updateWaitlistStatus(input: UpdateWaitlistStatusInput) {
  const collectionRef = getWaitlistCollection();
  if (!collectionRef) {
    console.warn("Skipping waitlist status update (missing Firebase configuration).");
    return;
  }

  await updateDoc(doc(collectionRef, input.id), {
    status: input.status,
    decidedAt: serverTimestamp(),
    decidedBy: input.decidedBy ?? null,
  });
}
