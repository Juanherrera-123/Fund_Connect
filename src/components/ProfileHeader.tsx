"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { Session, UserProfile } from "@/lib/types";

export function ProfileHeader() {
  const [session] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);

  const profile = useMemo(() => {
    if (!session || session.role === "MasterUser") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  return (
    <>
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500"
        data-i18n="profileEyebrow"
      >
        Profile
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold text-slate-900">
          {profile?.fullName || (
            <span data-i18n="profileTitleFallback">Tu perfil</span>
          )}
        </h1>
        <div className="rounded-full border border-igates-500/20 bg-igates-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-igates-700">
          {profile?.role || "—"}
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-slate-600">
        {profile?.email || <span data-i18n="profileLeadFallback">Resumen de tu perfil y preferencias.</span>}
      </p>
    </>
  );
}
