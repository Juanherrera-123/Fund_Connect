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
    return <div className="status-banner">Inicia sesión como Family Office.</div>;
  }

  return (
    <div className="profile-grid">
      <div className="profile-card">
        <h3>Mandato activo</h3>
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
        </div>
      </div>
      <div className="profile-card">
        <h3>Interacción y reporting</h3>
        <div className="data-list">
          <span>
            <strong>Nivel de interacción:</strong> {profile.familyOfficePreferences?.interactionLevel || "—"}
          </span>
          <span>
            <strong>Reporting:</strong> {profile.familyOfficePreferences?.reportingCustomization || "—"}
          </span>
          <span>Acceso directo con gestores y MasterUser activo.</span>
        </div>
      </div>
      <div className="profile-card">
        <h3>Acciones rápidas</h3>
        <div className="profile-actions">
          <Link className="btn btn-primary" href="/gestores-verificados">
            Ver gestores verificados
          </Link>
          <Link className="btn btn-secondary" href="/profile">
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
