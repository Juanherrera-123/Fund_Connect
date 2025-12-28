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
    return <div className="status-banner">Inicia sesión para ver tu perfil.</div>;
  }

  return (
    <>
      <div className="profile-grid">
        <div className="profile-card">
          <p className="small">Email</p>
          <p>
            <strong>{profile.email}</strong>
          </p>
        </div>
        <div className="profile-card">
          <p className="small">Teléfono</p>
          <p>
            <strong>{profile.phone}</strong>
          </p>
        </div>
        <div className="profile-card">
          <p className="small">País</p>
          <p>
            <strong>{profile.country}</strong>
          </p>
        </div>
        <div className="profile-card">
          <p className="small">Estado</p>
          <span className={`status-pill ${profile.role === "Fund Manager" ? "warning" : "success"}`}>
            {profile.role === "Fund Manager" ? profile.fundManagerProfile?.status || "Pendiente" : "Activo"}
          </span>
        </div>
      </div>

      {profile.role === "Investor" && (
        <>
          <div className="profile-card">
            <h3>Preferencias del inversionista</h3>
            <div className="data-list">
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
          <div className="profile-card">
            <h3>Lista de espera</h3>
            <div className="data-list">
              {(profile.waitlistFunds || []).length ? (
                (profile.waitlistFunds || []).map((fund) => <span key={fund}>• {fund}</span>)
              ) : (
                <span>Sin fondos aún.</span>
              )}
            </div>
            <div className="profile-actions">
              <Link className="btn btn-primary" href="/funds-explore">
                Explorar fondos
              </Link>
            </div>
          </div>
        </>
      )}

      {profile.role === "Fund Manager" && (
        <>
          <div className="profile-card">
            <h3>Perfil del gestor</h3>
            <div className="data-list">
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
          <div className="profile-card">
            <h3>Detalles del fondo</h3>
            <p className="small">
              Completa los datos de tu fondo desde el dashboard de gestores para enviarlo a revisión.
            </p>
            <div className="profile-actions">
              <Link className="btn btn-primary" href="/dashboard/manager/overview">
                Ir al dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      {profile.role === "Family Office" && (
        <>
          <div className="profile-card">
            <h3>Preferencias Family Office</h3>
            <div className="data-list">
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
          <div className="profile-card">
            <h3>Acceso directo</h3>
            <div className="data-list">
              <span>• Chat directo con gestores verificados</span>
              <span>• Canal preferente con MasterUser</span>
              <span>• Informes personalizados por fondo</span>
            </div>
            <div className="profile-actions">
              <Link className="btn btn-primary" href="/family-dashboard">
                Ir al dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      <div className="profile-actions">
        <Link className="btn btn-secondary" href="/">
          Volver al inicio
        </Link>
        <button className="btn btn-primary" type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
