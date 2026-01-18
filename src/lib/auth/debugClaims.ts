import { getFirebaseAuth } from "@/lib/firebase";

export async function debugPrintAuthClaims(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) {
    console.log("[AuthDebug] No auth instance");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    console.log("[AuthDebug] No currentUser");
    return;
  }

  const token = await user.getIdTokenResult(true);
  console.log("[AuthDebug] UID:", user.uid);
  console.log("[AuthDebug] email:", user.email);
  console.log("[AuthDebug] claims:", token.claims);
}
