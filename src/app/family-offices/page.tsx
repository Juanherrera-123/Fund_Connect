import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FamilyAccessForm } from "@/components/forms/FamilyAccessForm";

export default function FamilyOfficesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-8">
        <section className="py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="familyHeroEyebrow">
                Family Offices
              </p>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl" data-i18n="familyHeroTitle">
                  Institutional Access for Modern Family Offices.
                </h1>
                <p className="text-sm text-slate-600 md:text-base" data-i18n="familyHeroLead">
                  Simplify manager discovery, diligence, and allocation workflows.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-igates-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                  href="#access"
                  data-i18n="familyHeroCta"
                >
                  Request Access
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2" data-i18n="familyHeroTrust1">
                  Allocator-grade reporting
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2" data-i18n="familyHeroTrust2">
                  Private data workflows
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="familyCardLabel1">
                  Strategies reviewed
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">140+</p>
                <p className="mt-2 text-sm text-slate-600" data-i18n="familyCardCopy1">
                  Cross-asset intelligence tailored to mandate criteria.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="familyCardLabel2">
                  Diligence files
                </p>
                <p className="mt-3 text-3xl font-semibold text-igates-600" data-i18n="familyCardMetric2">
                  Secure
                </p>
                <p className="mt-2 text-sm text-slate-600" data-i18n="familyCardCopy2">
                  Audit-ready archives with automated updates.
                </p>
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
