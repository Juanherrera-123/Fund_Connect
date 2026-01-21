"use client";

import { useMemo } from "react";

import ChartCard from "@/components/dashboard/ChartCard";
import { useFundsCollection } from "@/lib/funds";
import { useUserProfiles } from "@/lib/useUserProfiles";

const lineLegend = [
  { label: "Active funds", labelKey: "dashboardLegendActiveFunds", color: "bg-emerald-500" },
  { label: "Funds in review", labelKey: "dashboardLegendFundsReview", color: "bg-slate-400" },
];

const donutLegend = [
  { label: "Managers", labelKey: "dashboardLegendManagers", color: "bg-amber-400" },
];

export default function MasterAnalyticsPage() {
  const fundApplications = useFundsCollection();
  const [profiles] = useUserProfiles({ isMaster: true });

  const analytics = useMemo(() => {
    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedFromApplications = fundApplications.filter(
      (application) => application.status === "approved"
    );
    const verifiedCount = verifiedFromApplications.length;

    return {
      activeFundsCount: verifiedCount,
      pendingFundsCount: pendingFunds.length,
      roleCounts: {
        managers: profiles.filter((profile) => profile.role === "Fund Manager").length,
      },
    };
  }, [fundApplications, profiles]);

  const maxLineValue = Math.max(analytics.activeFundsCount, analytics.pendingFundsCount, 1);
  const lineY = (value: number) => 100 - Math.round((value / maxLineValue) * 70);
  const activeLineY = lineY(analytics.activeFundsCount);
  const pendingLineY = lineY(analytics.pendingFundsCount);
  const activePoints = `10,${activeLineY} 60,${activeLineY} 110,${activeLineY} 160,${activeLineY} 210,${activeLineY} 250,${activeLineY}`;
  const pendingPoints = `10,${pendingLineY} 60,${pendingLineY} 110,${pendingLineY} 160,${pendingLineY} 210,${pendingLineY} 250,${pendingLineY}`;

  const totalRoles = analytics.roleCounts.managers || 1;
  const managerArc = Math.round((analytics.roleCounts.managers / totalRoles) * 250);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleAnalytics">
          Analytics
        </h1>
        <p className="text-sm text-slate-600">
          Visualiza la evolución de fondos y la distribución de usuarios en la plataforma.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Fund pipeline" titleKey="dashboardFundPipeline" legend={lineLegend}>
          <svg viewBox="0 0 260 120" className="h-32 w-full">
            <polyline
              points={activePoints}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <polyline
              points={pendingPoints}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </ChartCard>

        <ChartCard title="Users per role" titleKey="dashboardUsersPerRole" legend={donutLegend}>
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            <g>
              <title>{`Managers: ${analytics.roleCounts.managers}`}</title>
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#fbbf24"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${managerArc} 250`}
              />
            </g>
          </svg>
        </ChartCard>
      </section>
    </>
  );
}
