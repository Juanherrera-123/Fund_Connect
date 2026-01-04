const modules = [
  {
    title: "Master Console",
    description:
      "Vista consolidada de portafolios, métricas clave y alertas de compliance.",
  },
  {
    title: "Investor Hub",
    description:
      "Portales privados con reporting, capital calls y actualización documental.",
  },
  {
    title: "Fund Ops",
    description:
      "Gestión de NAV, workflow de aprobaciones y conciliaciones automatizadas.",
  },
  {
    title: "Analytics Lab",
    description:
      "Dashboards dinámicos, escenarios y métricas ESG comparables en tiempo real.",
  },
];

export function Modules() {
  return (
    <section id="modulos" className="bg-igates-900 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Módulos conectados
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Construye la operación que tu fondo necesita.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Cada módulo se integra con APIs internas para mantener consistencia
            de datos y políticas de inversión.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-igates-500/10 to-igates-400/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {module.title}
              </h3>
              <p className="mt-3 text-sm text-white/60">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
