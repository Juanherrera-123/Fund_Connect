const steps = [
  {
    title: "Onboarding",
    detail:
      "KYC/AML automatizado, perfiles de riesgo y validación documental desde el primer ingreso.",
  },
  {
    title: "Aprobaciones",
    detail:
      "Reglas multirol, comités y trazabilidad para cada decisión de inversión.",
  },
  {
    title: "Reporting",
    detail:
      "KPIs, performance y compliance listos para inversores y reguladores.",
  },
];

export function Workflow() {
  return (
    <section id="flujos" className="bg-igates-900 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Flujos inteligentes
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Operación segura con visibilidad end-to-end.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                Paso {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
