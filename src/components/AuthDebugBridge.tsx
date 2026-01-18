"use client";

import { useEffect } from "react";

import { debugPrintAuthClaims } from "@/lib/auth/debugClaims";

declare global {
  interface Window {
    __IGATES_DEBUG_CLAIMS__?: () => Promise<void>;
  }
}

export default function AuthDebugBridge() {
  useEffect(() => {
    const enabled =
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_ENABLE_AUTH_DEBUG === "true";

    if (!enabled) {
      return;
    }

    (window as any).__IGATES_DEBUG_CLAIMS__ = debugPrintAuthClaims;
    console.log("[AuthDebug] Bridge enabled. Run: await window.__IGATES_DEBUG_CLAIMS__()");

    return () => {
      delete (window as any).__IGATES_DEBUG_CLAIMS__;
    };
  }, []);

  return null;
}
