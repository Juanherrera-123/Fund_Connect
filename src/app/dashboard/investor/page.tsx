"use client";

import { useMemo } from "react";

import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, UserProfile } from "@/lib/types";

const breakdownCardClass =
  "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

const getBarHeight = (value: number, max: number) => {
  if (max <= 0) return 8;
  const scaled = Math.round((value / max) * 70);
  return Math.max(8, scaled);
};

export default function InvestorDashboard() {
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const data = useMemo(() => {
    const waitlistEntries = profiles.flatMap((profile) =>
      profile.role === "Investor" && profile.waitlistFunds?.length
        ? profile.waitlistFunds.map((fundName) => ({
            id: `${profile.id}-${fundName}`,
            investor: profile.fullName,
            fund: fundName,
          }))
        : []
    );

    const waitlistInvestors = new Set(waitlistEntries.map((entry) => entry.investor));
    const waitlistFunds = new Set(waitlistEntries.map((entry) => entry.fund));

    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedFunds = fundApplications.filter((application) => application.status === "verified");

    return {
      waitlistEntries,
      waitlistInvestorsCount: waitlistInvestors.size,
      waitlistFundsCount: waitlistFunds.size,
      pendingFunds,
      verifiedFunds,
    };
  }, [fundApplications, profiles]);

  const waitlistMax = Math.max(
    data.waitlistEntries.length,
    data.waitlistInvestorsCount,
    data.waitlistFundsCount,
    1
  );
  const requestMax = Math.max(
    data.pendingFunds.length,
    data.verifiedFunds.length,
    data.pendingFunds.length + data.verifiedFunds.length,
    1
  );

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Requests</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={breakdownCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Waitlist</h3>
                <p className="text-xs text-slate-500">Solicitudes en cola</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {data.waitlistEntries.length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[140px,1fr]">
              <svg viewBox="0 0 140 100" className="h-24 w-full">
                <rect
                  x="12"
                  y={92 - getBarHeight(data.waitlistEntries.length, waitlistMax)}
                  width="24"
                  height={getBarHeight(data.waitlistEntries.length, waitlistMax)}
                  fill="#0f766e"
                />
                <rect
                  x="52"
                  y={92 - getBarHeight(data.waitlistInvestorsCount, waitlistMax)}
                  width="24"
                  height={getBarHeight(data.waitlistInvestorsCount, waitlistMax)}
                  fill="#14b8a6"
                />
                <rect
                  x="92"
                  y={92 - getBarHeight(data.waitlistFundsCount, waitlistMax)}
                  width="24"
                  height={getBarHeight(data.waitlistFundsCount, waitlistMax)}
                  fill="#94a3b8"
                />
              </svg>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Solicitudes totales</span>
                  <span className="font-semibold text-slate-900">
                    {data.waitlistEntries.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Inversionistas con waitlist</span>
                  <span className="font-semibold text-slate-900">
                    {data.waitlistInvestorsCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fondos solicitados</span>
                  <span className="font-semibold text-slate-900">
                    {data.waitlistFundsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={breakdownCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Fund requests</h3>
                <p className="text-xs text-slate-500">Fondos nuevos por aprobar</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {data.pendingFunds.length}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[140px,1fr]">
              <svg viewBox="0 0 140 100" className="h-24 w-full">
                <rect
                  x="12"
                  y={92 - getBarHeight(data.pendingFunds.length, requestMax)}
                  width="24"
                  height={getBarHeight(data.pendingFunds.length, requestMax)}
                  fill="#f97316"
                />
                <rect
                  x="52"
                  y={92 - getBarHeight(data.verifiedFunds.length, requestMax)}
                  width="24"
                  height={getBarHeight(data.verifiedFunds.length, requestMax)}
                  fill="#fdba74"
                />
                <rect
                  x="92"
                  y={92 - getBarHeight(
                    data.pendingFunds.length + data.verifiedFunds.length,
                    requestMax
                  )}
                  width="24"
                  height={getBarHeight(
                    data.pendingFunds.length + data.verifiedFunds.length,
                    requestMax
                  )}
                  fill="#94a3b8"
                />
              </svg>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Pendientes de aprobación</span>
                  <span className="font-semibold text-slate-900">
                    {data.pendingFunds.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Verificados</span>
                  <span className="font-semibold text-slate-900">
                    {data.verifiedFunds.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Totales registrados</span>
                  <span className="font-semibold text-slate-900">
                    {data.pendingFunds.length + data.verifiedFunds.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
