"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session } from "@/lib/types";

export function Navbar() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const { strings } = useLanguage();

  const authLink = (() => {
    if (!session) {
      return { label: strings.navAuthSignup, href: "/auth", key: "navAuthSignup" };
    }

    if (session.role === "MasterUser") {
      return { label: strings.navAuthMaster, href: "/dashboard/master", key: "navAuthMaster" };
    }

    if (session.role === "Fund Manager") {
      return {
        label: strings.navAuthManager,
        href: "/dashboard/manager/overview",
        key: "navAuthManager",
      };
    }

    return { label: strings.navAuthProfile, href: "/profile", key: "navAuthProfile" };
  })();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/25 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-nowrap items-center justify-between gap-6 px-6 py-4">
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
            className="h-14 w-auto"
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-3 whitespace-nowrap text-[14px] uppercase tracking-[0.06em] text-slate-700 lg:flex">
          <Link href="/gestores-verificados" data-i18n="navVerifiedManagers">
            Gestores Verificados
          </Link>
          <Link href="/for-managers" data-i18n="navManagers">
            Fund Manager
          </Link>
          <Link href="/family-offices" data-i18n="navFamily">
            Family Offices
          </Link>
          <Link href="/#contact" data-i18n="navContact">
            Contact
          </Link>
        </nav>
        <div className="flex flex-shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <Link
            className="btn-primary inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold leading-none shadow-lg shadow-igates-500/30 transition"
            href={authLink.href}
            data-i18n={authLink.key}
          >
            {authLink.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
