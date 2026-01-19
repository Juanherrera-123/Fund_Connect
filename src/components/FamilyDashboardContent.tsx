"use client";

import Link from "next/link";
import { useMemo } from "react";

import { isActiveStatus, normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS, formatStrategyList } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session, UserProfile } from "@/lib/types";

export function FamilyDashboardContent() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const authRole = session?.authRole ?? normalizeRole(session?.role);
  const isActive = isActiveStatus(session?.status);

  const profile = useMemo(() => {
    if (!session || !isActive) return null;
    if (authRole !== "unknown" || session.role !== "Family Office") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [authRole, isActive, profiles, session]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="familyDashboardLoginPrompt">Inicia sesión como Family Office.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="familyDashboardActiveMandate">
          Mandato activo
        </h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          <span>
            <strong data-i18n="familyDashboardRoleLabel">Rol:</strong>{" "}
            {profile.familyOfficePreferences?.managementRole || "—"}
          </span>
          <span>
            <strong data-i18n="familyDashboardDiversificationLabel">Diversificación:</strong>{" "}
            {profile.familyOfficePreferences?.diversificationLevel || "—"}
          </span>
          <span>
            <strong data-i18n="familyDashboardStrategiesLabel">Estrategias:</strong>{" "}
            {formatStrategyList(profile.familyOfficePreferences?.strategyPreferences)}
          </span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="familyDashboardInteractionTitle">
          Interacción y reporting
        </h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          <span>
            <strong data-i18n="familyDashboardInteractionLabel">Nivel de interacción:</strong>{" "}
            {profile.familyOfficePreferences?.interactionLevel || "—"}
          </span>
          <span>
            <strong data-i18n="familyDashboardReportingLabel">Reporting:</strong>{" "}
            {profile.familyOfficePreferences?.reportingCustomization || "—"}
          </span>
          <span data-i18n="familyDashboardAccessNote">
            Acceso directo con gestores y MasterUser activo.
          </span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="familyDashboardQuickActions">
          Acciones rápidas
        </h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
            href="/gestores-verificados"
            data-i18n="familyDashboardViewManagers"
          >
            Ver gestores verificados
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            href="/profile"
            data-i18n="familyDashboardViewProfile"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
