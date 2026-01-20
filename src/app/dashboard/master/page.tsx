"use client";

import { useMemo, useState } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import { setManagerActiveClaims } from "@/lib/auth/claims";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { publishApprovedFund, updateFundApplicationStatus, useFundsCollection } from "@/lib/funds";
import { updateUserStatus } from "@/lib/users";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useWaitlistCollection } from "@/lib/waitlist";
import type { FundApplication, FundApplicationFile, Session, WaitlistRequest, WaitlistStatus } from "@/lib/types";

type ModalSection = {
  title: string;
  items: Array<{ label: string; value: string }>;
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
};

const resolveDate = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "object" && value && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate() as Date;
  }
  if (typeof value === "object" && value && "seconds" in value && typeof value.seconds === "number") {
    return new Date(value.seconds * 1000);
  }
  return null;
};

const statusConfig: Record<
  FundApplication["status"],
  { label: string; tone: "warning" | "success" | "danger" }
> = {
  pending: { label: "Pendiente", tone: "warning" },
  approved: { label: "Aprobado", tone: "success" },
  rejected: { label: "Rechazado", tone: "danger" },
};

const waitlistStatusConfig: Record<
  WaitlistStatus,
  { label: string; tone: "warning" | "success" | "danger" }
> = {
  PENDING: { label: "Pendiente", tone: "warning" },
  APPROVED: { label: "Aprobada", tone: "success" },
  REJECTED: { label: "Rechazada", tone: "danger" },
};

const waitlistTabs: Array<{ key: WaitlistStatus; label: string }> = [
  { key: "PENDING", label: "Pendientes" },
  { key: "APPROVED", label: "Aprobadas" },
  { key: "REJECTED", label: "Rechazadas" },
];

