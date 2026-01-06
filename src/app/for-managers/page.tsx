import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ManagerApplyForm } from "@/components/forms/ManagerApplyForm";

const trustItems = [
  { key: "managersHeroTrust1", label: "Allocator coverage across macro, credit, digital assets" },
  { key: "managersHeroTrust2", label: "SOC2-ready data exchange" },
  { key: "managersHeroTrust3", label: "Institutional-grade reporting for LPs" },
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

export default function ForManagersPage() {
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
                data-i18n="managersHeroEyebrow"
              >
                For Managers
              </p>
              <div className="space-y-3">
                <h1
                  className="igates-gradient-text pb-1 text-4xl font-semibold leading-[1.05] md:text-6xl"
                  data-i18n="managersHeroTitle"
                >
                  Purpose-built distribution for elite strategies.
                </h1>
                <p className="text-base text-slate-700 md:text-lg" data-i18n="managersHeroLead">
                  Connect with verified global allocators using IGATES’ institutional infrastructure.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition"
                  href="#apply"
                  data-i18n="managersHeroCta"
                >
                  Apply as a Manager
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                  href="/#contact"
                  data-i18n="managersHeroSecondaryCta"
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="managersBenefitsEyebrow">
                Platform Benefits
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="managersBenefitsTitle">
                Everything you need to scale allocator pipelines.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "⇄", title: "Access curated allocators", body: "Targeted introductions to qualified LPs actively allocating to your strategy class.", titleKey: "managersBenefit1Title", bodyKey: "managersBenefit1Body" },
                { icon: "🔒", title: "Secure data rooms", body: "Permissioned vaults with watermarking and activity visibility for every data room.", titleKey: "managersBenefit2Title", bodyKey: "managersBenefit2Body" },
                { icon: "✔", title: "Compliance workflows", body: "Built-in KYC, KYB, and governance checks keep diligence moving without bottlenecks.", titleKey: "managersBenefit3Title", bodyKey: "managersBenefit3Body" },
                { icon: "📈", title: "Embedded performance intelligence", body: "Automated telemetry streams performance, risk corridors, and factor drift to LPs.", titleKey: "managersBenefit4Title", bodyKey: "managersBenefit4Body" },
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="managersOnboardingEyebrow">
                Onboarding
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="managersOnboardingTitle">
                Institutional distribution in four steps.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { key: "managersStep1", label: "Submit strategy profile" },
                { key: "managersStep2", label: "Verification & compliance" },
                { key: "managersStep3", label: "Data integration & risk mapping" },
                { key: "managersStep4", label: "Go live to allocator marketplace" },
              ].map((item) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-700 shadow-sm"
                  key={item.key}
                  data-i18n={item.key}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" className="py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="managersFormEyebrow">
                Manager Applications
              </p>
              <h2 className="text-2xl font-semibold text-slate-900" data-i18n="managersFormTitle">
                Apply to distribute on IGATES.
              </h2>
              <p className="text-sm text-slate-600" data-i18n="managersFormLead">
                Provide your strategy details and our team will coordinate diligence and onboarding.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    labelKey: "managersFormResponseLabel",
                    label: "Response time",
                    valueKey: "managersFormResponseMetric",
                    value: "< 48 hours",
                  },
                  {
                    labelKey: "managersFormSecurityLabel",
                    label: "Security",
                    valueKey: "managersFormSecurityMetric",
                    value: "Compliance-first",
                  },
                  {
                    labelKey: "managersFormCoverageLabel",
                    label: "Coverage",
                    valueKey: "managersFormCoverageMetric",
                    value: "Global allocators",
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
            <ManagerApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
