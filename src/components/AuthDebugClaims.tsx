"use client";

import { useEffect } from "react";

import { debugPrintAuthClaims } from "@/lib/auth/debugClaims";

declare global {
  interface Window {
    __IGATES_DEBUG_CLAIMS__?: () => Promise<void>;
  }
}

export function AuthDebugClaims() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    window.__IGATES_DEBUG_CLAIMS__ = debugPrintAuthClaims;

    return () => {
      delete window.__IGATES_DEBUG_CLAIMS__;
    };
  }, []);

  return null;
}
