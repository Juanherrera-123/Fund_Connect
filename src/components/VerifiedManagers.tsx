"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  STORAGE_KEYS,
  baseVerifiedFunds,
  countryFlags,
  DEFAULT_FUND_MANAGER_PROFILES,
  formatNumber,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication, UserProfile } from "@/lib/types";

type VerifiedFund = {
  id: string;
  name: string;
  country: string;
  logoLabel: string;
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

export function VerifiedManagers() {
  const [fundApplications] = useLocalStorage<FundApplication[]>(STORAGE_KEYS.fundApplications, []);
  const [profiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, DEFAULT_FUND_MANAGER_PROFILES);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

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
      };
    });

    const baseIds = new Set(baseVerifiedFunds.map((fund) => fund.id));
    const extraFunds = fromStorage
      .filter((fund) => !baseIds.has(fund.id));

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
    setCurrentIndex(0);
  }, [filters]);

  useEffect(() => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) return;
    const activeCard = track.querySelector<HTMLButtonElement>(
      `[data-fund-card="true"][data-index="${currentIndex}"]`
    );
    if (!activeCard) return;
    const containerWidth = carousel.offsetWidth;
    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    const offset = containerWidth / 2 - cardCenter;
    track.style.transform = `translateX(${offset}px)`;
  }, [currentIndex, filteredFunds.length]);

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const carousel = carouselRef.current;
      if (!track || !carousel) return;
      const activeCard = track.querySelector<HTMLButtonElement>(
        `[data-fund-card="true"][data-index="${currentIndex}"]`
      );
      if (!activeCard) return;
      const containerWidth = carousel.offsetWidth;
      const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
      const offset = containerWidth / 2 - cardCenter;
      track.style.transform = `translateX(${offset}px)`;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let startX = 0;
    let deltaX = 0;

    const handleStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
    };

    const handleMove = (event: TouchEvent) => {
      deltaX = (event.touches[0]?.clientX ?? 0) - startX;
    };

    const handleEnd = () => {
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          setCurrentIndex((prev) => Math.min(prev + 1, filteredFunds.length - 1));
        } else {
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
      }
      deltaX = 0;
    };

    carousel.addEventListener("touchstart", handleStart);
    carousel.addEventListener("touchmove", handleMove);
    carousel.addEventListener("touchend", handleEnd);

    return () => {
      carousel.removeEventListener("touchstart", handleStart);
      carousel.removeEventListener("touchmove", handleMove);
      carousel.removeEventListener("touchend", handleEnd);
    };
  }, [filteredFunds.length]);

  const selectedFund = filteredFunds[currentIndex] ?? null;

  const handleApplyFilters = () => {
    setFilters(appliedFilters);
  };

  const handleResetFilters = () => {
    setAppliedFilters(initialFilters);
    setFilters(initialFilters);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!filteredFunds.length) return;
    setCurrentIndex((prev) => Math.min(prev + 1, filteredFunds.length - 1));
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

  return (
    <>
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
          <div className="mt-6 flex items-center gap-4">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              aria-label="Ver fondo anterior"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              ‹
            </button>
            <div className="flex-1 overflow-hidden" ref={carouselRef} aria-live="polite">
              <div className="flex gap-5 py-4 transition-transform duration-500" ref={trackRef}>
                {!filteredFunds.length && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No hay fondos con estos criterios.
                  </div>
                )}
                {filteredFunds.map((fund, index) => {
                  const isActive = index === currentIndex;
                  const isPrev = index === currentIndex - 1;
                  const isNext = index === currentIndex + 1;
                  const isFar = Math.abs(index - currentIndex) > 1;
                  return (
                    <button
                      className={`flex w-[70%] max-w-3xl flex-shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 ${
                        isActive
                          ? "scale-100 opacity-100 shadow-lg"
                          : isFar
                            ? "scale-90 opacity-30"
                            : isPrev || isNext
                              ? "scale-95 opacity-70"
                              : "scale-95 opacity-60"
                      }`}
                      type="button"
                      key={fund.id}
                      data-index={index}
                      data-fund-card="true"
                      aria-label={`Ver detalle de ${fund.name}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-igates-500/10 text-lg font-semibold text-igates-700"
                          aria-hidden="true"
                        >
                          {fund.logoLabel}
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{fund.name}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                              {renderCountryBadge(fund.country)}
                            </span>
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              ✅ Verificado
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{fund.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          {fund.strategy}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          {fund.region}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              aria-label="Ver fondo siguiente"
              onClick={handleNext}
              disabled={currentIndex >= filteredFunds.length - 1}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="py-8" aria-live="polite">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {!selectedFund ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                Selecciona un fondo para ver el detalle.
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-igates-500/10 text-lg font-semibold text-igates-700"
                    aria-hidden="true"
                  >
                    {selectedFund.logoLabel}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-900">{selectedFund.name}</h3>
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                        {renderCountryBadge(selectedFund.country)}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        ✅ Verificado
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{selectedFund.description}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Tiempo operando", value: formattedOperatingTime, highlight: true },
                    { label: "Profit mensual (último año)", value: formattedProfit, highlight: true },
                    { label: "Drawdown target", value: formattedDrawdownTarget, highlight: true },
                    { label: "Max drawdown", value: formattedMaxDrawdown, highlight: true },
                    { label: "Trades mensuales", value: formattedTrades },
                    { label: "Gestión de riesgo", value: formattedRisk },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                      <p className={`mt-2 text-lg font-semibold ${item.highlight ? "text-slate-900" : "text-slate-700"}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2 lg:col-span-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Live performance tracking
                    </p>
                    <ul className="mt-2 grid gap-1 text-xs text-slate-600">
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
                  {[
                    { label: "Min investment", value: formattedMinInvestment },
                    { label: "Performance fee", value: formattedPerformanceFee },
                    { label: "Subscription fee", value: formattedSubscriptionFee },
                    { label: "Reports", value: formattedReports },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    className="inline-flex w-fit items-center justify-center rounded-full bg-igates-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
                    href="/#contact"
                  >
                    Quiero más información
                  </Link>
                  <p className="text-xs text-slate-500">
                    Accede a documentación, estructura operativa y proceso de inversión.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
