"use client";

import { useMemo } from "react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { MASTER_USER, STORAGE_KEYS, baseVerifiedFunds, getFundLogoLabel } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication } from "@/lib/types";

export default function SettingsDashboard() {
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const verifiedFunds = useMemo(() => {
    const verifiedFromApplications = fundApplications
      .filter((application) => application.status === "verified")
      .map((application) => ({
        id: application.id,
        name: application.fundName,
        country: application.country || "Global",
        aum: application.aum || "N/A",
        strategy: application.strategyLabel || application.strategy || "Multi-Strategy",
        logoLabel: getFundLogoLabel(application.fundName),
      }));
    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const overrides = new Map(verifiedFromApplications.map((fund) => [fund.id, fund]));

    return [
      ...baseVerifiedFunds.map((fund) => {
        const override = overrides.get(fund.id);
        return (
          override ?? {
            id: fund.id,
            name: fund.name,
            country: fund.country,
            aum: fund.aum,
            strategy: fund.strategy,
            logoLabel: fund.logoLabel,
          }
        );
      }),
      ...verifiedFromApplications.filter((fund) => !baseIds.has(fund.id)),
    ];
  }, [fundApplications]);

  const pendingFundsCount = fundApplications.filter((application) => application.status === "pending").length;

  const profileFields = [
    { label: "Usuario Master", value: MASTER_USER.username },
    { label: "Rol", value: MASTER_USER.role },
    { label: "Fondos verificados", value: `${verifiedFunds.length}` },
    { label: "Fondos en revisión", value: `${pendingFundsCount}` },
  ];

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Perfil del usuario</h2>
              <p className="text-xs text-slate-500">
                Actualiza la información que se completó durante la inscripción.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Batch</span>
              <StatusBadge label="Activo" tone="success" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-2 text-xs font-medium">
                <span className="text-slate-600">{field.label}</span>
                <input
                  defaultValue={field.value}
                  readOnly
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                />
              </label>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
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
                <p className="text-sm text-slate-500">Sin fondos verificados.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Marcar inactivo
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
