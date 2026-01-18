"use client";

import { useMemo } from "react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { useFundsCollection } from "@/lib/funds";
import { MASTER_USER, getFundLogoLabel } from "@/lib/igatesData";

export default function SettingsDashboard() {
  const fundApplications = useFundsCollection();

  const verifiedFunds = useMemo(() => {
    const verifiedFromApplications = fundApplications
      .filter((application) => application.status === "approved")
      .map((application) => ({
        id: application.id,
        name: application.fundData.fundName,
        country: application.fundData.country || "Global",
        aum: application.fundData.aum || "N/A",
        strategy:
          application.fundData.strategyLabel ||
          application.fundData.strategy ||
          "Multi-Strategy",
        logoLabel: getFundLogoLabel(application.fundData.fundName),
      }));
    return verifiedFromApplications;
  }, [fundApplications]);

  const pendingFundsCount = fundApplications.filter((application) => application.status === "pending").length;

  const profileFields = [
    { label: "Usuario Master", labelKey: "dashboardSettingsMasterUser", value: MASTER_USER.username },
    { label: "Rol", labelKey: "dashboardSettingsRole", value: MASTER_USER.role },
    { label: "Fondos verificados", labelKey: "dashboardSettingsVerifiedFunds", value: `${verifiedFunds.length}` },
    { label: "Fondos en revisión", labelKey: "dashboardSettingsFundsReview", value: `${pendingFundsCount}` },
  ];

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleSettings">
          Settings
        </h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900" data-i18n="dashboardSettingsProfileTitle">
                Perfil del usuario
              </h2>
              <p className="text-xs text-slate-500" data-i18n="dashboardSettingsProfileLead">
                Actualiza la información que se completó durante la inscripción.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600" data-i18n="dashboardSettingsBatch">
                Batch
              </span>
              <StatusBadge label="Activo" labelKey="dashboardStatusActive" tone="success" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-2 text-xs font-medium">
                <span className="text-slate-600" data-i18n={field.labelKey}>
                  {field.label}
                </span>
                <input
                  defaultValue={field.value}
                  readOnly
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              data-i18n="dashboardSettingsVerifiedFundsTitle"
            >
              Fondos verificados
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {verifiedFunds.length ? (
                verifiedFunds.map((fund) => (
                  <div
                    key={fund.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {fund.logoLabel}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{fund.name}</p>
                        <p className="text-xs text-slate-500">
                          {fund.strategy} • {fund.country}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{fund.aum}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500" data-i18n="dashboardSettingsVerifiedFundsEmpty">
                  Sin fondos verificados.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              data-i18n="dashboardSettingsDeactivate"
            >
              Marcar inactivo
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
              data-i18n="dashboardSettingsSave"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
