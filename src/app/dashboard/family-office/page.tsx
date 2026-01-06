"use client";

import { useMemo } from "react";

import ChartCard from "@/components/dashboard/ChartCard";
import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, UserProfile } from "@/lib/types";

const requestsLegend = [
  { label: "Waitlist", labelKey: "dashboardWaitlist", color: "bg-amber-400" },
  { label: "Fund requests", labelKey: "dashboardFundRequests", color: "bg-emerald-500" },
];

const usersLegend = [
  { label: "Active users", labelKey: "dashboardActiveUsers", color: "bg-emerald-500" },
  { label: "Pending managers", labelKey: "dashboardPendingManagers", color: "bg-slate-400" },
];

const coverageLegend = [
  { label: "Verified funds", labelKey: "dashboardVerifiedFunds", color: "bg-emerald-500" },
  { label: "Funds in review", labelKey: "dashboardFundsReview", color: "bg-slate-400" },
];

const fundsLegend = [
  { label: "Active funds", labelKey: "dashboardLegendActiveFunds", color: "bg-emerald-500" },
  { label: "Pending funds", labelKey: "dashboardPendingFunds", color: "bg-amber-400" },
];

const getBarHeight = (value: number, max: number) => {
  if (max <= 0) return 8;
  const scaled = Math.round((value / max) * 70);
  return Math.max(8, scaled);
};

export default function FamilyOfficeDashboard() {
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const data = useMemo(() => {
    const waitlistEntries = profiles.flatMap((profile) =>
      profile.role === "Investor" && profile.waitlistFunds?.length
        ? profile.waitlistFunds.map((fund) => ({ id: `${profile.id}-${fund}` }))
        : []
    );
    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedFromApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const verifiedFundsCount =
      baseVerifiedFunds.length +
      verifiedFromApplications.filter((application) => !baseIds.has(application.id)).length;
    const pendingManagers = profiles.filter(
      (profile) => profile.role === "Fund Manager" && profile.fundManagerProfile?.status === "pending-review"
    );

    return {
      waitlistCount: waitlistEntries.length,
      pendingFundsCount: pendingFunds.length,
      verifiedFundsCount,
      pendingManagersCount: pendingManagers.length,
      activeUsersCount: profiles.length,
    };
  }, [fundApplications, profiles]);

  const requestsMax = Math.max(data.waitlistCount, data.pendingFundsCount, 1);
  const usersMax = Math.max(data.activeUsersCount, data.pendingManagersCount, 1);
  const fundsMax = Math.max(data.verifiedFundsCount, data.pendingFundsCount, 1);

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
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700" data-i18n="dashboardAnalytics">
          Analytics
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Requests" titleKey="dashboardRequests" legend={requestsLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect
                x="20"
                y={100 - getBarHeight(data.waitlistCount, requestsMax)}
                width="50"
                height={getBarHeight(data.waitlistCount, requestsMax)}
                fill="#fbbf24"
              />
              <rect
                x="100"
                y={100 - getBarHeight(data.pendingFundsCount, requestsMax)}
                width="50"
                height={getBarHeight(data.pendingFundsCount, requestsMax)}
                fill="#10b981"
              />
            </svg>
          </ChartCard>

          <ChartCard title="Users" titleKey="dashboardUsers" legend={usersLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect
                x="30"
                y={100 - getBarHeight(data.activeUsersCount, usersMax)}
                width="60"
                height={getBarHeight(data.activeUsersCount, usersMax)}
                fill="#10b981"
              />
              <rect
                x="130"
                y={100 - getBarHeight(data.pendingManagersCount, usersMax)}
                width="60"
                height={getBarHeight(data.pendingManagersCount, usersMax)}
                fill="#94a3b8"
              />
            </svg>
          </ChartCard>

          <ChartCard title="Fund coverage" titleKey="dashboardFundCoverage" legend={coverageLegend}>
            <svg viewBox="0 0 240 120" className="h-32 w-full">
              <rect
                x="30"
                y={100 - getBarHeight(data.verifiedFundsCount, fundsMax)}
                width="60"
                height={getBarHeight(data.verifiedFundsCount, fundsMax)}
                fill="#10b981"
              />
              <rect
                x="130"
                y={100 - getBarHeight(data.pendingFundsCount, fundsMax)}
                width="60"
                height={getBarHeight(data.pendingFundsCount, fundsMax)}
                fill="#94a3b8"
              />
            </svg>
          </ChartCard>

          <ChartCard title="Active funds" titleKey="dashboardActiveFunds" legend={fundsLegend}>
            <svg viewBox="0 0 120 120" className="h-32 w-32">
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${Math.round((data.verifiedFundsCount / fundsMax) * 250)} 250`}
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#fbbf24"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${Math.round((data.pendingFundsCount / fundsMax) * 250)} 250`}
                strokeDashoffset={`-${Math.round((data.verifiedFundsCount / fundsMax) * 250)}`}
              />
            </svg>
          </ChartCard>
        </div>
      </section>
    </>
  );
}
