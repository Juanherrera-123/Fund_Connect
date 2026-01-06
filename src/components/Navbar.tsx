"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session } from "@/lib/types";

type NavbarProps = {
  floating?: boolean;
};

export function Navbar({ floating = false }: NavbarProps) {
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
    <header
      className={
        floating
          ? "absolute left-0 right-0 top-4 z-50 isolate"
          : "sticky top-4 z-50 isolate mt-4"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-16 flex-nowrap items-center justify-between gap-6 rounded-2xl border border-slate-200/60 bg-white/75 px-6 shadow-sm backdrop-blur-md">
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
      </div>
    </header>
  );
}
