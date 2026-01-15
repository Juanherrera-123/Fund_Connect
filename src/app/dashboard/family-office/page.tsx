"use client";

import { useEffect, useMemo, useState } from "react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { useLanguage } from "@/components/LanguageProvider";
import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, apiBase } from "@/lib/igatesData";
import { getFundFrameClass } from "@/lib/fundVisuals";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundSummary, Session, UserProfile, WaitlistRequest, WaitlistStatus } from "@/lib/types";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

export default function FamilyOfficeDashboard() {
  const { language, options, strings } = useLanguage();
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [waitlistRequests, setWaitlistRequests] = useFirebaseStorage<WaitlistRequest[]>(
    STORAGE_KEYS.waitlistRequests,
    []
  );
  const [capitalAllocations] = useFirebaseStorage<Record<string, number>>(
    STORAGE_KEYS.capitalAllocations,
    {}
  );
  const [funds, setFunds] = useState<FundSummary[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "idle">("loading");
  const [activeFund, setActiveFund] = useState<FundSummary | null>(null);
  const [requestNotes, setRequestNotes] = useState("");
  const [feedbackKey, setFeedbackKey] = useState<"" | "alreadyRequested" | "submitted">("");

  const profile = useMemo(() => {
    if (!session || session.role !== "Family Office") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const locale = options[language]?.locale ?? "en";

  const statusText = useMemo(() => {
    if (status === "loading") return strings.fundsExploreLoading;
    if (status === "error") return strings.fundsExploreLoadError;
    return "";
  }, [status, strings.fundsExploreLoadError, strings.fundsExploreLoading]);

  const statusConfig = useMemo<
    Record<WaitlistStatus, { label: string; tone: "neutral" | "success" | "danger" }>
  >(
    () => ({
      PENDING: { label: strings.dashboardStatusPending, tone: "neutral" },
      APPROVED: { label: strings.dashboardStatusApproved, tone: "success" },
      REJECTED: { label: strings.dashboardStatusRejected, tone: "danger" },
    }),
    [strings.dashboardStatusApproved, strings.dashboardStatusPending, strings.dashboardStatusRejected]
  );

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
          setStatus("idle");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setStatus("error");
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
    return waitlistRequests.filter((request) => request.requesterId === profile.id);
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
      setFeedbackKey("alreadyRequested");
      return;
    }

    const now = new Date().toISOString();
    const newRequest: WaitlistRequest = {
      id: `waitlist-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: now,
      requesterId: profile.id,
      requesterRole: "FAMILY_OFFICE",
      requesterEmail: profile.email,
      requesterCountry: profile.country,
      requesterOrg: profile.org ?? null,
      fundId: activeFund.id,
      fundName: activeFund.name,
      status: "PENDING",
      approvedAt: null,
      approvedBy: null,
      decisionNote: null,
      note: requestNotes.trim() ? requestNotes.trim() : null,
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
    setFeedbackKey("submitted");
  };

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        {strings.dashboardFamilyLoginPrompt}
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
          {strings.dashboardLabel}
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">{strings.dashboardFamilyTitle}</h1>
        <p className="text-sm text-slate-600">{strings.dashboardFamilyLead}</p>
      </header>

      {feedbackKey ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {feedbackKey === "alreadyRequested"
            ? strings.dashboardWaitlistAlreadyRequested
            : strings.dashboardWaitlistSubmitted}
        </div>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
        <div className={cardClass}>
          <h2 className="text-sm font-semibold text-slate-700">{strings.dashboardProfileTitle}</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>{strings.dashboardProfileOrganizationLabel}</span>
              <span className="font-semibold text-slate-900">{profile.org ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{strings.dashboardProfileContactLabel}</span>
              <span className="font-semibold text-slate-900">{profile.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{strings.dashboardProfileEmailLabel}</span>
              <span className="font-semibold text-slate-900">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{strings.dashboardProfileCountryLabel}</span>
              <span className="font-semibold text-slate-900">{profile.country}</span>
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="text-sm font-semibold text-slate-700">{strings.dashboardMandateTitle}</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>{strings.dashboardMandateRoleLabel}</span>
              <span className="font-semibold text-slate-900">
                {profile.familyOfficePreferences?.managementRole ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{strings.dashboardMandateDiversificationLabel}</span>
              <span className="font-semibold text-slate-900">
                {profile.familyOfficePreferences?.diversificationLevel ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{strings.dashboardMandateReportingLabel}</span>
              <span className="font-semibold text-slate-900">
                {profile.familyOfficePreferences?.reportingCustomization ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">{strings.dashboardBrowseFundsTitle}</h2>
          <span className="text-xs text-slate-500">
            {funds.length
              ? strings.dashboardFundsCountLabel.replace("{count}", String(funds.length))
              : statusText}
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {funds.map((fund) => {
            const existingRequest = requestByFundId.get(fund.id);
            const config = existingRequest ? statusConfig[existingRequest.status] : null;
            const capitalAllocated = capitalAllocations[fund.id] ?? fund.capital_allocated ?? 0;
            return (
              <div
                className={`igates-card-frame ${getFundFrameClass(capitalAllocated)}`}
                key={fund.id}
              >
                <div className="igates-card grid gap-4">
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
                      {strings.fundsLabelAum} {fund.aum}
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
                      {existingRequest ? strings.fundsExploreWaitlisted : strings.fundsExploreJoinWaitlist}
                    </button>
                    {config ? <StatusBadge label={config.label} tone={config.tone} /> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">My waitlist requests</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[520px] w-full text-left text-xs">
            <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2">{strings.dashboardColumnFund}</th>
                <th className="px-4 py-2">{strings.dashboardColumnSubmitted}</th>
                <th className="px-4 py-2">{strings.dashboardColumnStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myRequests.length ? (
                myRequests.map((request) => {
                  const config = statusConfig[request.status];
                  return (
                    <tr key={request.id} className="text-slate-700">
                      <td className="px-4 py-2">
                        <span className="font-semibold text-slate-900">{request.fundName}</span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(request.createdAt).toLocaleDateString(locale)}
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
                    {strings.dashboardWaitlistEmpty}
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
            <h3 className="text-lg font-semibold text-slate-900">{strings.dashboardWaitlistJoinTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {strings.dashboardWaitlistConfirmLead}{" "}
              <span className="font-semibold">{activeFund.name}</span>.
            </p>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {strings.dashboardWaitlistNotesLabel}
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
                {strings.dashboardWaitlistCancel}
              </button>
              <button
                className="rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                type="button"
                onClick={handleSubmitRequest}
              >
                {strings.dashboardWaitlistSubmit}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
