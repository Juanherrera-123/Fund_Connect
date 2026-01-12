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
  updateDoc,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { WaitlistRequest, WaitlistStatus } from "@/lib/types";

const waitlistCollection = collection(db, "waitlistRequests");
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

const mapWaitlistDoc = (docSnap: QueryDocumentSnapshot) => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<WaitlistRequest, "id">),
});

export async function createWaitlistRequest(
  input: CreateWaitlistRequestInput
): Promise<WaitlistRequest> {
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
  const payload: Omit<WaitlistRequest, "id"> = {
    fundId: input.fundId,
    fundName: input.fundName,
    requesterId: input.requesterId,
    requesterRole: input.requesterRole,
    requesterName: input.requesterName ?? null,
    requesterEmail: input.requesterEmail,
    requesterPhone: input.requesterPhone ?? null,
    intendedInvestmentAmount: input.intendedInvestmentAmount ?? null,
    requesterCountry: input.requesterCountry,
    requesterOrg: input.requesterOrg ?? null,
    note: input.note ?? null,
    status: input.status ?? "PENDING",
    createdAt,
    approvedAt: null,
    approvedBy: null,
    decisionNote: null,
  };

  const docRef = await addDoc(waitlistCollection, payload);

  return { id: docRef.id, ...payload };
}

export async function listWaitlistRequestsByStatus(
  status: WaitlistStatus
): Promise<WaitlistRequest[]> {
  const statusQuery = query(
    waitlistCollection,
    where("status", "==", status),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(statusQuery);
  return snapshot.docs.map((docSnap) => mapWaitlistDoc(docSnap) as WaitlistRequest);
}

export async function getWaitlistRequestById(id: string): Promise<WaitlistRequest | null> {
  const snapshot = await getDoc(doc(waitlistCollection, id));
  if (!snapshot.exists()) {
    return null;
  }
  return mapWaitlistDoc(snapshot) as WaitlistRequest;
}

export async function updateWaitlistStatus(input: UpdateWaitlistStatusInput): Promise<void> {
  const approvedAt = input.status === "PENDING" ? null : new Date().toISOString();
  await updateDoc(doc(waitlistCollection, input.id), {
    status: input.status,
    approvedAt,
    approvedBy: input.status === "PENDING" ? null : input.approvedBy ?? null,
    decisionNote: input.decisionNote ?? null,
  });
}
