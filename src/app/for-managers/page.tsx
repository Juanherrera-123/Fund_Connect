import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ManagerApplyForm } from "@/components/forms/ManagerApplyForm";

export default function ForManagersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-8">
        <section className="py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="managersHeroEyebrow">
                For Managers
              </p>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl" data-i18n="managersHeroTitle">
                  Purpose-built distribution for elite strategies.
                </h1>
                <p className="text-sm text-slate-600 md:text-base" data-i18n="managersHeroLead">
                  Connect with verified global allocators using IGATES’ institutional infrastructure.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-igates-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                  href="#apply"
                  data-i18n="managersHeroCta"
                >
                  Apply as a Manager
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2" data-i18n="managersHeroTrust1">
                  Allocator coverage across macro, credit, digital assets
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2" data-i18n="managersHeroTrust2">
                  SOC2-ready data exchange
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="managersCardLabel1">
                  Live mandates
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">32</p>
                <p className="mt-2 text-sm text-slate-600" data-i18n="managersCardCopy1">
                  Qualified allocators seeking differentiated strategies.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="managersCardLabel2">
                  Avg. review time
                </p>
                <p className="mt-3 text-3xl font-semibold text-igates-600">&lt; 72h</p>
                <p className="mt-2 text-sm text-slate-600" data-i18n="managersCardCopy2">
                  Automated compliance cuts through admin drag.
                </p>
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
