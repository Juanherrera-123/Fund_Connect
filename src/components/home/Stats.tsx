const stats = [
  { label: "Funds aprobados", value: "28" },
  { label: "Assets en espera", value: "$4.6B" },
  { label: "Solicitudes activas", value: "112" },
];

export function Stats() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-[180px] flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
          >
            <span className="text-2xl font-semibold text-slate-900">
              {stat.value}
            </span>
            <span className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
