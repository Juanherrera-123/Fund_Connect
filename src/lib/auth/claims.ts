import { getIdTokenResult } from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase";
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
  if (normalized === "investor") return "investor";

  return "unknown";
};

export const isActiveStatus = (status?: string | null): boolean =>
  typeof status === "string" && status.trim().toLowerCase() === "active";

export async function getAuthClaims(): Promise<AuthClaims | null> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) return null;

  const user = auth.currentUser;
  const tokenResult = await getIdTokenResult(user, true);
  const roleClaim = typeof tokenResult.claims.role === "string" ? tokenResult.claims.role : undefined;
  const statusClaim =
    typeof tokenResult.claims.status === "string" ? tokenResult.claims.status : undefined;
  const isMaster = normalizeRole(roleClaim) === "master";
  let resolvedRole: NormalizedRole = normalizeRole(roleClaim);
  let resolvedStatus = statusClaim ? statusClaim.trim().toLowerCase() : null;

  if (!isMaster) {
    const { getUserProfile } = await import("@/lib/users");
    const userProfile = await getUserProfile(user.uid);
    if (userProfile) {
      resolvedRole = normalizeRole(userProfile.role);
      resolvedStatus =
        typeof userProfile.status === "string" ? userProfile.status.trim().toLowerCase() : null;
    }
  }

  return {
    uid: user.uid,
    email: user.email,
    role: resolvedRole,
    status: resolvedStatus,
    emailVerified: user.emailVerified,
    rawClaims: tokenResult.claims,
  };
}
