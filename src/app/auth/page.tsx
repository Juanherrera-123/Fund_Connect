import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AuthFlow } from "@/components/AuthFlow";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">User Access</p>
            <h1>Acceso y onboarding</h1>
            <p className="lead compact">
              Completa un KYC ligero y elige tu perfil para desbloquear el flujo de IGATES.
            </p>
          </div>
        </section>

        <section className="auth-section">
          <div className="container">
            <AuthFlow />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
