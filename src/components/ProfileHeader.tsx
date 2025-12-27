"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session, UserProfile } from "@/lib/types";

export function ProfileHeader() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);

  const profile = useMemo(() => {
    if (!session || session.role === "MasterUser") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  return (
    <>
      <p className="eyebrow">Profile</p>
      <div className="page-title-row">
        <h1>{profile?.fullName || "Tu perfil"}</h1>
        <div className="micro-tag">{profile?.role || "—"}</div>
      </div>
      <p className="lead compact">{profile?.email || "Resumen de tu perfil y preferencias."}</p>
    </>
  );
}
