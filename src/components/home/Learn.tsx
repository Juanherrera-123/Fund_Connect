const learnPosts = [
  {
    titleKey: "learnPost1Title",
    timeKey: "learnPost1Time",
    bodyKey: "learnPost1Body",
    title: "Radar de asignación: crédito y macro tendencias",
    time: "Hoy",
    body:
      "Hilos destacados con allocators sobre liquidez multi-activo, riesgo de duración y coberturas macro.",
  },
  {
    titleKey: "learnPost2Title",
    timeKey: "learnPost2Time",
    bodyKey: "learnPost2Body",
    title: "Manager spotlight: neutralidad en activos digitales",
    time: "Actualizado a diario",
    body: "Resumen diario de notas de riesgo y updates operativos del desk de activos digitales.",
  },
  {
    titleKey: "learnPost3Title",
    timeKey: "learnPost3Time",
    bodyKey: "learnPost3Body",
    title: "Community brief: operaciones y compliance",
    time: "Esta semana",
    body:
      "Q&A sobre checklists de onboarding, data rooms y preparación para auditorías.",
  },
];

export function Learn() {
  return (
    <section id="learn" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-400"
            data-i18n="learnEyebrow"
          >
            Foro diario
          </p>
          <h2 className="text-3xl font-semibold" data-i18n="learnTitle">
            Aprendizaje &amp; comunidad
          </h2>
          <p className="text-base text-white/70" data-i18n="learnLead">
            Briefings y highlights para mantenerte informado cada día.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {learnPosts.map((post) => (
            <article
              key={post.titleKey}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <header className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold" data-i18n={post.titleKey}>
                  {post.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50" data-i18n={post.timeKey}>
                  {post.time}
                </span>
              </header>
              <p className="mt-4 text-sm text-white/70" data-i18n={post.bodyKey}>
                {post.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
