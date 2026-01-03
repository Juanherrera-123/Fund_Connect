"use client";

import Link from "next/link";
import { useMemo } from "react";

import KpiCard from "@/components/dashboard/KpiCard";
import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

const iconClass = "h-4 w-4";

export default function FundManagerOverview() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile = useMemo(() => {
    if (!session || session.role !== "Fund Manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const fundSnapshot = useMemo(() => {
    if (!profile) return null;
    const baseFund = profile.fundId
      ? baseVerifiedFunds.find((fund) => fund.id === profile.fundId)
      : null;
    const applicationById = profile.fundId
      ? fundApplications.find((application) => application.id === profile.fundId)
      : null;
    const applicationByManager = fundApplications.find((application) => application.managerId === profile.id);
    const application = applicationById ?? applicationByManager ?? null;

    return {
      name: application?.fundName ?? baseFund?.name ?? "Tu fondo",
      capitalPrepared: application?.aum ?? baseFund?.aum ?? "—",
      monthlyProfit: application?.monthlyProfit ?? application?.yearProfit ?? baseFund?.yearProfit ?? null,
      maxDrawdown: application?.maxDrawdown ?? baseFund?.maxDrawdown ?? null,
      status: application?.status ?? (baseFund ? "verified" : "pending"),
    };
  }, [fundApplications, profile]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Inicia sesión como gestor para ver este panel.
      </div>
    );
  }

  const kpis = [
    {
      label: "Capital preparado",
      value: fundSnapshot?.capitalPrepared ?? "—",
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M4 6h12v9H4z" fill="currentColor" opacity="0.2" />
          <path
            d="M7 6V4h6v2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Profit mensual",
      value:
        fundSnapshot?.monthlyProfit !== null && fundSnapshot?.monthlyProfit !== undefined
          ? `${fundSnapshot.monthlyProfit}%`
          : "—",
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M10 3l7 4v6l-7 4-7-4V7l7-4z" fill="currentColor" opacity="0.25" />
        </svg>
      ),
    },
    {
      label: "Max drawdown",
      value:
        fundSnapshot?.maxDrawdown !== null && fundSnapshot?.maxDrawdown !== undefined
          ? `${fundSnapshot.maxDrawdown}%`
          : "—",
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M4 14.5h12M5 13V7m5 6V5m5 8V9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Overview</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{fundSnapshot?.name}</h2>
            <p className="text-xs text-slate-500">
              Estado actual: {fundSnapshot?.status === "verified" ? "Verificado" : "En revisión"}
            </p>
          </div>
          <Link
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            href="/dashboard/manager/fund-details"
          >
            Actualizar detalles
          </Link>
        </div>
      </section>
    </>
  );
}
