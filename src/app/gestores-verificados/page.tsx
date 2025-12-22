import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function GestoresVerificadosPage() {
  return (
    <div className="verified-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">Selección institucional</p>
            <div className="page-title-row">
              <h1>Gestores verificados</h1>
              <div className="micro-tag">Vista curada</div>
            </div>
            <p className="lead compact">
              Explora fondos privados con capital real, track record auditado y gestión profesional.
            </p>
          </div>
        </section>

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
                  <button className="btn btn-secondary btn-compact" id="resetFilters">
                    Reset
                  </button>
                  <button className="btn btn-primary btn-compact" id="applyFilters">
                    Apply filters
                  </button>
                </div>
              </div>
              <div className="filters-bar__grid" id="filtersGrid">
                <div className="filter-control">
                  <label htmlFor="yearProfit" className="small label">
                    Year Total Profit (%)
                  </label>
                  <div className="input-combo">
                    <input
                      type="number"
                      id="yearProfit"
                      placeholder="Ej: 10"
                      aria-label="Valor de Year Total Profit"
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
                      aria-label="Valor de Max Drawdown"
                    />
                  </div>
                </div>
                <div className="filter-control">
                  <label htmlFor="regionFilter" className="small label">
                    Región
                  </label>
                  <select id="regionFilter" aria-label="Seleccionar región">
                    <option value="">Cualquiera</option>
                  </select>
                </div>
                <div className="filter-control">
                  <label htmlFor="countryFilter" className="small label">
                    País
                  </label>
                  <select id="countryFilter" aria-label="Seleccionar país">
                    <option value="">Cualquiera</option>
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
                      aria-label="Valor de Win Rate"
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
                id="carouselPrev"
                type="button"
                aria-label="Ver fondo anterior"
              >
                ‹
              </button>
              <div className="fund-carousel" id="fundCarousel" aria-live="polite">
                <div className="fund-carousel-track" id="fundCarouselTrack">
                  <div className="loading">Cargando gestores...</div>
                </div>
              </div>
              <button
                className="carousel-control next"
                id="carouselNext"
                type="button"
                aria-label="Ver fondo siguiente"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="fund-detail" aria-live="polite">
          <div className="container">
            <div className="detail-card" id="detailCard">
              <div className="empty-state">Selecciona un fondo para ver el detalle.</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
