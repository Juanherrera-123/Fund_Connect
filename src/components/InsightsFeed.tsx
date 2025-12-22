"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { apiBase } from "@/lib/igatesData";
import type { Insight } from "@/lib/types";

export function InsightsFeed() {
  const { strings } = useLanguage();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [status, setStatus] = useState<string>(strings.insightsLoading ?? "Loading intelligence feed...");

  useEffect(() => {
    let isMounted = true;

    const loadInsights = async () => {
      try {
        const response = await fetch(`${apiBase}/insights`);
        if (!response.ok) throw new Error("Request failed");
        const data = (await response.json()) as Insight[];
        if (isMounted) {
          setInsights(data);
          setStatus("");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setStatus(strings.insightsLoadError ?? "Unable to load insights.");
        }
      }
    };

    loadInsights();

    return () => {
      isMounted = false;
    };
  }, [strings.insightsLoadError, strings.insightsLoading]);

  if (status && !insights.length) {
    return (
      <div className="insight-list" id="insightList">
        <div className="loading" data-i18n="insightsLoading">
          {status}
        </div>
      </div>
    );
  }

  return (
    <div className="insight-list" id="insightList">
      {insights.map((insight) => (
        <article className="insight-card" key={`${insight.title}-${insight.timestamp}`}>
          <header>
            <span className="insight-title">{insight.title}</span>
            <span className="timestamp">{insight.timestamp}</span>
          </header>
          <p className="small">{insight.summary}</p>
        </article>
      ))}
    </div>
  );
}
