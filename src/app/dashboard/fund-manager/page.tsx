"use client";

import { useMemo } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import KpiCard from "@/components/dashboard/KpiCard";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFundsCollection } from "@/lib/funds";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { UserProfile } from "@/lib/types";

const iconClass = "h-4 w-4";

export default function FundManagerDashboard() {
  const fundApplications = useFundsCollection();
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);

  const data = useMemo(() => {
    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedFromApplications = fundApplications.filter(
      (application) => application.status === "approved"
    );
    const managerNameById = new Map(
      profiles.map((profile) => [profile.id, profile.fullName])
    );

    const verifiedFunds = verifiedFromApplications.map((application) => ({
      id: application.id,
      name: application.fundData.fundName,
      manager: managerNameById.get(application.user.id) ?? "Gestor registrado",
      status: "Aprobado",
    }));

    return {
      pendingFunds,
      verifiedFunds,
      managerNameById,
    };
  }, [fundApplications, profiles]);

  const fundKpis = [
    {
          label: "Total funds",
          labelKey: "dashboardKpiTotalFunds",
      value: `${data.pendingFunds.length + data.verifiedFunds.length}`,
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
      label: "Inactive funds",
      labelKey: "dashboardKpiInactiveFunds",
      value: `${data.pendingFunds.length}`,
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M5 5h10v10H5z" fill="currentColor" opacity="0.2" />
          <path
            d="M7 7l6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Active funds",
      labelKey: "dashboardKpiActiveFunds",
      value: `${data.verifiedFunds.length}`,
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path
            d="M10 3l7 4v6l-7 4-7-4V7l7-4z"
            fill="currentColor"
            opacity="0.25"
          />
          <path
            d="M7.5 10.5l1.5 1.5 3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleFunds">
          Funds
        </h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardKeyMetrics">
          Key metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {fundKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardOperationalQueues">
          Operational queues
        </h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <DataTable
            title="Pending fund approvals"
            titleKey="dashboardPendingFundApprovals"
            actionLabel="Review"
            actionLabelKey="dashboardReviewAction"
            columns={[
              { key: "fund", label: "Fund name", labelKey: "dashboardColumnFundName" },
              { key: "owner", label: "Owner", labelKey: "dashboardColumnOwner" },
              { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
            ]}
            rows={data.pendingFunds.map((application) => ({
              id: application.id,
              fund: application.fundData.fundName,
              owner: data.managerNameById.get(application.user.id) ?? "Gestor registrado",
              status: (
                <StatusCell label="Pendiente" labelKey="dashboardStatusPending" tone="warning" />
              ),
            }))}
          />

          <DataTable
            title="Active funds"
            titleKey="dashboardActiveFunds"
            actionLabel="Open"
            actionLabelKey="dashboardOpenAction"
            columns={[
              { key: "fund", label: "Fund name", labelKey: "dashboardColumnFundName" },
              { key: "owner", label: "Owner", labelKey: "dashboardColumnOwner" },
              { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
            ]}
            rows={data.verifiedFunds.map((fund) => ({
              id: fund.id,
              fund: fund.name,
              owner: fund.manager,
              status: (
                <StatusCell label={fund.status} labelKey="dashboardStatusApproved" tone="success" />
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
