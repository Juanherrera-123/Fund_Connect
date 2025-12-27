"use client";

import { useMemo } from "react";

import { STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, UserProfile } from "@/lib/types";

export default function MessagesDashboard() {
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);

  const columns = useMemo(() => {
    const verifiedFundApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const funds = [
      ...baseVerifiedFunds.map((fund) => ({
        id: fund.id,
        title: fund.name,
        subtitle: `${fund.strategy} · ${fund.country}`,
      })),
      ...verifiedFundApplications.map((application) => ({
        id: application.id,
        title: application.fundName,
        subtitle: `${application.strategyLabel || application.strategy || "Multi-Strategy"} · ${
          application.country || "Global"
        }`,
      })),
    ];

    const investors = profiles
      .filter((profile) => profile.role === "Investor")
      .map((profile) => ({
        id: profile.id,
        title: profile.fullName,
        subtitle: profile.country,
      }));

    const familyOffices = profiles
      .filter((profile) => profile.role === "Family Office")
      .map((profile) => ({
        id: profile.id,
        title: profile.fullName,
        subtitle: profile.country,
      }));

    return [
      { title: "Fondos", items: funds },
      { title: "Inversionistas", items: investors },
      { title: "Family offices", items: familyOffices },
    ];
  }, [fundApplications, profiles]);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">{column.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {column.items.length ? (
                  column.items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                    </li>
                  ))
                ) : (
                  <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                    Sin mensajes por ahora.
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
