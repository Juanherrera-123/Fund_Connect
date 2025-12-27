"use client";

import { useEffect, useMemo, useState } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, apiBase, STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundSummary, Session, UserProfile } from "@/lib/types";

export function FundsExploreGrid() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [funds, setFunds] = useState<FundSummary[]>([]);
  const [status, setStatus] = useState("Cargando fondos...");

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
          setStatus("No se pudieron cargar los fondos.");
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
    return <div className="status-banner">Inicia sesión como inversionista para ver los fondos.</div>;
  }

  if (status && !funds.length) {
    return <div className="loading">{status}</div>;
  }

  return (
    <div className="fund-grid">
      {funds.map((fund) => {
        const isWaitlisted = profile.waitlistFunds?.includes(fund.name);
        return (
          <div className="fund-card" key={fund.name}>
            <div className="fund-card__header">
              <div>
                <p className="fund-card__name">{fund.name}</p>
                <div className="fund-card__meta">
                  <span className="badge">{fund.strategy}</span>
                  <span className="badge">{fund.domicile}</span>
                </div>
              </div>
              <span className="badge">{fund.status}</span>
            </div>
            <p className="fund-card__description">{fund.summary}</p>
            <div className="fund-card__tags">
              <span className="tag subtle">AUM {fund.aum}</span>
              <span className="tag subtle">{fund.performance}</span>
            </div>
            <div className="profile-actions">
              <button className="btn btn-primary" type="button" onClick={() => toggleWaitlist(fund.name)}>
                {isWaitlisted ? "En waitlist" : "Unirse a waitlist"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
