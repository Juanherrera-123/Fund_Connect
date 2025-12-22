import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function ForManagersPage() {
  return (
    <div className="manager-page-container">
      <Navbar />
      <main>
        <section className="hero hero-large">
          <div className="container grid hero-grid">
            <div className="hero-text">
              <p className="eyebrow" data-i18n="managersHeroEyebrow">
                For Managers
              </p>
              <h1 data-i18n="managersHeroTitle">
                Purpose-built distribution for elite strategies.
              </h1>
              <p className="hero-tagline" data-i18n="managersHeroLead">
                Connect with verified global allocators using IGATES’ institutional infrastructure.
              </p>
              <div className="cta-group">
                <Link className="btn btn-primary" href="#apply" data-i18n="managersHeroCta">
                  Apply as a Manager
                </Link>
              </div>
              <div className="trust-bar">
                <span data-i18n="managersHeroTrust1">
                  Allocator coverage across macro, credit, digital assets
                </span>
                <span data-i18n="managersHeroTrust2">SOC2-ready data exchange</span>
              </div>
            </div>
            <div className="hero-dashboard">
              <div className="dashboard-card">
                <div className="card-label" data-i18n="managersCardLabel1">
                  Live mandates
                </div>
                <div className="metric-chip emphasis" aria-label="Live mandates on platform">
                  <div className="chip-text">
                    <span className="chip-title" data-i18n="managersCardLabel1">
                      Live mandates
                    </span>
                    <span className="chip-value">32</span>
                  </div>
                </div>
                <p className="subcopy" data-i18n="managersCardCopy1">
                  Qualified allocators seeking differentiated strategies.
                </p>
              </div>
              <div className="dashboard-card">
                <div className="card-label" data-i18n="managersCardLabel2">
                  Avg. review time
                </div>
                <div className="metric-chip emphasis" aria-label="Average review time">
                  <div className="chip-text">
                    <span className="chip-title" data-i18n="managersCardLabel2">
                      Avg. review time
                    </span>
                    <span className="chip-value positive">&lt; 72h</span>
                  </div>
                </div>
                <p className="subcopy" data-i18n="managersCardCopy2">
                  Automated compliance cuts through admin drag.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-funds">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="managersBenefitsEyebrow">
                Platform Benefits
              </p>
              <h2 data-i18n="managersBenefitsTitle">
                Everything you need to scale allocator pipelines.
              </h2>
            </div>
            <div className="card-grid">
              <article className="info-card">
                <div className="icon-circle">⇄</div>
                <h3 data-i18n="managersBenefit1Title">Access curated allocators</h3>
                <p data-i18n="managersBenefit1Body">
                  Targeted introductions to qualified LPs actively allocating to your strategy class.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">🔒</div>
                <h3 data-i18n="managersBenefit2Title">Secure data rooms</h3>
                <p data-i18n="managersBenefit2Body">
                  Permissioned vaults with watermarking and activity visibility for every data room.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">✔</div>
                <h3 data-i18n="managersBenefit3Title">Compliance workflows</h3>
                <p data-i18n="managersBenefit3Body">
                  Built-in KYC, KYB, and governance checks keep diligence moving without bottlenecks.
                </p>
              </article>
              <article className="info-card">
                <div className="icon-circle">📈</div>
                <h3 data-i18n="managersBenefit4Title">Embedded performance intelligence</h3>
                <p data-i18n="managersBenefit4Body">
                  Automated telemetry streams performance, risk corridors, and factor drift to LPs.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="intelligence">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="managersOnboardingEyebrow">
                Onboarding
              </p>
              <h2 data-i18n="managersOnboardingTitle">Institutional distribution in four steps.</h2>
            </div>
            <div className="onboarding-steps">
              <div className="onboarding-step" data-i18n="managersStep1">
                Submit strategy profile
              </div>
              <div className="onboarding-step" data-i18n="managersStep2">
                Verification &amp; compliance
              </div>
              <div className="onboarding-step" data-i18n="managersStep3">
                Data integration &amp; risk mapping
              </div>
              <div className="onboarding-step" data-i18n="managersStep4">
                Go live to allocator marketplace
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="contact">
          <div className="container grid contact-grid">
            <div className="contact-copy">
              <p className="eyebrow" data-i18n="managersFormEyebrow">
                Manager Applications
              </p>
              <h2 data-i18n="managersFormTitle">Apply to distribute on IGATES.</h2>
              <p className="lead" data-i18n="managersFormLead">
                Provide your strategy details and our team will coordinate diligence and onboarding.
              </p>
              <div className="contact-meta">
                <div>
                  <p className="small" data-i18n="managersFormResponseLabel">
                    Response time
                  </p>
                  <p className="metric" data-i18n="managersFormResponseMetric">
                    &lt; 48 hours
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="managersFormSecurityLabel">
                    Security
                  </p>
                  <p className="metric" data-i18n="managersFormSecurityMetric">
                    Compliance-first
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="managersFormCoverageLabel">
                    Coverage
                  </p>
                  <p className="metric" data-i18n="managersFormCoverageMetric">
                    Global allocators
                  </p>
                </div>
              </div>
            </div>
            <form id="managerForm" className="contact-form">
              <label>
                <span data-i18n="formNameLabel">Name</span>
                <input type="text" name="name" placeholder="Your full name" required />
              </label>
              <label>
                <span data-i18n="formFirmLabel">Firm</span>
                <input type="text" name="firm" placeholder="Firm name" required />
              </label>
              <label>
                <span data-i18n="formStrategyLabel">Strategy Type</span>
                <input
                  type="text"
                  name="strategy"
                  placeholder="Credit, Macro, Digital Assets..."
                  required
                />
              </label>
              <label>
                <span data-i18n="formAumLabel">AUM</span>
                <input type="text" name="aum" placeholder="$250M" required />
              </label>
              <label>
                <span data-i18n="formEmailLabel">Email</span>
                <input type="email" name="email" placeholder="you@firm.com" required />
              </label>
              <label>
                <span data-i18n="formNotesLabel">Notes</span>
                <textarea name="notes" rows={3} placeholder="Mandate focus, timelines, targets"></textarea>
              </label>
              <button className="btn btn-primary" type="submit" data-i18n="formSubmit">
                Apply as a Manager
              </button>
              <p className="form-status" id="managerStatus" aria-live="polite"></p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
