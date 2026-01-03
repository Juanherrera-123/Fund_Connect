"use client";

import Link from "next/link";
import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, formatStrategyList } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session, UserProfile } from "@/lib/types";

export function FamilyDashboardContent() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);

  const profile = useMemo(() => {
    if (!session || session.role !== "Family Office") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Inicia sesión como Family Office.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Mandato activo</h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          <span>
            <strong>Rol:</strong> {profile.familyOfficePreferences?.managementRole || "—"}
          </span>
          <span>
            <strong>Diversificación:</strong> {profile.familyOfficePreferences?.diversificationLevel || "—"}
          </span>
          <span>
            <strong>Estrategias:</strong> {formatStrategyList(profile.familyOfficePreferences?.strategyPreferences)}
          </span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Interacción y reporting</h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          <span>
            <strong>Nivel de interacción:</strong> {profile.familyOfficePreferences?.interactionLevel || "—"}
          </span>
          <span>
            <strong>Reporting:</strong> {profile.familyOfficePreferences?.reportingCustomization || "—"}
          </span>
          <span>Acceso directo con gestores y MasterUser activo.</span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900">Acciones rápidas</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
            href="/gestores-verificados"
          >
            Ver gestores verificados
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            href="/profile"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
