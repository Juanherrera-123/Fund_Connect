"use client";

import { useMemo, useState } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useWaitlistCollection } from "@/lib/waitlist";
import type { Session, WaitlistStatus } from "@/lib/types";

type ModalField = { label: string; value: string };

const statusConfig: Record<WaitlistStatus, { label: string; tone: "warning" | "success" | "danger" }> =
  {
    PENDING: { label: "Pendiente", tone: "warning" },
    APPROVED: { label: "Aprobada", tone: "success" },
    REJECTED: { label: "Rechazada", tone: "danger" },
  };

const statusTabs: Array<{ key: WaitlistStatus; label: string }> = [
  { key: "PENDING", label: "Pendientes" },
  { key: "APPROVED", label: "Aprobadas" },
  { key: "REJECTED", label: "Rechazadas" },
];

const resolveDateLabel = (value?: string | null) => {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : parsed.toLocaleString();
};

const formatFieldValue = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
};

export default function MasterRequestsPage() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [activeStatus, setActiveStatus] = useState<WaitlistStatus>("PENDING");
  const waitlistRequests = useWaitlistCollection(activeStatus);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [decisionNote, setDecisionNote] = useState("");

  const activeRequest = useMemo(
    () => waitlistRequests.find((request) => request.id === activeRequestId) ?? null,
    [activeRequestId, waitlistRequests]
  );

  const rows = useMemo(() => {
    return waitlistRequests.map((request) => {
      const status = statusConfig[request.status];
      return {
        id: request.id,
        fullName: request.fullName,
        email: request.email,
        phone: request.phone,
        fundName: request.fundName,
        createdAt: resolveDateLabel(request.createdAt),
        status: <StatusCell label={status.label} tone={status.tone} />,
      };
    });
  }, [waitlistRequests]);

  const detailFields = useMemo<ModalField[]>(() => {
    if (!activeRequest) return [];
    return [
      { label: "Full name", value: formatFieldValue(activeRequest.fullName) },
      { label: "Email", value: formatFieldValue(activeRequest.email) },
      { label: "Phone", value: formatFieldValue(activeRequest.phone) },
      { label: "Fund name", value: formatFieldValue(activeRequest.fundName) },
      { label: "Fund ID", value: formatFieldValue(activeRequest.fundId) },
      {
        label: "Intended investment amount",
        value: formatFieldValue(activeRequest.intendedInvestmentAmount),
      },
      { label: "Note", value: formatFieldValue(activeRequest.note) },
      { label: "Created at", value: resolveDateLabel(activeRequest.createdAt) },
      { label: "Status", value: statusConfig[activeRequest.status].label },
      { label: "Requester UID", value: formatFieldValue(activeRequest.requesterUid ?? null) },
      { label: "Approved by", value: formatFieldValue(activeRequest.approvedBy ?? null) },
      { label: "Approved at", value: resolveDateLabel(activeRequest.approvedAt) },
      { label: "Decision note", value: formatFieldValue(activeRequest.decisionNote ?? null) },
    ];
  }, [activeRequest]);

  const handleDecision = async (status: WaitlistStatus) => {
    if (!activeRequest) return;
    setIsUpdating(true);
    try {
      const endpoint =
        status === "APPROVED"
          ? `/api/admin/waitlist/${activeRequest.id}/approve`
          : `/api/admin/waitlist/${activeRequest.id}/reject`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decisionNote: decisionNote.trim() || null,
          decidedBy: session?.uid ?? session?.id ?? null,
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setActiveRequestId(null);
      setDecisionNote("");
    } catch (error) {
      console.error("Unable to update waitlist request.", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleRequests">
          Requests
        </h1>
        <p className="text-sm text-slate-600">
          Revisa las solicitudes de waitlist y gestiona su aprobación.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveStatus(tab.key)}
            className={`rounded-full border px-4 py-1 text-xs font-semibold ${
              activeStatus === tab.key
                ? "border-igates-500 bg-igates-500/10 text-igates-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable
        title="Waitlist requests"
        titleKey="dashboardWaitlist"
        actionLabel="Ver más"
        columns={[
          { key: "fullName", label: "Full name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "fundName", label: "Fund name" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created at" },
        ]}
        rows={rows}
        onAction={(row) => setActiveRequestId(row.id)}
      />

      {activeRequest && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-900/60 px-4 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{activeRequest.fundName}</h2>
                <p className="text-xs text-slate-500">Solicitud #{activeRequest.id}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300"
                onClick={() => {
                  setActiveRequestId(null);
                  setDecisionNote("");
                }}
              >
                Cerrar
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <dl className="grid gap-4 md:grid-cols-2">
                {detailFields.map((field) => (
                  <div key={field.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {field.label}
                    </dt>
                    <dd className="mt-2 text-sm text-slate-800">{field.value}</dd>
                  </div>
                ))}
              </dl>
              {activeRequest.status === "PENDING" ? (
                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Decision note
                  </label>
                  <textarea
                    className="mt-2 min-h-[100px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                    value={decisionNote}
                    onChange={(event) => setDecisionNote(event.target.value)}
                    placeholder="Añade una nota opcional."
                  />
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
              <div className="text-xs text-slate-500">
                Estado actual: {statusConfig[activeRequest.status].label}
              </div>
              {activeRequest.status === "PENDING" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:border-rose-300 disabled:opacity-70"
                    onClick={() => handleDecision("REJECTED")}
                    disabled={isUpdating}
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-70"
                    onClick={() => handleDecision("APPROVED")}
                    disabled={isUpdating}
                  >
                    Aprobar
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
