"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session } from "@/lib/types";

type NavbarProps = {
  floating?: boolean;
};

export function Navbar({ floating = false }: NavbarProps) {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const { strings } = useLanguage();
  const pathname = usePathname();
  const toHash = (hash: string) => {
    if (pathname === "/auth") return "/";
    return pathname === "/" ? hash : `/${hash}`;
  };
  const positionClassName = floating ? "fixed top-4" : "sticky top-0";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const authRole = session?.authRole ?? normalizeRole(session?.role);

  const authLink = (() => {
    if (!session) {
      return { label: strings.navAuthSignup, href: "/auth", key: "navAuthSignup" };
    }

    if (authRole === "master") {
      return { label: strings.navAuthMaster, href: "/dashboard/master", key: "navAuthMaster" };
    }

    if (authRole === "manager") {
      return {
        label: strings.navAuthManager,
        href: "/dashboard/manager/overview",
        key: "navAuthManager",
      };
    }

    return { label: strings.navAuthProfile, href: "/profile", key: "navAuthProfile" };
  })();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (menuPanelRef.current?.contains(target)) return;
      if (menuButtonRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      data-app-header
      className={`${positionClassName} left-0 right-0 z-[1000] isolate pointer-events-auto`}
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="relative flex h-16 flex-nowrap items-center justify-between gap-6 rounded-2xl border border-white/30 bg-white/55 px-4 shadow-sm backdrop-blur-md sm:px-6">
          <Link
            className="flex flex-shrink-0 items-center gap-2 font-extrabold tracking-[0.08em] text-slate-900"
            href="/"
            aria-label="IGATES home"
            data-i18n-aria-label="brandAriaLabel"
          >
            <img
              src="/IGATESLOGO.png"
              alt="IGATES Fund Intelligence logo"
              data-i18n-alt="brandAlt"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-3 whitespace-nowrap text-[14px] uppercase tracking-[0.06em] text-slate-600 lg:flex">
            <Link href="/gestores-verificados" data-i18n="navVerifiedManagers">
              Gestores Verificados
            </Link>
            <Link href={toHash("#contact")} data-i18n="navContact">
              Contact
            </Link>
          </nav>
          <div className="flex flex-shrink-0 items-center gap-3">
            <div className="hidden lg:flex">
              <LanguageSwitcher />
            </div>
            <Link
              className="btn-primary hidden items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold leading-none shadow-lg shadow-igates-500/30 transition lg:inline-flex"
              href={authLink.href}
              data-i18n={authLink.key}
            >
              {authLink.label}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            id="mobile-menu"
            ref={menuPanelRef}
            className={`absolute left-4 right-4 top-[calc(100%+8px)] z-[999] rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-xl transition-all duration-200 lg:pointer-events-none lg:opacity-0 lg:translate-y-0 lg:hidden ${
              isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
            aria-hidden={!isMenuOpen}
          >
            <nav className="grid gap-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">
              <Link
                href="/gestores-verificados"
                data-i18n="navVerifiedManagers"
                onClick={() => setIsMenuOpen(false)}
              >
                Gestores Verificados
              </Link>
              <Link
                href={toHash("#contact")}
                data-i18n="navContact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/50 pt-4">
              <LanguageSwitcher />
              <Link
                className="btn-primary inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold leading-none shadow-lg shadow-igates-500/30 transition sm:w-auto"
                href={authLink.href}
                data-i18n={authLink.key}
                onClick={() => setIsMenuOpen(false)}
              >
                {authLink.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
