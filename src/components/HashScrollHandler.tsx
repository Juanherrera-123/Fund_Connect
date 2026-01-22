"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const RETRY_DELAYS = [50, 250];

export default function HashScrollHandler() {
  const pathname = usePathname();
  const router = useRouter();
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
    if (!target) {
      console.log("[HashScrollHandler] Target not found for hash:", targetId);
      return;
    }

    console.log("[HashScrollHandler] Scrolling to hash:", targetId);
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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href")?.trim();
      if (!rawHref) return;

      const resolvedUrl = new URL(anchor.href, window.location.href);
      if (resolvedUrl.origin !== window.location.origin) return;
      if (!resolvedUrl.hash) return;

      const isHashOnly = rawHref.startsWith("#");
      const isHomeHash = rawHref.startsWith("/#");
      const isOriginHash = rawHref.startsWith(`${window.location.origin}/#`);
      const isSamePath = resolvedUrl.pathname === window.location.pathname;

      if (isSamePath && (isHashOnly || isHomeHash || isOriginHash)) {
        const targetId = decodeURIComponent(resolvedUrl.hash.replace(/^#/, ""));
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        event.preventDefault();
        if (window.location.hash !== resolvedUrl.hash) {
          window.history.pushState(null, "", resolvedUrl.hash);
        }
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if ((isHomeHash || isOriginHash) && resolvedUrl.pathname === "/") {
        event.preventDefault();
        const targetHref = `/${resolvedUrl.hash}`;
        const fallback = () => {
          window.location.href = targetHref;
        };

        try {
          router.push(targetHref);
        } catch (error) {
          fallback();
          return;
        }

        window.setTimeout(() => {
          if (window.location.pathname !== "/" || window.location.hash === resolvedUrl.hash) {
            return;
          }
          fallback();
        }, 250);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [router]);

  return null;
}
