const learnBlocks = [
  {
    titleKey: "learnBlock1Title",
    bodyKey: "learnBlock1Body",
    title: "De la operativa individual a la gestión con historial",
    body:
      "Por qué el capital institucional exige estructura, disciplina y continuidad verificable.",
  },
  {
    titleKey: "learnBlock2Title",
    bodyKey: "learnBlock2Body",
    title: "Track record como punto de partida, no como promesa",
    body: "Cómo interpretar historial, drawdowns y ciclos sin caer en marketing de resultados.",
  },
  {
    titleKey: "learnBlock3Title",
    bodyKey: "learnBlock3Body",
    title: "Asignación estructurada, no señales",
    body: "Diferencia entre modelos de asignación profesional y trading discrecional.",
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
      className="relative overflow-hidden bg-gradient-to-br from-[#050f24] via-[#0b2453] to-[#0b3b6a] py-20 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_62%)] before:opacity-70 before:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(120deg,_rgba(255,255,255,0.06),_transparent_60%)] after:opacity-20 after:content-['']"
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
                className="group rounded-2xl border border-[rgba(80,120,255,0.35)] bg-[rgba(255,255,255,0.07)] shadow-[0_18px_40px_rgba(3,10,24,0.45)] backdrop-blur-[6px] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(3,10,24,0.55),_0_0_18px_rgba(80,120,255,0.25)]"
              >
                <details className="group/accordion rounded-2xl">
                  <summary className="relative flex cursor-pointer items-center justify-between gap-4 px-6 py-5 pl-7 text-left text-lg font-semibold text-white marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050f24]">
                    <span className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-igates-300/70 via-igates-400/60 to-igates-500/60 opacity-0 transition duration-200 group-open/accordion:opacity-100" />
                    <span data-i18n={block.titleKey}>{block.title}</span>
                    {accordionArrow}
                  </summary>
                  <div className="grid grid-rows-[0fr] px-6 pb-0 transition-[grid-template-rows] duration-300 ease-out group-open/accordion:grid-rows-[1fr]">
                    <div className="overflow-hidden pb-6">
                      <p className="text-sm leading-relaxed text-slate-200/80" data-i18n={block.bodyKey}>
                        {block.body}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
          <aside className="rounded-2xl border border-[rgba(80,120,255,0.35)] bg-[rgba(255,255,255,0.07)] shadow-[0_18px_40px_rgba(3,10,24,0.45)] backdrop-blur-[6px] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(3,10,24,0.55),_0_0_18px_rgba(80,120,255,0.25)]">
            <div className="flex h-full flex-col gap-4 px-8 py-7">
              <h3 className="text-xl font-semibold text-white" data-i18n="learnMamTitle">
                Cómo funciona una cuenta MAM institucional
              </h3>
              <p className="text-sm leading-relaxed text-slate-200/80" data-i18n="learnMamBody">
                Arquitectura operativa, segregación de cuentas, control de riesgo y reporting utilizados por gestores
                profesionales para escalar capital con transparencia.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
