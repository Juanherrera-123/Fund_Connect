import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FundsExploreGrid } from "@/components/FundsExploreGrid";

export default function FundsExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-8">
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-igates-500/10 to-igates-400/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">Investor Desk</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-slate-900">Explora fondos y únete a la lista</h1>
                <div className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-igates-700">
                  Investor
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Selecciona fondos para tu waitlist y recibe actualizaciones mensuales.
              </p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="mx-auto w-full max-w-6xl px-6">
            <FundsExploreGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
