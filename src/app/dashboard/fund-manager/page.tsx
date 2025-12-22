import { StatCard } from "@/components/cards/StatCard";

const stats = [
  { label: "Fondos enviados", value: "2" },
  { label: "En revisión", value: "1" },
  { label: "Reportes subidos", value: "6" },
];

export default function FundManagerDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-igates-400">Fund Manager</p>
        <h1 className="mt-4 text-3xl font-semibold">Registro y seguimiento de fondos</h1>
        <p className="mt-2 text-slate-200">
          Envía información para aprobación y comparte reportes mensuales.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        Flujo de onboarding y carga de reportes en construcción.
      </div>
    </section>
  );
}
