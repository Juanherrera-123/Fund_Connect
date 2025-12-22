"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  STORAGE_KEYS,
  baseVerifiedFunds,
  countryFlags,
  formatNumber,
  formatPercent,
  getFundLogoLabel,
} from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { FundApplication } from "@/lib/types";

type VerifiedFund = {
  id: string;
  name: string;
  country: string;
  logoLabel: string;
  region: string;
  strategy: string;
  riskLevel: string;
  yearProfit: number | null;
  maxDrawdown: number | null;
  winRate: number | null;
  volatility: number | null;
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
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const verifiedFunds = useMemo<VerifiedFund[]>(() => {
    const fromStorage = fundApplications
      .filter((application) => application.status === "verified")
      .map((application) => ({
        id: application.id,
        name: application.fundName,
        country: application.country || "Global",
        logoLabel: getFundLogoLabel(application.fundName),
        region: application.region || "Global",
        strategy: application.strategyLabel || "Multi-Strategy",
        riskLevel: application.riskLevel || "En revisión",
        yearProfit: application.yearProfit ?? null,
        maxDrawdown: application.maxDrawdown ?? null,
        winRate: application.winRate ?? null,
        volatility: application.volatility ?? null,
        aum: application.aum || "N/A",
        description: application.description || "Gestor en proceso de verificación.",
      }));

    return [...baseVerifiedFunds, ...fromStorage];
  }, [fundApplications]);

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
    const activeCard = track.querySelector<HTMLButtonElement>(`.fund-card[data-index="${currentIndex}"]`);
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
      const activeCard = track.querySelector<HTMLButtonElement>(`.fund-card[data-index="${currentIndex}"]`);
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
      <span className="country-flag" role="img" aria-label={country}>
        {countryFlags[country] || "🌍"}
      </span>
      <span className="country-name">{country}</span>
    </>
  );

  return (
    <>
      <section className="filters-section institutional" aria-labelledby="filtersTitle">
        <div className="container">
          <div className="filters-bar" id="filtersPanel">
            <div className="filters-bar__header">
              <div>
                <p className="eyebrow" id="filtersTitle">
                  Search settings
                </p>
                <p className="muted small">Ajusta umbrales mínimos y riesgo objetivo.</p>
              </div>
              <div className="filters-actions">
                <button className="btn btn-secondary btn-compact" type="button" onClick={handleResetFilters}>
                  Reset
                </button>
                <button className="btn btn-primary btn-compact" type="button" onClick={handleApplyFilters}>
                  Apply filters
                </button>
              </div>
            </div>
            <div className="filters-bar__grid">
              <div className="filter-control">
                <label htmlFor="yearProfit" className="small label">
                  Year Total Profit (%)
                </label>
                <div className="input-combo">
                  <input
                    type="number"
                    id="yearProfit"
                    placeholder="Ej: 10"
                    value={appliedFilters.yearProfit}
                    onChange={(event) =>
                      setAppliedFilters((prev) => ({ ...prev, yearProfit: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="filter-control">
                <label htmlFor="drawdown" className="small label">
                  Max Drawdown (%)
                </label>
                <div className="input-combo">
                  <input
                    type="number"
                    id="drawdown"
                    placeholder="Ej: 12"
                    value={appliedFilters.drawdown}
                    onChange={(event) =>
                      setAppliedFilters((prev) => ({ ...prev, drawdown: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="filter-control">
                <label htmlFor="regionFilter" className="small label">
                  Región
                </label>
                <select
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
              <div className="filter-control">
                <label htmlFor="countryFilter" className="small label">
                  País
                </label>
                <select
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
              <div className="filter-control">
                <label htmlFor="winRate" className="small label">
                  Win Rate (%)
                </label>
                <div className="input-combo">
                  <input
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
        </div>
      </section>

      <section className="verified-funds carousel-section" id="asesoria">
        <div className="container">
          <div className="section-header compact">
            <p className="eyebrow">Panel de gestores</p>
            <h2>Fondos verificados listos para diligencia</h2>
            <p className="lead compact">Selecciona un fondo para ver el detalle curado.</p>
          </div>
          <div className="fund-carousel-shell">
            <button
              className="carousel-control prev"
              type="button"
              aria-label="Ver fondo anterior"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              ‹
            </button>
            <div className="fund-carousel" ref={carouselRef} aria-live="polite">
              <div className="fund-carousel-track" ref={trackRef}>
                {!filteredFunds.length && <div className="empty-state">No hay fondos con estos criterios.</div>}
                {filteredFunds.map((fund, index) => (
                  <button
                    className={`fund-card${index === currentIndex ? " active" : ""}${
                      index === currentIndex - 1 ? " prev" : ""
                    }${index === currentIndex + 1 ? " next" : ""}${
                      Math.abs(index - currentIndex) > 1 ? " far" : ""
                    }`}
                    type="button"
                    key={fund.id}
                    data-index={index}
                    aria-label={`Ver detalle de ${fund.name}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="fund-card__header">
                      <div className="fund-logo" aria-hidden="true">
                        {fund.logoLabel}
                      </div>
                      <div>
                        <p className="fund-card__name">{fund.name}</p>
                        <div className="fund-card__meta">
                          <span className="badge country">{renderCountryBadge(fund.country)}</span>
                          <span className="badge success">✅ Verificado</span>
                        </div>
                      </div>
                    </div>
                    <p className="fund-card__description">{fund.description}</p>
                    <div className="fund-card__tags">
                      <span className="tag subtle">{fund.strategy}</span>
                      <span className="tag subtle">{fund.region}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              className="carousel-control next"
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

      <section className="fund-detail" aria-live="polite">
        <div className="container">
          <div className="detail-card">
            {!selectedFund ? (
              <div className="empty-state">Selecciona un fondo para ver el detalle.</div>
            ) : (
              <>
                <div className="fund-detail-header">
                  <div className="fund-logo" aria-hidden="true">
                    {selectedFund.logoLabel}
                  </div>
                  <div>
                    <div className="fund-detail-title-row">
                      <h3>{selectedFund.name}</h3>
                      <span className="badge country">{renderCountryBadge(selectedFund.country)}</span>
                      <span className="badge success">✅ Verificado</span>
                    </div>
                    <p className="fund-detail-description">{selectedFund.description}</p>
                  </div>
                </div>
                <div className="fund-stats primary">
                  <div className="fund-stat-card primary">
                    <p className="label">Year Total Profit</p>
                    <p className="value">{formatPercent(selectedFund.yearProfit)}</p>
                  </div>
                  <div className="fund-stat-card primary">
                    <p className="label">Max Drawdown</p>
                    <p className="value">
                      {formatNumber(
                        selectedFund.maxDrawdown === null
                          ? null
                          : -Math.abs(selectedFund.maxDrawdown),
                        "%"
                      )}
                    </p>
                  </div>
                  <div className="fund-stat-card primary">
                    <p className="label">Win Rate</p>
                    <p className="value">{formatNumber(selectedFund.winRate, "%", 0)}</p>
                  </div>
                  <div className="fund-stat-card primary">
                    <p className="label">Nivel de Riesgo</p>
                    <p className="value">{selectedFund.riskLevel}</p>
                  </div>
                </div>
                <div className="fund-stats secondary">
                  <div className="stat-chip">
                    Volatilidad <strong>{formatNumber(selectedFund.volatility, "%")}</strong>
                  </div>
                  <div className="stat-chip">
                    AUM aprox. <strong>{selectedFund.aum}</strong>
                  </div>
                  <div className="stat-chip">
                    Estrategia <strong>{selectedFund.strategy}</strong>
                  </div>
                  <div className="stat-chip">
                    Región <strong>{selectedFund.region}</strong>
                  </div>
                </div>
                <div className="fund-cta">
                  <Link className="btn btn-primary" href="/#contact">
                    Quiero más información
                  </Link>
                  <p className="muted small">
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
