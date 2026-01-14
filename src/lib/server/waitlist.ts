"use server";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";
import type { WaitlistRequest, WaitlistStatus } from "@/lib/types";

const getWaitlistCollection = () => collection(getFirestoreDb(), "waitlistRequests");
// Firestore composite indexes expected:
// - status + createdAt
// - fundId + status
// - requesterId + createdAt

type CreateWaitlistRequestInput = Omit<
  WaitlistRequest,
  "id" | "createdAt" | "status" | "approvedAt" | "approvedBy" | "decisionNote"
> & {
  createdAt?: string;
  note?: string | null;
  status?: WaitlistStatus;
};

type UpdateWaitlistStatusInput = {
  id: string;
  status: WaitlistStatus;
  approvedBy?: string | null;
  decisionNote?: string | null;
};

const normalizeTimestamp = (value?: unknown): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
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

const mapWaitlistDoc = (docSnap: QueryDocumentSnapshot) => {
  const data = docSnap.data() as Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    approvedAt?: unknown;
    amount?: unknown;
  };
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const approvedAt = normalizeTimestamp(data.approvedAt);
  const amount = normalizeAmount(data.amount, data.intendedInvestmentAmount ?? null);
  return {
    id: docSnap.id,
    ...data,
    createdAt,
    approvedAt,
    amount,
  };
};

export async function createWaitlistRequest(
  input: CreateWaitlistRequestInput
): Promise<WaitlistRequest> {
  const waitlistCollection = getWaitlistCollection();
  const existingQuery = query(
    waitlistCollection,
    where("fundId", "==", input.fundId),
    where("requesterId", "==", input.requesterId),
    where("status", "==", "PENDING"),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  const existingSnapshot = await getDocs(existingQuery);
  if (!existingSnapshot.empty) {
    return mapWaitlistDoc(existingSnapshot.docs[0]) as WaitlistRequest;
  }

  const createdAt = input.createdAt ?? new Date().toISOString();
  const amount = normalizeAmount(input.amount, input.intendedInvestmentAmount ?? null);
  const payload: Omit<WaitlistRequest, "id"> = {
    fundId: input.fundId,
    fundName: input.fundName,
    requesterId: input.requesterId,
    requesterRole: input.requesterRole,
    requesterName: input.requesterName ?? null,
    requesterEmail: input.requesterEmail,
    requesterPhone: input.requesterPhone ?? null,
    intendedInvestmentAmount: input.intendedInvestmentAmount ?? null,
    amount: amount ?? null,
    requesterCountry: input.requesterCountry,
    requesterOrg: input.requesterOrg ?? null,
    note: input.note ?? null,
    status: input.status ?? "PENDING",
    createdAt: createdAt,
    approvedAt: null,
    approvedBy: null,
    decisionNote: null,
  };
  const firestorePayload = {
    ...payload,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(waitlistCollection, firestorePayload);

  return { id: docRef.id, ...payload };
}

export async function listWaitlistRequestsByStatus(
  status: WaitlistStatus
): Promise<WaitlistRequest[]> {
  const waitlistCollection = getWaitlistCollection();
  const statusQuery = query(
    waitlistCollection,
    where("status", "==", status),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(statusQuery);
  return snapshot.docs.map((docSnap) => mapWaitlistDoc(docSnap) as WaitlistRequest);
}

export async function getWaitlistRequestById(id: string): Promise<WaitlistRequest | null> {
  const waitlistCollection = getWaitlistCollection();
  const snapshot = await getDoc(doc(waitlistCollection, id));
  if (!snapshot.exists()) {
    return null;
  }
  return mapWaitlistDoc(snapshot) as WaitlistRequest;
}

export async function updateWaitlistStatus(input: UpdateWaitlistStatusInput): Promise<void> {
  const waitlistCollection = getWaitlistCollection();
  const approvedAt = input.status === "PENDING" ? null : new Date().toISOString();
  await updateDoc(doc(waitlistCollection, input.id), {
    status: input.status,
    approvedAt,
    approvedBy: input.status === "PENDING" ? null : input.approvedBy ?? null,
    decisionNote: input.decisionNote ?? null,
  });
}