export default function MasterDashboard() {
  const fundApplications = useFundsCollection();
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeWaitlistStatus, setActiveWaitlistStatus] = useState<WaitlistStatus>("PENDING");
  const waitlistRequests = useWaitlistCollection(activeWaitlistStatus);
  const [activeWaitlistId, setActiveWaitlistId] = useState<string | null>(null);
  const [isWaitlistUpdating, setIsWaitlistUpdating] = useState(false);
  const [decisionNote, setDecisionNote] = useState("");

  const activeApplication = useMemo(
    () => fundApplications.find((application) => application.id === activeApplicationId) ?? null,
    [activeApplicationId, fundApplications]
  );

  const pendingCount = fundApplications.filter((application) => application.status === "pending").length;

  const rows = useMemo(() => {
    return fundApplications.map((application) => {
      const status = statusConfig[application.status];
      const createdAt = resolveDate(application.createdAt);
      return {
        id: application.id,
        fund: application.fundData.fundName,
        manager: application.user.name,
        country: application.user.country,
        submitted: createdAt ? createdAt.toLocaleDateString() : "—",
        status: <StatusCell label={status.label} tone={status.tone} />,
      };
    });
  }, [fundApplications]);

  const detailSections = useMemo<ModalSection[]>(() => {
    if (!activeApplication) return [];
    const { fundData, onboardingAnswers, user } = activeApplication;
    const { files, ...fundDetails } = fundData;
    const onboardingEntries = Object.entries(onboardingAnswers ?? {}).map(([label, value]) => ({
      label,
      value: formatValue(value),
    }));
    const fundEntries = Object.entries(fundDetails ?? {}).map(([label, value]) => ({
      label,
      value: formatValue(value),
    }));

    return [
      {
        title: "Información del usuario",
        items: [
          { label: "Nombre", value: user.name },
          { label: "Email", value: user.email },
          { label: "País", value: user.country },
          { label: "Rol", value: user.role },
        ],
      },
      {
        title: "Onboarding",
        items: onboardingEntries.length ? onboardingEntries : [{ label: "Respuestas", value: "—" }],
      },
      {
        title: "Datos del fondo",
        items: fundEntries.length ? fundEntries : [{ label: "Datos", value: "—" }],
      },
    ];
  }, [activeApplication]);

  const activeWaitlistRequest = useMemo<WaitlistRequest | null>(
    () => waitlistRequests.find((request) => request.id === activeWaitlistId) ?? null,
    [activeWaitlistId, waitlistRequests]
  );

  const waitlistRows = useMemo(() => {
    return waitlistRequests.map((request) => {
      const status = waitlistStatusConfig[request.status];
      return {
        id: request.id,
        createdAt: resolveDate(request.createdAt)?.toLocaleString() ?? "—",
        investor: request.fullName,
        email: request.email,
        phone: request.phone,
        fund: request.fundName,
        status: <StatusCell label={status.label} tone={status.tone} />,
      };
    });
  }, [waitlistRequests]);

  const handleDecision = async (status: FundApplication["status"]) => {
    if (!activeApplication) return;
    setIsUpdating(true);
    try {
      await updateFundApplicationStatus({
        id: activeApplication.id,
        status,
        reviewedBy: session?.username
          ? { name: session.username, email: session.username }
          : { name: "Master" },
      });
      if (status === "approved") {
        await publishApprovedFund(activeApplication);
        await updateUserStatus({ uid: activeApplication.user.id, status: "active" });
        await setManagerActiveClaims(activeApplication.user.id);
      }
      setActiveApplicationId(null);
    } catch (error) {
      console.error("Unable to update fund application status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleWaitlistDecision = async (status: WaitlistStatus) => {
    if (!activeWaitlistRequest) return;
    setIsWaitlistUpdating(true);
    try {
      const endpoint =
        status === "APPROVED"
          ? `/api/admin/waitlist/${activeWaitlistRequest.id}/approve`
          : `/api/admin/waitlist/${activeWaitlistRequest.id}/reject`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisionNote: decisionNote.trim() || null }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setActiveWaitlistId(null);
      setDecisionNote("");
    } catch (error) {
      console.error("Unable to update waitlist request", error);
    } finally {
      setIsWaitlistUpdating(false);
    }
  };

  const renderFiles = () => {
    if (!activeApplication) return null;
    const files = activeApplication.fundData.files;
    const trackRecords = files?.trackRecordStatements ?? [];
    const entries = [
      files?.logo ? { label: "Logo", file: files.logo } : null,
      files?.presentation ? { label: "Presentación", file: files.presentation } : null,
      ...trackRecords.map((file, index) => ({ label: `Track record ${index + 1}`, file })),
    ].filter(
      (entry): entry is { label: string; file: FundApplicationFile } =>
        Boolean(entry?.file?.path && entry.file.url),
    );

    if (!entries.length) {
      return <p className="text-sm text-slate-500">Sin archivos adjuntos.</p>;
    }

    return (
      <ul className="space-y-2 text-sm text-slate-600">
        {entries.map((entry) => (
          <li key={`${entry.label}-${entry.file.path}`} className="flex items-center justify-between">
            <span className="font-medium text-slate-700">{entry.label}</span>
            <a
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              href={entry.file.url}
              target="_blank"
              rel="noreferrer"
            >
              Descargar {entry.file.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Aprobación de fondos</h1>
        <p className="text-sm text-slate-600">
          Gestiona las solicitudes de creación de fondos enviadas por gestores.
        </p>
      </header>

      {pendingCount === 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          No hay solicitudes pendientes de aprobación en este momento.
        </div>
      )}

      <DataTable
        title="Fund applications"
        titleKey="dashboardPendingFundApprovals"
        actionLabel="Ver más"
        columns={[
          { key: "fund", label: "Fund name", labelKey: "dashboardColumnFundName" },
          { key: "manager", label: "Manager", labelKey: "dashboardColumnOwner" },
          { key: "country", label: "Country", labelKey: "dashboardColumnCountry" },
          { key: "submitted", label: "Submitted", labelKey: "dashboardColumnDate" },
          { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
        ]}
        rows={rows}
        onAction={(row) => setActiveApplicationId(row.id)}
      />

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-slate-900">Waitlist Requests</h2>
          <p className="text-sm text-slate-600">Pending approvals and historical decisions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {waitlistTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveWaitlistStatus(tab.key)}
              className={`rounded-full border px-4 py-1 text-xs font-semibold ${
                activeWaitlistStatus === tab.key
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
          actionLabel="Ver más"
          columns={[
            { key: "createdAt", label: "Date" },
            { key: "investor", label: "Investor" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "fund", label: "Fund" },
            { key: "status", label: "Status" },
          ]}
          rows={waitlistRows}
          onAction={(row) => setActiveWaitlistId(row.id)}
        />
      </section>

      {activeApplication && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-900/60 px-4 py-10">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{activeApplication.fundData.fundName}</h2>
                <p className="text-xs text-slate-500">Solicitud #{activeApplication.id}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300"
                onClick={() => setActiveApplicationId(null)}
              >
                Cerrar
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {detailSections.map((section) => (
                  <section key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
                    <dl className="mt-3 grid gap-3 md:grid-cols-2">
                      {section.items.map((item) => (
                        <div key={`${section.title}-${item.label}`} className="text-xs text-slate-600">
                          <dt className="font-semibold text-slate-500">{item.label}</dt>
                          <dd className="mt-1 whitespace-pre-line text-sm text-slate-800">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}

                <section className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Archivos</h3>
                  <div className="mt-3">{renderFiles()}</div>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
              <div className="text-xs text-slate-500">
                Estado actual: {statusConfig[activeApplication.status].label}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:border-rose-300"
                  onClick={() => handleDecision("rejected")}
                  disabled={isUpdating}
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-70"
                  onClick={() => handleDecision("approved")}
                  disabled={isUpdating}
                >
                  Aprobar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeWaitlistRequest && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-slate-900/60 px-4 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{activeWaitlistRequest.fundName}</h2>
                <p className="text-xs text-slate-500">Solicitud #{activeWaitlistRequest.id}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300"
                onClick={() => {
                  setActiveWaitlistId(null);
                  setDecisionNote("");
                }}
              >
                Cerrar
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <dl className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Full name", value: activeWaitlistRequest.fullName },
                  { label: "Email", value: activeWaitlistRequest.email },
                  { label: "Phone", value: activeWaitlistRequest.phone },
                  { label: "Fund name", value: activeWaitlistRequest.fundName },
                  { label: "Fund ID", value: activeWaitlistRequest.fundId },
                  {
                    label: "Intended investment amount",
                    value: activeWaitlistRequest.intendedInvestmentAmount,
                  },
                  { label: "Note", value: activeWaitlistRequest.note ?? "—" },
                  { label: "Created at", value: resolveDate(activeWaitlistRequest.createdAt)?.toLocaleString() ?? "—" },
                  { label: "Status", value: waitlistStatusConfig[activeWaitlistRequest.status].label },
                  { label: "Approved by", value: activeWaitlistRequest.approvedBy ?? "—" },
                  { label: "Approved at", value: resolveDate(activeWaitlistRequest.approvedAt)?.toLocaleString() ?? "—" },
                  { label: "Decision note", value: activeWaitlistRequest.decisionNote ?? "—" },
                ].map((field) => (
                  <div key={field.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {field.label}
                    </dt>
                    <dd className="mt-2 text-sm text-slate-800">{formatValue(field.value)}</dd>
                  </div>
                ))}
              </dl>

              {activeWaitlistRequest.status === "PENDING" ? (
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
                Estado actual: {waitlistStatusConfig[activeWaitlistRequest.status].label}
              </div>
              {activeWaitlistRequest.status === "PENDING" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:border-rose-300 disabled:opacity-70"
                    onClick={() => handleWaitlistDecision("REJECTED")}
                    disabled={isWaitlistUpdating}
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-70"
                    onClick={() => handleWaitlistDecision("APPROVED")}
                    disabled={isWaitlistUpdating}
                  >
                    Aprobar
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
