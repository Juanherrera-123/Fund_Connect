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
      <div className="grid gap-4" id="insightList">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500" data-i18n="insightsLoading">
          {status}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4" id="insightList">
      {insights.map((insight) => (
        <article
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          key={`${insight.title}-${insight.timestamp}`}
        >
          <header className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-slate-900">{insight.title}</span>
            <span className="text-xs text-slate-400">{insight.timestamp}</span>
          </header>
          <p className="mt-3 text-sm text-slate-600">{insight.summary}</p>
        </article>
      ))}
    </div>
  );
}
