import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
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
          <Link className="hover:text-slate-900" href="/#hero" data-i18n="footerOverview">
            Overview
          </Link>
          <Link className="hover:text-slate-900" href="/#funds" data-i18n="footerFeaturedFunds">
            Featured Funds
          </Link>
          <Link className="hover:text-slate-900" href="/#intelligence" data-i18n="footerIntelligence">
            Intelligence
          </Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-900" data-i18n="footerCompany">
            Company
          </h5>
          <Link className="hover:text-slate-900" href="/#why" data-i18n="footerAbout">
            About
          </Link>
          <Link className="hover:text-slate-900" href="/#compliance" data-i18n="footerCompliance">
            Compliance
          </Link>
          <Link className="hover:text-slate-900" href="/#contact" data-i18n="footerCareers">
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
          <Link className="hover:text-slate-900" href="/#contact" data-i18n="footerRequestCall">
            Request a Call
          </Link>
          <Link className="hover:text-slate-900" href="/#contact" data-i18n="footerInvestorRelations">
            Investor Relations
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
