"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

export default function FundManagerMessages() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile = useMemo(() => {
    if (!session || session.role !== "Fund Manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const fundInfo = useMemo(() => {
    if (!profile) return null;
    const baseFund = profile.fundId
      ? baseVerifiedFunds.find((fund) => fund.id === profile.fundId)
      : null;
    const application = fundApplications.find((item) => item.managerId === profile.id);
    return {
      id: application?.id ?? baseFund?.id ?? profile.id,
      title: application?.fundName ?? baseFund?.name ?? "Tu fondo",
      subtitle: application?.strategyLabel ?? baseFund?.strategy ?? "Multi-Strategy",
    };
  }, [fundApplications, profile]);

  if (!profile) {
    return <div className="status-banner">Inicia sesión como gestor para ver este panel.</div>;
  }

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Tu fondo</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {fundInfo ? (
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-xs font-semibold text-slate-900">{fundInfo.title}</p>
                  <p className="text-xs text-slate-500">{fundInfo.subtitle}</p>
                </li>
              ) : (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                  Sin fondo asignado aún.
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Inbox</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                Sin mensajes por ahora.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
