"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

export function PendingReviewView() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile = useMemo(() => {
    if (!session || session.role !== "Fund Manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  if (!profile) {
    return <div className="status-banner">Inicia sesión como gestor para ver este panel.</div>;
  }

  const myApplications = fundApplications.filter((item) => item.managerId === profile.id);

  return (
    <div className="profile-grid">
      <div className="profile-card">
        <h3>Perfil</h3>
        <p className="small">Estado de onboarding</p>
        <span className="status-pill warning">{profile.fundManagerProfile?.status || "Pendiente"}</span>
        <p className="small">Revisión por MasterUser.</p>
      </div>
      <div className="profile-card">
        <h3>Fondos registrados</h3>
        <div className="data-list">
          {myApplications.length ? (
            myApplications.map((item) => (
              <span key={item.id}>• {item.fundName} ({item.status})</span>
            ))
          ) : (
            <span>No hay fondos registrados.</span>
          )}
        </div>
      </div>
    </div>
  );
}
