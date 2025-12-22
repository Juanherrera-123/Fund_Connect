import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Profile</p>
            <div className="page-title-row">
              <h1 id="profileName">Tu perfil</h1>
              <div className="micro-tag" id="profileRole">
                —
              </div>
            </div>
            <p className="lead compact" id="profileSubtitle">
              Resumen de tu perfil y preferencias.
            </p>
          </div>
        </section>

        <section className="profile-section">
          <div className="container">
            <div className="profile-grid" id="profileOverview"></div>
          </div>
        </section>

        <section className="profile-section">
          <div className="container" id="profileContent"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
