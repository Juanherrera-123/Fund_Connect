"use client";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

export default function FundManagerSettings() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [fundApplications] = useFirebaseStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile =
    session?.role === "Fund Manager"
      ? profiles.find((item) => item.id === session.id) ?? null
      : null;

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  const application = fundApplications.find((item) => item.managerId === profile.id);
  const fundName = application?.fundName ?? "—";
  const fundStatus = application?.status ?? "pending";

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
              <h2 className="text-sm font-semibold text-slate-900" data-i18n="dashboardManagerProfileTitle">
                Perfil del gestor
              </h2>
              <p className="text-xs text-slate-500" data-i18n="dashboardManagerProfileLead">
                Revisa los datos de tu cuenta.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600" data-i18n="dashboardStatusLabel">
                Estado
              </span>
              <StatusBadge
                label={profile.fundManagerProfile?.status === "verified" ? "Activo" : "Pendiente"}
                labelKey={
                  profile.fundManagerProfile?.status === "verified"
                    ? "dashboardStatusActive"
                    : "dashboardStatusPending"
                }
                tone={profile.fundManagerProfile?.status === "verified" ? "success" : "warning"}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Nombre", labelKey: "dashboardFieldName", value: profile.fullName },
              { label: "Email", labelKey: "dashboardFieldEmail", value: profile.email },
              { label: "País", labelKey: "dashboardFieldCountry", value: profile.country },
              { label: "Fondo asociado", labelKey: "dashboardFieldFund", value: fundName },
            ].map((field) => (
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
              data-i18n="dashboardManagerFundStatusTitle"
            >
              Estado del fondo
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              <span
                data-i18n={
                  fundStatus === "verified"
                    ? "dashboardManagerFundVerified"
                    : "dashboardManagerFundPending"
                }
              >
                {fundStatus === "verified"
                  ? "Tu fondo ya aparece en gestores verificados."
                  : "Tu fondo está pendiente de aprobación."}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
