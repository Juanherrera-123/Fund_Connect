"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const toHash = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-5">
        <div>
          <Link
            className="inline-flex items-center"
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
          <p className="mt-3 text-xs font-medium text-slate-500" data-i18n="footerTagline">
            Elite connectivity for fund managers and qualified capital.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900" data-i18n="footerPlatform">
            Platform
          </h5>
          <Link className="hover:text-slate-900" href={toHash("#hero")} data-i18n="footerOverview">
            Overview
          </Link>
          <Link className="hover:text-slate-900" href={toHash("#funds")} data-i18n="footerFeaturedFunds">
            Featured Funds
          </Link>
          <Link
            className="hover:text-slate-900"
            href={toHash("#intelligence")}
            data-i18n="footerIntelligence"
          >
            Intelligence
          </Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900" data-i18n="footerCompany">
            Company
          </h5>
          <Link className="hover:text-slate-900" href={toHash("#why")} data-i18n="footerAbout">
            About
          </Link>
          <Link
            className="hover:text-slate-900"
            href={toHash("#compliance")}
            data-i18n="footerCompliance"
          >
            Compliance
          </Link>
          <Link className="hover:text-slate-900" href={toHash("#contact")} data-i18n="footerCareers">
            Careers
          </Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900" data-i18n="footerContact">
            Contact
          </h5>
          <a className="hover:text-slate-900" href="mailto:connect@igates.com">
            connect@igates.com
          </a>
          <Link
            className="hover:text-slate-900"
            href={toHash("#contact")}
            data-i18n="footerRequestCall"
          >
            Request a Call
          </Link>
          <Link
            className="hover:text-slate-900"
            href={toHash("#contact")}
            data-i18n="footerInvestorRelations"
          >
            Investor Relations
          </Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900" data-i18n="footerLegalTitle">
            Abeas Data / Legal
          </h5>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#proteccion-de-datos"
            data-i18n="footerLegalDataProtection"
          >
            Protección de Datos (Habeas Data)
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#seguridad-informacion"
            data-i18n="footerLegalSecurity"
          >
            Seguridad de la Información
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#custodia-ejecucion-riesgo"
            data-i18n="footerLegalCustody"
          >
            Custodia, Ejecución y Riesgo
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#condiciones-uso"
            data-i18n="footerLegalTerms"
          >
            Condiciones de Uso
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#limitacion-responsabilidad"
            data-i18n="footerLegalLiability"
          >
            Limitación de Responsabilidad
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#cumplimiento-marco-operativo"
            data-i18n="footerLegalCompliance"
          >
            Cumplimiento y Marco Operativo
          </Link>
          <Link
            className="hover:text-slate-900"
            href="/legal/abeas-data#contacto-derechos"
            data-i18n="footerLegalContact"
          >
            Contacto y Ejercicio de Derechos
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200"></div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
        <span data-i18n="footerRights">
          © 2024 IGATES. All rights reserved.
        </span>
        <span data-i18n="footerPrivacy">
          Privacy &amp; Security
        </span>
      </div>
    </footer>
  );
}
