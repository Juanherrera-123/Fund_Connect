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

import { requireFirestoreDb } from "@/lib/firebase";
import type { WaitlistRequest, WaitlistStatus } from "@/lib/types";

const getWaitlistCollection = () => collection(requireFirestoreDb(), "waitlistRequests");
// Firestore composite indexes expected:
// - status + createdAt
// - fundId + status
// - email + createdAt

type CreateWaitlistRequestInput = Omit<
  WaitlistRequest,
  "id" | "createdAt" | "status" | "decidedAt" | "decidedBy"
> & {
  createdAt?: string;
  note?: string | null;
  status?: WaitlistStatus;
};

type UpdateWaitlistStatusInput = {
  id: string;
  status: WaitlistStatus;
  decidedBy?: string | null;
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

const mapWaitlistDoc = (docSnap: QueryDocumentSnapshot) => {
  const data = docSnap.data() as Omit<WaitlistRequest, "id"> & {
    createdAt?: unknown;
    decidedAt?: unknown;
  };
  const createdAt = normalizeTimestamp(data.createdAt) ?? new Date().toISOString();
  const decidedAt = normalizeTimestamp(data.decidedAt);
  return {
    id: docSnap.id,
    ...data,
    createdAt,
    decidedAt,
  };
};

export async function createWaitlistRequest(
  input: CreateWaitlistRequestInput
): Promise<WaitlistRequest> {
  const waitlistCollection = getWaitlistCollection();
  const existingQuery = query(
    waitlistCollection,
    where("fundId", "==", input.fundId),
    where("email", "==", input.email),
    where("status", "==", "pending"),
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
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    amount: input.amount,
    note: input.note ?? null,
    status: input.status ?? "pending",
    createdAt: createdAt,
    requesterUid: input.requesterUid ?? null,
    decidedAt: null,
    decidedBy: null,
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
  await updateDoc(doc(waitlistCollection, input.id), {
    status: input.status,
    decidedAt: input.status === "pending" ? null : serverTimestamp(),
    decidedBy: input.status === "pending" ? null : input.decidedBy ?? null,
  });
}
