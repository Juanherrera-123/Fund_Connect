const modules = [
  {
    titleKey: "modulesMasterConsoleTitle",
    title: "Master Console",
    descriptionKey: "modulesMasterConsoleBody",
    description:
      "Vista consolidada de portafolios, métricas clave y alertas de compliance.",
  },
  {
    titleKey: "modulesInvestorHubTitle",
    title: "Investor Hub",
    descriptionKey: "modulesInvestorHubBody",
    description:
      "Portales privados con reporting, capital calls y actualización documental.",
  },
  {
    titleKey: "modulesFundOpsTitle",
    title: "Fund Ops",
    descriptionKey: "modulesFundOpsBody",
    description:
      "Gestión de NAV, workflow de aprobaciones y conciliaciones automatizadas.",
  },
  {
    titleKey: "modulesAnalyticsLabTitle",
    title: "Analytics Lab",
    descriptionKey: "modulesAnalyticsLabBody",
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
            <p
              className="text-xs uppercase tracking-[0.4em] text-white/50"
              data-i18n="modulesEyebrow"
            >
              Módulos conectados
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl" data-i18n="modulesTitle">
              Construye la operación que tu fondo necesita.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60" data-i18n="modulesLead">
            Cada módulo se integra con APIs internas para mantener consistencia
            de datos y políticas de inversión.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.titleKey}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-igates-500/10 to-igates-400/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white" data-i18n={module.titleKey}>
                {module.title}
              </h3>
              <p className="mt-3 text-sm text-white/60" data-i18n={module.descriptionKey}>
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
