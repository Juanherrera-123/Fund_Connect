"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  baseVerifiedFunds,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { parseCapitalAllocation } from "@/lib/fundVisuals";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
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
  const [profiles, setProfiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [fundApplications, setFundApplications] = useFirebaseStorage<FundApplication[]>(
    STORAGE_KEYS.fundApplications,
    []
  );
  const [notifications] = useFirebaseStorage<MasterNotification[]>(STORAGE_KEYS.notifications, []);
  const [waitlistRequests, setWaitlistRequests] = useState<WaitlistRequest[]>([]);
  const [pendingWaitlistRequests, setPendingWaitlistRequests] = useState<WaitlistRequest[]>([]);
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [, setCapitalAllocations] = useFirebaseStorage<Record<string, number>>(
    STORAGE_KEYS.capitalAllocations,
    {}
  );
  const [activeWaitlistTab, setActiveWaitlistTab] = useState<WaitlistStatus>("PENDING");
  const [waitlistMessage, setWaitlistMessage] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [selectedWaitlistRequest, setSelectedWaitlistRequest] = useState<WaitlistRequest | null>(
    null
  );
  const [lastRefreshAt, setLastRefreshAt] = useState<Date | null>(null);

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

    const waitlistEntries = pendingWaitlistRequests.map((request) => ({
      id: request.id,
      investor: request.requesterName ?? requesterNameById.get(request.requesterId) ?? "—",
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
      pendingManagers,
      notifications,
      managerNameById,
      requesterNameById,
      roleCounts,
    };
  }, [fundApplications, notifications, pendingWaitlistRequests, profiles]);

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

  const fetchWaitlistRequests = useCallback(
    async (status: WaitlistStatus, options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setWaitlistLoading(true);
      }
      setWaitlistError("");
      try {
        const headers: Record<string, string> = {};
        if (session?.id && session?.role) {
          headers["x-user-id"] = session.id;
          headers["x-user-role"] = session.role;
        }
        const response = await fetch(`/api/admin/waitlist?status=${status}`, {
          headers,
        });
        if (!response.ok) {
          throw new Error("Unable to load waitlist requests.");
        }
        const payload = (await response.json()) as { data?: WaitlistRequest[] };
        setWaitlistRequests(payload.data ?? []);
        if (status === "PENDING") {
          setPendingWaitlistRequests(payload.data ?? []);
        }
        setLastRefreshAt(new Date());
      } catch (error) {
        console.error(error);
        setWaitlistError("Unable to refresh waitlist requests.");
      } finally {
        if (!silent) {
          setWaitlistLoading(false);
        }
      }
    },
    [session?.id, session?.role]
  );

  useEffect(() => {
    fetchWaitlistRequests(activeWaitlistTab);
    if (activeWaitlistTab !== "PENDING") {
      fetchWaitlistRequests("PENDING", { silent: true });
    }
  }, [activeWaitlistTab, fetchWaitlistRequests]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      fetchWaitlistRequests(activeWaitlistTab, { silent: true });
      if (activeWaitlistTab !== "PENDING") {
        fetchWaitlistRequests("PENDING", { silent: true });
      }
    }, 20000);
    return () => window.clearInterval(interval);
  }, [activeWaitlistTab, fetchWaitlistRequests]);

  useEffect(() => {
    const handleFocus = () => {
      fetchWaitlistRequests(activeWaitlistTab, { silent: true });
      if (activeWaitlistTab !== "PENDING") {
        fetchWaitlistRequests("PENDING", { silent: true });
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [activeWaitlistTab, fetchWaitlistRequests]);

  useEffect(() => {
    if (!waitlistMessage) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setWaitlistMessage("");
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [waitlistMessage]);

  const handleWaitlistDecision = async (
    request: WaitlistRequest,
    nextStatus: WaitlistStatus
  ) => {
    const now = new Date().toISOString();
    const reviewerId = session?.id ?? session?.username ?? "master";
    const requesterName = data.requesterNameById.get(request.requesterId) ?? "User";
    const previousRequests = waitlistRequests;
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
      if (nextStatus === "APPROVED") {
        const allocationDelta =
          typeof request.amount === "number"
            ? request.amount
            : parseCapitalAllocation(request.intendedInvestmentAmount) ?? 1;
        setCapitalAllocations((prev) => ({
          ...prev,
          [request.fundId]: (prev[request.fundId] ?? 0) + allocationDelta,
        }));
        setWaitlistMessage("Approved — email sent");
      } else {
        setWaitlistMessage(`Rejected ${requesterName}'s waitlist request.`);
      }
    } catch (error) {
      console.error(error);
      setWaitlistRequests(previousRequests);
      setWaitlistMessage("Unable to send the waitlist email notification.");
    }
  };

  const filteredWaitlist = waitlistRequests;

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
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.7rem] font-semibold text-slate-600 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => fetchWaitlistRequests(activeWaitlistTab)}
              disabled={waitlistLoading}
            >
              {waitlistLoading ? "Refreshing..." : "Refresh"}
            </button>
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
        </div>

        {lastRefreshAt ? (
          <p className="text-[0.7rem] text-slate-400">
            Last refresh: {lastRefreshAt.toLocaleTimeString("en-US", { timeStyle: "short" })}
          </p>
        ) : null}

        {waitlistMessage ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {waitlistMessage}
          </div>
        ) : null}

        {waitlistError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {waitlistError}
          </div>
        ) : null}

        {selectedWaitlistRequest ? (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedWaitlistRequest.fundName}
                </p>
                <p className="text-[0.7rem] text-slate-500">
                  {selectedWaitlistRequest.requesterName ??
                    data.requesterNameById.get(selectedWaitlistRequest.requesterId) ??
                    "—"}{" "}
                  · {selectedWaitlistRequest.requesterEmail}
                </p>
              </div>
              <button
                type="button"
                className="rounded-md border border-slate-200 px-2 py-1 text-[0.7rem] font-semibold text-slate-500 hover:border-slate-300"
                onClick={() => setSelectedWaitlistRequest(null)}
              >
                Close
              </button>
            </div>
            {selectedWaitlistRequest.note ? (
              <p className="mt-2 text-[0.7rem] text-slate-500">
                Note: {selectedWaitlistRequest.note}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[520px] w-full text-left text-xs">
            <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2">Requester</th>
                <th className="px-4 py-2">Fund</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Notes</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaitlist.length ? (
                filteredWaitlist.map((request) => {
                  const config = statusConfig[request.status];
                  const formattedAmount =
                    typeof request.amount === "number"
                      ? request.amount.toLocaleString("en-US")
                      : request.intendedInvestmentAmount ?? "—";
                  const formattedCreatedAt = request.createdAt
                    ? new Date(request.createdAt).toLocaleString("es-ES", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—";
                  return (
                    <tr key={request.id} className="text-slate-700">
                      <td className="px-4 py-2">
                        <div className="grid gap-1">
                          <span className="font-semibold text-slate-900">
                            {request.requesterName ??
                              data.requesterNameById.get(request.requesterId) ??
                              "—"}
                          </span>
                          <span className="text-[0.7rem] text-slate-500">
                            {request.requesterRole.replace("_", " ").toLowerCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-semibold text-slate-900">{request.fundName}</span>
                      </td>
                      <td className="px-4 py-2">{request.requesterEmail}</td>
                      <td className="px-4 py-2">{request.requesterPhone ?? "—"}</td>
                      <td className="px-4 py-2">{formattedAmount}</td>
                      <td className="px-4 py-2">
                        <span className="line-clamp-2">{request.note ?? "—"}</span>
                      </td>
                      <td className="px-4 py-2">
                        {formattedCreatedAt}
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
                            className="rounded-md border border-slate-200 px-3 py-1 text-[0.7rem] font-semibold text-slate-600 hover:border-slate-300"
                            onClick={() => setSelectedWaitlistRequest(request)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-xs font-medium text-slate-500" colSpan={9}>
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
