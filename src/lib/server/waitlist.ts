"use server";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { requireFirestoreDb } from "@/lib/firebase";
import type { WaitlistRequest, WaitlistStatus } from "@/lib/types";

const getWaitlistCollection = () => collection(requireFirestoreDb(), "waitlistRequests");
// Firestore composite index expected:
// - status + createdAt

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

const normalizeStatus = (status?: string | null): WaitlistStatus => {
  if (!status) return "PENDING";
  const normalized = status.toUpperCase();
  if (normalized === "APPROVED" || normalized === "REJECTED") return normalized;
  return "PENDING";
};

const mapWaitlistSnapshot = (docSnap: QueryDocumentSnapshot | DocumentSnapshot) => {
  const data = docSnap.data() as Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    approvedAt?: unknown;
    decidedAt?: unknown;
    approvedBy?: string | null;
    decidedBy?: string | null;
    intendedInvestmentAmount?: string | number;
    amount?: string | number;
    status?: string;
  };
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const approvedAt = normalizeTimestamp(data.approvedAt ?? data.decidedAt);
  return {
    id: docSnap.id,
    ...data,
    createdAt,
    approvedAt,
    approvedBy: data.approvedBy ?? data.decidedBy ?? null,
    decisionNote: data.decisionNote ?? null,
    intendedInvestmentAmount: data.intendedInvestmentAmount ?? data.amount ?? "",
    status: normalizeStatus(data.status),
  };
};

const normalizeEmailForId = (email: string) =>
  email.trim().toLowerCase().replace(/[^a-z0-9]/g, "_");

export async function createWaitlistRequest(
  input: CreateWaitlistRequestInput
): Promise<{ waitlistRequest: WaitlistRequest; wasExisting: boolean }> {
  const waitlistCollection = getWaitlistCollection();
  const docId = `${input.fundId}__${normalizeEmailForId(input.email)}`;
  const docRef = doc(waitlistCollection, docId);
  const existingSnapshot = await getDoc(docRef);
  if (existingSnapshot.exists()) {
    const existing = mapWaitlistSnapshot(existingSnapshot) as WaitlistRequest;
    if (existing.status === "PENDING") {
      return { waitlistRequest: existing, wasExisting: true };
    }
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
    createdAt: createdAt,
    requesterUid: input.requesterUid ?? null,
    approvedAt: null,
    approvedBy: null,
    decisionNote: null,
  };
  const firestorePayload = {
    ...payload,
    createdAt: serverTimestamp(),
  };

  await setDoc(docRef, firestorePayload);

  return { waitlistRequest: { id: docRef.id, ...payload }, wasExisting: false };
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
  return snapshot.docs.map((docSnap) => mapWaitlistSnapshot(docSnap) as WaitlistRequest);
}

export async function getWaitlistRequestById(id: string): Promise<WaitlistRequest | null> {
  const waitlistCollection = getWaitlistCollection();
  const snapshot = await getDoc(doc(waitlistCollection, id));
  if (!snapshot.exists()) {
    return null;
  }
  return mapWaitlistSnapshot(snapshot) as WaitlistRequest;
}

export async function updateWaitlistStatus(input: UpdateWaitlistStatusInput): Promise<void> {
  const waitlistCollection = getWaitlistCollection();
  await updateDoc(doc(waitlistCollection, input.id), {
    status: input.status,
    approvedAt: input.status === "PENDING" ? null : serverTimestamp(),
    approvedBy: input.status === "PENDING" ? null : input.approvedBy ?? null,
    decisionNote: input.status === "PENDING" ? null : input.decisionNote ?? null,
  });
}
