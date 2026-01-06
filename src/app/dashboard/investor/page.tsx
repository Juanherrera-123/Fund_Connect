"use client";

import { useEffect, useMemo, useState } from "react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, apiBase } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundSummary, Session, UserProfile, WaitlistRequest, WaitlistStatus } from "@/lib/types";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const statusConfig: Record<WaitlistStatus, { label: string; tone: "neutral" | "success" | "danger" | "info" }> = {
  pending: { label: "Pending", tone: "neutral" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  allocated: { label: "Allocated", tone: "info" },
};

export default function InvestorDashboard() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [waitlistRequests, setWaitlistRequests] = useLocalStorage<WaitlistRequest[]>(
    STORAGE_KEYS.waitlistRequests,
    []
  );
  const [funds, setFunds] = useState<FundSummary[]>([]);
  const [status, setStatus] = useState("Loading funds...");
  const [activeFund, setActiveFund] = useState<FundSummary | null>(null);
  const [requestNotes, setRequestNotes] = useState("");
  const [feedback, setFeedback] = useState("");

  const profile = useMemo(() => {
    if (!session || session.role !== "Investor") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  useEffect(() => {
    if (!profile) return;
    let isMounted = true;
    const loadFunds = async () => {
      try {
        const response = await fetch(`${apiBase}/funds`);
        if (!response.ok) throw new Error("Request failed");
        const data = (await response.json()) as FundSummary[];
        if (isMounted) {
          setFunds(data);
          setStatus("");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setStatus("Unable to load funds.");
        }
      }
    };

    loadFunds();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  const myRequests = useMemo(() => {
    if (!profile) return [];
    return waitlistRequests.filter((request) => request.requesterUserId === profile.id);
  }, [profile, waitlistRequests]);

  const requestByFundId = useMemo(() => {
    const map = new Map<string, WaitlistRequest>();
    myRequests.forEach((request) => {
      map.set(request.fundId, request);
    });
    return map;
  }, [myRequests]);

  const handleSubmitRequest = () => {
    if (!profile || !activeFund) return;
    const existing = requestByFundId.get(activeFund.id);
    if (existing) {
      setFeedback("You already requested this fund.");
      return;
    }

    const now = new Date().toISOString();
    const newRequest: WaitlistRequest = {
      id: `waitlist-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: now,
      updatedAt: now,
      requesterUserId: profile.id,
      requesterRole: "investor",
      requesterName: profile.fullName,
      requesterEmail: profile.email,
      requesterOrg: profile.org ?? null,
      fundId: activeFund.id,
      fundNameSnapshot: activeFund.name,
      status: "pending",
      reviewedByUserId: null,
      reviewedAt: null,
      reviewNotes: null,
      allocationId: null,
      allocationStatus: null,
      metadata: { country: profile.country },
      requestNotes: requestNotes.trim() ? requestNotes.trim() : null,
    };

    setWaitlistRequests((prev) => [newRequest, ...prev]);
    setProfiles((prev) =>
      prev.map((item) =>
        item.id === profile.id
          ? {
              ...item,
              waitlistFunds: Array.from(new Set([...(item.waitlistFunds ?? []), activeFund.name])),
            }
          : item
      )
    );
    setActiveFund(null);
    setRequestNotes("");
    setFeedback("Waitlist request submitted.");
  };

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Please sign in as an investor to view this dashboard.
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Investor workspace</h1>
        <p className="text-sm text-slate-600">
          Manage your profile, explore funds, and track your waitlist requests.
        </p>
      </header>

      {feedback ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {feedback}
        </div>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
        <div className={cardClass}>
          <h2 className="text-sm font-semibold text-slate-700">My profile</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Name</span>
              <span className="font-semibold text-slate-900">{profile.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email</span>
              <span className="font-semibold text-slate-900">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Country</span>
              <span className="font-semibold text-slate-900">{profile.country}</span>
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="text-sm font-semibold text-slate-700">Waitlist summary</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Total requests</span>
              <span className="font-semibold text-slate-900">{myRequests.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending</span>
              <span className="font-semibold text-slate-900">
                {myRequests.filter((request) => request.status === "pending").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Approved</span>
              <span className="font-semibold text-slate-900">
                {myRequests.filter((request) => request.status === "approved").length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Browse funds</h2>
          <span className="text-xs text-slate-500">
            {funds.length ? `${funds.length} funds` : status}
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {funds.map((fund) => {
            const existingRequest = requestByFundId.get(fund.id);
            const config = existingRequest ? statusConfig[existingRequest.status] : null;
            return (
              <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" key={fund.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{fund.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold text-igates-700">
                        {fund.strategy}
                      </span>
                      <span className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold text-igates-700">
                        {fund.domicile}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {fund.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{fund.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    AUM {fund.aum}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {fund.performance}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400 disabled:cursor-not-allowed disabled:bg-slate-300"
                    type="button"
                    onClick={() => setActiveFund(fund)}
                    disabled={Boolean(existingRequest)}
                  >
                    {existingRequest ? "Requested" : "Join waitlist"}
                  </button>
                  {config ? <StatusBadge label={config.label} tone={config.tone} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">My waitlist requests</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2">Fund</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myRequests.length ? (
                myRequests.map((request) => {
                  const config = statusConfig[request.status];
                  return (
                    <tr key={request.id} className="text-slate-700">
                      <td className="px-4 py-2">
                        <span className="font-semibold text-slate-900">{request.fundNameSnapshot}</span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(request.createdAt).toLocaleDateString("en-US")}
                      </td>
                      <td className="px-4 py-2">
                        <StatusBadge label={config.label} tone={config.tone} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-xs font-medium text-slate-500" colSpan={3}>
                    No waitlist requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {activeFund ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Join waitlist</h3>
            <p className="mt-2 text-sm text-slate-600">
              Confirm your waitlist request for <span className="font-semibold">{activeFund.name}</span>.
            </p>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Notes (optional)
            </label>
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
              rows={4}
              value={requestNotes}
              onChange={(event) => setRequestNotes(event.target.value)}
            />
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600"
                type="button"
                onClick={() => {
                  setActiveFund(null);
                  setRequestNotes("");
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                type="button"
                onClick={handleSubmitRequest}
              >
                Submit request
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
