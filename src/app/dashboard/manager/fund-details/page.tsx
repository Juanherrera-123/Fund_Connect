"use client";

import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  baseVerifiedFunds,
  countryFlags,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

const riskOptions = ["Controlado", "Medio", "Arriesgado"];
const reportOptions = ["Semanal", "Quincenal", "Mensual"];

const parseNumericValue = (value: FormDataEntryValue | null) => {
  if (value === null) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const parsed = Number.parseFloat(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
};

export default function FundDetailsPage() {
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [fundApplications, setFundApplications] = useLocalStorage<FundApplication[]>(
    STORAGE_KEYS.fundApplications,
    []
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [linkFields, setLinkFields] = useState<string[]>(["", "", ""]);

  const profile = useMemo(() => {
    if (!session || session.role !== "Fund Manager") return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [profiles, session]);

  const baseFund = useMemo(() => {
    if (!profile?.fundId) return null;
    return baseVerifiedFunds.find((fund) => fund.id === profile.fundId) ?? null;
  }, [profile]);

  const existingApplication = useMemo(() => {
    if (!profile) return null;
    if (profile.fundId) {
      const byId = fundApplications.find((application) => application.id === profile.fundId);
      if (byId) return byId;
    }
    return fundApplications.find((application) => application.managerId === profile.id) ?? null;
  }, [fundApplications, profile]);

  useEffect(() => {
    if (!existingApplication?.livePerformanceLinks?.length) {
      setLinkFields(["", "", ""]);
      return;
    }
    const nextLinks = [
      existingApplication.livePerformanceLinks[0] ?? "",
      existingApplication.livePerformanceLinks[1] ?? "",
      existingApplication.livePerformanceLinks[2] ?? "",
    ];
    setLinkFields(nextLinks);
  }, [existingApplication]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Inicia sesión como gestor para ver este panel.
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    const formData = new FormData(event.currentTarget);
    const fundName = String(formData.get("fundName") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const operatingTime = String(formData.get("operatingTime") || "").trim();
    const country = String(formData.get("country") || "").trim();
    const riskManagement = String(formData.get("riskManagement") || "").trim();
    const minInvestment = String(formData.get("minInvestment") || "").trim();
    const performanceFee = String(formData.get("performanceFee") || "").trim();
    const subscriptionFee = String(formData.get("subscriptionFee") || "").trim();
    const reportsFrequency = String(formData.get("reportsFrequency") || "").trim();
    const normalizedLinks = linkFields.map((link) => link.trim()).filter(Boolean);

    if (!fundName || !description || !operatingTime || !country || !riskManagement || !reportsFrequency) {
      setStatusMessage("Completa los campos requeridos.");
      return;
    }

    if (!normalizedLinks.length) {
      setStatusMessage("Agrega al menos un link de performance.");
      return;
    }

    const fundId = profile.fundId ?? existingApplication?.id ?? `fund-${Date.now()}`;
    const isBaseFund = baseVerifiedFunds.some((fund) => fund.id === fundId);
    const status =
      existingApplication?.status === "verified" || isBaseFund ? "verified" : "pending";
    const strategyLabel = profile.fundManagerProfile?.strategyTypeLabel ?? profile.fundManagerProfile?.strategyType;

    const payload: FundApplication = {
      id: fundId,
      fundName,
      country,
      region: existingApplication?.region ?? baseFund?.region ?? "Global",
      aum: existingApplication?.aum ?? baseFund?.aum ?? "N/A",
      strategy: existingApplication?.strategy ?? baseFund?.strategy ?? profile.fundManagerProfile?.strategyType ?? "Multi-Strategy",
      strategyLabel: existingApplication?.strategyLabel ?? baseFund?.strategy ?? strategyLabel ?? "Multi-Strategy",
      description,
      status,
      managerId: profile.id,
      submittedAt: existingApplication?.submittedAt ?? new Date().toISOString(),
      yearProfit: parseNumericValue(formData.get("monthlyProfit")),
      monthlyProfit: parseNumericValue(formData.get("monthlyProfit")),
      drawdownTarget: parseNumericValue(formData.get("drawdownTarget")),
      maxDrawdown: parseNumericValue(formData.get("maxDrawdown")),
      tradesPerMonth: parseNumericValue(formData.get("tradesPerMonth")),
      winRate: parseNumericValue(formData.get("tradesPerMonth")),
      riskLevel: riskManagement,
      riskManagement,
      livePerformanceLinks: normalizedLinks,
      minInvestment,
      performanceFee,
      subscriptionFee,
      reportsFrequency,
      operatingTime,
    };

    setFundApplications((prev) => {
      const existingIndex = prev.findIndex((application) => application.id === fundId);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = payload;
        return next;
      }
      return [payload, ...prev];
    });

    if (!profile.fundId) {
      setProfiles((prev) =>
        prev.map((item) =>
          item.id === profile.id
            ? {
                ...item,
                fundId,
                onboarding: { ...item.onboarding, fundId },
              }
            : item
        )
      );
    }

    setStatusMessage(
      status === "verified"
        ? "Detalles actualizados para el fondo verificado."
        : "Detalles enviados. El MasterUser aprobará el fondo."
    );
  };

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Fund details</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Nombre del fondo</span>
            <input
              name="fundName"
              defaultValue={existingApplication?.fundName ?? baseFund?.name ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">País</span>
            <select
              name="country"
              defaultValue={existingApplication?.country ?? baseFund?.country ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Selecciona</option>
              {Object.entries(countryFlags).map(([country, flag]) => (
                <option key={country} value={country}>
                  {flag} {country}
                </option>
              ))}
            </select>
          </label>

          <label className="md:col-span-2 flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Descripción</span>
            <textarea
              name="description"
              rows={3}
              defaultValue={existingApplication?.description ?? baseFund?.description ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Tiempo operando</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="operatingTime"
                defaultValue={existingApplication?.operatingTime ?? ""}
                required
                placeholder="Ej: 3"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">años</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Profit mensual (último año)</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="monthlyProfit"
                defaultValue={existingApplication?.monthlyProfit ?? existingApplication?.yearProfit ?? ""}
                placeholder="Ej: 2.4"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Drawdown target</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="drawdownTarget"
                defaultValue={existingApplication?.drawdownTarget ?? ""}
                placeholder="Ej: 5"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Max drawdown</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="maxDrawdown"
                defaultValue={existingApplication?.maxDrawdown ?? baseFund?.maxDrawdown ?? ""}
                placeholder="Ej: 8"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Trades mensuales</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="tradesPerMonth"
                defaultValue={existingApplication?.tradesPerMonth ?? ""}
                placeholder="Ej: 60"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Gestión de riesgo</span>
            <select
              name="riskManagement"
              defaultValue={existingApplication?.riskManagement ?? existingApplication?.riskLevel ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Selecciona</option>
              {riskOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600">Live performance tracking</p>
            {linkFields.map((link, index) => (
              <input
                key={`link-${index}`}
                type="url"
                placeholder={`Link Myfxbook ${index + 1}`}
                value={link}
                onChange={(event) =>
                  setLinkFields((prev) =>
                    prev.map((item, position) => (position === index ? event.target.value : item))
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            ))}
          </div>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Min investment</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="minInvestment"
                defaultValue={existingApplication?.minInvestment ?? ""}
                placeholder="Ej: 50000"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">USD</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Performance fee</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="performanceFee"
                defaultValue={existingApplication?.performanceFee ?? ""}
                placeholder="Ej: 20"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Subscription fee</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="subscriptionFee"
                defaultValue={existingApplication?.subscriptionFee ?? ""}
                placeholder="Ej: 1"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Reports</span>
            <select
              name="reportsFrequency"
              defaultValue={existingApplication?.reportsFrequency ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Selecciona</option>
              {reportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Guardar detalles
            </button>
            <p className="text-xs text-slate-500" aria-live="polite">
              {statusMessage}
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
