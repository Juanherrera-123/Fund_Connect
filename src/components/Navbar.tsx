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

    return { label: "My Profile", href: "/profile" };
  })();

  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="IGATES home">
        <img src="/IGATESLOGO.png" alt="IGATES Fund Intelligence logo" />
      </Link>
      <nav className="nav">
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
      <div className="header-actions">
        <LanguageSwitcher />
        <Link className="btn btn-secondary" href="/#contact" data-i18n="navRequestDemo">
          Request Demo
        </Link>
        <Link className="btn btn-primary auth-link" href={authLink.href} data-i18n="navAuth">
          {authLink.label}
        </Link>
      </div>
    </header>
  );
}
