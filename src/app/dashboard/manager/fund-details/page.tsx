"use client";

import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_FUND_MANAGER_PROFILES,
  STORAGE_KEYS,
  baseVerifiedFunds,
  countryFlags,
} from "@/lib/igatesData";
import { useLanguage } from "@/components/LanguageProvider";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

const riskOptions = [
  { label: "Controlado", labelKey: "dashboardRiskControlled" },
  { label: "Medio", labelKey: "dashboardRiskMedium" },
  { label: "Arriesgado", labelKey: "dashboardRiskAggressive" },
];
const reportOptions = [
  { label: "Semanal", labelKey: "dashboardReportWeekly" },
  { label: "Quincenal", labelKey: "dashboardReportBiweekly" },
  { label: "Mensual", labelKey: "dashboardReportMonthly" },
];

const parseNumericValue = (value: FormDataEntryValue | null) => {
  if (value === null) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const parsed = Number.parseFloat(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });

export default function FundDetailsPage() {
  const { strings } = useLanguage();
  const [session] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    DEFAULT_FUND_MANAGER_PROFILES
  );
  const [fundApplications, setFundApplications] = useFirebaseStorage<FundApplication[]>(
    STORAGE_KEYS.fundApplications,
    []
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [linkFields, setLinkFields] = useState<string[]>(["", "", ""]);
  const [presentationAsset, setPresentationAsset] = useState<FundApplication["presentationAsset"]>(null);
  const [logoAsset, setLogoAsset] = useState<string | null>(null);
  const [trackRecordStatements, setTrackRecordStatements] = useState<
    FundApplication["trackRecordStatements"]
  >([]);

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

  useEffect(() => {
    setPresentationAsset(existingApplication?.presentationAsset ?? null);
    setLogoAsset(existingApplication?.logoUrl ?? baseFund?.logoUrl ?? null);
    setTrackRecordStatements(existingApplication?.trackRecordStatements ?? []);
  }, [baseFund?.logoUrl, existingApplication]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
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
    const winRatio = String(formData.get("winRatio") || "").trim();
    const normalizedLinks = linkFields.map((link) => link.trim()).filter(Boolean);

    if (!fundName || !description || !operatingTime || !country || !riskManagement || !reportsFrequency) {
      setStatusMessage(strings.dashboardFundDetailsRequiredFields);
      return;
    }

    if (!normalizedLinks.length) {
      setStatusMessage(strings.dashboardFundDetailsAddLink);
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
      winRate: parseNumericValue(formData.get("winRate")),
      winRatio: winRatio || null,
      riskLevel: riskManagement,
      riskManagement,
      logoUrl: logoAsset ?? undefined,
      livePerformanceLinks: normalizedLinks,
      presentationAsset,
      trackRecordStatements,
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
        ? strings.dashboardFundDetailsUpdated
        : strings.dashboardFundDetailsSubmitted
    );
  };

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleFundDetails">
          Fund details
        </h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardFundNameLabel">
              Nombre del fondo
            </span>
            <input
              name="fundName"
              defaultValue={existingApplication?.fundName ?? baseFund?.name ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardCountryLabel">
              País
            </span>
            <select
              name="country"
              defaultValue={existingApplication?.country ?? baseFund?.country ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="" data-i18n="dashboardSelectPlaceholder">
                Selecciona
              </option>
              {Object.entries(countryFlags).map(([country, flag]) => (
                <option key={country} value={country}>
                  {flag} {country}
                </option>
              ))}
            </select>
          </label>

          <label className="md:col-span-2 flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardDescriptionLabel">
              Descripción
            </span>
            <textarea
              name="description"
              rows={3}
              defaultValue={existingApplication?.description ?? baseFund?.description ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600">Logo del fondo</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600">
                {logoAsset ? (
                  <img src={logoAsset} alt="Logo del fondo" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-center">Sin logo</span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await readFileAsDataUrl(file);
                      setLogoAsset(url);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
                {logoAsset && (
                  <button
                    type="button"
                    onClick={() => setLogoAsset(null)}
                    className="text-left text-xs font-semibold text-rose-500"
                  >
                    Quitar logo
                  </button>
                )}
              </div>
            </div>
          </div>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardOperatingTimeLabel">
              Tiempo operando
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="operatingTime"
                defaultValue={existingApplication?.operatingTime ?? ""}
                required
                placeholder="Ej: 3"
                data-i18n-placeholder="dashboardExampleYears"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500" data-i18n="dashboardYearsLabel">
                años
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardMonthlyProfitLabel">
              Profit mensual (último año)
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="monthlyProfit"
                defaultValue={existingApplication?.monthlyProfit ?? existingApplication?.yearProfit ?? ""}
                placeholder="Ej: 2.4"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Win rate</span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="winRate"
                defaultValue={existingApplication?.winRate ?? baseFund?.winRate ?? ""}
                placeholder="Ej: 60"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600">Win ratio</span>
            <input
              type="text"
              name="winRatio"
              defaultValue={existingApplication?.winRatio ?? ""}
              placeholder="Ej: 1.8:1"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardDrawdownTargetLabel">
              Drawdown target
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="drawdownTarget"
                defaultValue={existingApplication?.drawdownTarget ?? ""}
                placeholder="Ej: 5"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardMaxDrawdownLabel">
              Max drawdown
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="maxDrawdown"
                defaultValue={existingApplication?.maxDrawdown ?? baseFund?.maxDrawdown ?? ""}
                placeholder="Ej: 8"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardTradesLabel">
              Trades mensuales
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="tradesPerMonth"
                defaultValue={existingApplication?.tradesPerMonth ?? ""}
                placeholder="Ej: 60"
                data-i18n-placeholder="dashboardExampleTrades"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardRiskLabel">
              Gestión de riesgo
            </span>
            <select
              name="riskManagement"
              defaultValue={existingApplication?.riskManagement ?? existingApplication?.riskLevel ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="" data-i18n="dashboardSelectPlaceholder">
                Selecciona
              </option>
              {riskOptions.map((option) => (
                <option key={option.label} value={option.label} data-i18n={option.labelKey}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600" data-i18n="dashboardLiveTracking">
              Live performance tracking
            </p>
            {linkFields.map((link, index) => (
              <input
                key={`link-${index}`}
                type="url"
                placeholder={`${strings.dashboardMyfxbookLink} ${index + 1}`}
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

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600">Presentación / operativa</p>
            <input
              type="file"
              accept="application/pdf,video/mp4"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                try {
                  const url = await readFileAsDataUrl(file);
                  const nextAsset = {
                    type: file.type === "video/mp4" ? "video" : "pdf",
                    name: file.name,
                    url,
                  } as const;
                  setPresentationAsset(nextAsset);
                } catch (error) {
                  console.error(error);
                }
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            />
            {presentationAsset && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <span>{presentationAsset.name}</span>
                <button
                  type="button"
                  onClick={() => setPresentationAsset(null)}
                  className="text-xs font-semibold text-rose-500"
                >
                  Quitar
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600">Track record statement (PDF)</p>
            {[0, 1].map((index) => (
              <div key={`track-record-${index}`} className="grid gap-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await readFileAsDataUrl(file);
                      setTrackRecordStatements((prev) => {
                        const next = [...(prev ?? [])];
                        next[index] = { name: file.name, url };
                        return next.filter(Boolean);
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
                {trackRecordStatements?.[index] && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                    <span>{trackRecordStatements[index]?.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setTrackRecordStatements((prev) =>
                          (prev ?? []).filter((_, position) => position !== index)
                        )
                      }
                      className="text-xs font-semibold text-rose-500"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardMinInvestmentLabel">
              Min investment
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="minInvestment"
                defaultValue={existingApplication?.minInvestment ?? ""}
                placeholder="Ej: 50000"
                data-i18n-placeholder="dashboardExampleAmount"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">USD</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardPerformanceFeeLabel">
              Performance fee
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="performanceFee"
                defaultValue={existingApplication?.performanceFee ?? ""}
                placeholder="Ej: 20"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardSubscriptionFeeLabel">
              Subscription fee
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                name="subscriptionFee"
                defaultValue={existingApplication?.subscriptionFee ?? ""}
                placeholder="Ej: 1"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardReportsLabel">
              Reports
            </span>
            <select
              name="reportsFrequency"
              defaultValue={existingApplication?.reportsFrequency ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="" data-i18n="dashboardSelectPlaceholder">
                Selecciona
              </option>
              {reportOptions.map((option) => (
                <option key={option.label} value={option.label} data-i18n={option.labelKey}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
              data-i18n="dashboardSaveDetails"
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
