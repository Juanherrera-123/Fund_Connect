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
  <span className="text-sm font-semibold text-white/60 transition-transform duration-200 group-open/accordion:rotate-180">
    ▾
  </span>
);

export function Learn() {
  return (
    <section
      id="learn"
      className="relative overflow-hidden bg-gradient-to-br from-[#071a3a] via-[#0b2a66] to-[#0aa7ff]/20 py-20 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_60%)] before:opacity-80 before:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,_rgba(255,255,255,0.08),_transparent_60%)] after:opacity-30 after:content-['']"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.4em] text-igates-300"
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
          <div className="space-y-4">
            {learnBlocks.map((block) => (
              <div
                key={block.titleKey}
                className="group rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-shadow duration-200 hover:shadow-[0_12px_34px_rgba(8,145,178,0.35)] bg-[length:200%_200%] motion-safe:animate-[igatesBorderFlow_10s_linear_infinite] motion-reduce:animate-none"
              >
                <details className="group/accordion rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px] transition duration-200 hover:bg-white/7 group-hover:bg-white/7 group-open/accordion:bg-white/8">
                  <summary className="relative flex cursor-pointer items-center justify-between gap-4 px-6 py-5 pl-7 text-left text-lg font-semibold text-white/90 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a3a]">
                    <span className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-300/80 via-blue-500/70 to-indigo-500/70 opacity-0 transition duration-200 group-open/accordion:opacity-100" />
                    <span data-i18n={block.titleKey}>{block.title}</span>
                    {accordionArrow}
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-white/70" data-i18n={block.bodyKey}>
                      {block.body}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] bg-[length:200%_200%] motion-safe:animate-[igatesBorderFlow_10s_linear_infinite] motion-reduce:animate-none">
            <aside className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[2px] transition duration-200 hover:bg-white/7">
              <details className="group/accordion h-full">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-8 py-6 text-left text-xl font-semibold text-white/90 marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a3a]">
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
      </div>
    </section>
  );
}
