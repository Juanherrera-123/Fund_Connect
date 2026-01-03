const purposeCards = [
  {
    titleKey: "whyCard1Title",
    bodyKey: "whyCard1Body",
    title: "Cuentas auditadas y capital verificado",
    body:
      "Trabajamos exclusivamente con fondos que cuentan con más de 12 meses de historial auditado, operando capital real bajo custodios y entidades reguladas.",
    image: "/frostglass.png",
    alt: "Track record verification graphic",
  },
  {
    titleKey: "whyCard2Title",
    bodyKey: "whyCard2Body",
    title: "Acompañamiento continuo y control de riesgo",
    body:
      "Soporte activo durante el onboarding y a lo largo del ciclo de inversión. Entregamos reportes mensuales y realizamos ajustes de nivel de riesgo en consenso entre inversionistas y gestores privados.",
    image: "/surfacespannels.png",
    alt: "Continuous support and risk control graphic",
  },
  {
    titleKey: "whyCard3Title",
    bodyKey: "whyCard3Body",
    title: "Gestores globales y estrategias diversificadas",
    body:
      "Acceso a gestores privados en distintas regiones del mundo, operando crédito, macro, activos digitales y estrategias alternativas. Elige el fondo que mejor se adapte a tu perfil y nivel de confianza.",
    image: "/Global.png",
    alt: "Global managers and diversified strategies graphic",
  },
];

export function Why() {
  return (
    <section id="why" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-500"
            data-i18n="whyEyebrow"
          >
            Propósito Estratégico
          </p>
          <h2 className="text-3xl font-semibold text-slate-900" data-i18n="whyTitle">
            Por qué existe IGATES
          </h2>
          <p className="text-base text-slate-600" data-i18n="whyLead">
            Un puente curado entre capital calificado y gestores privados con historial verificado.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {purposeCards.map((card) => (
            <article
              key={card.titleKey}
              className="grid gap-5 rounded-[18px] border border-slate-200/60 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-igates-500/20 bg-gradient-to-br from-igates-500/10 to-indigo-500/10 text-igates-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-igates-500" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[19px] font-semibold text-slate-900" data-i18n={card.titleKey}>
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-slate-600" data-i18n={card.bodyKey}>
                    {card.body}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-slate-50">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="h-60 w-full object-contain"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
