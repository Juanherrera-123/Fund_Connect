import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const trustItems = [
  { key: "familyHeroTrust1", label: "Allocator-grade reporting" },
  { key: "familyHeroTrust2", label: "Private data workflows" },
  { key: "familyHeroTrust3", label: "Diligence workflows in one workspace" },
];

const heroMetrics = [
  {
    labelKey: "heroMetricInstrumentsLabel",
    label: "Instrumentos",
    value: "+2,200",
  },
  {
    labelKey: "heroMetricTotalAumLabel",
    label: "Total AUM",
    value: "$200M",
    subLabelKey: "heroMetricManagersLabel",
    subLabel: "Con 6 gestores",
  },
  {
    labelKey: "heroMetricTrackRecordLabel",
    label: "Track Record",
    valueKey: "heroMetricTrackRecordValue",
    value: "+60% anual",
  },
  {
    labelKey: "heroMetricMaxDrawdownLabel",
    label: "Max Drawdown",
    value: "6%",
  },
];

const architectureCards = [
  {
    titleKey: "familyArchitectureCard1Title",
    title: "Fondo multi-gestor bajo mandato",
    descriptionKey: "familyArchitectureCard1Body",
    description:
      "Construye una estructura diversificada combinando múltiples fondos verificados bajo un único mandato de inversión.",
    meta: [
      { key: "familyArchitectureCard1Meta1", label: "Mandato configurable" },
      { key: "familyArchitectureCard1Meta2", label: "Asignación flexible" },
    ],
  },
  {
    titleKey: "familyArchitectureCard2Title",
    title: "Control de riesgo centralizado",
    descriptionKey: "familyArchitectureCard2Body",
    description:
      "Supervisa exposición, drawdown y límites agregados desde una sola vista, sin perder visibilidad por gestor.",
    meta: [
      { key: "familyArchitectureCard2Meta1", label: "Riesgo agregado" },
      { key: "familyArchitectureCard2Meta2", label: "Límites por mandato" },
    ],
  },
  {
    titleKey: "familyArchitectureCard3Title",
    title: "Custodia y ejecución institucional",
    descriptionKey: "familyArchitectureCard3Body",
    description:
      "Capital siempre bajo custodia del broker, con ejecución A-book y segregación total. IGATES nunca toca los fondos.",
    meta: [
      { key: "familyArchitectureCard3Meta1", label: "Cuentas segregadas" },
      { key: "familyArchitectureCard3Meta2", label: "Brokers Prime / A-book" },
    ],
  },
  {
    titleKey: "familyArchitectureCard4Title",
    title: "Transparencia y trazabilidad total",
    descriptionKey: "familyArchitectureCard4Body",
    description:
      "Audita decisiones, flujos y performance con reporting verificable, listo para comité e inversionistas.",
    meta: [
      { key: "familyArchitectureCard4Meta1", label: "Reporting institucional" },
      { key: "familyArchitectureCard4Meta2", label: "Auditoría continua" },
    ],
  },
];

const diligenceSteps = [
  { key: "familyFlowStep1", label: "Curated diligence of verified managers" },
  { key: "familyFlowStep2", label: "Mandate and allocation design" },
  { key: "familyFlowStep3", label: "Institutional implementation (segregated accounts, execution)" },
  { key: "familyFlowStep4", label: "Continuous oversight and risk monitoring" },
];

export default function FamilyOfficesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section
          id="hero"
          className="relative z-0 flex min-h-screen items-center overflow-hidden bg-[url('/worldmap-Igates.png')] bg-cover bg-center text-slate-900"
        >
          <div className="absolute inset-0 z-0">
            <video
              className="h-full w-full scale-105 object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{
                filter: "saturate(92%) contrast(96%) brightness(102%)",
              }}
            >
              <source src="/background-hero-animation.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(235, 242, 255, 0.55) 0%, rgba(240, 246, 255, 0.38) 45%, rgba(255, 255, 255, 0.12) 100%)",
              backdropFilter: "blur(6px) saturate(105%)",
              WebkitBackdropFilter: "blur(6px) saturate(105%)",
            }}
          />
          <div className="relative z-10 mx-auto grid h-full max-w-6xl gap-10 px-4 pt-24 pb-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-28 lg:pb-16">
            <div className="space-y-6">
              <p
                className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600"
                data-i18n="familyHeroEyebrow"
              >
                Family Offices
              </p>
              <div className="space-y-3">
                <h1
                  className="igates-gradient-text break-words pb-1 text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl"
                  data-i18n="familyHeroTitle"
                >
                  Institutional Access for Modern Family Offices.
                </h1>
                <p className="text-base text-slate-700 sm:text-lg" data-i18n="familyHeroLead">
                  Simplify manager discovery, diligence, and allocation workflows.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                {trustItems.map((item) => (
                  <span key={item.key} className="rounded-full border border-slate-200/80 px-4 py-2">
                    <span data-i18n={item.key}>{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.8)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
                <div className="grid grid-cols-2 gap-3">
                  {heroMetrics.map((metric) => (
                    <div
                      key={metric.labelKey}
                      className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.8)] p-3 shadow-sm"
                    >
                      <div
                        className="text-xl font-semibold text-igates-600"
                        data-i18n={metric.valueKey}
                      >
                        {metric.value}
                      </div>
                      <p className="text-xs text-slate-500" data-i18n={metric.labelKey}>
                        {metric.label}
                      </p>
                      {metric.subLabel ? (
                        <p className="text-[11px] text-slate-400" data-i18n={metric.subLabelKey}>
                          {metric.subLabel}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
                <p
                  className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                  data-i18n="heroMetricsLabel"
                >
                  Métricas consolidadas
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <h2
                className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl"
                data-i18n="familyArchitectureTitle"
              >
                Arquitecturas de inversión multi-gestor bajo tu control
              </h2>
              <p className="text-base text-slate-600 sm:text-lg" data-i18n="familyArchitectureLead">
                Diseña un fondo de cobertura privado diversificando capital entre gestores verificados,
                con reglas claras de riesgo, custodia y ejecución institucional.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {architectureCards.map((card) => (
                <div key={card.titleKey} className="igates-card-frame igates-card-frame--institutional">
                  <div className="igates-card flex h-full flex-col gap-4 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-igates-500/10">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900" data-i18n={card.titleKey}>
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600" data-i18n={card.descriptionKey}>
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      {card.meta.map((item) => (
                        <span
                          key={item.key}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1"
                          data-i18n={item.key}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500"
                data-i18n="familyFlowEyebrow"
              >
                Flujo institucional
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                <span data-i18n="familyFlowTitle">De la diligencia a la asignación, sin fricción.</span>
              </h2>
            </div>
            <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 lg:hidden" />
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block" />
              {diligenceSteps.map((step, index) => (
                <li
                  key={step.key}
                  className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-igates-500/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-igates-500/30 bg-igates-500/10 text-sm font-semibold text-igates-600">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-600" data-i18n={step.key}>
                    {step.label}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <div className="igates-institutional-frame">
              <div className="igates-institutional-surface flex flex-col items-start gap-6 px-8 py-10">
                <h2
                  className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl"
                  data-i18n="familyCtaTitle"
                >
                  Diseña tu estructura de inversión institucional.
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
