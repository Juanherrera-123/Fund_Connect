"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { normalizeRole } from "@/lib/auth/claims";
import {
  STORAGE_KEYS,
  countryFlags,
  formatNumber,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useFundsCollection } from "@/lib/funds";
import { getFundFrameClass } from "@/lib/fundVisuals";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useUserProfiles } from "@/lib/useUserProfiles";
import type { FundApplication, FundApplicationFile, Session } from "@/lib/types";

type VerifiedFund = {
  id: string;
  name: string;
  country: string;
  logoLabel: string;
  logoUrl: string | null;
  region: string;
  strategy: string;
  riskLevel: string;
  yearProfit: number | null;
  monthlyProfit: number | null;
  drawdownTarget: number | null;
  maxDrawdown: number | null;
  winRate: number | null;
  winRatio: string | null;
  volatility: number | null;
  operatingTime: string | null;
  tradesPerMonth: number | null;
  riskManagement: string | null;
  livePerformanceLinks: string[];
  presentationAsset: FundApplicationFile | null;
  trackRecordStatements: FundApplicationFile[];
  minInvestment: string | null;
  performanceFee: string | null;
  subscriptionFee: string | null;
  reportsFrequency: string | null;
  aum: string;
  description: string;
  capital_allocated: number;
};

type FilterState = {
  yearProfit: string;
  drawdown: string;
  region: string;
  country: string;
};

const initialFilters: FilterState = {
  yearProfit: "",
  drawdown: "",
  region: "",
  country: "",
};

const transition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
};

const descriptionClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const waitlistNetworkErrorMessage =
  "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";

