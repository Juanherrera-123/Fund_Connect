import { onAuthStateChanged, type User } from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase";
import type { Role } from "@/types/roles";

export type SessionUser = {
  user: User;
  role: Role | null;
};

const auth = getFirebaseAuth();

export function subscribeToAuth(callback: (session: SessionUser | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    const token = await user.getIdTokenResult();
    const role = (token.claims.role as Role | undefined) ?? null;

    callback({ user, role });
  });
}
