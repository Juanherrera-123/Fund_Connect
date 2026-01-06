"use client";

import { useMemo } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  baseVerifiedFunds,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, MasterNotification, UserProfile } from "@/lib/types";

const iconClass = "h-4 w-4";

export default function MasterDashboard() {
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [fundApplications, setFundApplications] = useLocalStorage<FundApplication[]>(
    STORAGE_KEYS.fundApplications,
    []
  );
  const [notifications] = useLocalStorage<MasterNotification[]>(STORAGE_KEYS.notifications, []);

  const data = useMemo(() => {
    const verifiedFromApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedById = new Map(
      verifiedFromApplications.map((application) => [
        application.id,
        {
          id: application.id,
          name: application.fundName,
          managerId: application.managerId,
          country: application.country || "Global",
          aum: application.aum || "N/A",
          strategy: application.strategyLabel || application.strategy || "Multi-Strategy",
          logoLabel: getFundLogoLabel(application.fundName),
        },
      ])
    );

    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const verifiedFunds = [
      ...baseVerifiedFunds.map((fund) => {
        const override = verifiedById.get(fund.id);
        return (
          override ?? {
            id: fund.id,
            name: fund.name,
            managerId: null,
            country: fund.country,
            aum: fund.aum,
            strategy: fund.strategy,
            logoLabel: fund.logoLabel,
          }
        );
      }),
      ...verifiedFromApplications
        .filter((application) => !baseIds.has(application.id))
        .map((application) => ({
          id: application.id,
          name: application.fundName,
          managerId: application.managerId,
          country: application.country || "Global",
          aum: application.aum || "N/A",
          strategy: application.strategyLabel || application.strategy || "Multi-Strategy",
          logoLabel: getFundLogoLabel(application.fundName),
        })),
    ];

    const waitlistEntries = profiles.flatMap((profile) =>
      profile.role === "Investor" && profile.waitlistFunds?.length
        ? profile.waitlistFunds.map((fundName) => ({
            id: `${profile.id}-${fundName}`,
            investor: profile.fullName,
            fund: fundName,
            country: profile.country,
          }))
        : []
    );

    const pendingManagers = profiles.filter(
      (profile) =>
        profile.role === "Fund Manager" && profile.fundManagerProfile?.status === "pending-review"
    );

    const managerNameById = new Map(profiles.map((profile) => [profile.id, profile.fullName]));

    const roleCounts = {
      investors: profiles.filter((profile) => profile.role === "Investor").length,
      managers: verifiedFunds.length,
      familyOffices: profiles.filter((profile) => profile.role === "Family Office").length,
    };

    return {
      verifiedFunds,
      pendingFunds,
      waitlistEntries,
      pendingManagers,
      notifications,
      managerNameById,
      roleCounts,
    };
  }, [fundApplications, notifications, profiles]);

  const handleApproveFund = (row: { id: string }) => {
    setFundApplications((prev) =>
      prev.map((application) =>
        application.id === row.id ? { ...application, status: "verified" } : application
      )
    );
  };

  const handleApproveManager = (row: { id: string }) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === row.id
          ? {
              ...profile,
              fundManagerProfile: {
                ...profile.fundManagerProfile,
                status: "verified",
              },
            }
          : profile
      )
    );
  };

  const kpis = [
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
    {
      label: "Funds in review",
      labelKey: "dashboardKpiFundsReview",
      value: `${data.pendingFunds.length}`,
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path
            d="M4 14.5h12M5 13V7m5 6V5m5 8V9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Waitlist requests",
      labelKey: "dashboardKpiWaitlistRequests",
      value: `${data.waitlistEntries.length}`,
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M4 5h12v6H4z" fill="currentColor" opacity="0.2" />
          <path
            d="M6 13h8M6 16h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Pending approvals",
      labelKey: "dashboardKpiPendingApprovals",
      value: `${data.pendingFunds.length + data.pendingManagers.length}`,
      icon: (
        <svg viewBox="0 0 20 20" className={iconClass} aria-hidden>
          <path d="M5 4h10v12H5z" fill="currentColor" opacity="0.2" />
          <path
            d="M7 8h6M7 11h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const pendingFundRows = data.pendingFunds.map((application) => ({
    id: application.id,
    fund: application.fundName,
    manager: data.managerNameById.get(application.managerId) ?? "Gestor registrado",
    submitted: new Date(application.submittedAt).toLocaleDateString("es-ES"),
    statusLabel: "En revisión",
    statusLabelKey: "dashboardStatusInReview",
    statusTone: "warning" as const,
  }));

  const waitlistRows = data.waitlistEntries.map((entry) => ({
    id: entry.id,
    investor: entry.investor,
    fund: entry.fund,
    country: entry.country,
    statusLabel: "Waitlist",
    statusLabelKey: "dashboardStatusWaitlist",
    statusTone: "neutral" as const,
  }));

  const actionRows = data.notifications.map((notification) => ({
    id: notification.id,
    action: notification.title,
    detail: notification.message,
    date: new Date(notification.createdAt).toLocaleDateString("es-ES"),
    statusLabel: "Nuevo",
    statusLabelKey: "dashboardStatusNew",
    statusTone: "neutral" as const,
  }));

  return (
    <>
      <DashboardOverview
        title="Master Dashboard"
        titleKey="dashboardMasterTitle"
        kpis={kpis}
        role="MasterUser"
        pendingFundRows={pendingFundRows}
        waitlistRows={waitlistRows}
        actionRows={actionRows}
        activeFundsCount={data.verifiedFunds.length}
        pendingFundsCount={data.pendingFunds.length}
        roleCounts={data.roleCounts}
        onPendingFundAction={handleApproveFund}
      />
      <section className="flex flex-col gap-4">
        <h2
          className="text-sm font-semibold text-slate-700"
          data-i18n="dashboardPendingManagerApprovals"
        >
          Pending manager approvals
        </h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <DataTable
            title="Fund managers"
            titleKey="dashboardFundManagersTitle"
            actionLabel="Approve"
            actionLabelKey="dashboardApproveAction"
            onAction={handleApproveManager}
            columns={[
              { key: "name", label: "Name", labelKey: "dashboardColumnName" },
              { key: "email", label: "Email", labelKey: "dashboardColumnEmail" },
              { key: "submitted", label: "Submitted", labelKey: "dashboardColumnSubmitted" },
              { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
            ]}
            rows={data.pendingManagers.map((profile) => ({
              id: profile.id,
              name: profile.fullName,
              email: profile.email,
              submitted: (profile.onboarding as { completedAt?: string })?.completedAt
                ? new Date(
                    String((profile.onboarding as { completedAt?: string }).completedAt)
                  ).toLocaleDateString("es-ES")
                : "—",
              status: <StatusCell label="En revisión" labelKey="dashboardStatusInReview" tone="warning" />,
            }))}
          />
        </div>
      </section>
    </>
  );
}
