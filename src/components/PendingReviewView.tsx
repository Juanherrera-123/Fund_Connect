"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { normalizeRole } from "@/lib/auth/claims";
import { getFirebaseAuth } from "@/lib/firebase";
import { useFundsCollection } from "@/lib/funds";
import { useUserProfiles } from "@/lib/useUserProfiles";

export function PendingReviewView() {
  const [authUid, setAuthUid] = useState<string | null>(null);
  const [profiles] = useUserProfiles({ uid: authUid });
  const fundApplications = useFundsCollection({ userUid: authUid ?? undefined });

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthUid(null);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUid(user?.uid ?? null);
    });
    return () => unsubscribe();
  }, []);

  const profile = useMemo(() => {
    if (!authUid) return null;
    return profiles.find((item) => item.id === authUid) ?? null;
  }, [authUid, profiles]);

  const authRole = profile?.role ? normalizeRole(profile.role) : null;

  if (!authUid) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  if (authRole !== "manager") {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  const myApplications = fundApplications.filter((item) => item.user.uid === authUid);
  const statusLabels: Record<string, string> = {
    pending: "Pendiente",
    approved: "Verificado",
    verified: "Verificado",
    rejected: "Rechazado",
  };

  if (!myApplications.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        <p className="font-semibold text-slate-900">Submitting...</p>
        <p className="mt-2">
          Aún no encontramos tu solicitud. Si el problema persiste, vuelve al formulario para
          enviarlo nuevamente.
        </p>
        <a
          className="mt-4 inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
          href="/dashboard/manager/fund-details"
        >
          Volver al formulario
        </a>
      </div>
    );
  }

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
            {statusLabels[myApplications[0]?.status ?? "pending"] ?? "Pendiente"}
          </span>
        </span>
        <p className="mt-2 text-xs text-slate-500" data-i18n="pendingReviewMasterNote">
          ¡Tu solicitud fue enviada a revisión con éxito! Un miembro de nuestro equipo estará en
          contacto contigo en las siguientes 24 horas.
        </p>
        <a
          className="mt-4 inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
          href="/"
        >
          Volver al inicio
        </a>
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
