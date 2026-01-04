const purposeCards = [
  {
    titleKey: "whyCard1Title",
    bodyKey: "whyCard1Body",
    title: "Cuentas auditadas y capital verificado",
    spec: "VERIFICATION",
    body:
      "Trabajamos exclusivamente con fondos que cuentan con más de 12 meses de historial auditado, operando capital real bajo custodios y entidades reguladas.",
    chips: ["12+ meses auditados", "Reporting mensual", "Data room"],
    image: "/frostglass.png",
    alt: "Track record verification graphic",
  },
  {
    titleKey: "whyCard2Title",
    bodyKey: "whyCard2Body",
    title: "Acompañamiento continuo y control de riesgo",
    spec: "RISK OVERSIGHT",
    body:
      "Soporte activo durante el onboarding y a lo largo del ciclo de inversión. Entregamos reportes mensuales y realizamos ajustes de nivel de riesgo en consenso entre inversionistas y gestores privados.",
    chips: ["Risk corridor", "Alertas por umbral", "Monitoreo continuo"],
    image: "/surfacespannels.png",
    alt: "Continuous support and risk control graphic",
  },
  {
    titleKey: "whyCard3Title",
    bodyKey: "whyCard3Body",
    title: "Infraestructura de ejecución",
    spec: "EXECUTION RAILS",
    body:
      "Arquitectura operativa preparada para integraciones broker-grade, con flujos de ejecución y liquidez coordinados bajo estándares institucionales.",
    chips: ["Cuentas STP & ECN", "MaM infrastructure", "A-book Liquidity"],
    image: "/Global.png",
    alt: "Global managers and diversified strategies graphic",
  },
];

export function Why() {
  return (
    <section id="why" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-500"
            data-i18n="whyEyebrow"
          >
            Propósito Estratégico
          </p>
          <h2 className="text-3xl font-semibold text-slate-900" data-i18n="whyTitle">
            Por qué existe IGATES
          </h2>
          <p className="text-base text-slate-600 text-justify" data-i18n="whyLead">
            Un puente curado entre capital calificado y gestores privados con historial verificado.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {purposeCards.map((card) => (
            <article key={card.titleKey} className="igates-card grid gap-5">
              <div className="igates-gradient h-[3px] w-full rounded-full" aria-hidden="true" />
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-igates-500">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M10 2.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15Zm3.1 5.65a.75.75 0 0 1 .02 1.06l-3.62 3.72a.75.75 0 0 1-1.07 0L6.9 11.39a.75.75 0 1 1 1.06-1.06l1.12 1.12 3.09-3.17a.75.75 0 0 1 1.06-.02Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[19px] font-semibold text-slate-900" data-i18n={card.titleKey}>
                    {card.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">{card.spec}</p>
                </div>
              </div>
              <p className="text-[15px] text-slate-600" data-i18n={card.bodyKey}>
                {card.body}
              </p>
              <div className="rounded-2xl bg-white p-4">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="h-52 w-full object-contain opacity-90"
                />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-center text-sm text-slate-500 mx-auto">
          IGATES es la capa de verificación y reporting; la ejecución y custodia ocurren vía
          brokers integrados.
        </p>
      </div>
    </section>
  );
}
