"use client";

import { useMemo } from "react";

import { isActiveStatus, normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFundsCollection } from "@/lib/funds";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session, UserProfile } from "@/lib/types";

export default function FundManagerMessages() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const fundApplications = useFundsCollection({ userUid: session?.id ?? session?.uid });
  const authRole = session?.authRole ?? normalizeRole(session?.role);
  const isActive = isActiveStatus(session?.status);

  const profile = useMemo(() => {
    if (!session || authRole !== "manager" || !isActive) return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [authRole, isActive, profiles, session]);

  const fundInfo = useMemo(() => {
    if (!profile) return null;
    const application = fundApplications.find((item) => item.user.id === profile.id);
    if (!application) {
      return null;
    }
    return {
      id: application.id,
      title: application.fundData.fundName,
      subtitle:
        application.fundData.strategyLabel ?? application.fundData.strategy ?? "Multi-Strategy",
    };
  }, [fundApplications, profile]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleMessages">
          Messages
        </h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900" data-i18n="dashboardManagerYourFund">
              Tu fondo
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {fundInfo ? (
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-xs font-semibold text-slate-900">{fundInfo.title}</p>
                  <p className="text-xs text-slate-500">{fundInfo.subtitle}</p>
                </li>
              ) : (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                  <span data-i18n="dashboardManagerNoFund">
                    Sin fondo asignado aún.
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900" data-i18n="dashboardManagerInbox">
              Inbox
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                <span data-i18n="dashboardMessagesEmpty">Sin mensajes por ahora.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
