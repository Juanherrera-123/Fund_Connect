import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function MasterDashboardPage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Master Control</p>
            <div className="page-title-row">
              <h1>Panel de control</h1>
              <div className="micro-tag">MasterUser</div>
            </div>
            <p className="lead compact">
              Revisa solicitudes pendientes, aprueba fondos y consulta resúmenes de onboarding.
            </p>
          </div>
        </section>

        <section className="profile-section">
          <div className="container" id="masterNotifications"></div>
        </section>

        <section className="profile-section">
          <div className="container">
            <div className="section-header compact">
              <h2>Solicitudes pendientes</h2>
              <p className="lead compact">Fondos y perfiles en revisión para aprobación.</p>
            </div>
            <div className="dashboard-grid" id="masterPendingApplications"></div>
          </div>
        </section>

        <section className="profile-section">
          <div className="container">
            <div className="section-header compact">
              <h2>Resúmenes de onboarding</h2>
              <p className="lead compact">Visión rápida para decisiones de advisory.</p>
            </div>
            <div className="dashboard-grid" id="masterSurveySummaries"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
