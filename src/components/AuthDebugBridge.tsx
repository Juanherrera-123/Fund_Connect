"use client";

import { useEffect } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { getIdTokenResult } from "firebase/auth";

async function debugPrintAuthClaims() {
  const auth = getFirebaseAuth();
  if (!auth) {
    console.log("[AuthDebug] No auth instance");
    return null;
  }

  const user = auth.currentUser;
  if (!user) {
    console.log("[AuthDebug] No currentUser (not logged in)");
    return null;
  }

  const token = await getIdTokenResult(user, true);
  console.log("[AuthDebug] UID:", user.uid);
  console.log("[AuthDebug] claims:", token.claims);
  return token.claims;
}

export default function AuthDebugBridge() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;
    w.__IGATES_DEBUG_CLAIMS__ = debugPrintAuthClaims;
    console.log(
      "[AuthDebug] Bridge FORCE enabled. Run: await window.__IGATES_DEBUG_CLAIMS__()"
    );

    return () => {
      delete w.__IGATES_DEBUG_CLAIMS__;
    };
  }, []);

  return null;
}

