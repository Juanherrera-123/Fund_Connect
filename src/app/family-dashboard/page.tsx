import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FamilyDashboardContent } from "@/components/FamilyDashboardContent";

export default function FamilyDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-igates-500/10 to-indigo-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">Family Office</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-slate-900">Dashboard ampliado de fondos</h1>
                <div className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-igates-700">
                  Family Office
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Personaliza mandatos, reportes y accesos directos con gestores.
              </p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="mx-auto w-full max-w-6xl px-6">
            <FamilyDashboardContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
