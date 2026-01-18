import { onAuthStateChanged, type User } from "firebase/auth";

import { normalizeRole } from "@/lib/auth/claims";
import { getFirebaseAuth } from "@/lib/firebase";
import type { NormalizedRole } from "@/types/auth";

export type SessionUser = {
  user: User;
  role: NormalizedRole;
};

const auth = getFirebaseAuth();

export function subscribeToAuth(callback: (session: SessionUser | null) => void) {
  if (!auth) {
    console.warn("Skipping auth subscription (missing Firebase configuration).");
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    const token = await user.getIdTokenResult();
    const roleClaim = typeof token.claims.role === "string" ? token.claims.role : undefined;
    const role = normalizeRole(roleClaim);

    callback({ user, role });
  });
}
