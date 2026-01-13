const learnBlocks = [
  {
    titleKey: "learnBlock1Title",
    bodyKey: "learnBlock1Body",
    title: "Del trading individual a la gestión con historial",
    body:
      "Operar de forma individual implica riesgo no sistematizado y ausencia de control externo. La asignación a gestores con track record verificable permite evaluar consistencia, gestión de drawdown y comportamiento en distintos ciclos de mercado antes de comprometer capital.",
  },
  {
    titleKey: "learnBlock2Title",
    bodyKey: "learnBlock2Body",
    title: "Track record como punto de partida, no como promesa",
    body:
      "En entornos institucionales, el historial operativo es el filtro inicial. Rentabilidad, drawdown, correlación y disciplina de ejecución son analizados sobre cuentas reales, no simulaciones ni resultados aislados.",
  },
  {
    titleKey: "learnBlock3Title",
    bodyKey: "learnBlock3Body",
    title: "Asignación estructurada, no señales",
    body:
      "La asignación de capital se realiza bajo reglas claras de riesgo y ejecución, eliminando decisiones emocionales y garantizando coherencia operativa entre inversores y gestores.",
  },
];

const mamDetails = [
  {
    key: "learnMamBullet1",
    text: "El inversor mantiene la custodia total de su capital en una cuenta individual con el broker.",
  },
  {
    key: "learnMamBullet2",
    text: "El gestor opera de forma remota a través de una estructura MAM, sin acceso a retiros ni custodia.",
  },
  {
    key: "learnMamBullet3",
    text: "Cada operación se replica proporcionalmente según el capital asignado.",
  },
  {
    key: "learnMamBullet4",
    text: "La segregación, ejecución y reporting permanecen a nivel broker.",
  },
];

const accordionArrow = (
  <span className="text-sm font-semibold text-igates-300 transition-transform duration-200 group-open:rotate-180">
    ▾
  </span>
);

export function Learn() {
  return (
    <section id="learn" className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-400"
            data-i18n="learnEyebrow"
          >
            Ejecución institucional
          </p>
          <h2 className="text-3xl font-semibold" data-i18n="learnTitle">
            Cómo se ejecuta capital profesional hoy.
          </h2>
          <p className="text-base text-white/70" data-i18n="learnLead">
            Los fondos modernos no se construyen sobre señales aisladas ni decisiones individuales. Se estructuran sobre
            ejecución profesional, gestores con historial verificable y modelos de asignación que priorizan control,
            trazabilidad y custodia.
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-5">
            {learnBlocks.map((block) => (
              <details
                key={block.titleKey}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold marker:content-none">
                  <span data-i18n={block.titleKey}>{block.title}</span>
                  {accordionArrow}
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-white/70" data-i18n={block.bodyKey}>
                    {block.body}
                  </p>
                </div>
              </details>
            ))}
          </div>
          <aside className="rounded-3xl border border-igates-500/30 bg-gradient-to-b from-white/10 via-white/5 to-slate-950/60">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-8 py-6 text-left text-xl font-semibold marker:content-none">
                <span data-i18n="learnMamTitle">Cómo funciona una cuenta MAM</span>
                {accordionArrow}
              </summary>
              <div className="px-8 pb-6">
                <div className="space-y-4 text-sm leading-relaxed text-white/70">
                  {mamDetails.map((detail) => (
                    <p key={detail.key} data-i18n={detail.key}>
                      {detail.text}
                    </p>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold text-white" data-i18n="learnMamClosing">
                  IGATES facilita la conexión, verificación y control. La ejecución ocurre donde debe: en el mercado.
                </p>
              </div>
            </details>
          </aside>
        </div>
      </div>
    </section>
  );
}
