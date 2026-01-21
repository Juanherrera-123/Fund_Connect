"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useUserProfiles } from "@/lib/useUserProfiles";
import type { Session } from "@/lib/types";

export function ProfileView() {
  const router = useRouter();
  const [session, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useUserProfiles({ uid: session?.id ?? session?.uid });
  const authRole = session?.authRole ?? normalizeRole(session?.role);
  const profile = useMemo(() => {
    if (!session || authRole === "master") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [authRole, profiles, session]);

  const handleLogout = () => {
    setSession(null);
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (isProtectedPath(pathname)) {
        router.push("/auth");
      }
    }
  };

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
