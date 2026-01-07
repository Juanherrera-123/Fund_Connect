"use client";

import { useMemo } from "react";

import { DEFAULT_FUND_MANAGER_PROFILES, STORAGE_KEYS, baseVerifiedFunds } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { ContactRequest, FundApplication, UserProfile } from "@/lib/types";

export default function MessagesDashboard() {
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [contactRequests] = useLocalStorage<ContactRequest[]>(STORAGE_KEYS.contactRequests, []);

  const columns = useMemo(() => {
    const verifiedFundApplications = fundApplications.filter(
      (application) => application.status === "verified"
    );
    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const overrides = new Map(
      verifiedFundApplications.map((application) => [
        application.id,
        {
          id: application.id,
          title: application.fundName,
          subtitle: `${application.strategyLabel || application.strategy || "Multi-Strategy"} · ${
            application.country || "Global"
          }`,
        },
      ])
    );
    const funds = [
      ...baseVerifiedFunds.map((fund) => {
        const override = overrides.get(fund.id);
        return (
          override ?? {
            id: fund.id,
            title: fund.name,
            subtitle: `${fund.strategy} · ${fund.country}`,
          }
        );
      }),
      ...verifiedFundApplications
        .filter((application) => !baseIds.has(application.id))
        .map((application) => ({
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

    const contactMessages = contactRequests.map((request) => {
      const details = [
        request.email,
        request.phone,
        request.message?.trim().length ? request.message.trim() : null,
      ].filter(Boolean);
      return {
        id: request.id,
        title: request.name,
        subtitle: details.join(" · "),
      };
    });

    return [
      { title: "Fondos", titleKey: "dashboardMessagesFunds", items: funds },
      { title: "Inversionistas", titleKey: "dashboardMessagesInvestors", items: investors },
      { title: "Family offices", titleKey: "dashboardMessagesFamilyOffices", items: familyOffices },
      {
        title: "Solicitudes de asesoría",
        titleKey: "dashboardMessagesContact",
        items: contactMessages,
      },
    ];
  }, [contactRequests, fundApplications, profiles]);

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
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900" data-i18n={column.titleKey}>
                {column.title}
              </h2>
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
                    <span data-i18n="dashboardMessagesEmpty">Sin mensajes por ahora.</span>
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
