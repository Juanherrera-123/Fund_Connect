"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { apiBase } from "@/lib/igatesData";
import type { FundSummary } from "@/lib/types";

export function FeaturedFunds() {
  const { strings } = useLanguage();
  const [funds, setFunds] = useState<FundSummary[]>([]);
  const [status, setStatus] = useState<string>(strings.fundsLoading ?? "Loading verified funds...");

  useEffect(() => {
    let isMounted = true;

    const loadFunds = async () => {
      try {
        const response = await fetch(`${apiBase}/funds`);
        if (!response.ok) throw new Error("Request failed");
        const data = (await response.json()) as FundSummary[];
        if (isMounted) {
          setFunds(data);
          setStatus("");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setStatus(strings.fundsLoadError ?? "Unable to load funds.");
        }
      }
    };

    loadFunds();

    return () => {
      isMounted = false;
    };
  }, [strings.fundsLoadError, strings.fundsLoading]);

  if (status && !funds.length) {
    return (
      <div className="fund-grid" id="fundGrid">
        <div className="loading" data-i18n="fundsLoading">
          {status}
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
