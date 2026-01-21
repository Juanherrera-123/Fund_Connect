import { getIdTokenResult } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

import { getFirebaseAuth, getFirebaseFunctions } from "@/lib/firebase";
import type { NormalizedRole } from "@/types/auth";

export type AuthClaims = {
  uid: string;
  email: string | null;
  role: NormalizedRole;
  status: string | null;
  emailVerified: boolean;
  rawClaims: Record<string, unknown>;
};

export const normalizeRole = (role?: string): NormalizedRole => {
  if (!role) return "unknown";
  const trimmed = role.trim();
  if (!trimmed) return "unknown";
  const normalized = trimmed.replace(/[\s_-]+/g, "").toLowerCase();

  if (normalized === "master" || normalized === "masteruser") return "master";
  if (normalized === "manager" || normalized === "fundmanager") return "manager";

  return "unknown";
};

export const isActiveStatus = (status?: string | null): boolean =>
  typeof status === "string" && status.trim().toLowerCase() === "active";

const buildAuthClaims = (tokenResult: Awaited<ReturnType<typeof getIdTokenResult>>) => {
  const roleClaim = typeof tokenResult.claims.role === "string" ? tokenResult.claims.role : undefined;
  const statusClaim =
    typeof tokenResult.claims.status === "string" ? tokenResult.claims.status : undefined;
  const resolvedRole = normalizeRole(roleClaim);
  const resolvedStatus = statusClaim ? statusClaim.trim().toLowerCase() : null;

  return {
    role: resolvedRole,
    status: resolvedStatus,
    rawClaims: tokenResult.claims,
  };
};

export async function getAuthClaims(): Promise<AuthClaims | null> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) return null;

  const user = auth.currentUser;
  const tokenResult = await getIdTokenResult(user);
  const { role, status, rawClaims } = buildAuthClaims(tokenResult);

  return {
    uid: user.uid,
    email: user.email,
    role,
    status,
    emailVerified: user.emailVerified,
    rawClaims,
  };
}

export async function refreshClaims(): Promise<AuthClaims | null> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) return null;

  const user = auth.currentUser;
  await user.getIdToken(true);
  const tokenResult = await getIdTokenResult(user);
  const { role, status, rawClaims } = buildAuthClaims(tokenResult);

  return {
    uid: user.uid,
    email: user.email,
    role,
    status,
    emailVerified: user.emailVerified,
    rawClaims,
  };
}

export async function setManagerPendingClaims(uid: string): Promise<void> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    console.warn("Skipping pending claims assignment (missing Firebase configuration).");
    return;
  }
  const callable = httpsCallable(functions, "setManagerPendingClaims");
  await callable({ uid });
}

export async function setManagerActiveClaims(uid: string): Promise<void> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    console.warn("Skipping active claims assignment (missing Firebase configuration).");
    return;
  }
  const callable = httpsCallable(functions, "setManagerActiveClaims");
  await callable({ uid });
}
