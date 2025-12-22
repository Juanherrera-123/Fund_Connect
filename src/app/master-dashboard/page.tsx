import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MasterDashboardView } from "@/components/MasterDashboardView";

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
          <div className="container">
            <MasterDashboardView />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
