const insights = [
  {
    title: "Distribución global",
    description:
      "Visibilidad en tiempo real de commitments, capital calls y estados regulatorios por región.",
  },
  {
    title: "Governance de fondos",
    description:
      "Reglas de aprobación por rol, auditoría y versiones para mantener control institucional.",
  },
  {
    title: "Data room inteligente",
    description:
      "Documentación centralizada, flujos de KYC/AML y trazabilidad para cada inversor.",
  },
];

export function Insights() {
  return (
    <section id="plataforma" className="bg-igates-900 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Plataforma IGATES
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Una experiencia de home diseñada para equipos institucionales.
          </h2>
          <p className="text-base text-white/70">
            Centraliza data crítica, seguimiento regulatorio y performance en un
            único panel diseñado para gestores, compliance y investor relations.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <p className="mb-4 text-lg font-semibold text-white">
              Fund Connect · Nueva generación
            </p>
            <p>
              React + Next nos permite escalar módulos, integrar reporting y
              conectar APIs de custodios en una sola arquitectura.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {insights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
