"use client";

import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { DEFAULT_FUND_MANAGER_PROFILES, apiBase, STORAGE_KEYS } from "@/lib/igatesData";
import { getFundFrameClass } from "@/lib/fundVisuals";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundSummary, Session, UserProfile } from "@/lib/types";

export function FundsExploreGrid() {
  const { strings } = useLanguage();
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [capitalAllocations] = useLocalStorage<Record<string, number>>(
    STORAGE_KEYS.capitalAllocations,
    {}
  );
  const [funds, setFunds] = useState<FundSummary[]>([]);
  const [status, setStatus] = useState(strings.fundsExploreLoading);

  const profile = useMemo(() => {
    if (!session || session.role !== "Investor") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  useEffect(() => {
    if (!profile) return;
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
          setStatus(strings.fundsExploreLoadError);
        }
      }
    };

    loadFunds();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  const toggleWaitlist = (fundName: string) => {
    if (!profile) return;
    const waitlist = new Set(profile.waitlistFunds || []);
    if (waitlist.has(fundName)) {
      waitlist.delete(fundName);
    } else {
      waitlist.add(fundName);
    }
    const updatedProfile = { ...profile, waitlistFunds: Array.from(waitlist) };
    setProfiles((prev) => prev.map((item) => (item.id === updatedProfile.id ? updatedProfile : item)));
  };

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="fundsExploreLoginPrompt">
          Inicia sesión como inversionista para ver los fondos.
        </span>
      </div>
    );
  }

  if (status && !funds.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        {status}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {funds.map((fund) => {
        const isWaitlisted = profile.waitlistFunds?.includes(fund.name);
        const capitalAllocated = capitalAllocations[fund.id] ?? fund.capital_allocated ?? 0;
        return (
          <div
            className={`igates-card-frame ${getFundFrameClass(capitalAllocated)}`}
            key={fund.id}
          >
            <div className="igates-card grid gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{fund.name}</p>
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
              </div>
              <p className="text-sm text-slate-600">{fund.summary}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  <span data-i18n="fundsExploreAumLabel">AUM</span> {fund.aum}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {fund.performance}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                  type="button"
                  onClick={() => toggleWaitlist(fund.name)}
                >
                  {isWaitlisted ? strings.fundsExploreWaitlisted : strings.fundsExploreJoinWaitlist}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
