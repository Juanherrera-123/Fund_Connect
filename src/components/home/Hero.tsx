import Link from "next/link";

const trustItems = [
  { key: "heroTrust1", label: "Operate with regulated entities" },
  { key: "heroTrust2", label: "Segregated accounts and protected funds" },
  { key: "heroTrust3", label: "Verified monthly reporting" },
];

const heroMetrics = [
  {
    labelKey: "heroMetricInstrumentsLabel",
    label: "Instrumentos",
    value: "+2,200",
  },
  {
    labelKey: "heroMetricTotalAumLabel",
    label: "Total AUM",
    value: "$200M",
    subLabelKey: "heroMetricManagersLabel",
    subLabel: "Con 6 gestores",
  },
  {
    labelKey: "heroMetricTrackRecordLabel",
    label: "Track Record",
    valueKey: "heroMetricTrackRecordValue",
    value: "+60% anual",
  },
  {
    labelKey: "heroMetricMaxDrawdownLabel",
    label: "Max Drawdown",
    value: "6%",
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-0 flex min-h-screen items-center overflow-hidden bg-[url('/worldmap-Igates.png')] bg-cover bg-center text-slate-900"
    >
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{
            filter: "saturate(92%) contrast(96%) brightness(102%)",
          }}
        >
          <source src="/background-hero-animation.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(235, 242, 255, 0.55) 0%, rgba(240, 246, 255, 0.38) 45%, rgba(255, 255, 255, 0.12) 100%)",
          backdropFilter: "blur(6px) saturate(105%)",
          WebkitBackdropFilter: "blur(6px) saturate(105%)",
        }}
      />
      <div className="relative z-10 mx-auto grid h-full max-w-6xl gap-10 px-6 pt-24 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-28 lg:pb-16">
        <div className="space-y-6">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600"
            data-i18n="heroEyebrow"
          >
            Acceso institucional
          </p>
          <div className="space-y-3">
            <h1
              className="igates-gradient-text pb-1 text-4xl font-semibold leading-[1.05] md:text-6xl"
              data-i18n="heroTitle"
            >
              Conectando capital con gestores verificados
            </h1>
            <p className="text-base text-slate-700 md:text-lg" data-i18n="heroLead">
              Infraestructura institucional para acceder a fondos gestionados con estándares
              profesionales.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition"
              href={{ pathname: "/auth", query: { role: "Family Office" } }}
              data-i18n="heroCtaInvestor"
            >
              Solicitar acceso institucional
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/55 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-white/60 hover:bg-white/70 hover:text-slate-900 hover:shadow-md"
              href={{ pathname: "/auth", query: { role: "Fund Manager" } }}
              data-i18n="heroCtaManager"
            >
              Postularse como gestor
            </Link>
          </div>
          <div className="mt-6 grid gap-4 text-sm font-medium md:grid-cols-3 md:gap-0">
            {trustItems.map((item, index) => (
              <div
                key={item.key}
                className="relative flex items-center justify-center px-2 py-3 md:px-6"
              >
                <div
                  className="group flex w-full items-center justify-center text-center opacity-90 transition hover:opacity-100"
                  style={{ animationDelay: `${index * 140}ms` }}
                >
                  <span
                    className="hero-trust-item text-[rgba(30,64,175,0.9)] transition duration-300 group-hover:igates-gradient-text group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.22)] md:text-[15px]"
                    data-i18n={item.key}
                  >
                    {item.label}
                  </span>
                </div>
                {index < trustItems.length - 1 ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-1/2 hidden h-9 w-px -translate-y-1/2 bg-[linear-gradient(to_bottom,rgba(59,130,246,0.15),rgba(59,130,246,0.45),rgba(59,130,246,0.15))] md:block"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-6 right-6 h-px bg-[linear-gradient(to_right,rgba(59,130,246,0.15),rgba(59,130,246,0.45),rgba(59,130,246,0.15))] md:hidden"
                    />
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.8)] p-4 text-slate-700 shadow-sm backdrop-blur-[8px]">
            <div className="grid grid-cols-2 gap-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.labelKey}
                  className="rounded-2xl border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.8)] p-3 shadow-sm"
                >
                  <div
                    className="text-xl font-semibold text-igates-600"
                    data-i18n={metric.valueKey}
                  >
                    {metric.value}
                  </div>
                  <p className="text-xs text-slate-500" data-i18n={metric.labelKey}>
                    {metric.label}
                  </p>
                  {metric.subLabel ? (
                    <p className="text-[11px] text-slate-400" data-i18n={metric.subLabelKey}>
                      {metric.subLabel}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
                data-i18n="heroMetricsLabel"
              >
                Métricas consolidadas
              </p>
              <Link
                className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition"
                href="/gestores-verificados#filtersPanel"
              >
                <span data-i18n="heroMetricsCta">Ver estadísticas completas</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
