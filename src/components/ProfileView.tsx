"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { STORAGE_KEYS, formatStrategyList } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useWaitlistCollection } from "@/lib/waitlist";
import type { Session, UserProfile } from "@/lib/types";

export function ProfileView() {
  const router = useRouter();
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const waitlistRequests = useWaitlistCollection();
  const [session, setSession] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const profile = useMemo(() => {
    if (!session || session.role === "MasterUser") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const handleLogout = () => {
    setSession(null);
    router.push("/auth");
  };

  const waitlistItems = useMemo(() => {
    if (!profile) return [];
    return waitlistRequests.filter((request) => request.requesterId === profile.id);
  }, [profile, waitlistRequests]);


  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="profileLoginPrompt">Inicia sesión para ver tu perfil.</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="profileEmailLabel">
            Email
          </p>
          <p>
            <strong>{profile.email}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="profilePhoneLabel">
            Teléfono
          </p>
          <p>
            <strong>{profile.phone}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="profileCountryLabel">
            País
          </p>
          <p>
            <strong>{profile.country}</strong>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="profileStatusLabel">
            Estado
          </p>
          <span
            className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
              profile.role === "Fund Manager"
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <span
              data-i18n={
                profile.role === "Fund Manager"
                  ? "dashboardStatusPending"
                  : "dashboardStatusActive"
              }
            >
              {profile.role === "Fund Manager"
                ? profile.fundManagerProfile?.status || "Pendiente"
                : "Activo"}
            </span>
          </span>
        </div>
      </div>

      {profile.role === "Investor" && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileInvestorPreferences">
              Preferencias del inversionista
            </h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>
                <strong data-i18n="profileObjectiveLabel">Objetivo:</strong>{" "}
                {profile.investorPreferences?.objective || "—"}
              </span>
              <span>
                <strong data-i18n="profileHorizonLabel">Horizonte:</strong>{" "}
                {profile.investorPreferences?.horizon || "—"}
              </span>
              <span>
                <strong data-i18n="profileRiskLabel">Riesgo:</strong>{" "}
                {profile.investorPreferences?.riskLevel || "—"}
              </span>
              <span>
                <strong data-i18n="profileStrategiesLabel">Estrategias:</strong>{" "}
                {formatStrategyList(profile.investorPreferences?.strategyPreferences)}
              </span>
              <span>
                <strong data-i18n="profileReportingLabel">Reporting:</strong>{" "}
                {profile.investorPreferences?.reportingFrequency || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileWaitlistTitle">
              Lista de espera
            </h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              {waitlistItems.length ? (
                waitlistItems.map((request) => <span key={request.id}>• {request.fundName}</span>)
              ) : (
                <span data-i18n="profileWaitlistEmpty">Sin fondos aún.</span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/funds-explore"
                data-i18n="profileExploreFunds"
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
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileManagerProfile">
              Perfil del gestor
            </h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>
                <strong data-i18n="profileManagerStrategyLabel">Estrategia:</strong>{" "}
                {profile.fundManagerProfile?.strategyTypeLabel || "—"}
              </span>
              <span>
                <strong data-i18n="profileManagerCapitalLabel">Capital:</strong>{" "}
                {profile.fundManagerProfile?.capitalStatus || "—"}
              </span>
              <span>
                <strong data-i18n="profileManagerTrackRecordLabel">Track record:</strong>{" "}
                {profile.fundManagerProfile?.trackRecordLength || "—"}
              </span>
              <span>
                <strong data-i18n="profileManagerStructureLabel">Estructura:</strong>{" "}
                {profile.fundManagerProfile?.operatingStructure || "—"}
              </span>
              <span>
                <strong data-i18n="profileManagerDescriptionLabel">Descripción:</strong>{" "}
                {profile.fundManagerProfile?.strategyDescription || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileFundDetailsTitle">
              Detalles del fondo
            </h3>
            <p className="mt-2 text-sm text-slate-600" data-i18n="profileFundDetailsLead">
              Completa los datos de tu fondo desde el dashboard de gestores para enviarlo a revisión.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/dashboard/manager/overview"
                data-i18n="profileGoToDashboard"
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
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileFamilyPreferences">
              Preferencias Family Office
            </h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span>
                <strong data-i18n="profileFamilyRoleLabel">Rol:</strong>{" "}
                {profile.familyOfficePreferences?.managementRole || "—"}
              </span>
              <span>
                <strong data-i18n="profileFamilyDiversificationLabel">Diversificación:</strong>{" "}
                {profile.familyOfficePreferences?.diversificationLevel || "—"}
              </span>
              <span>
                <strong data-i18n="profileStrategiesLabel">Estrategias:</strong>{" "}
                {formatStrategyList(profile.familyOfficePreferences?.strategyPreferences)}
              </span>
              <span>
                <strong data-i18n="profileFamilyInteractionLabel">Interacción:</strong>{" "}
                {profile.familyOfficePreferences?.interactionLevel || "—"}
              </span>
              <span>
                <strong data-i18n="profileReportingLabel">Reporting:</strong>{" "}
                {profile.familyOfficePreferences?.reportingCustomization || "—"}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900" data-i18n="profileDirectAccessTitle">
              Acceso directo
            </h3>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              <span data-i18n="profileDirectAccessChat">• Chat directo con gestores verificados</span>
              <span data-i18n="profileDirectAccessChannel">• Canal preferente con MasterUser</span>
              <span data-i18n="profileDirectAccessReports">• Informes personalizados por fondo</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                href="/family-dashboard"
                data-i18n="profileGoToDashboard"
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
          data-i18n="profileBackHome"
        >
          Volver al inicio
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
          type="button"
          onClick={handleLogout}
          data-i18n="profileLogout"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
