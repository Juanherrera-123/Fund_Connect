"use client";

import { useId, useState, type SVGProps } from "react";

const tabs = [
  {
    id: "execution",
    titleKey: "complianceIdentityTitle",
    bodyKey: "complianceIdentityBody",
    detailKey: "complianceIdentityDetail",
    title: "Ejecución y liquidez",
    body: "Acceso a gestores que operan exclusivamente vía brokers A-book y Prime of Prime, con ejecución directa a mercado, profundidad real y sin conflictos por internalización.",
    detail: "Modelo A-book verificado",
    icon: TrendingUpIcon,
  },
  {
    id: "custody",
    titleKey: "complianceMonitoringTitle",
    bodyKey: "complianceMonitoringBody",
    detailKey: "complianceMonitoringDetail",
    title: "Custodia y segregación",
    body: "Los fondos permanecen siempre bajo custodia del broker, en cuentas segregadas a nombre del inversor. IGATES no recibe, retiene ni mueve capital.",
    detail: "Segregación obligatoria",
    icon: ShieldIcon,
  },
  {
    id: "traceability",
    titleKey: "complianceGovernanceTitle",
    bodyKey: "complianceGovernanceBody",
    detailKey: "complianceGovernanceDetail",
    title: "Riesgo y trazabilidad",
    body: "Asignaciones estructuradas con límites de drawdown, reporting verificable y seguimiento continuo sobre cuentas reales. Todo auditable. Todo trazable.",
    detail: "Reporting sobre cuentas reales",
    icon: ScanLineIcon,
  },
];

const claims = [
  { key: "complianceClaimExecution", label: "Ejecución A-book / PoP" },
  { key: "complianceClaimSegregated", label: "Cuentas segregadas" },
  { key: "complianceClaimReporting", label: "Reporting verificable" },
  { key: "complianceClaimTraceability", label: "Trazabilidad auditables" },
];

export function MarketInfrastructureSection() {
  return (
    <section
      id="compliance"
      className="overflow-hidden bg-[#f6f9ff] py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-500"
              data-i18n="complianceEyebrow"
            >
              INFRAESTRUCTURA DE MERCADO
            </p>
            <h2
              className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl"
              data-i18n="complianceTitle"
            >
              Infraestructura institucional. Ejecución real, reglas claras.
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              <p data-i18n="complianceBodyPrimary">
                IGATES conecta capital con gestores verificados que operan exclusivamente sobre
                infraestructura institucional. Sin internalización, sin opacidad, sin
                intermediación de capital.
              </p>
              <p data-i18n="complianceBodySecondary">
                Toda la operativa se estructura sobre brokers A-book y Prime of Prime, donde la
                ejecución, la segregación de fondos y la trazabilidad no son opcionales, sino
                requisitos básicos. IGATES no custodia, no recibe ni intermedia capital. Actuamos
                como una capa institucional de acceso y control.
              </p>
            </div>
            <div className="grid gap-3 text-xs font-semibold text-slate-600 sm:grid-cols-2">
              {claims.map((claim) => (
                <div
                  key={claim.key}
                  className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]"
                  data-i18n={claim.key}
                >
                  {claim.label}
                </div>
              ))}
            </div>
          </div>
          <MarketInfrastructureTabs />
        </div>
      </div>
    </section>
  );
}

export function MarketInfrastructureTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const activeTab = tabs[selectedTab];
  const baseId = useId();

  return (
    <div className="w-full max-w-full rounded-[28px] bg-gradient-to-br from-white/60 via-white/80 to-slate-50/80 p-4">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-violet-500/30 p-[1px] shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
        <div className="rounded-[27px] bg-white/80 p-6 backdrop-blur-[2px]">
          <div className="relative mb-5">
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60">
              <div className="indicator-bar absolute inset-0" />
            </div>
          </div>
          <div
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col"
            role="tablist"
            aria-label="Infraestructura institucional"
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = selectedTab === index;
              return (
                <div
                  key={tab.id}
                  className={`rounded-2xl p-[1px] transition-all duration-200 ease-out ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-violet-500/40 shadow-[0_10px_24px_rgba(59,130,246,0.12)]"
                      : "bg-transparent"
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-${tab.id}-panel`}
                    id={`${baseId}-${tab.id}-tab`}
                    onClick={() => setSelectedTab(index)}
                    className={`flex w-full min-w-[180px] items-start gap-3 rounded-[15px] border px-4 py-3 text-left transition-all duration-200 ease-out sm:min-w-[220px] lg:min-w-0 ${
                      isActive
                        ? "border-transparent bg-white/85 text-slate-900"
                        : "border-slate-200/70 bg-white/60 text-slate-700 hover:border-slate-300/80 hover:bg-white/75"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-igates-600 transition-colors duration-200 ${
                        isActive ? "text-igates-500" : "text-slate-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 space-y-1">
                      <span className="block text-sm font-semibold" data-i18n={tab.titleKey}>
                        {tab.title}
                      </span>
                      <span className="block text-xs text-slate-500" data-i18n={tab.bodyKey}>
                        {tab.body}
                      </span>
                      {isActive ? (
                        <span
                          className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-igates-500"
                          data-i18n={tab.detailKey}
                        >
                          {tab.detail}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          <div
            className="mt-5 rounded-2xl border border-slate-200/70 bg-white/75 p-5 shadow-sm"
            role="tabpanel"
            id={`${baseId}-${activeTab.id}-panel`}
            aria-labelledby={`${baseId}-${activeTab.id}-tab`}
            key={activeTab.id}
          >
            <div className="animate-tab-content space-y-2">
              <p className="text-base font-semibold text-slate-900" data-i18n={activeTab.titleKey}>
                {activeTab.title}
              </p>
              <p className="text-sm text-slate-600" data-i18n={activeTab.bodyKey}>
                {activeTab.body}
              </p>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500"
                data-i18n={activeTab.detailKey}
              >
                {activeTab.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .indicator-bar {
          background: linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.2) 0%,
            rgba(34, 211, 238, 0.45) 45%,
            rgba(168, 85, 247, 0.35) 100%
          );
          background-size: 200% 100%;
          animation: igates-indicator 8s ease-in-out infinite;
        }

        .animate-tab-content {
          animation: tab-fade 200ms ease-out;
        }

        @keyframes igates-indicator {
          0% {
            transform: translateX(-25%);
          }
          50% {
            transform: translateX(25%);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        @keyframes tab-fade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function TrendingUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3l7 4v5c0 4.25-3.1 8.22-7 9-3.9-.78-7-4.75-7-9V7l7-4z" />
    </svg>
  );
}

function ScanLineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7V5a2 2 0 0 1 2-2h2" />
      <path d="M16 3h2a2 2 0 0 1 2 2v2" />
      <path d="M20 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 21H6a2 2 0 0 1-2-2v-2" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function Compliance() {
  return <MarketInfrastructureSection />;
}
