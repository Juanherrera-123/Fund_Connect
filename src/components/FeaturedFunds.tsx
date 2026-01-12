"use client";

import { useMemo } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { STORAGE_KEYS, baseVerifiedFunds, formatPercent } from "@/lib/igatesData";
import { getFundFrameClass } from "@/lib/fundVisuals";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, FundSummary } from "@/lib/types";

const DEFAULT_HIGHLIGHT_KEYS = ["fundsHighlight1", "fundsHighlight2", "fundsHighlight3"] as const;

export function FeaturedFunds() {
  const { strings } = useLanguage();
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [capitalAllocations] = useLocalStorage<Record<string, number>>(
    STORAGE_KEYS.capitalAllocations,
    {}
  );
  const defaultHighlights = DEFAULT_HIGHLIGHT_KEYS.map((key) => strings[key]);

  const funds = useMemo<FundSummary[]>(() => {
    const verifiedApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const overridesById = new Map(
      verifiedApplications.map((application) => [
        application.id,
        {
          id: application.id,
          name: application.fundName,
          strategy:
            application.strategyLabel ||
            application.strategy ||
            strings.fundsLabelStrategyFallback,
          domicile: application.country || strings.fundsLabelDomicileFallback,
          status: strings.fundsStatusVerified,
          aum: application.aum || "N/A",
          performance: formatPercent(application.yearProfit ?? application.monthlyProfit ?? null),
          risk: application.riskLevel || application.riskManagement || "—",
          summary: application.description || strings.fundsSummaryDefault,
          highlights: defaultHighlights,
          capital_allocated:
            capitalAllocations[application.id] ?? application.capital_allocated ?? 0,
        },
      ])
    );

    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));

    return [
      ...baseVerifiedFunds.map((fund) => ({
        id: fund.id,
        name: fund.name,
        strategy: fund.strategy,
        domicile: fund.country,
        status: strings.fundsStatusVerified,
        aum: fund.aum,
        performance: formatPercent(fund.yearProfit),
        risk: fund.riskLevel,
        summary: fund.description,
        highlights: defaultHighlights,
        capital_allocated: capitalAllocations[fund.id] ?? fund.capital_allocated ?? 0,
        ...overridesById.get(fund.id),
      })),
      ...verifiedApplications
        .filter((application) => !baseIds.has(application.id))
        .map((application) => ({
          id: application.id,
          name: application.fundName,
          strategy:
            application.strategyLabel ||
            application.strategy ||
            strings.fundsLabelStrategyFallback,
          domicile: application.country || strings.fundsLabelDomicileFallback,
          status: strings.fundsStatusVerified,
          aum: application.aum || "N/A",
          performance: formatPercent(application.yearProfit ?? application.monthlyProfit ?? null),
          risk: application.riskLevel || application.riskManagement || "—",
          summary: application.description || strings.fundsSummaryDefault,
          highlights: defaultHighlights,
          capital_allocated:
            capitalAllocations[application.id] ?? application.capital_allocated ?? 0,
        })),
    ];
  }, [
    capitalAllocations,
    defaultHighlights,
    fundApplications,
    strings.fundsLabelDomicileFallback,
    strings.fundsLabelStrategyFallback,
    strings.fundsStatusVerified,
    strings.fundsSummaryDefault,
  ]);

  if (!funds.length) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="fundGrid">
        <div
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500"
          data-i18n="fundsEmpty"
        >
          {strings.fundsEmpty}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="fundGrid">
      {funds.map((fund) => (
        <article
          className={`igates-card-frame ${getFundFrameClass(fund.capital_allocated)}`}
          key={fund.id}
        >
          <div className="igates-card grid gap-4">
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
                <span data-i18n="fundsLabelAum">AUM</span>
                <strong className="text-slate-900">{fund.aum}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span data-i18n="fundsLabelYtd">YTD</span>
                <strong className="text-slate-900">{fund.performance}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span data-i18n="fundsLabelRisk">Risk</span>
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
          </div>
        </article>
      ))}
    </div>
  );
}
