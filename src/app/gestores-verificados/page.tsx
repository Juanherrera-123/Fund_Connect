import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { VerifiedManagers } from "@/components/VerifiedManagers";

export default function GestoresVerificadosPage() {
  return (
    <div className="verified-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Selección institucional</p>
            <div className="page-title-row">
              <h1>Gestores verificados</h1>
              <div className="micro-tag">Vista curada</div>
            </div>
            <p className="lead compact">
              Explora fondos privados con capital real, track record auditado y gestión profesional.
            </p>
          </div>
        </section>

        <VerifiedManagers />
      </main>
      <Footer />
    </div>
  );
}
