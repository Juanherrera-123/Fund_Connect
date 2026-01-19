"use client";

import { useMemo } from "react";

import { normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFundsCollection } from "@/lib/funds";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { Session, UserProfile } from "@/lib/types";

export function PendingReviewView() {
  const [session] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const fundApplications = useFundsCollection({ userUid: session?.id ?? session?.uid });
  const authRole = session?.authRole ?? normalizeRole(session?.role);

  const profile = useMemo(() => {
    if (!session || authRole !== "manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [authRole, profiles, session]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  const myApplications = fundApplications.filter((item) => item.user.id === profile.id);
  const statusLabels: Record<string, string> = {
    pending: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado",
  };

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
          Revisión por el usuario maestro.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900" data-i18n="pendingReviewFundsTitle">
          Fondos registrados
        </h3>
        <div className="mt-3 grid gap-1 text-sm text-slate-600">
          {myApplications.length ? (
            myApplications.map((item) => (
              <span key={item.id}>
                • {item.fundData.fundName} ({statusLabels[item.status] ?? item.status})
              </span>
            ))
          ) : (
            <span data-i18n="pendingReviewNoFunds">No hay fondos registrados.</span>
          )}
        </div>
      </div>
    </div>
  );
}
