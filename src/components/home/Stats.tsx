const stats = [
  { label: "Fondos estructurados", value: "28" },
  { label: "Assets bajo revisión", value: "$4.6B" },
  { label: "Solicitudes activas", value: "112" },
  { label: "Países conectados", value: "19" },
];

export function Stats() {
  return (
    <section className="bg-igates-900">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
          >
            <span className="text-2xl font-semibold text-gradient-brand">{stat.value}</span>
            <span className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
