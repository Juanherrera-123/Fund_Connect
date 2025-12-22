import { StatCard } from "@/components/cards/StatCard";

const stats = [
  { label: "Fondos seguidos", value: "12" },
  { label: "Waitlists", value: "3" },
  { label: "Reportes nuevos", value: "5" },
];

export default function InvestorDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-igates-400">Investor</p>
        <h1 className="mt-4 text-3xl font-semibold">Portafolio institucional</h1>
        <p className="mt-2 text-slate-200">
          Acceso a fondos verificados, métricas en tiempo real y reportes mensuales.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        Feed personalizado de fondos y desempeño pendiente de conexión a Firestore.
      </div>
    </section>
  );
}
