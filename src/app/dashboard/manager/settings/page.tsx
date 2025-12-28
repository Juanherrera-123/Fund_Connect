"use client";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

export default function FundManagerSettings() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile =
    session?.role === "Fund Manager"
      ? profiles.find((item) => item.id === session.id) ?? null
      : null;

  if (!profile) {
    return <div className="status-banner">Inicia sesión como gestor para ver este panel.</div>;
  }

  const baseFund = profile.fundId
    ? baseVerifiedFunds.find((fund) => fund.id === profile.fundId)
    : null;
  const application = fundApplications.find((item) => item.managerId === profile.id);
  const fundName = application?.fundName ?? baseFund?.name ?? "—";
  const fundStatus = application?.status ?? (baseFund ? "verified" : "pending");

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
              <h2 className="text-sm font-semibold text-slate-900">Perfil del gestor</h2>
              <p className="text-xs text-slate-500">Revisa los datos de tu cuenta.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Estado</span>
              <StatusBadge
                label={profile.fundManagerProfile?.status === "verified" ? "Activo" : "Pendiente"}
                tone={profile.fundManagerProfile?.status === "verified" ? "success" : "warning"}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Nombre", value: profile.fullName },
              { label: "Email", value: profile.email },
              { label: "País", value: profile.country },
              { label: "Fondo asociado", value: fundName },
            ].map((field) => (
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
              Estado del fondo
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {fundStatus === "verified"
                ? "Tu fondo ya aparece en gestores verificados."
                : "Tu fondo está pendiente de aprobación."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
