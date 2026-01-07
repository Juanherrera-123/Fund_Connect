"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import {
  STORAGE_KEYS,
  baseVerifiedFunds,
  countryFlags,
  DEFAULT_FUND_MANAGER_PROFILES,
  formatNumber,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, Session, UserProfile } from "@/lib/types";

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
  volatility: number | null;
  operatingTime: string | null;
  tradesPerMonth: number | null;
  riskManagement: string | null;
  livePerformanceLinks: string[];
  minInvestment: string | null;
  performanceFee: string | null;
  subscriptionFee: string | null;
  reportsFrequency: string | null;
  aum: string;
  description: string;
};

type FilterState = {
  yearProfit: string;
  drawdown: string;
  winRate: string;
  region: string;
  country: string;
};

const initialFilters: FilterState = {
  yearProfit: "",
  drawdown: "",
  winRate: "",
  region: "",
  country: "",
};

const transition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1],
};

export function VerifiedManagers() {
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [session] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [note, setNote] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const waitlistButtonRef = useRef<HTMLButtonElement | null>(null);
  const waitlistModalRef = useRef<HTMLDivElement | null>(null);

  const verifiedFunds = useMemo<VerifiedFund[]>(() => {
    const managerProfiles = profiles.filter((profile) => profile.role === "Fund Manager");
    const managerById = new Map(managerProfiles.map((profile) => [profile.id, profile]));
    const managerByFundId = new Map(
      managerProfiles
        .filter((profile) => profile.fundId)
        .map((profile) => [profile.fundId as string, profile])
    );
    const resolveManagerProfile = (fundId: string, managerId?: string) =>
      (managerId ? managerById.get(managerId) : null) ?? managerByFundId.get(fundId) ?? null;

    const fromStorage = fundApplications
      .filter((application) => application.status === "verified")
      .map((application) => {
        const managerProfile = resolveManagerProfile(application.id, application.managerId);
        const profileDetails = managerProfile?.fundManagerProfile;

        return {
          id: application.id,
          name: application.fundName,
          country: application.country || "Global",
          logoLabel: getFundLogoLabel(application.fundName),
          logoUrl: application.logoUrl ?? null,
          region: application.region || "Global",
          strategy:
            profileDetails?.strategyTypeLabel ||
            profileDetails?.strategyType ||
            application.strategyLabel ||
            application.strategy ||
            "Multi-Strategy",
          riskLevel: application.riskLevel || application.riskManagement || "En revisión",
          yearProfit: application.yearProfit ?? application.monthlyProfit ?? null,
          monthlyProfit: application.monthlyProfit ?? application.yearProfit ?? null,
          drawdownTarget: application.drawdownTarget ?? null,
          maxDrawdown: application.maxDrawdown ?? null,
          winRate: application.winRate ?? null,
          volatility: application.volatility ?? null,
          operatingTime: application.operatingTime ?? null,
          tradesPerMonth: application.tradesPerMonth ?? null,
          riskManagement: application.riskManagement ?? application.riskLevel ?? null,
          livePerformanceLinks: application.livePerformanceLinks ?? [],
          minInvestment: application.minInvestment ?? null,
          performanceFee: application.performanceFee ?? null,
          subscriptionFee: application.subscriptionFee ?? null,
          reportsFrequency: application.reportsFrequency ?? null,
          aum: application.aum || "N/A",
          description: application.description || "Gestor en proceso de verificación.",
        };
      });

    const overridesById = new Map(fromStorage.map((fund) => [fund.id, fund]));
    const mergedBase = baseVerifiedFunds.map((fund) => {
      const override = overridesById.get(fund.id);
      if (!override) {
        const managerProfile = managerByFundId.get(fund.id);
        const profileDetails = managerProfile?.fundManagerProfile;

        return {
          id: fund.id,
          name: fund.name,
          country: fund.country,
          logoLabel: fund.logoLabel,
          logoUrl: fund.logoUrl ?? null,
          region: fund.region,
          strategy:
            profileDetails?.strategyTypeLabel || profileDetails?.strategyType || fund.strategy,
          riskLevel: fund.riskLevel,
          yearProfit: fund.yearProfit,
          monthlyProfit: fund.yearProfit,
          drawdownTarget: null,
          maxDrawdown: fund.maxDrawdown,
          winRate: fund.winRate,
          volatility: fund.volatility,
          operatingTime: null,
          tradesPerMonth: null,
          riskManagement: fund.riskLevel,
          livePerformanceLinks: [],
          minInvestment: null,
          performanceFee: null,
          subscriptionFee: null,
          reportsFrequency: null,
          aum: fund.aum,
          description: fund.description,
        };
      }
      return {
        ...override,
        logoLabel: override.logoLabel || fund.logoLabel,
        logoUrl: override.logoUrl ?? fund.logoUrl ?? null,
      };
    });

    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const extraFunds = fromStorage.filter((fund) => !baseIds.has(fund.id));

    return [...mergedBase, ...extraFunds];
  }, [fundApplications, profiles]);

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
    const winRateValue = filters.winRate ? Number.parseFloat(filters.winRate) : null;

    return verifiedFunds.filter((fund) => {
      const matchesProfit = yearProfitValue === null || fund.yearProfit >= yearProfitValue;
      const matchesDrawdown = drawdownValue === null || fund.maxDrawdown <= drawdownValue;
      const matchesRegion = !filters.region || fund.region === filters.region;
      const matchesCountry = !filters.country || fund.country === filters.country;
      const matchesWinRate = winRateValue === null || fund.winRate >= winRateValue;
      return matchesProfit && matchesDrawdown && matchesRegion && matchesCountry && matchesWinRate;
    });
  }, [filters, verifiedFunds]);

  useEffect(() => {
    if (selectedFundId && !filteredFunds.some((fund) => fund.id === selectedFundId)) {
      setSelectedFundId(null);
    }
  }, [filteredFunds, selectedFundId]);

  const selectedFund = filteredFunds.find((fund) => fund.id === selectedFundId) ?? null;
  const currentProfile = useMemo(() => {
    if (!session?.id || session.role === "MasterUser") return null;
    return profiles.find((profile) => profile.id === session.id) ?? null;
  }, [profiles, session]);
  const shouldCollectEmail = !currentProfile?.email;

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
    setContactEmail(currentProfile?.email ?? "");
  }, [currentProfile?.email, isWaitlistModalOpen]);

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
    if (!toastMessage) return undefined;
    const timeout = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFund || isSubmitting) return;
    setIsSubmitting(true);

    const userRole =
      currentProfile?.role ?? (session?.role && session.role !== "MasterUser" ? session.role : "Investor");
    const payload = {
      fundId: selectedFund.id,
      fundName: selectedFund.name,
      qualified,
      note: note.trim() || null,
      user: {
        role: userRole,
        name: currentProfile?.fullName ?? session?.username ?? "",
        email: currentProfile?.email ?? contactEmail.trim(),
        country: currentProfile?.country ?? "",
        org: currentProfile?.org ?? null,
      },
    };

    try {
      const response = await fetch("/api/waitlist/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to send waitlist request.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsWaitlistModalOpen(false);
      setToastMessage("✅ Request sent. We will reach out soon.");
    } catch (error) {
      console.error(error);
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
    ? `${selectedFund.operatingTime} años`
    : "—";
  const formattedProfit = formatNumber(selectedFund?.monthlyProfit ?? null, "%");
  const formattedDrawdownTarget = formatNumber(selectedFund?.drawdownTarget ?? null, "%");
  const formattedMaxDrawdown = formatNumber(selectedFund?.maxDrawdown ?? null, "%");
  const formattedTrades = formatNumber(selectedFund?.tradesPerMonth ?? null, "", 0);
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

  const panelMetrics = [
    { label: "Tiempo operando", value: formattedOperatingTime, highlight: true },
    { label: "Profit mensual (último año)", value: formattedProfit, highlight: true },
    { label: "Drawdown target", value: formattedDrawdownTarget, highlight: true },
    { label: "Max drawdown", value: formattedMaxDrawdown, highlight: true },
    { label: "Trades mensuales", value: formattedTrades },
    { label: "Gestión de riesgo", value: formattedRisk },
  ];

  const terms = [
    { label: "Min investment", value: formattedMinInvestment },
    { label: "Performance fee", value: formattedPerformanceFee },
    { label: "Subscription fee", value: formattedSubscriptionFee },
    { label: "Reports", value: formattedReports },
  ];

  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-lg" aria-live="polite">
          {toastMessage}
        </div>
      )}
      <section className="py-6" aria-labelledby="filtersTitle">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" id="filtersPanel">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500" id="filtersTitle">
                  Search settings
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Ajusta umbrales mínimos y riesgo objetivo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  type="button"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full bg-igates-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                  type="button"
                  onClick={handleApplyFilters}
                >
                  Apply filters
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="yearProfit">Year Total Profit (%)</label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type="number"
                  id="yearProfit"
                  placeholder="Ej: 10"
                  value={appliedFilters.yearProfit}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, yearProfit: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="drawdown">Max Drawdown (%)</label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type="number"
                  id="drawdown"
                  placeholder="Ej: 12"
                  value={appliedFilters.drawdown}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, drawdown: event.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="regionFilter">Región</label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  id="regionFilter"
                  value={appliedFilters.region}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, region: event.target.value }))
                  }
                >
                  <option value="">Cualquiera</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="countryFilter">País</label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  id="countryFilter"
                  value={appliedFilters.country}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, country: event.target.value }))
                  }
                >
                  <option value="">Cualquiera</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {(countryFlags[country] || "🌍") + " " + country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 text-sm font-medium text-slate-600">
                <label htmlFor="winRate">Win Rate (%)</label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type="number"
                  id="winRate"
                  placeholder="Ej: 55"
                  value={appliedFilters.winRate}
                  onChange={(event) =>
                    setAppliedFilters((prev) => ({ ...prev, winRate: event.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12" id="asesoria">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">Panel de gestores</p>
            <h2 className="text-2xl font-semibold text-slate-900">Fondos verificados listos para diligencia</h2>
            <p className="text-sm text-slate-600">Selecciona un fondo para ver el detalle curado.</p>
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
                  className={selectedFund ? "max-h-[72vh] overflow-y-auto pr-2" : ""}
                >
                  <motion.div
                    layout
                    className={
                      selectedFund
                        ? "flex flex-col gap-3"
                        : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                    }
                  >
                    {!filteredFunds.length && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                        No hay fondos con estos criterios.
                      </div>
                    )}
                    {filteredFunds.map((fund) => {
                      const isActive = fund.id === selectedFundId;
                      const yearlyProfit = formatNumber(fund.yearProfit, "%");
                      const maxDrawdown = formatNumber(fund.maxDrawdown, "%");

                      if (!selectedFund) {
                        return (
                          <motion.div key={fund.id} layout className="igates-card-frame">
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
                              <p className="text-sm text-slate-600">{fund.description}</p>
                              <div className="mt-auto grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600 sm:grid-cols-2">
                                <div className="flex items-center justify-between">
                                  <span>Profit último año</span>
                                  <span className="text-sm font-semibold text-slate-900">{yearlyProfit}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Max drawdown</span>
                                  <span className="text-sm font-semibold text-slate-900">{maxDrawdown}</span>
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
                          className={selectedFund ? "igates-card-frame" : "w-full"}
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
                                    <span>Profit último año</span>
                                    <span className="text-sm font-semibold text-slate-900">{yearlyProfit}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Max drawdown</span>
                                    <span className="text-sm font-semibold text-slate-900">{maxDrawdown}</span>
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
                      className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
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
                                <span>Profit último año</span>
                                <span className="text-sm font-semibold text-slate-900">{formattedProfit}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Max drawdown</span>
                                <span className="text-sm font-semibold text-slate-900">
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
                        >
                          Back to all funds
                        </button>
                      </div>

                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {panelMetrics.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-xl border border-slate-200 bg-white p-4"
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                            <p className={`mt-2 text-lg font-semibold ${item.highlight ? "text-slate-900" : "text-slate-700"}`}>
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
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
                                <span>Link Myfxbook {index + 1}: —</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Términos
                        </p>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          {terms.map((item) => (
                            <div
                              key={item.label}
                              className="rounded-xl border border-slate-200 bg-white p-4"
                            >
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
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
                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-igates-500 to-igates-400 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:from-igates-400 hover:to-igates-500"
                          >
                            Join the waitlist
                          </button>
                          <Link
                            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-200 hover:bg-white"
                            href="/#contact"
                          >
                            Request more information
                          </Link>
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

      <AnimatePresence>
        {isWaitlistModalOpen && selectedFund && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">
                    Waitlist request
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900" id="waitlist-modal-title">
                    Join {selectedFund.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Confirma tu elegibilidad y añade un mensaje opcional para el equipo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeWaitlistModal}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <form className="mt-6 grid gap-4" onSubmit={handleWaitlistSubmit}>
                {shouldCollectEmail && (
                  <div className="grid gap-2 text-sm font-medium text-slate-600">
                    <label htmlFor="waitlist-email">Email</label>
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
                )}
                <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-igates-500 focus:ring-igates-500/30"
                    checked={qualified}
                    onChange={(event) => setQualified(event.target.checked)}
                  />
                  <span>
                    Declaro que soy un inversionista calificado y entiendo los requisitos de este fondo.
                  </span>
                </label>
                <div className="grid gap-2 text-sm font-medium text-slate-600">
                  <label htmlFor="waitlist-note">Note (optional)</label>
                  <textarea
                    id="waitlist-note"
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    placeholder="Añade un contexto adicional si aplica."
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-igates-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400 disabled:cursor-not-allowed disabled:bg-igates-500/70"
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
