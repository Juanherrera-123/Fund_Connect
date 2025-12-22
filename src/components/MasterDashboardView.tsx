"use client";

import { useMemo } from "react";

import { STORAGE_KEYS, formatStrategyList } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, MasterNotification, Session, UserProfile } from "@/lib/types";

export function MasterDashboardView() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [fundApplications, setFundApplications] = useLocalStorage<FundApplication[]>(
    STORAGE_KEYS.fundApplications,
    []
  );
  const [notifications, setNotifications] = useLocalStorage<MasterNotification[]>(
    STORAGE_KEYS.notifications,
    []
  );

  const isAuthorized = session?.role === "MasterUser";

  const pendingManagers = useMemo(
    () => profiles.filter((profile) => profile.role === "Fund Manager" && profile.fundManagerProfile?.status === "pending-review"),
    [profiles]
  );
  const pendingFunds = useMemo(
    () => fundApplications.filter((application) => application.status === "pending"),
    [fundApplications]
  );

  if (!isAuthorized) {
    return <div className="status-banner">Acceso exclusivo para MasterUser.</div>;
  }

  const approveManager = (managerId: string) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === managerId
          ? {
              ...profile,
              fundManagerProfile: { ...profile.fundManagerProfile, status: "verified" },
            }
          : profile
      )
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: "manager-approved",
        title: "Perfil aprobado",
        message: "Un gestor fue aprobado por MasterUser.",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const approveFund = (fundId: string) => {
    setFundApplications((prev) =>
      prev.map((application) => (application.id === fundId ? { ...application, status: "verified" } : application))
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: "fund-approved",
        title: "Fondo aprobado",
        message: "Un fondo fue aprobado para gestores verificados.",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <>
      {notifications.length ? (
        <div className="profile-grid">
          {notifications.slice(0, 4).map((note) => (
            <div className="profile-card" key={note.id}>
              <p className="small">{new Date(note.createdAt).toLocaleString()}</p>
              <h3>{note.title}</h3>
              <p className="small">{note.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="status-banner">Sin notificaciones pendientes.</div>
      )}

      <section className="profile-section">
        <div className="section-header compact">
          <h2>Solicitudes pendientes</h2>
          <p className="lead compact">Fondos y perfiles en revisión para aprobación.</p>
        </div>
        <div className="dashboard-grid">
          {pendingManagers.map((manager) => (
            <div className="dashboard-card" key={manager.id}>
              <span className="status-pill warning">Gestor pendiente</span>
              <h3>{manager.fullName}</h3>
              <p className="small">{manager.email}</p>
              <p className="small">{manager.fundManagerProfile?.strategyTypeLabel}</p>
              <button className="btn btn-primary" type="button" onClick={() => approveManager(manager.id)}>
                Aprobar perfil
              </button>
            </div>
          ))}
          {pendingFunds.map((fund) => (
            <div className="dashboard-card" key={fund.id}>
              <span className="status-pill warning">Fondo pendiente</span>
              <h3>{fund.fundName}</h3>
              <p className="small">{fund.strategyLabel} · {fund.region}</p>
              <button className="btn btn-primary" type="button" onClick={() => approveFund(fund.id)}>
                Aprobar fondo
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <div className="section-header compact">
          <h2>Resúmenes de onboarding</h2>
          <p className="lead compact">Visión rápida para decisiones de advisory.</p>
        </div>
        <div className="dashboard-grid">
          {profiles.length ? (
            profiles.map((profile) => {
              const isInvestor = profile.role === "Investor";
              const isManager = profile.role === "Fund Manager";
              const summary = isInvestor
                ? `Objetivo: ${profile.investorPreferences?.objective || "—"}\nRiesgo: ${profile.investorPreferences?.riskLevel || "—"}\nEstrategias: ${formatStrategyList(profile.investorPreferences?.strategyPreferences)}`
                : isManager
                ? `Estrategia: ${profile.fundManagerProfile?.strategyTypeLabel || "—"}\nCapital: ${profile.fundManagerProfile?.capitalStatus || "—"}\nTrack record: ${profile.fundManagerProfile?.trackRecordLength || "—"}`
                : `Rol: ${profile.familyOfficePreferences?.managementRole || "—"}\nDiversificación: ${profile.familyOfficePreferences?.diversificationLevel || "—"}\nEstrategias: ${formatStrategyList(profile.familyOfficePreferences?.strategyPreferences)}`;

              return (
                <div className="dashboard-card" key={profile.id}>
                  <span className="status-pill success">{profile.role}</span>
                  <h3>{profile.fullName}</h3>
                  <p className="small">{profile.email}</p>
                  <p className="small" style={{ whiteSpace: "pre-line" }}>{summary}</p>
                </div>
              );
            })
          ) : (
            <div className="status-banner">No hay perfiles registrados aún.</div>
          )}
        </div>
      </section>
    </>
  );
}
