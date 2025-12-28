import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/forms/ContactForm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero" className="hero hero-large">
          <div className="container grid hero-grid">
            <div className="hero-text">
              <p className="eyebrow" data-i18n="heroEyebrow">
                Acceso institucional
              </p>
              <h1 className="hero-title-premium" data-i18n="heroTitle">
                Conectando capital con gestores verificados
              </h1>
              <p className="hero-tagline" data-i18n="heroLead">
                Infraestructura institucional para acceder a fondos gestionados con estándares
                profesionales.
              </p>
              <div className="cta-group">
                <Link className="btn btn-primary" href="#contact" data-i18n="heroCtaInvestor">
                  Solicitar asesoría de inversión
                </Link>
                <Link className="btn btn-secondary" href="#contact" data-i18n="heroCtaManager">
                  Postularse como gestor
                </Link>
              </div>
              <div className="trust-bar">
                <span data-i18n="heroTrust1">Operate with regulated entities</span>
                <span data-i18n="heroTrust2">Segregated accounts and protected funds</span>
                <span data-i18n="heroTrust3">Verified monthly reporting</span>
              </div>
            </div>
            <div className="hero-dashboard">
              <div className="dashboard-card compact-card performance-card">
                <div className="stat-header">
                  <span className="card-label">Rendimiento YTD</span>
                  <span className="stat-value positive">+14.8%</span>
                </div>
                <div className="stat-sparkline" aria-hidden="true"></div>
              </div>
              <div className="dashboard-card compact-card risk-card">
                <div className="stat-list" aria-label="Risk metrics">
                  <div className="stat-row">
                    <span className="stat-label">Volatilidad</span>
                    <span className="stat-value">12.4%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Máx. caída</span>
                    <span className="stat-value negative">-3.1%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Riesgo</span>
                    <span className="stat-badge">Medio-Bajo</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-card compact-card aum-card">
                <div className="card-label">AUM verificado</div>
                <div className="stat-value">$212M</div>
                <p className="stat-subtext">Con 10 gestores</p>
              </div>
              <div className="stat-cta-card">
                <div className="stat-cta-overlay" aria-hidden="true">
                  <div className="overlay-grid">
                    <span className="grid-line"></span>
                    <span className="grid-line"></span>
                    <span className="grid-line"></span>
                    <span className="grid-line"></span>
                  </div>
                  <div className="overlay-chart">
                    <span className="overlay-bar short"></span>
                    <span className="overlay-bar"></span>
                    <span className="overlay-bar tall"></span>
                    <span className="overlay-bar"></span>
                  </div>
                </div>
                <button className="btn btn-primary stat-cta-button">Ver estadísticas completas</button>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="why purpose">
          <div className="container">
            <div className="section-header purpose-header">
              <p className="eyebrow" data-i18n="whyEyebrow">
                Propósito Estratégico
              </p>
              <h2 data-i18n="whyTitle">Por qué existe IGATES</h2>
              <p className="lead" data-i18n="whyLead">
                Un puente curado entre capital calificado y gestores privados con historial verificado.
              </p>
            </div>
            <div className="purpose-grid">
              <article className="purpose-card">
                <div className="purpose-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 42c11.046 0 16-5.5 16-12.889V12.44L24 6 8 12.44v16.67C8 36.5 12.954 42 24 42Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m17 24 4.5 4.5L31 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="purpose-copy">
                  <h3 data-i18n="whyCard1Title">Cuentas auditadas y capital verificado</h3>
                  <p data-i18n="whyCard1Body">
                    Trabajamos exclusivamente con fondos que cuentan con más de 12 meses de historial
                    auditado, operando capital real bajo custodios y entidades reguladas.
                  </p>
                  <div className="purpose-visual">
                    <img src="/frostglass.png" alt="Track record verification graphic" loading="lazy" />
                  </div>
                </div>
              </article>
              <article className="purpose-card">
                <div className="purpose-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 36h30"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <rect x="12" y="14" width="6" height="18" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <rect x="21" y="10" width="6" height="22" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <rect x="30" y="18" width="6" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="purpose-copy">
                  <h3 data-i18n="whyCard2Title">Acompañamiento continuo y control de riesgo</h3>
                  <p data-i18n="whyCard2Body">
                    Soporte activo durante el onboarding y a lo largo del ciclo de inversión.
                    Entregamos reportes mensuales y realizamos ajustes de nivel de riesgo en consenso
                    entre inversionistas y gestores privados.
                  </p>
                  <div className="purpose-visual">
                    <img
                      src="/surfacespannels.png"
                      alt="Continuous support and risk control graphic"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
              <article className="purpose-card">
                <div className="purpose-icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 18.5c0-6.351 6.149-11.5 13.737-11.5C31.324 7 37 11.287 37 16.5 37 24 28 28 28 34"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
                    <circle cx="35" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
                    <circle cx="27" cy="35" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="purpose-copy">
                  <h3 data-i18n="whyCard3Title">Gestores globales y estrategias diversificadas</h3>
                  <p data-i18n="whyCard3Body">
                    Acceso a gestores privados en distintas regiones del mundo, operando crédito,
                    macro, activos digitales y estrategias alternativas. Elige el fondo que mejor se
                    adapte a tu perfil y nivel de confianza.
                  </p>
                  <div className="purpose-visual">
                    <img
                      src="/Global.png"
                      alt="Global managers and diversified strategies graphic"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="learn" className="insights learn">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="learnEyebrow">
                Daily Forum
              </p>
              <h2 data-i18n="learnTitle">Learn &amp; Community</h2>
              <p className="lead" data-i18n="learnLead">
                Fresh briefings and forum highlights to keep you updated every day.
              </p>
            </div>
            <div className="insight-list learn-list">
              <article className="insight-card">
                <header>
                  <h3 className="insight-title" data-i18n="learnPost1Title">
                    Morning allocation radar: credit and macro themes
                  </h3>
                  <span className="timestamp" data-i18n="learnPost1Time">
                    Today
                  </span>
                </header>
                <p data-i18n="learnPost1Body">
                  Top forum threads from allocators discussing cross-asset liquidity, duration risk,
                  and new macro hedges.
                </p>
              </article>
              <article className="insight-card">
                <header>
                  <h3 className="insight-title" data-i18n="learnPost2Title">
                    Manager spotlight: digital asset neutrality
                  </h3>
                  <span className="timestamp" data-i18n="learnPost2Time">
                    Updated daily
                  </span>
                </header>
                <p data-i18n="learnPost2Body">
                  Daily digest of risk notes and operational updates from the digital asset desk.
                </p>
              </article>
              <article className="insight-card">
                <header>
                  <h3 className="insight-title" data-i18n="learnPost3Title">
                    Community brief: ops and compliance corner
                  </h3>
                  <span className="timestamp" data-i18n="learnPost3Time">
                    This week
                  </span>
                </header>
                <p data-i18n="learnPost3Body">
                  Forum Q&amp;A covering onboarding checklists, data room hygiene, and audit-ready
                  packaging.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="compliance" className="compliance">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow" data-i18n="complianceEyebrow">
                Compliance First
              </p>
              <h2 data-i18n="complianceTitle">Regulatory-grade controls at every step.</h2>
              <p className="small" data-i18n="complianceBody">
                SOC2-ready infrastructure, geo-fenced data residency, and layered permissions keep
                sensitive information protected.
              </p>
            </div>
            <div className="compliance-line"></div>
            <div className="compliance-grid">
              <div>
                <h4 data-i18n="complianceIdentityTitle">Identity &amp; Access</h4>
                <p className="small" data-i18n="complianceIdentityBody">
                  Multi-factor auth, SSO/SAML, and secure vaulting for documents and NDAs.
                </p>
              </div>
              <div>
                <h4 data-i18n="complianceMonitoringTitle">Monitoring</h4>
                <p className="small" data-i18n="complianceMonitoringBody">
                  Automated audit trails, threshold alerts, and encryption in transit and at rest.
                </p>
              </div>
              <div>
                <h4 data-i18n="complianceGovernanceTitle">Governance</h4>
                <p className="small" data-i18n="complianceGovernanceBody">
                  Pre-configured policies aligned to institutional due diligence standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container grid contact-grid">
            <div className="contact-copy">
              <p className="eyebrow" data-i18n="contactEyebrow">
                Talk To Us
              </p>
              <h2 data-i18n="contactTitle">Start your access process.</h2>
              <p className="lead" data-i18n="contactLead">
                Tell us about your mandate or strategy. Our team will coordinate data rooms,
                diligence requests, and secure access.
              </p>
              <div className="contact-meta">
                <div>
                  <p className="small" data-i18n="contactResponseLabel">
                    Response time
                  </p>
                  <p className="metric" data-i18n="contactResponseMetric">
                    &lt; 24 hours
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="contactCoverageLabel">
                    Coverage
                  </p>
                  <p className="metric" data-i18n="contactCoverageMetric">
                    Global allocators
                  </p>
                </div>
                <div>
                  <p className="small" data-i18n="contactSecurityLabel">
                    Security
                  </p>
                  <p className="metric" data-i18n="contactSecurityMetric">
                    SOC2-ready
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
