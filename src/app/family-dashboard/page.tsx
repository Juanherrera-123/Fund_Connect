import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function FamilyDashboardPage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Family Office</p>
            <div className="page-title-row">
              <h1>Dashboard ampliado de fondos</h1>
              <div className="micro-tag">Family Office</div>
            </div>
            <p className="lead compact">
              Personaliza mandatos, reportes y accesos directos con gestores.
            </p>
          </div>
        </section>

        <section className="profile-section">
          <div className="container" id="familyDashboardContent"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
