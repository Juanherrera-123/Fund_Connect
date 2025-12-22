import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="logo" href="/" aria-label="IGATES home">
            <img src="/IGATESLOGO.png" alt="IGATES Fund Intelligence logo" />
          </Link>
          <p className="small silver" data-i18n="footerTagline">
            Elite connectivity for fund managers and qualified capital.
          </p>
        </div>
        <div>
          <h5 data-i18n="footerPlatform">Platform</h5>
          <Link href="/#hero" data-i18n="footerOverview">
            Overview
          </Link>
          <Link href="/#funds" data-i18n="footerFeaturedFunds">
            Featured Funds
          </Link>
          <Link href="/#intelligence" data-i18n="footerIntelligence">
            Intelligence
          </Link>
        </div>
        <div>
          <h5 data-i18n="footerCompany">Company</h5>
          <Link href="/#why" data-i18n="footerAbout">
            About
          </Link>
          <Link href="/#compliance" data-i18n="footerCompliance">
            Compliance
          </Link>
          <Link href="/#contact" data-i18n="footerCareers">
            Careers
          </Link>
        </div>
        <div>
          <h5 data-i18n="footerContact">Contact</h5>
          <a href="mailto:connect@igates.com">connect@igates.com</a>
          <Link href="/#contact" data-i18n="footerRequestCall">
            Request a Call
          </Link>
          <Link href="/#contact" data-i18n="footerInvestorRelations">
            Investor Relations
          </Link>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="container footer-meta">
        <span className="small silver" data-i18n="footerRights">
          © 2024 IGATES. All rights reserved.
        </span>
        <span className="small silver" data-i18n="footerPrivacy">
          Privacy &amp; Security
        </span>
      </div>
    </footer>
  );
}
