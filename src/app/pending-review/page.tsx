import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function PendingReviewPage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Fund Manager</p>
            <div className="page-title-row">
              <h1>Estado de revisión</h1>
              <div className="micro-tag">Pending Review</div>
            </div>
            <p className="lead compact">
              Tu solicitud está en revisión por el MasterUser. Te avisaremos cuando esté aprobada.
            </p>
          </div>
        </section>

        <section className="profile-section">
          <div className="container" id="pendingReviewContent"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
