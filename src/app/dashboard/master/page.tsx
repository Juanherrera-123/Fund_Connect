"use client";

import { useMemo } from "react";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { STORAGE_KEYS, baseVerifiedFunds, getFundLogoLabel } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, MasterNotification, UserProfile } from "@/lib/types";

const iconClass = "h-4 w-4";

export default function MasterDashboard() {
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [notifications] = useLocalStorage<MasterNotification[]>(STORAGE_KEYS.notifications, []);

  const data = useMemo(() => {
    const verifiedFromApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const pendingFunds = fundApplications.filter((application) => application.status === "pending");
    const verifiedFunds = [
      ...baseVerifiedFunds.map((fund) => ({
        id: fund.id,
        name: fund.name,
        managerId: null,
        country: fund.country,
        aum: fund.aum,
        strategy: fund.strategy,
        logoLabel: fund.logoLabel,
      })),
      ...verifiedFromApplications.map((application) => ({
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
      (profile) => profile.role === "Fund Manager" && profile.fundManagerProfile?.status === "pending-review"
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

  const kpis = [
    {
      label: "Active funds",
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
    statusTone: "warning" as const,
  }));

  const waitlistRows = data.waitlistEntries.map((entry) => ({
    id: entry.id,
    investor: entry.investor,
    fund: entry.fund,
    country: entry.country,
    statusLabel: "Waitlist",
    statusTone: "neutral" as const,
  }));

  const actionRows = data.notifications.map((notification) => ({
    id: notification.id,
    action: notification.title,
    detail: notification.message,
    date: new Date(notification.createdAt).toLocaleDateString("es-ES"),
    statusLabel: "Nuevo",
    statusTone: "neutral" as const,
  }));

  return (
    <DashboardOverview
      title="Master Dashboard"
      kpis={kpis}
      role="MasterUser"
      pendingFundRows={pendingFundRows}
      waitlistRows={waitlistRows}
      actionRows={actionRows}
      activeFundsCount={data.verifiedFunds.length}
      pendingFundsCount={data.pendingFunds.length}
      roleCounts={data.roleCounts}
    />
  );
}
