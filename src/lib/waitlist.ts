"use client";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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

const normalizeStatus = (status?: string | null): WaitlistStatus => {
  if (!status) return "PENDING";
  const normalized = status.toUpperCase();
  if (normalized === "APPROVED" || normalized === "REJECTED") return normalized;
  return "PENDING";
};

const mapWaitlistDoc = (
  id: string,
  data: Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    approvedAt?: unknown;
    decidedAt?: unknown;
    approvedBy?: string | null;
    decidedBy?: string | null;
    intendedInvestmentAmount?: unknown;
    amount?: unknown;
    status?: string;
  }
): WaitlistRequest => {
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const approvedAt = normalizeTimestamp(data.approvedAt ?? data.decidedAt);
  const intendedInvestmentAmount =
    typeof data.intendedInvestmentAmount === "number" || typeof data.intendedInvestmentAmount === "string"
      ? data.intendedInvestmentAmount
      : typeof data.amount === "number" || typeof data.amount === "string"
        ? data.amount
        : "";
  return {
    id,
    ...data,
    createdAt,
    approvedAt,
    approvedBy: data.approvedBy ?? data.decidedBy ?? null,
    decisionNote: data.decisionNote ?? null,
    intendedInvestmentAmount,
    status: normalizeStatus(data.status),
  };
};

const normalizeEmailForId = (email: string) =>
  email.trim().toLowerCase().replace(/[^a-z0-9]/g, "_");

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
  "id" | "createdAt" | "status" | "approvedAt" | "approvedBy" | "decisionNote"
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
    intendedInvestmentAmount: input.intendedInvestmentAmount,
    note: input.note ?? null,
    status: input.status ?? "PENDING",
    createdAt,
    requesterUid: input.requesterUid ?? null,
    approvedAt: null,
    approvedBy: null,
    decisionNote: null,
  };

  const docId = `${input.fundId}__${normalizeEmailForId(input.email)}`;
  const docRef = doc(collectionRef, docId);
  const existingSnapshot = await getDoc(docRef);
  if (existingSnapshot.exists()) {
    const existing = mapWaitlistDoc(existingSnapshot.id, existingSnapshot.data());
    if (existing.status === "PENDING") {
      return existing;
    }
  }

  await setDoc(docRef, { ...payload, createdAt: serverTimestamp() });
  return { id: docRef.id, ...payload };
}

type UpdateWaitlistStatusInput = {
  id: string;
  status: WaitlistStatus;
  approvedBy?: string | null;
  decisionNote?: string | null;
};

export async function updateWaitlistStatus(input: UpdateWaitlistStatusInput) {
  const collectionRef = getWaitlistCollection();
  if (!collectionRef) {
    console.warn("Skipping waitlist status update (missing Firebase configuration).");
    return;
  }

  await updateDoc(doc(collectionRef, input.id), {
    status: input.status,
    approvedAt: input.status === "PENDING" ? null : serverTimestamp(),
    approvedBy: input.status === "PENDING" ? null : input.approvedBy ?? null,
    decisionNote: input.status === "PENDING" ? null : input.decisionNote ?? null,
  });
}
