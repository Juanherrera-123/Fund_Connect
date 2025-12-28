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
      <div className="fund-grid" id="fundGrid">
        <div className="loading" data-i18n="fundsLoading">
          {strings.fundsLoadError ?? "No hay fondos verificados disponibles."}
        </div>
      </div>
    );
  }

  return (
    <div className="fund-grid" id="fundGrid">
      {funds.map((fund) => (
        <article className="fund-card" key={fund.name}>
          <header>
            <div>
              <div className="fund-name">{fund.name}</div>
              <div className="fund-meta">
                <span className="tag">{fund.strategy}</span>
                <span className="tag">{fund.domicile}</span>
              </div>
            </div>
            <span className="badge">{fund.status}</span>
          </header>
          <p className="small">{fund.summary}</p>
          <div className="stat-row">
            <span>AUM</span>
            <strong>{fund.aum}</strong>
          </div>
          <div className="stat-row">
            <span>YTD</span>
            <strong>{fund.performance}</strong>
          </div>
          <div className="stat-row">
            <span>Risk</span>
            <strong>{fund.risk}</strong>
          </div>
          <div className="pill-row">
            {fund.highlights.map((highlight) => (
              <span className="pill" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
