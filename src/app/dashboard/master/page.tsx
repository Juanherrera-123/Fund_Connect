"use client";

import { useMemo, useState } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  baseVerifiedFunds,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type {
  FundApplication,
  MasterNotification,
  Session,
  UserProfile,
  WaitlistRequest,
  WaitlistStatus,
} from "@/lib/types";

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
  const [waitlistRequests, setWaitlistRequests] = useLocalStorage<WaitlistRequest[]>(
    STORAGE_KEYS.waitlistRequests,
    []
  );
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [activeWaitlistTab, setActiveWaitlistTab] = useState<WaitlistStatus>("PENDING");
  const [waitlistMessage, setWaitlistMessage] = useState("");

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

    const requesterNameById = new Map(
      profiles.map((profile) => [profile.id, profile.fullName])
    );

    const waitlistEntries = waitlistRequests.map((request) => ({
      id: request.id,
      investor: requesterNameById.get(request.requesterId) ?? "—",
      fund: request.fundName,
      country: request.requesterCountry ?? "—",
      status: request.status,
    }));

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
      waitlistRequests,
      pendingManagers,
      notifications,
      managerNameById,
      requesterNameById,
      roleCounts,
    };
  }, [fundApplications, notifications, profiles, waitlistRequests]);

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

  const handleWaitlistDecision = async (
    request: WaitlistRequest,
    nextStatus: WaitlistStatus
  ) => {
    const now = new Date().toISOString();
    const reviewerId = session?.id ?? session?.username ?? "master";
    const requesterName = data.requesterNameById.get(request.requesterId) ?? "User";
    setWaitlistRequests((prev) =>
      prev.map((item) =>
        item.id === request.id
          ? {
              ...item,
              status: nextStatus,
              approvedBy: nextStatus === "PENDING" ? null : reviewerId,
              approvedAt: nextStatus === "PENDING" ? null : now,
              decisionNote: item.decisionNote ?? null,
            }
          : item
      )
    );

    try {
      const endpoint =
        nextStatus === "APPROVED"
          ? `/api/admin/waitlist/${request.id}/approve`
          : `/api/admin/waitlist/${request.id}/reject`;
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": reviewerId,
          "x-user-role": session?.role ?? "MasterUser",
        },
        body: JSON.stringify({
          decisionNote: request.decisionNote ?? null,
        }),
      });
      setWaitlistMessage(
        nextStatus === "APPROVED"
          ? `Approved ${requesterName}'s waitlist request.`
          : `Rejected ${requesterName}'s waitlist request.`
      );
    } catch (error) {
      console.error(error);
      setWaitlistMessage("Unable to send the waitlist email notification.");
    }
  };

  const filteredWaitlist = data.waitlistRequests.filter(
    (request) => request.status === activeWaitlistTab
  );

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

  const statusConfig: Record<
    WaitlistStatus,
    { label: string; tone: "neutral" | "success" | "danger" }
  > = {
    PENDING: { label: "Pending", tone: "neutral" },
    APPROVED: { label: "Approved", tone: "success" },
    REJECTED: { label: "Rejected", tone: "danger" },
  };

  const waitlistRows = data.waitlistEntries
    .filter((entry) => entry.status === "PENDING")
    .map((entry) => ({
      id: entry.id,
      investor: entry.investor,
      fund: entry.fund,
      country: entry.country,
      statusLabel: statusConfig.PENDING.label,
      statusTone: statusConfig.PENDING.tone,
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Waitlist review queue</h2>
            <p className="text-xs text-slate-500">Approve or reject pending allocation requests.</p>
          </div>
          <div className="flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-600">
            {(["PENDING", "APPROVED", "REJECTED"] as WaitlistStatus[]).map((status) => (
              <button
                key={status}
                type="button"
                className={`rounded-full px-4 py-1.5 transition ${
                  activeWaitlistTab === status ? "bg-slate-900 text-white" : "text-slate-600"
                }`}
                onClick={() => setActiveWaitlistTab(status)}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {waitlistMessage ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {waitlistMessage}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2">Fund</th>
                <th className="px-4 py-2">User / Org</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaitlist.length ? (
                filteredWaitlist.map((request) => {
                  const config = statusConfig[request.status];
                  return (
                    <tr key={request.id} className="text-slate-700">
                      <td className="px-4 py-2">
                        <span className="font-semibold text-slate-900">{request.fundName}</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="grid gap-1">
                          <span className="font-semibold text-slate-900">
                            {data.requesterNameById.get(request.requesterId) ?? "—"}
                          </span>
                          <span className="text-[0.7rem] text-slate-500">
                            {request.requesterOrg ?? "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 capitalize">
                        {request.requesterRole.replace("_", " ").toLowerCase()}
                      </td>
                      <td className="px-4 py-2">{request.requesterCountry ?? "—"}</td>
                      <td className="px-4 py-2">
                        {new Date(request.createdAt).toLocaleDateString("en-US")}
                      </td>
                      <td className="px-4 py-2">
                        <StatusBadge label={config.label} tone={config.tone} />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="rounded-md border border-emerald-200 px-3 py-1 text-[0.7rem] font-semibold text-emerald-700 hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => handleWaitlistDecision(request, "APPROVED")}
                            disabled={request.status !== "PENDING"}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-rose-200 px-3 py-1 text-[0.7rem] font-semibold text-rose-700 hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => handleWaitlistDecision(request, "REJECTED")}
                            disabled={request.status !== "PENDING"}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-xs font-medium text-slate-500" colSpan={7}>
                    No waitlist requests in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
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
