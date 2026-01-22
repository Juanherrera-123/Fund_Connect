"use client";

import { useEffect } from "react";

const CANONICAL_HOSTNAME = "www.igates.co";
const LEGACY_HOSTNAME = "igates.co";

export default function CanonicalHostRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { hostname, pathname, search, hash } = window.location;

    if (hostname !== LEGACY_HOSTNAME) {
      return;
    }

    const targetUrl = `https://${CANONICAL_HOSTNAME}${pathname}${search}${hash}`;
    window.location.replace(targetUrl);
  }, []);

  return null;
}
