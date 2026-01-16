"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
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

const normalizeAmount = (value?: unknown, fallback?: string | null): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.,]/g, "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (fallback) {
    const parsed = Number.parseFloat(fallback.replace(/[^0-9.,]/g, "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const mapWaitlistDoc = (
  id: string,
  data: Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    approvedAt?: unknown;
    amount?: unknown;
  }
): WaitlistRequest => {
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const approvedAt = normalizeTimestamp(data.approvedAt);
  const amount = normalizeAmount(data.amount, data.intendedInvestmentAmount ?? null);
  return {
    id,
    ...data,
    createdAt,
    approvedAt,
    amount,
  };
};

export function useWaitlistCollection() {
  const [waitlist, setWaitlist] = useState<WaitlistRequest[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectionRef = getWaitlistCollection();
    if (!collectionRef) {
      console.warn("Skipping waitlist subscription (missing Firebase configuration).");
      return;
    }

    const waitlistQuery = query(collectionRef);
    const unsubscribe = onSnapshot(
      waitlistQuery,
      (snapshot) => {
        const nextWaitlist = snapshot.docs.map((docItem) => {
          const data = docItem.data() as Omit<WaitlistRequest, "id"> & {
            createdAt?: Timestamp | string | null;
            approvedAt?: Timestamp | string | null;
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
  }, []);

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
    requesterId: input.requesterId,
    requesterRole: input.requesterRole,
    requesterName: input.requesterName ?? null,
    requesterEmail: input.requesterEmail,
    requesterPhone: input.requesterPhone ?? null,
    intendedInvestmentAmount: input.intendedInvestmentAmount ?? null,
    amount: normalizeAmount(input.amount, input.intendedInvestmentAmount ?? null),
    requesterCountry: input.requesterCountry,
    requesterOrg: input.requesterOrg ?? null,
    note: input.note ?? null,
    status: input.status ?? "PENDING",
    createdAt,
    approvedAt: null,
    approvedBy: null,
    decisionNote: null,
  };

  const docRef = await addDoc(collectionRef, { ...payload, createdAt: serverTimestamp() });
  return { id: docRef.id, ...payload };
}
