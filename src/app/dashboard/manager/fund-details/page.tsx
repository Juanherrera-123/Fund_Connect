"use client";

import { useEffect, useMemo, useState } from "react";

import { isActiveStatus, normalizeRole } from "@/lib/auth/claims";
import { STORAGE_KEYS, countryFlags } from "@/lib/igatesData";
import { uploadFundApplicationFile, upsertFundApplication, useFundsCollection } from "@/lib/funds";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useUserProfiles } from "@/lib/useUserProfiles";
import type { FundApplication, FundApplicationFile, Session } from "@/lib/types";

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

export default function FundDetailsPage() {
  const { strings } = useLanguage();
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles, setProfiles] = useUserProfiles({ uid: session?.id ?? session?.uid });
  const fundApplications = useFundsCollection({ userUid: session?.id ?? session?.uid });
  const [statusMessage, setStatusMessage] = useState("");
  const [linkFields, setLinkFields] = useState<string[]>(["", "", ""]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [logoRemoved, setLogoRemoved] = useState(false);
  const [presentationFile, setPresentationFile] = useState<File | null>(null);
  const [presentationRemoved, setPresentationRemoved] = useState(false);
  const [trackRecordFiles, setTrackRecordFiles] = useState<(File | null)[]>([null, null]);
  const [trackRecordRemoved, setTrackRecordRemoved] = useState<boolean[]>([false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authRole = session?.authRole ?? normalizeRole(session?.role);
  const isActive = isActiveStatus(session?.status);

  const profile = useMemo(() => {
    if (!session || authRole !== "manager" || !isActive) return null;
    return profiles.find((item) => item.id === session.id) ?? null;
  }, [authRole, isActive, profiles, session]);

  const existingApplication = useMemo(() => {
    if (!profile) return null;
    if (profile.fundId) {
      const byId = fundApplications.find((application) => application.id === profile.fundId);
      if (byId) return byId;
    }
    return fundApplications.find((application) => application.user.id === profile.id) ?? null;
  }, [fundApplications, profile]);

  useEffect(() => {
    const existingLinks = existingApplication?.fundData?.livePerformanceLinks ?? [];
    if (!existingLinks.length) {
      setLinkFields(["", "", ""]);
      return;
    }
    const nextLinks = [
      existingLinks[0] ?? "",
      existingLinks[1] ?? "",
      existingLinks[2] ?? "",
    ];
    setLinkFields(nextLinks);
  }, [existingApplication]);

  useEffect(() => {
    setLogoFile(null);
    setPresentationFile(null);
    setTrackRecordFiles([null, null]);
    setLogoRemoved(false);
    setPresentationRemoved(false);
    setTrackRecordRemoved([false, false]);
  }, [existingApplication]);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  if (!profile) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <span data-i18n="dashboardManagerLoginPrompt">
          Inicia sesión como gestor para ver este panel.
        </span>
      </div>
    );
  }

  const existingFundData = existingApplication?.fundData;
  const existingFiles = existingFundData?.files;
  const logoUrl = logoPreviewUrl ?? (logoRemoved ? null : existingFiles?.logo?.url ?? null);
  const presentationName = presentationFile?.name ?? existingFiles?.presentation?.name ?? "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setIsSubmitting(true);
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
      setIsSubmitting(false);
      return;
    }

    if (!normalizedLinks.length) {
      setStatusMessage(strings.dashboardFundDetailsAddLink);
      setIsSubmitting(false);
      return;
    }

    const fundId = profile.fundId ?? existingApplication?.id ?? `fund-${Date.now()}`;
    const status = existingApplication?.status ?? "pending";
    const strategyLabel = profile.fundManagerProfile?.strategyTypeLabel ?? profile.fundManagerProfile?.strategyType;

    try {
      const existingFiles = existingApplication?.fundData?.files;
      const logoFileData =
        logoRemoved || !existingFiles?.logo
          ? null
          : existingFiles.logo;
      const presentationFileData =
        presentationRemoved || !existingFiles?.presentation
          ? null
          : existingFiles.presentation;
      const existingTrackRecords = existingFiles?.trackRecordStatements ?? [];
      const nextTrackRecords = [...existingTrackRecords] as (FundApplicationFile | null)[];

      let finalLogo = logoFileData;
      if (logoFile) {
        finalLogo = await uploadFundApplicationFile(profile.id, fundId, logoFile, "logo");
      }

      let finalPresentation = presentationFileData;
      if (presentationFile) {
        finalPresentation = await uploadFundApplicationFile(
          profile.id,
          fundId,
          presentationFile,
          "presentation"
        );
      }

      for (const [index, file] of trackRecordFiles.entries()) {
        if (!file) {
          if (trackRecordRemoved[index]) {
            nextTrackRecords[index] = null;
          }
          continue;
        }
        const uploaded = await uploadFundApplicationFile(
          profile.id,
          fundId,
          file,
          `track-record-${index + 1}`
        );
        nextTrackRecords[index] = uploaded;
      }

      const filteredTrackRecords = nextTrackRecords.filter(Boolean) as FundApplicationFile[];

      const payload: FundApplication = {
        id: fundId,
        user: {
          id: profile.id,
          uid: profile.id,
          name: profile.fullName,
          email: profile.email,
          country: profile.country,
          role: profile.role,
        },
        onboardingAnswers: profile.onboarding ?? {},
        fundData: {
          fundName,
          country,
          region: existingApplication?.fundData?.region ?? "Global",
          aum: existingApplication?.fundData?.aum ?? "N/A",
          strategy:
            existingApplication?.fundData?.strategy ??
            profile.fundManagerProfile?.strategyType ??
            "Multi-Strategy",
          strategyLabel:
            existingApplication?.fundData?.strategyLabel ?? strategyLabel ?? "Multi-Strategy",
          description,
          yearProfit: parseNumericValue(formData.get("yearProfit")),
          monthlyProfit: parseNumericValue(formData.get("monthlyProfit")),
          drawdownTarget: parseNumericValue(formData.get("drawdownTarget")),
          maxDrawdown: parseNumericValue(formData.get("maxDrawdown")),
          tradesPerMonth: parseNumericValue(formData.get("tradesPerMonth")),
          winRate: parseNumericValue(formData.get("winRate")),
          winRatio: winRatio || null,
          riskLevel: riskManagement,
          riskManagement,
          livePerformanceLinks: normalizedLinks,
          minInvestment,
          performanceFee,
          subscriptionFee,
          reportsFrequency,
          operatingTime,
          files: {
            logo: logoRemoved ? null : finalLogo,
            presentation: presentationRemoved ? null : finalPresentation,
            trackRecordStatements: filteredTrackRecords,
          },
        },
        status,
        createdAt: existingApplication?.createdAt ?? null,
        reviewedAt: existingApplication?.reviewedAt ?? null,
        reviewedBy: existingApplication?.reviewedBy ?? null,
      };

      await upsertFundApplication(payload);
    } catch (error) {
      console.error("Unable to save fund application", error);
      setStatusMessage(strings.formStatusError);
      setIsSubmitting(false);
      return;
    }

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
      status === "approved" ? strings.dashboardFundDetailsUpdated : strings.dashboardFundDetailsSubmitted
    );
    setIsSubmitting(false);
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
              defaultValue={existingFundData?.fundName ?? ""}
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
              defaultValue={existingFundData?.country ?? ""}
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
              defaultValue={existingFundData?.description ?? ""}
              required
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <div className="md:col-span-2 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-600">Logo del fondo</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo del fondo" className="h-full w-full object-cover" />
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
                      setLogoFile(file);
                      setLogoRemoved(false);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                />
                {(logoUrl || logoFile) && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoRemoved(true);
                    }}
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
                defaultValue={existingFundData?.operatingTime ?? ""}
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
              Profit mensual últimos meses
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="monthlyProfit"
                defaultValue={existingFundData?.monthlyProfit ?? existingFundData?.yearProfit ?? ""}
                placeholder="Ej: 2.4"
                data-i18n-placeholder="dashboardExamplePercent"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span className="ml-2 text-slate-500">%</span>
            </div>
          </label>

          <label className="flex flex-col gap-2 text-xs font-medium">
            <span className="text-slate-600" data-i18n="dashboardAnnualProfitLabel">
              Profit anual último año
            </span>
            <div className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input
                type="number"
                step="0.01"
                name="yearProfit"
                defaultValue={existingFundData?.yearProfit ?? ""}
                placeholder="Ej: 28"
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
                defaultValue={existingFundData?.winRate ?? ""}
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
              defaultValue={existingFundData?.winRatio ?? ""}
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
                defaultValue={existingFundData?.drawdownTarget ?? ""}
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
                defaultValue={existingFundData?.maxDrawdown ?? ""}
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
                defaultValue={existingFundData?.tradesPerMonth ?? ""}
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
              defaultValue={existingFundData?.riskManagement ?? existingFundData?.riskLevel ?? ""}
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
                  setPresentationFile(file);
                  setPresentationRemoved(false);
                } catch (error) {
                  console.error(error);
                }
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            />
            {presentationName && !presentationRemoved && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <span>{presentationName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setPresentationFile(null);
                    setPresentationRemoved(true);
                  }}
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
                  setTrackRecordFiles((prev) =>
                    prev.map((item, position) => (position === index ? file : item))
                  );
                  setTrackRecordRemoved((prev) =>
                    prev.map((item, position) => (position === index ? false : item))
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            />
                {!trackRecordRemoved[index] &&
                  (trackRecordFiles[index] || existingFiles?.trackRecordStatements?.[index]) && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                    <span>
                      {trackRecordFiles[index]?.name ??
                        existingFiles?.trackRecordStatements?.[index]?.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackRecordFiles((prev) =>
                          prev.map((item, position) => (position === index ? null : item))
                        );
                        setTrackRecordRemoved((prev) =>
                          prev.map((item, position) => (position === index ? true : item))
                        );
                      }}
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
                defaultValue={existingFundData?.minInvestment ?? ""}
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
                defaultValue={existingFundData?.performanceFee ?? ""}
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
                defaultValue={existingFundData?.subscriptionFee ?? ""}
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
              defaultValue={existingFundData?.reportsFrequency ?? ""}
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
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
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
