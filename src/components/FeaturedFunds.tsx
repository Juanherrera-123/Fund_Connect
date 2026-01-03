"use client";

import { useMemo } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { STORAGE_KEYS, baseVerifiedFunds, formatPercent } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, FundSummary } from "@/lib/types";

const DEFAULT_HIGHLIGHTS = ["Verified track record", "Monthly reporting", "Due diligence ready"];

export function FeaturedFunds() {
  const { strings } = useLanguage();
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const funds = useMemo<FundSummary[]>(() => {
    const verifiedApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const overridesById = new Map(
      verifiedApplications.map((application) => [
        application.id,
        {
          name: application.fundName,
          strategy: application.strategyLabel || application.strategy || "Multi-Strategy",
          domicile: application.country || "Global",
          status: "Verificado",
          aum: application.aum || "N/A",
          performance: formatPercent(application.yearProfit ?? application.monthlyProfit ?? null),
          risk: application.riskLevel || application.riskManagement || "—",
          summary: application.description || "Gestor en proceso de verificación.",
          highlights: DEFAULT_HIGHLIGHTS,
        },
      ])
    );

    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));

    return [
      ...baseVerifiedFunds.map((fund) => ({
        name: fund.name,
        strategy: fund.strategy,
        domicile: fund.country,
        status: "Verificado",
        aum: fund.aum,
        performance: formatPercent(fund.yearProfit),
        risk: fund.riskLevel,
        summary: fund.description,
        highlights: DEFAULT_HIGHLIGHTS,
        ...overridesById.get(fund.id),
      })),
      ...verifiedApplications
        .filter((application) => !baseIds.has(application.id))
        .map((application) => ({
          name: application.fundName,
          strategy: application.strategyLabel || application.strategy || "Multi-Strategy",
          domicile: application.country || "Global",
          status: "Verificado",
          aum: application.aum || "N/A",
          performance: formatPercent(application.yearProfit ?? application.monthlyProfit ?? null),
          risk: application.riskLevel || application.riskManagement || "—",
          summary: application.description || "Gestor en proceso de verificación.",
          highlights: DEFAULT_HIGHLIGHTS,
        })),
    ];
  }, [fundApplications]);

  if (!funds.length) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="fundGrid">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500" data-i18n="fundsLoading">
          {strings.fundsLoadError ?? "No hay fondos verificados disponibles."}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="fundGrid">
      {funds.map((fund) => (
        <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" key={fund.name}>
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="text-lg font-semibold text-slate-900">{fund.name}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold text-igates-700">
                  {fund.strategy}
                </span>
                <span className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold text-igates-700">
                  {fund.domicile}
                </span>
              </div>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {fund.status}
            </span>
          </header>
          <p className="text-sm text-slate-600">{fund.summary}</p>
          <div className="grid gap-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>AUM</span>
              <strong className="text-slate-900">{fund.aum}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>YTD</span>
              <strong className="text-slate-900">{fund.performance}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Risk</span>
              <strong className="text-slate-900">{fund.risk}</strong>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {fund.highlights.map((highlight) => (
              <span
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                key={highlight}
              >
                {highlight}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
