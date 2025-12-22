import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FamilyAccessForm } from "@/components/forms/FamilyAccessForm";

export default function FamilyOfficesPage() {
  return (
    <div className="family-page-container">
      <Navbar />
      <main>
        <section className="hero hero-large">
          <div className="container grid hero-grid">
            <div className="hero-text">
              <p className="eyebrow" data-i18n="familyHeroEyebrow">
                Family Offices
              </p>
              <h1 data-i18n="familyHeroTitle">
                Institutional Access for Modern Family Offices.
              </h1>
              <p className="hero-tagline" data-i18n="familyHeroLead">
                Simplify manager discovery, diligence, and allocation workflows.
              </p>
              <div className="cta-group">
                <Link className="btn btn-primary" href="#access" data-i18n="familyHeroCta">
                  Request Access
                </Link>
              </div>
              <div className="trust-bar">
                <span data-i18n="familyHeroTrust1">Allocator-grade reporting</span>
                <span data-i18n="familyHeroTrust2">Private data workflows</span>
              </div>
            </div>
            <div className="hero-dashboard">
              <div className="dashboard-card">
                <div className="card-label" data-i18n="familyCardLabel1">
                  Strategies reviewed
                </div>
                <div className="metric-chip emphasis" aria-label="Strategies reviewed">
                  <div className="chip-text">
                    <span className="chip-title" data-i18n="familyCardLabel1">
                      Strategies reviewed
                    </span>
                    <span className="chip-value">140+</span>
                  </div>
                </div>
                <p className="subcopy" data-i18n="familyCardCopy1">
                  Cross-asset intelligence tailored to mandate criteria.
                </p>
              </div>
              <div className="dashboard-card">
                <div className="card-label" data-i18n="familyCardLabel2">
                  Diligence files
                </div>
                <div className="metric-chip emphasis" aria-label="Diligence files">
                  <div className="chip-text">
                    <span className="chip-title" data-i18n="familyCardLabel2">
                      Diligence files
                    </span>
                    <span className="chip-value positive">Secure</span>
                  </div>
                </div>
                <p className="subcopy" data-i18n="familyCardCopy2">
                  Audit-ready archives with automated updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-funds">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="familyWhyEyebrow">
                Why IGATES
              </p>
              <h2 data-i18n="familyWhyTitle">Operational clarity for investment principals.</h2>
            </div>
            <div className="card-grid">
              <article className="info-card">
                <div className="icon-circle">📡</div>
                <h3 data-i18n="familyWhy1Title">Verified data streams</h3>
                <p data-i18n="familyWhy1Body">
                  Custodian, admin, and auditor-aligned reporting you can trust.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">🧾</div>
                <h3 data-i18n="familyWhy2Title">Audit-ready reporting</h3>
                <p data-i18n="familyWhy2Body">
                  IC-ready packages with complete attribution and variance breakdowns.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">⭐</div>
                <h3 data-i18n="familyWhy3Title">Consolidated manager reviews</h3>
                <p data-i18n="familyWhy3Body">
                  Side-by-side diligence trackers, notes, and signals in one workspace.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">🛡</div>
                <h3 data-i18n="familyWhy4Title">Risk corridor analytics</h3>
                <p data-i18n="familyWhy4Body">
                  Scenario-aware bands so allocations stay inside mandate corridors.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="intelligence">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="familyCuratedEyebrow">
                Curated Mandates
              </p>
              <h2 data-i18n="familyCuratedTitle">Allocator-first views into leading strategies.</h2>
            </div>
            <div className="card-grid">
              <article className="info-card">
                <div className="icon-circle">🌐</div>
                <h3 data-i18n="familyMandate1">Macro</h3>
                <p data-i18n="familyMandate1Body">
                  Global macro managers with disciplined risk corridors.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">💳</div>
                <h3 data-i18n="familyMandate2">Credit</h3>
                <p data-i18n="familyMandate2Body">
                  Event-driven and structured credit insights with live exposure checks.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">💠</div>
                <h3 data-i18n="familyMandate3">Digital Assets</h3>
                <p data-i18n="familyMandate3Body">
                  On-chain transparency with institutional-grade custody signals.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">📊</div>
                <h3 data-i18n="familyMandate4">Systematic Strategies</h3>
                <p data-i18n="familyMandate4Body">
                  Factor-aware systems with monitored model drift and capacity.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="access" className="contact">
          <div className="container grid contact-grid">
            <div className="contact-copy">
              <p className="eyebrow" data-i18n="familyFormEyebrow">
                Access Requests
              </p>
              <h2 data-i18n="familyFormTitle">Request allocator access.</h2>
              <p className="lead" data-i18n="familyFormLead">
                Tell us about your mandate, and we will provision secure access to managers.
              </p>
              <div className="contact-meta">
                <div>
                  <p className="small" data-i18n="familyFormResponseLabel">
                    Response time
                  </p>
                  <p className="metric" data-i18n="familyFormResponseMetric">
                    &lt; 24 hours
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="familyFormSecurityLabel">
                    Security
                  </p>
                  <p className="metric" data-i18n="familyFormSecurityMetric">
                    Compliance-first
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="familyFormCoverageLabel">
                    Coverage
                  </p>
                  <p className="metric" data-i18n="familyFormCoverageMetric">
                    Global managers
                  </p>
                </div>
              </div>
            </div>
            <FamilyAccessForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
