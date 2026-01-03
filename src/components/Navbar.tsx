"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session } from "@/lib/types";

export function Navbar() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);

  const authLink = (() => {
    if (!session) {
      return { label: "Sign Up / Log In", href: "/auth" };
    }

    if (session.role === "MasterUser") {
      return { label: "Master Dashboard", href: "/dashboard/master" };
    }

    if (session.role === "Fund Manager") {
      return { label: "Manager Dashboard", href: "/dashboard/manager/overview" };
    }

    return { label: "My Profile", href: "/profile" };
  })();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-300/25 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link
          className="flex items-center gap-2 font-extrabold tracking-[0.08em] text-slate-900"
          href="/"
          aria-label="IGATES home"
        >
          <img
            src="/IGATESLOGO.png"
            alt="IGATES Fund Intelligence logo"
            className="h-14 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-3 whitespace-nowrap text-[14px] uppercase tracking-[0.06em] text-slate-700 lg:flex">
          <Link href="/#why" data-i18n="navWhy">
            Why IGATES
          </Link>
          <Link href="/gestores-verificados">Gestores Verificados</Link>
          <Link href="/for-managers" data-i18n="navManagers">
            Fund Manager
          </Link>
          <Link href="/family-offices" data-i18n="navFamily">
            Family Offices
          </Link>
          <Link href="/#learn" data-i18n="navLearn">
            Learn
          </Link>
          <Link href="/#contact" data-i18n="navContact">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            className="hidden items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
            href="/#contact"
            data-i18n="navRequestDemo"
          >
            Request Demo
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full bg-igates-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
            href={authLink.href}
            data-i18n="navAuth"
          >
            {authLink.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
