"use client";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
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

type WaitlistDocData = Omit<WaitlistRequest, "id"> & {
  createdAt?: unknown;
  approvedAt?: unknown;
  decidedAt?: unknown;
  approvedBy?: string | null;
  decidedBy?: string | null;
  intendedInvestmentAmount?: unknown;
  amount?: unknown;
  status?: string | null;
};

const mapWaitlistDoc = (id: string, data: WaitlistDocData): WaitlistRequest => {
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
          const data = docItem.data() as WaitlistDocData;
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
