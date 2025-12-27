"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  STRATEGY_OPTIONS,
  formatStrategyList,
  getStrategyLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, MasterNotification, Session, UserProfile } from "@/lib/types";

export function ProfileView() {
  const router = useRouter();
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [session, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [, setFundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [notifications, setNotifications] = useLocalStorage<MasterNotification[]>(
    STORAGE_KEYS.notifications,
    []
  );
  const [fundStatus, setFundStatus] = useState("");

  const profile = useMemo(() => {
    if (!session || session.role === "MasterUser") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const updateProfile = (updatedProfile: UserProfile) => {
    setProfiles((prev) => prev.map((item) => (item.id === updatedProfile.id ? updatedProfile : item)));
  };

  const handleLogout = () => {
    setSession(null);
    router.push("/auth");
  };

  const handleFundRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;
    setFundStatus("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.fundName || !payload.country || !payload.region || !payload.aum || !payload.strategy) {
      setFundStatus("Completa todos los campos requeridos.");
      return;
    }

    const application: FundApplication = {
      id: `fund-${Date.now()}`,
      fundName: String(payload.fundName),
      country: String(payload.country),
      region: String(payload.region),
      aum: String(payload.aum),
      strategy: String(payload.strategy),
      strategyLabel: getStrategyLabel(String(payload.strategy)),
      description: String(payload.description || ""),
      status: "pending",
      managerId: profile.id,
      submittedAt: new Date().toISOString(),
    };

    setFundApplications((prev) => [application, ...prev]);
    const notification: MasterNotification = {
      id: `notif-${Date.now()}`,
      type: "fund-registration",
      title: "Nuevo fondo en revisión",
      message: `${profile.fullName} registró ${application.fundName}.`,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notification, ...prev]);
    setFundStatus("Fondo enviado a revisión.");
    event.currentTarget.reset();
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
            <h3>Registrar fondo</h3>
            <form className="inline-form" onSubmit={handleFundRegistration}>
              <label>
                <span>Nombre del fondo</span>
                <input type="text" name="fundName" placeholder="Nombre del fondo" required />
              </label>
              <label>
                <span>País</span>
                <input type="text" name="country" placeholder="País" required />
              </label>
              <label>
                <span>Región</span>
                <input type="text" name="region" placeholder="LatAm, EU, Global" required />
              </label>
              <label>
                <span>AUM estimado</span>
                <input type="text" name="aum" placeholder="$250M" required />
              </label>
              <label>
                <span>Estrategia principal</span>
                <select name="strategy" required>
                  <option value="">Selecciona una estrategia</option>
                  {STRATEGY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Descripción breve</span>
                <textarea name="description" rows={3} placeholder="Resumen del fondo y foco operativo" required></textarea>
              </label>
              <button className="btn btn-primary" type="submit">
                Enviar a revisión
              </button>
              <p className="form-status" aria-live="polite">
                {fundStatus}
              </p>
            </form>
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
