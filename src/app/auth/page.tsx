import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AuthFlow } from "@/components/AuthFlow";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-igates-500/10 to-indigo-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">User Access</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Acceso y onboarding</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Completa un KYC ligero y elige tu perfil para desbloquear el flujo de IGATES.
              </p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="mx-auto w-full max-w-6xl px-6">
            <AuthFlow />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
