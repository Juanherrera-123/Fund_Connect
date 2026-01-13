import Link from "next/link";

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
    title: "Fondo multi-gestor bajo tu mandato",
    description: "Configura mandatos, límites y objetivos en una arquitectura única.",
  },
  {
    title: "Control de riesgo centralizado",
    description: "Monitorea exposición, liquidez y cumplimiento en un solo tablero.",
  },
  {
    title: "Custodia y ejecución institucional",
    description: "Ejecución segregada con custodios y brokers alineados al mandato.",
  },
  {
    title: "Transparencia y trazabilidad total",
    description: "Audita decisiones, flujos y reportes con visibilidad completa.",
  },
];

const diligenceSteps = [
  "Curated diligence of verified managers",
  "Mandate and allocation design",
  "Institutional implementation (segregated accounts, execution)",
  "Continuous oversight and risk monitoring",
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
          <div className="relative z-10 mx-auto grid h-full max-w-6xl gap-10 px-6 pt-24 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-28 lg:pb-16">
            <div className="space-y-6">
              <p
                className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600"
                data-i18n="familyHeroEyebrow"
              >
                Family Offices
              </p>
              <div className="space-y-3">
                <h1
                  className="igates-gradient-text pb-1 text-4xl font-semibold leading-[1.05] md:text-6xl"
                  data-i18n="familyHeroTitle"
                >
                  Institutional Access for Modern Family Offices.
                </h1>
                <p className="text-base text-slate-700 md:text-lg" data-i18n="familyHeroLead">
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
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                    data-i18n="heroMetricsLabel"
                  >
                    Métricas consolidadas
                  </p>
                  <Link
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-igates-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-sm"
                    href="/#plataforma"
                  >
                    <span data-i18n="heroMetricsCta">Ver estadísticas completas</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f1ff] via-[#bcd3ff] to-[#1e3a8a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="max-w-3xl space-y-4 text-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Arquitectura institucional
              </p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Arquitecturas de inversión diseñadas para control total.
              </h2>
              <p className="text-base text-white/80 md:text-lg">
                Crea un fondo de cobertura privado diversificando capital entre gestores verificados,
                con reglas claras de riesgo, custodia y ejecución institucional.
              </p>
            </div>
            <div className="relative mt-12">
              <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-white/40 lg:block" />
              <div className="grid gap-6 lg:grid-cols-4 lg:gap-4">
                {architectureCards.map((card, index) => (
                  <div
                    key={card.title}
                    className="igates-card-frame igates-card-frame--institutional hero-trust-item"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <div className="rounded-2xl border border-white/15 bg-white/15 p-6 text-white shadow-lg shadow-[#0b1f5a]/30 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                        {`0${index + 1}`}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
                      <p className="mt-3 text-sm text-white/80">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">
                Flujo institucional
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                De la diligencia a la asignación, sin fricción.
              </h2>
            </div>
            <ol className="relative mt-10 grid gap-6 lg:grid-cols-4">
              <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 lg:hidden" />
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block" />
              {diligenceSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-igates-500/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-igates-500/30 bg-igates-500/10 text-sm font-semibold text-igates-600">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="igates-institutional-frame">
              <div className="igates-institutional-surface flex flex-col items-start gap-6 px-8 py-10 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                  Diseña tu estructura de inversión institucional.
                </h2>
                <Link
                  className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30"
                  href="/#contact"
                >
                  Solicitar diseño institucional
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
