const complianceItems = [
  {
    titleKey: "complianceIdentityTitle",
    bodyKey: "complianceIdentityBody",
    title: "Ejecución y liquidez",
    body: "Acceso a gestores que operan exclusivamente a través de brokers A-book y Prime of Prime, con ejecución directa a mercado y sin conflictos por internalización.",
  },
  {
    titleKey: "complianceMonitoringTitle",
    bodyKey: "complianceMonitoringBody",
    title: "Custodia y segregación",
    body: "Los fondos permanecen siempre bajo custodia del broker, en cuentas segregadas. IGATES no recibe, retiene ni intermedia capital.",
  },
  {
    titleKey: "complianceGovernanceTitle",
    bodyKey: "complianceGovernanceBody",
    title: "Riesgo y trazabilidad",
    body: "Asignaciones estructuradas con límites de drawdown, reporting verificable y seguimiento de performance sobre cuentas reales. Todo auditable, todo trazable.",
  },
];

export function Compliance() {
  return (
    <section id="compliance" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-500"
              data-i18n="complianceEyebrow"
            >
              Infraestructura de mercado
            </p>
            <h2 className="text-3xl font-semibold text-slate-900" data-i18n="complianceTitle">
              Infraestructura institucional, no promesas.
            </h2>
            <p className="text-sm text-slate-600" data-i18n="complianceBody">
              Conectamos capital con gestores verificados sobre brokers A-book y Prime of Prime,
              bajo reglas claras de ejecución, riesgo y custodia. En IGATES, el acceso a gestores no
              ocurre en un entorno opaco ni bajo modelos de internalización. Toda la operativa se
              estructura sobre brokers A-book y Prime of Prime, donde la ejecución, la segregación
              de fondos y la trazabilidad son requisitos básicos. IGATES actúa como capa
              institucional de acceso y control, asegurando que cada relación entre inversor, gestor
              y broker esté alineada con estándares reales de mercado.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="h-1 w-16 rounded-full bg-igates-500" />
            <div className="mt-6 space-y-6">
              {complianceItems.map((item) => (
                <div key={item.titleKey}>
                  <h4 className="text-sm font-semibold text-slate-900" data-i18n={item.titleKey}>
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600" data-i18n={item.bodyKey}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
