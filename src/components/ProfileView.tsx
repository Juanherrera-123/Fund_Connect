"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  formatStrategyList,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session, UserProfile } from "@/lib/types";

export function ProfileView() {
  const router = useRouter();
  const [profiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [session, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const profile = useMemo(() => {
    if (!session || session.role === "MasterUser") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const handleLogout = () => {
    setSession(null);
    router.push("/auth");
  };


  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Inicia sesión para ver tu perfil.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
          <p>
            <strong>{profile.email}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Teléfono</p>
          <p>
            <strong>{profile.phone}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">País</p>
          <p>
            <strong>{profile.country}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estado</p>
          <span
            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
              profile.role === "Fund Manager"
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {profile.role === "Fund Manager" ? profile.fundManagerProfile?.status || "Pendiente" : "Activo"}
          </span>
        </div>
      </div>

      {profile.role === "Investor" && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Preferencias del inversionista</h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>
                <strong>Objetivo:</strong> {profile.investorPreferences?.objective || "—"}
              </span>
              <span>
                <strong>Horizonte:</strong> {profile.investorPreferences?.horizon || "—"}
              </span>
              <span>
                <strong>Riesgo:</strong> {profile.investorPreferences?.riskLevel || "—"}
              </span>
              <span>
                <strong>Estrategias:</strong> {formatStrategyList(profile.investorPreferences?.strategyPreferences)}
              </span>
              <span>
                <strong>Reporting:</strong> {profile.investorPreferences?.reportingFrequency || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Lista de espera</h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              {(profile.waitlistFunds || []).length ? (
                (profile.waitlistFunds || []).map((fund) => <span key={fund}>• {fund}</span>)
              ) : (
                <span>Sin fondos aún.</span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/funds-explore"
              >
                Explorar fondos
              </Link>
            </div>
          </div>
        </>
      )}

      {profile.role === "Fund Manager" && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Perfil del gestor</h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>
                <strong>Estrategia:</strong> {profile.fundManagerProfile?.strategyTypeLabel || "—"}
              </span>
              <span>
                <strong>Capital:</strong> {profile.fundManagerProfile?.capitalStatus || "—"}
              </span>
              <span>
                <strong>Track record:</strong> {profile.fundManagerProfile?.trackRecordLength || "—"}
              </span>
              <span>
                <strong>Estructura:</strong> {profile.fundManagerProfile?.operatingStructure || "—"}
              </span>
              <span>
                <strong>Descripción:</strong> {profile.fundManagerProfile?.strategyDescription || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Detalles del fondo</h3>
            <p className="mt-2 text-sm text-slate-600">
              Completa los datos de tu fondo desde el dashboard de gestores para enviarlo a revisión.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/dashboard/manager/overview"
              >
                Ir al dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      {profile.role === "Family Office" && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Preferencias Family Office</h3>
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
              <span>
                <strong>Interacción:</strong> {profile.familyOfficePreferences?.interactionLevel || "—"}
              </span>
              <span>
                <strong>Reporting:</strong> {profile.familyOfficePreferences?.reportingCustomization || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Acceso directo</h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>• Chat directo con gestores verificados</span>
              <span>• Canal preferente con MasterUser</span>
              <span>• Informes personalizados por fondo</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/family-dashboard"
              >
                Ir al dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          href="/"
        >
          Volver al inicio
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
          type="button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
