"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

export function PendingReviewView() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useFirebaseStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const profile = useMemo(() => {
    if (!session || session.role !== "Fund Manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  const myApplications = fundApplications.filter((item) => item.managerId === profile.id);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="pendingReviewProfileTitle">
          Perfil
        </h3>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span data-i18n="pendingReviewOnboardingStatus">Estado de onboarding</span>
        </p>
        <span className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <span data-i18n="dashboardStatusPending">
            {profile.fundManagerProfile?.status || "Pendiente"}
          </span>
        </span>
        <p className="mt-2 text-xs text-slate-500" data-i18n="pendingReviewMasterNote">
          Revisión por MasterUser.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="pendingReviewFundsTitle">
          Fondos registrados
        </h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          {myApplications.length ? (
            myApplications.map((item) => (
              <span key={item.id}>• {item.fundName} ({item.status})</span>
            ))
          ) : (
            <span data-i18n="pendingReviewNoFunds">No hay fondos registrados.</span>
          )}
        </div>
      </div>
    </div>
  );
}
