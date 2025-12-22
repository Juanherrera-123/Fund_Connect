import { StatCard } from "@/components/cards/StatCard";

const stats = [
  { label: "Solicitudes pendientes", value: "14" },
  { label: "Fondos en revisión", value: "7" },
  { label: "Waitlists activas", value: "39" },
];

export default function MasterDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-igates-400">MasterUser</p>
        <h1 className="mt-4 text-3xl font-semibold">Control tower institucional</h1>
        <p className="mt-2 text-slate-200">
          Revisión integral de fondos, aprobaciones y métricas globales.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        Panel de aprobaciones, notificaciones y reportes globales en construcción.
      </div>
    </section>
  );
}
