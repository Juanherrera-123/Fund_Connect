"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const RETRY_DELAYS = [50, 250];

export default function HashScrollHandler() {
  const pathname = usePathname();
  const timeoutsRef = useRef<number[]>([]);

  const clearRetries = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const scrollToHash = useCallback(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const targetId = decodeURIComponent(hash.replace(/^#/, ""));
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scheduleScroll = useCallback(() => {
    clearRetries();
    scrollToHash();
    RETRY_DELAYS.forEach((delay) => {
      const timeoutId = window.setTimeout(scrollToHash, delay);
      timeoutsRef.current.push(timeoutId);
    });
  }, [clearRetries, scrollToHash]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    scheduleScroll();

    const handleHashChange = () => {
      scheduleScroll();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearRetries();
    };
  }, [clearRetries, pathname, scheduleScroll]);

  return null;
}