export function VerifiedManagers() {
  const { strings } = useLanguage();
  const whatsappNumber = "573181252627";
  const approvedFunds = useFundsCollection({ status: "approved" });
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useUserProfiles({ uid: session?.id ?? session?.uid });
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [note, setNote] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneCountry, setContactPhoneCountry] = useState("+57");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; tone: "success" | "error" } | null>(null);
  const waitlistButtonRef = useRef<HTMLButtonElement | null>(null);
  const waitlistModalRef = useRef<HTMLDivElement | null>(null);
  const phoneCountryCodes = [
    { code: "+57", flag: "🇨🇴" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+52", flag: "🇲🇽" },
    { code: "+34", flag: "🇪🇸" },
    { code: "+55", flag: "🇧🇷" },
    { code: "+54", flag: "🇦🇷" },
    { code: "+56", flag: "🇨🇱" },
    { code: "+51", flag: "🇵🇪" },
  ];

  const verifiedFunds = useMemo<VerifiedFund[]>(() => {
    const managerProfiles = profiles.filter((profile) => profile.role === "Fund Manager");
    const managerById = new Map(managerProfiles.map((profile) => [profile.id, profile]));
    const managerByFundId = new Map(
      managerProfiles
        .filter((profile) => profile.fundId)
        .map((profile) => [profile.fundId as string, profile])
    );
    const resolveManagerProfile = (fundId: string, managerId?: string | null) =>
      (managerId ? managerById.get(managerId) : null) ?? managerByFundId.get(fundId) ?? null;

    const mapApplicationToFund = (application: FundApplication): VerifiedFund => {
      const managerProfile = resolveManagerProfile(application.id, application.user?.id ?? null);
      const profileDetails = managerProfile?.fundManagerProfile;

      return {
        id: application.id,
        name: application.fundData.fundName,
        country: application.fundData.country || "Global",
        logoLabel: getFundLogoLabel(application.fundData.fundName),
        logoUrl: application.fundData.files?.logo?.url ?? null,
        region: application.fundData.region || "Global",
        strategy:
          profileDetails?.strategyTypeLabel ||
          profileDetails?.strategyType ||
          application.fundData.strategyLabel ||
          application.fundData.strategy ||
          "Multi-Strategy",
        riskLevel:
          application.fundData.riskLevel ||
          application.fundData.riskManagement ||
          strings.verifiedManagersRiskPending,
        yearProfit: application.fundData.yearProfit ?? application.fundData.monthlyProfit ?? null,
        monthlyProfit: application.fundData.monthlyProfit ?? application.fundData.yearProfit ?? null,
        drawdownTarget: application.fundData.drawdownTarget ?? null,
        maxDrawdown: application.fundData.maxDrawdown ?? null,
        winRate: application.fundData.winRate ?? null,
        winRatio: application.fundData.winRatio ?? null,
        volatility: application.fundData.volatility ?? null,
        operatingTime: application.fundData.operatingTime ?? null,
        tradesPerMonth: application.fundData.tradesPerMonth ?? null,
        riskManagement: application.fundData.riskManagement ?? application.fundData.riskLevel ?? null,
        livePerformanceLinks: application.fundData.livePerformanceLinks ?? [],
        presentationAsset: application.fundData.files?.presentation ?? null,
        trackRecordStatements: application.fundData.files?.trackRecordStatements ?? [],
        minInvestment: application.fundData.minInvestment ?? null,
        performanceFee: application.fundData.performanceFee ?? null,
        subscriptionFee: application.fundData.subscriptionFee ?? null,
        reportsFrequency: application.fundData.reportsFrequency ?? null,
        aum: application.fundData.aum || "N/A",
        description: application.fundData.description || strings.verifiedManagersDescriptionFallback,
        capital_allocated: application.fundData.capital_allocated ?? 0,
      };
    };

    return approvedFunds.map((application) => mapApplicationToFund(application));
  }, [
    approvedFunds,
    profiles,
    strings.verifiedManagersDescriptionFallback,
    strings.verifiedManagersRiskPending,
  ]);

  const regions = useMemo(() => {
    return Array.from(new Set(verifiedFunds.map((fund) => fund.region))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [verifiedFunds]);

  const countries = useMemo(() => {
    return Array.from(new Set(verifiedFunds.map((fund) => fund.country))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [verifiedFunds]);

  const filteredFunds = useMemo(() => {
    const yearProfitValue = filters.yearProfit ? Number.parseFloat(filters.yearProfit) : null;
    const drawdownValue = filters.drawdown ? Number.parseFloat(filters.drawdown) : null;

    return verifiedFunds.filter((fund) => {
      const matchesProfit =
        yearProfitValue === null || (fund.yearProfit !== null && fund.yearProfit >= yearProfitValue);
      const matchesDrawdown =
        drawdownValue === null || (fund.maxDrawdown !== null && fund.maxDrawdown <= drawdownValue);
      const matchesRegion = !filters.region || fund.region === filters.region;
      const matchesCountry = !filters.country || fund.country === filters.country;
      return matchesProfit && matchesDrawdown && matchesRegion && matchesCountry;
    });
  }, [filters, verifiedFunds]);

  useEffect(() => {
    if (selectedFundId && !filteredFunds.some((fund) => fund.id === selectedFundId)) {
      setSelectedFundId(null);
    }
  }, [filteredFunds, selectedFundId]);

  const selectedFund = filteredFunds.find((fund) => fund.id === selectedFundId) ?? null;
  const authRole = session?.authRole ?? normalizeRole(session?.role);
  const currentProfile = useMemo(() => {
    if (!session?.id || authRole === "master") return null;
    return profiles.find((profile) => profile.id === session.id) ?? null;
  }, [authRole, profiles, session]);

  const handleApplyFilters = () => {
    setFilters(appliedFilters);
  };

  const handleResetFilters = () => {
    setAppliedFilters(initialFilters);
    setFilters(initialFilters);
  };

  const closeWaitlistModal = useCallback(() => {
    setIsWaitlistModalOpen(false);
  }, []);

  const openWaitlistModal = useCallback(() => {
    setIsWaitlistModalOpen(true);
  }, []);

  useEffect(() => {
    if (!isWaitlistModalOpen) return;
    setQualified(false);
    setNote("");
    setWaitlistError(null);
    setContactName(currentProfile?.fullName ?? session?.username ?? "");
    setContactEmail(currentProfile?.email ?? "");
    const rawPhone = currentProfile?.phone ?? "";
    const phoneMatch = rawPhone.match(/^(\+\d{1,4})\s*(.*)$/);
    setContactPhoneCountry(phoneMatch?.[1] ?? "+57");
    setContactPhoneNumber(phoneMatch?.[2] ?? rawPhone);
  }, [currentProfile?.email, currentProfile?.fullName, currentProfile?.phone, isWaitlistModalOpen, session?.username]);

  useEffect(() => {
    if (!isWaitlistModalOpen) return undefined;
    const modal = waitlistModalRef.current;
    const focusableElements = modal?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements?.[0];
    const lastFocusable = focusableElements?.[focusableElements.length - 1];
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWaitlistModal();
        return;
      }
      if (event.key !== "Tab" || !focusableElements || focusableElements.length === 0) return;
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      waitlistButtonRef.current?.focus();
    };
  }, [closeWaitlistModal, isWaitlistModalOpen]);

  useEffect(() => {
    if (!isWaitlistModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isWaitlistModalOpen]);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timeout = window.setTimeout(() => {
      setToastMessage(null);
    }, 4800);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFund || isSubmitting) return;
    setIsSubmitting(true);
    setWaitlistError(null);

    if (!selectedFund.id || !selectedFund.name) {
      const errorMessage = "No pudimos identificar el fondo seleccionado. Intenta nuevamente.";
      setWaitlistError(errorMessage);
      setToastMessage({ message: errorMessage, tone: "error" });
      setIsSubmitting(false);
      return;
    }

    const fullPhone = [contactPhoneCountry.trim(), contactPhoneNumber.trim()].filter(Boolean).join(" ");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (session?.id && session?.role && authRole !== "master") {
      headers["x-user-id"] = session.id;
      headers["x-user-role"] = session.role;
    }
    const payload = {
      fundId: selectedFund.id,
      fundName: selectedFund.name,
      qualified,
      note: note.trim() || null,
      user: {
        fullName: contactName.trim(),
        email: contactEmail.trim(),
        phone: fullPhone,
      },
    };

    const sendWaitlistRequest = async (attempt = 0): Promise<Response> => {
      try {
        return await fetch("/api/waitlist/request", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      } catch (error) {
        if (attempt < 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return sendWaitlistRequest(attempt + 1);
        }
        throw error;
      }
    };

    try {
      const response = await sendWaitlistRequest();
      if (!response.ok) {
        const data = (await response.json()) as { error?: string; details?: string } | null;
        const message =
          data?.error ||
          (response.status >= 500
            ? "Ocurrió un error interno. Intenta nuevamente en unos minutos."
            : "Revisa los datos e intenta nuevamente.");
        throw new Error(message);
      }
      setIsWaitlistModalOpen(false);
      setQualified(false);
      setNote("");
      setContactName("");
      setContactEmail("");
      setContactPhoneCountry("+57");
      setContactPhoneNumber("");
      setWaitlistError(null);
      setToastMessage({
        message:
          "La solicitud fue enviada con éxito, estaremos en contacto en un plazo máximo de 24 horas.",
        tone: "success",
      });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof TypeError
          ? waitlistNetworkErrorMessage
          : error instanceof Error
            ? error.message
            : "No se pudo enviar la solicitud. Intenta nuevamente.";
      setWaitlistError(message);
      setToastMessage({
        message,
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCountryBadge = (country: string) => (
    <>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px]"
        role="img"
        aria-label={country}
      >
        {countryFlags[country] || "🌍"}
      </span>
      <span>{country}</span>
    </>
  );

  const renderFundLogo = (fund: VerifiedFund, sizeClasses: string, textClass: string) => (
    <div className={`flex items-center justify-center bg-igates-500/10 ${sizeClasses}`}>
      {fund.logoUrl ? (
        <img
          src={fund.logoUrl}
          alt={`${fund.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className={textClass}>{fund.logoLabel}</span>
      )}
    </div>
  );

  const formattedOperatingTime = selectedFund?.operatingTime
    ? `${selectedFund.operatingTime} ${strings.verifiedManagersYearsSuffix}`
    : "—";
  const formattedYearProfit = formatNumber(selectedFund?.yearProfit ?? null, "%");
  const formattedMonthlyProfit = formatNumber(selectedFund?.monthlyProfit ?? null, "%");
  const formattedDrawdownTarget = formatNumber(selectedFund?.drawdownTarget ?? null, "%");
  const formattedMaxDrawdown = formatNumber(selectedFund?.maxDrawdown ?? null, "%");
  const formattedTrades = formatNumber(selectedFund?.tradesPerMonth ?? null, "", 0);
  const formattedWinRate = formatNumber(selectedFund?.winRate ?? null, "%");
  const formattedWinRatio = selectedFund?.winRatio || "—";
  const formattedRisk = selectedFund?.riskManagement ?? "—";
  const formattedMinInvestment = selectedFund?.minInvestment || "—";
  const formattedPerformanceFee = selectedFund?.performanceFee
    ? `${selectedFund.performanceFee}%`
    : "—";
  const formattedSubscriptionFee = selectedFund?.subscriptionFee
    ? `${selectedFund.subscriptionFee}%`
    : "—";
  const formattedReports = selectedFund?.reportsFrequency || "—";
  const performanceLinks = selectedFund
    ? Array.from({ length: 3 }, (_, index) => selectedFund.livePerformanceLinks[index] ?? "")
    : [];
  const whatsappMessage = selectedFund
    ? strings.verifiedManagersWhatsappMessage.replace("{fundName}", selectedFund.name)
    : "";
  const whatsappLink = selectedFund
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : "#";

  const panelMetrics = [
    {
      labelKey: "verifiedManagersMetricOperatingTime",
      label: "Tiempo operando",
      value: formattedOperatingTime,
      highlight: true,
    },
    {
      labelKey: "verifiedManagersMetricMonthlyProfit",
      label: "Profit mensual últimos meses",
      value: formattedMonthlyProfit,
      highlight: true,
    },
    {
      labelKey: "verifiedManagersMetricAnnualProfit",
      label: "Profit anual último año",
      value: formattedYearProfit,
      highlight: true,
    },
    {
      labelKey: "verifiedManagersMetricDrawdownTarget",
      label: "Max risk",
      value: formattedDrawdownTarget,
      highlight: true,
    },
    {
      labelKey: "verifiedManagersMetricMaxDrawdown",
      label: "Historical max drawdown",
      value: formattedMaxDrawdown,
      highlight: true,
    },
    { labelKey: "verifiedManagersMetricMonthlyTrades", label: "Trades mensuales", value: formattedTrades },
    { labelKey: "verifiedManagersMetricWinRate", label: "Win rate", value: formattedWinRate },
    { labelKey: "verifiedManagersMetricWinRatio", label: "Win ratio", value: formattedWinRatio },
    { labelKey: "verifiedManagersMetricRiskManagement", label: "Gestión de riesgo", value: formattedRisk },
  ];

  const terms = [
    { labelKey: "verifiedManagersTermsMinInvestment", label: "Min investment", value: formattedMinInvestment },
    { labelKey: "verifiedManagersTermsPerformanceFee", label: "Performance fee", value: formattedPerformanceFee },
    { labelKey: "verifiedManagersTermsSubscriptionFee", label: "Subscription fee", value: formattedSubscriptionFee },
    { labelKey: "verifiedManagersTermsReports", label: "Reports", value: formattedReports },
  ];

  return (
    <>
      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 z-50 rounded-2xl border bg-white/70 px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl ${
            toastMessage.tone === "success"
              ? "border-emerald-200 text-emerald-800"
              : "border-rose-200 text-rose-700"
          }`}
          aria-live="polite"
        >
          {toastMessage.message}
        </div>
      )}
      <section className="py-6" aria-labelledby="filtersTitle">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" id="filtersPanel">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500"
                  id="filtersTitle"
                  data-i18n="verifiedManagersFiltersTitle"
                >
                  Search settings
                </p>
                <p className="mt-2 text-sm text-slate-500" data-i18n="verifiedManagersFiltersLead">
                  Ajusta umbrales mínimos y riesgo objetivo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                  type="button"
                  onClick={handleResetFilters}
                  data-i18n="verifiedManagersFiltersReset"
                >
                  Reset
                </button>
                <button
                  className="inline-flex w-full items-center justify-center rounded-full bg-igates-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400 sm:w-auto"
                  type="button"
                  onClick={handleApplyFilters}
                  data-i18n="verifiedManagersFiltersApply"
                >
                  Apply filters
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="yearProfit" data-i18n="verifiedManagersFilterYearProfitLabel">
                  Year Total Profit (%)
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type="number"
                  id="yearProfit"
                  placeholder="Ej: 10"
                  data-i18n-placeholder="verifiedManagersFilterYearProfitPlaceholder"
                  value={appliedFilters.yearProfit}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, yearProfit: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="drawdown" data-i18n="verifiedManagersFilterDrawdownLabel">
                  Historical max drawdown (%)
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type="number"
                  id="drawdown"
                  placeholder="Ej: 12"
                  data-i18n-placeholder="verifiedManagersFilterDrawdownPlaceholder"
                  value={appliedFilters.drawdown}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, drawdown: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="regionFilter" data-i18n="verifiedManagersFilterRegionLabel">
                  Región
                </label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  id="regionFilter"
                  value={appliedFilters.region}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, region: event.target.value }))
                  }
                >
                  <option value="" data-i18n="verifiedManagersFilterRegionAnyOption">
                    Cualquiera
                  </option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="countryFilter" data-i18n="verifiedManagersFilterCountryLabel">
                  País
                </label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  id="countryFilter"
                  value={appliedFilters.country}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, country: event.target.value }))
                  }
                >
                  <option value="" data-i18n="verifiedManagersFilterCountryAnyOption">
                    Cualquiera
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {(countryFlags[country] || "🌍") + " " + country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24" id="asesoria">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" data-i18n="verifiedManagersPanelEyebrow">
              Panel de gestores
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
              <span data-i18n="verifiedManagersPanelTitle">Fondos verificados listos para diligencia</span>
            </h2>
            <p className="text-sm text-slate-600" data-i18n="verifiedManagersPanelLead">
              Selecciona un fondo para ver el detalle curado.
            </p>
          </div>

          <MotionConfig transition={transition}>
            <motion.div
              layout
              className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <motion.div
                layout
                className={`grid gap-6 ${selectedFund ? "lg:grid-cols-[minmax(240px,300px)_1fr]" : "grid-cols-1"}`}
              >
                <motion.div
                  layout
                  className={`${selectedFund ? "lg:max-h-[72vh] lg:overflow-y-auto lg:pr-2" : ""} ${
                    selectedFund ? "order-2 lg:order-1" : ""
                  }`}
                >
                  <motion.div
                    layout
                    className={
                      selectedFund
                        ? "flex flex-col gap-3"
                        : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    }
                  >
                    {!filteredFunds.length && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500" data-i18n="verifiedManagersNoFunds">
                        No hay fondos con estos criterios.
                      </div>
                    )}
                    {filteredFunds.map((fund) => {
                      const isActive = fund.id === selectedFundId;
                      const recentProfit = formatNumber(fund.monthlyProfit ?? fund.yearProfit, "%");
                      const maxDrawdown = formatNumber(fund.maxDrawdown, "%");

                      if (!selectedFund) {
                        return (
                          <motion.div
                            key={fund.id}
                            layout
                            className={`igates-card-frame ${getFundFrameClass(fund.capital_allocated)}`}
                          >
                            <motion.button
                              layout
                              type="button"
                              onClick={() => setSelectedFundId(fund.id)}
                              className="igates-card flex h-full flex-col gap-4 text-left"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  {renderFundLogo(fund, "h-14 w-14", "text-lg font-semibold text-igates-700")}
                                  <div>
                                    <p className="text-lg font-semibold text-slate-900">{fund.name}</p>
                                    <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
                                      {renderCountryBadge(fund.country)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600" style={descriptionClampStyle}>
                                {fund.description}
                              </p>
                              <div className="mt-auto grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600 sm:grid-cols-2">
                                <div className="flex items-center justify-between">
                                  <span data-i18n="verifiedManagersMetricProfitYear">Profit últimos meses</span>
                                  <span className="text-sm font-semibold text-gradient-brand">{recentProfit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span data-i18n="verifiedManagersMetricMaxDrawdown">Max drawdown</span>
                                  <span className="text-sm font-semibold text-gradient-brand">{maxDrawdown}</span>
                                </div>
                              </div>
                            </motion.button>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={fund.id}
                          layout
                          className={`igates-card-frame ${getFundFrameClass(
                            fund.capital_allocated
                          )}`}
                        >
                          <motion.button
                            layout
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setSelectedFundId(fund.id)}
                            className="igates-card flex w-full items-start gap-3 text-left"
                          >
                            <div aria-hidden="true">
                              {renderFundLogo(
                                fund,
                                "h-10 w-10 rounded-xl",
                                "text-sm font-semibold text-igates-700"
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p
                                  className={
                                    selectedFund
                                      ? "text-sm font-semibold text-slate-900"
                                      : "text-lg font-semibold text-slate-900"
                                  }
                                >
                                  {fund.name}
                                </p>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                                  {renderCountryBadge(fund.country)}
                                </span>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                                  {fund.strategy}
                                </span>
                              </div>
                              {selectedFund && (
                                <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                                  <div className="flex items-center justify-between">
                                    <span data-i18n="verifiedManagersMetricProfitYear">Profit últimos meses</span>
                                    <span className="text-sm font-semibold text-gradient-brand">{recentProfit}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span data-i18n="verifiedManagersMetricMaxDrawdown">Max drawdown</span>
                                    <span className="text-sm font-semibold text-gradient-brand">{maxDrawdown}</span>
                                  </div>
                                </div>
                              )}
                              {!selectedFund && (
                                <p className="text-sm text-slate-600">{fund.description}</p>
                              )}
                            </div>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedFund && (
                    <motion.div
                      key={selectedFund.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={transition}
                      className="relative order-1 flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 lg:order-2"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div aria-hidden="true">
                            {renderFundLogo(
                              selectedFund,
                              "h-14 w-14 rounded-2xl",
                              "text-lg font-semibold text-igates-700"
                            )}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-xl font-semibold text-slate-900">{selectedFund.name}</h3>
                              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                {renderCountryBadge(selectedFund.country)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{selectedFund.description}</p>
                            <div className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 sm:grid-cols-2">
                              <div className="flex items-center justify-between">
                                <span data-i18n="verifiedManagersMetricProfitYear">Profit últimos meses</span>
                                <span className="text-sm font-semibold text-gradient-brand">{formattedMonthlyProfit}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span data-i18n="verifiedManagersMetricMaxDrawdown">Max drawdown</span>
                                <span className="text-sm font-semibold text-gradient-brand">
                                  {formattedMaxDrawdown}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFundId(null)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          data-i18n="verifiedManagersBackToAll"
                        >
                          {strings.verifiedManagersBackToAll}
                        </button>
                      </div>

                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {panelMetrics.map((item) => (
                          <div
                            key={item.labelKey}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n={item.labelKey}>
                              {item.label}
                            </p>
                            <p className="mt-2 text-lg font-semibold text-gradient-brand">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="verifiedManagersLiveTrackingTitle">
                          Live performance tracking
                        </p>
                        <ul className="mt-3 grid gap-2 text-xs text-slate-600">
                          {performanceLinks.map((link, index) => (
                            <li key={`live-link-${index}`}>
                              {link ? (
                                <a className="break-all underline" href={link} target="_blank" rel="noreferrer">
                                  {link}
                                </a>
                              ) : (
                                <span>
                                  {strings.verifiedManagersLiveLinkLabel.replace(
                                    "{index}",
                                    String(index + 1)
                                  )}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 border-t border-slate-200 pt-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="verifiedManagersTrackRecordTitle">
                            Track record statement
                          </p>
                          {selectedFund.trackRecordStatements?.length ? (
                            <ul className="mt-3 grid gap-2 text-xs text-slate-600">
                              {selectedFund.trackRecordStatements.map((statement, index) => (
                                <li key={`statement-${index}`}>
                                  <a
                                    className="break-all underline"
                                    href={statement.url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {statement.name ||
                                      strings.verifiedManagersTrackRecordItem.replace(
                                        "{index}",
                                        String(index + 1)
                                      )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-2 text-xs text-slate-500" data-i18n="verifiedManagersTrackRecordEmpty">
                              Sin documentos cargados.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n="verifiedManagersPresentationTitle">
                          Presentación / operativa
                        </p>
                        {selectedFund.presentationAsset ? (
                          <div className="mt-3 grid gap-3 text-xs text-slate-600">
                            <a
                              className="break-all underline"
                              href={selectedFund.presentationAsset.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {selectedFund.presentationAsset.name}
                            </a>
                            {(selectedFund.presentationAsset.contentType?.startsWith("video/") ||
                              selectedFund.presentationAsset.name.toLowerCase().endsWith(".mp4")) ? (
                              <video
                                controls
                                className="w-full rounded-xl border border-slate-200 bg-slate-100"
                                src={selectedFund.presentationAsset.url}
                              />
                            ) : (
                              <iframe
                                className="h-64 w-full rounded-xl border border-slate-200 bg-slate-100"
                                src={selectedFund.presentationAsset.url}
                                title="Presentación PDF"
                              />
                            )}
                          </div>
                        ) : (
                          <p className="mt-2 text-xs text-slate-500" data-i18n="verifiedManagersPresentationEmpty">
                            Sin presentación cargada.
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="verifiedManagersTermsTitle">
                          Términos
                        </p>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          {terms.map((item) => (
                            <div
                              key={item.labelKey}
                              className="rounded-xl border border-slate-200 bg-white p-4"
                            >
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n={item.labelKey}>
                                {item.label}
                              </p>
                              <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            ref={waitlistButtonRef}
                            type="button"
                            onClick={openWaitlistModal}
                            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-igates-500 to-igates-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:from-igates-400 hover:to-igates-500 sm:w-auto"
                            data-i18n="verifiedManagersJoinWaitlist"
                          >
                            {strings.verifiedManagersJoinWaitlist}
                          </button>
                          <a
                            className="inline-flex w-full items-center justify-center rounded-full border border-white/60 bg-white/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-200 hover:bg-white sm:w-auto"
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            data-i18n="verifiedManagersRequestInfo"
                          >
                            {strings.verifiedManagersRequestInfo}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </MotionConfig>
        </div>
      </section>

      {isWaitlistModalOpen && selectedFund ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            role="presentation"
            onClick={closeWaitlistModal}
          />
          <motion.div
            ref={waitlistModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500"
                >
                  {strings.verifiedManagersWaitlistEyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900" id="waitlist-modal-title">
                  {strings.verifiedManagersWaitlistTitle.replace("{fundName}", selectedFund.name)}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {strings.verifiedManagersWaitlistLead}
                </p>
              </div>
              <button
                type="button"
                onClick={closeWaitlistModal}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {strings.verifiedManagersWaitlistClose}
              </button>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleWaitlistSubmit}>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="waitlist-name">{strings.verifiedManagersWaitlistNameLabel}</label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  placeholder={strings.verifiedManagersWaitlistNamePlaceholder}
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="waitlist-email">{strings.verifiedManagersWaitlistEmailLabel}</label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="waitlist-phone">{strings.verifiedManagersWaitlistPhoneLabel}</label>
                <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
                  <select
                    id="waitlist-phone-country"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    value={contactPhoneCountry}
                    onChange={(event) => setContactPhoneCountry(event.target.value)}
                  >
                    {phoneCountryCodes.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.flag} {option.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="waitlist-phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    value={contactPhoneNumber}
                    onChange={(event) => setContactPhoneNumber(event.target.value)}
                    placeholder="300 000 0000"
                  />
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-igates-500 focus:ring-igates-500/30"
                  checked={qualified}
                  onChange={(event) => setQualified(event.target.checked)}
                />
                <span>
                  {strings.verifiedManagersWaitlistQualifiedLabel}
                </span>
              </label>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="waitlist-note">{strings.verifiedManagersWaitlistNoteLabel}</label>
                <textarea
                  id="waitlist-note"
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  placeholder={strings.verifiedManagersWaitlistNotePlaceholder}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>
              {waitlistError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
                  {waitlistError}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-igates-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400 disabled:cursor-not-allowed disabled:bg-igates-500/70"
              >
                {isSubmitting ? strings.verifiedManagersWaitlistSubmitting : strings.verifiedManagersWaitlistSubmit}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}
