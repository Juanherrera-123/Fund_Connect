"use client";

import { useMemo, useState } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { updateFundApplicationStatus, useFundsCollection } from "@/lib/funds";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { FundApplication, Session } from "@/lib/types";

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

export default function MasterDashboard() {
  const fundApplications = useFundsCollection();
  const [session] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
      setActiveApplicationId(null);
    } catch (error) {
      console.error("Unable to update fund application status", error);
    } finally {
      setIsUpdating(false);
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
      (
        entry,
      ): entry is { label: string; file: NonNullable<typeof files>["logo"] } =>
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
    </div>
  );
}
