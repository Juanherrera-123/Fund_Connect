import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { VerifiedManagers } from "@/components/VerifiedManagers";

export default function GestoresVerificadosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="igates-institutional-frame shadow-[0_26px_60px_-48px_rgba(15,23,42,0.5)]">
              <div className="igates-institutional-surface rounded-[calc(2rem-1px)] px-6 py-7 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold text-slate-900" data-i18n="verifiedManagersTitle">
                      Gestores verificados
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-600" data-i18n="verifiedManagersLead">
                      Explora fondos privados con capital real, track record auditado y gestión profesional.
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    <span data-i18n="verifiedManagersBadge">Selección institucional · Vista curada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VerifiedManagers />
      </main>
      <Footer />
    </div>
  );
}
