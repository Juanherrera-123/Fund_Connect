import { StatCard } from "@/components/cards/StatCard";

const stats = [
  { label: "Fondos consolidados", value: "9" },
  { label: "Alertas activas", value: "4" },
  { label: "Mensajes directos", value: "11" },
];

export default function FamilyOfficeDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-igates-400">Family Office</p>
        <h1 className="mt-4 text-3xl font-semibold">Seguimiento avanzado</h1>
        <p className="mt-2 text-slate-200">
          Vista consolidada de performance, drawdown y comunicación directa.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        Panel de mensajería y reportes consolidados pendiente de integración.
      </div>
    </section>
  );
}
