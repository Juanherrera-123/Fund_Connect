import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FamilyAccessForm } from "@/components/forms/FamilyAccessForm";

const trustItems = [
  { key: "familyHeroTrust1", label: "Allocator-grade reporting" },
  { key: "familyHeroTrust2", label: "Private data workflows" },
  { key: "familyHeroTrust3", label: "Diligence workflows in one workspace" },
];

const performanceItems = [
  { labelKey: "heroVolatilityLabel", label: "Volatilidad", value: "12.4%" },
  { labelKey: "heroMaxDrawdownLabel", label: "Máx. caída", value: "-3.1%", negative: true },
  {
    labelKey: "heroRiskLabel",
    label: "Riesgo",
    valueKey: "heroRiskLevel",
    value: "Medio-Bajo",
    badge: true,
  },
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
              <div className="flex flex-wrap gap-4">
                <Link
                  className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition"
                  href="#access"
                  data-i18n="familyHeroCta"
                >
                  Request Access
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                  href="/#contact"
                  data-i18n="familyHeroSecondaryCta"
                >
                  Talk to the IGATES team
                </Link>
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
              <div className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.82)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="uppercase tracking-[0.2em] text-slate-500"
                    data-i18n="heroPerformanceLabel"
                  >
                    Rendimiento YTD
                  </span>
                  <span className="text-base font-semibold text-emerald-500">+14.8%</span>
                </div>
                <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-igates-500/10 via-igates-400/10 to-transparent" />
              </div>
              <div className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.82)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
                <div className="space-y-2 text-xs">
                  {performanceItems.map((item) => (
                    <div key={item.labelKey} className="flex items-center justify-between">
                      <span className="text-slate-500" data-i18n={item.labelKey}>
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span
                          className="rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-600"
                          data-i18n={item.valueKey}
                        >
                          {item.value}
                        </span>
                      ) : (
                        <span className={item.negative ? "text-rose-500" : "text-slate-700"}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.82)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500" data-i18n="heroAumLabel">
                  AUM verificado
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">$212M</div>
                <p className="mt-1 text-xs text-slate-500" data-i18n="heroManagersLabel">
                  Con 10 gestores
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.82)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
                <div className="absolute inset-0 opacity-20">
                  <div className="grid h-full w-full grid-cols-4 gap-2 p-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-full rounded-xl bg-gradient-to-t from-igates-500/20 to-transparent"
                      />
                    ))}
                  </div>
                </div>
                <div className="relative flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-600" data-i18n="heroMetricsLabel">
                    Métricas consolidadas
                  </p>
                  <button className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition">
                    <span data-i18n="heroMetricsCta">Ver estadísticas completas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="familyWhyEyebrow">
                Why IGATES
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="familyWhyTitle">
                Operational clarity for investment principals.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "📡", title: "Verified data streams", body: "Custodian, admin, and auditor-aligned reporting you can trust.", titleKey: "familyWhy1Title", bodyKey: "familyWhy1Body" },
                { icon: "🧾", title: "Audit-ready reporting", body: "IC-ready packages with complete attribution and variance breakdowns.", titleKey: "familyWhy2Title", bodyKey: "familyWhy2Body" },
                { icon: "⭐", title: "Consolidated manager reviews", body: "Side-by-side diligence trackers, notes, and signals in one workspace.", titleKey: "familyWhy3Title", bodyKey: "familyWhy3Body" },
                { icon: "🛡", title: "Risk corridor analytics", body: "Scenario-aware bands so allocations stay inside mandate corridors.", titleKey: "familyWhy4Title", bodyKey: "familyWhy4Body" },
              ].map((item) => (
                <article className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={item.titleKey}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-igates-500/20 bg-igates-500/10 text-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900" data-i18n={item.titleKey}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600" data-i18n={item.bodyKey}>
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="familyCuratedEyebrow">
                Curated Mandates
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="familyCuratedTitle">
                Allocator-first views into leading strategies.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "🌐", title: "Macro", body: "Global macro managers with disciplined risk corridors.", titleKey: "familyMandate1", bodyKey: "familyMandate1Body" },
                { icon: "💳", title: "Credit", body: "Event-driven and structured credit insights with live exposure checks.", titleKey: "familyMandate2", bodyKey: "familyMandate2Body" },
                { icon: "💠", title: "Digital Assets", body: "On-chain transparency with institutional-grade custody signals.", titleKey: "familyMandate3", bodyKey: "familyMandate3Body" },
                { icon: "📊", title: "Systematic Strategies", body: "Factor-aware systems with monitored model drift and capacity.", titleKey: "familyMandate4", bodyKey: "familyMandate4Body" },
              ].map((item) => (
                <article className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={item.titleKey}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-igates-500/20 bg-igates-500/10 text-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900" data-i18n={item.titleKey}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600" data-i18n={item.bodyKey}>
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="familyFormEyebrow">
                Access Requests
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="familyFormTitle">
                Request allocator access.
              </h2>
              <p className="text-sm text-slate-600" data-i18n="familyFormLead">
                Tell us about your mandate, and we will provision secure access to managers.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    labelKey: "familyFormResponseLabel",
                    label: "Response time",
                    valueKey: "familyFormResponseMetric",
                    value: "< 24 hours",
                  },
                  {
                    labelKey: "familyFormSecurityLabel",
                    label: "Security",
                    valueKey: "familyFormSecurityMetric",
                    value: "Compliance-first",
                  },
                  {
                    labelKey: "familyFormCoverageLabel",
                    label: "Coverage",
                    valueKey: "familyFormCoverageMetric",
                    value: "Global managers",
                  },
                ].map((item) => (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={item.labelKey}>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n={item.labelKey}>
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900" data-i18n={item.valueKey}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <FamilyAccessForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
