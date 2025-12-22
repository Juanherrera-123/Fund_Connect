import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FundsExploreGrid } from "@/components/FundsExploreGrid";

export default function FundsExplorePage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Investor Desk</p>
            <div className="page-title-row">
              <h1>Explora fondos y únete a la lista</h1>
              <div className="micro-tag">Investor</div>
            </div>
            <p className="lead compact">
              Selecciona fondos para tu waitlist y recibe actualizaciones mensuales.
            </p>
          </div>
        </section>

        <section className="profile-section">
          <div className="container">
            <FundsExploreGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
