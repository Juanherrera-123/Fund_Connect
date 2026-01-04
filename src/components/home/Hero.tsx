import Link from "next/link";

const trustItems = [
  { key: "heroTrust1", label: "Operate with regulated entities" },
  { key: "heroTrust2", label: "Segregated accounts and protected funds" },
  { key: "heroTrust3", label: "Verified monthly reporting" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[url('/worldmap-Igates.png')] bg-cover bg-center text-white"
    >
      <div className="absolute inset-0 z-0 bg-[rgba(255,255,255,0.88)] backdrop-blur" />
      <div className="relative z-10 mx-auto grid max-w-6xl translate-y-4 gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60"
            data-i18n="heroEyebrow"
          >
            Acceso institucional
          </p>
          <div className="space-y-4">
            <h1
              className="igates-gradient-text text-4xl font-semibold leading-tight md:text-6xl"
              data-i18n="heroTitle"
            >
              Conectando capital con gestores verificados
            </h1>
            <p className="text-base text-white/70 md:text-lg" data-i18n="heroLead">
              Infraestructura institucional para acceder a fondos gestionados con estándares
              profesionales.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-igates-500/30 transition"
              href="#contact"
              data-i18n="heroCtaInvestor"
            >
              Solicitar acceso institucional
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              href="#contact"
              data-i18n="heroCtaManager"
            >
              Postularse como gestor
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            {trustItems.map((item) => (
              <span key={item.key} className="rounded-full border border-white/15 px-4 py-2">
                <span data-i18n={item.key}>{item.label}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-slate-700 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.2em] text-slate-500">Rendimiento YTD</span>
              <span className="text-base font-semibold text-emerald-500">+14.8%</span>
            </div>
            <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-igates-500/10 via-igates-400/10 to-transparent" />
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-slate-700 shadow-sm">
            <div className="space-y-2 text-xs">
              {[
                { label: "Volatilidad", value: "12.4%" },
                { label: "Máx. caída", value: "-3.1%", negative: true },
                { label: "Riesgo", value: "Medio-Bajo", badge: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-slate-500">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-600">
                      {item.value}
                    </span>
                  ) : (
                    <span className={item.negative ? "text-rose-500" : "text-slate-700"}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-slate-700 shadow-sm">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">AUM verificado</div>
            <div className="mt-2 text-2xl font-semibold text-slate-800">$212M</div>
            <p className="mt-1 text-xs text-slate-500">Con 10 gestores</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-slate-700 shadow-sm">
            <div className="absolute inset-0 opacity-20">
              <div className="grid h-full w-full grid-cols-4 gap-2 p-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-full rounded-xl bg-gradient-to-t from-igates-500/20 to-transparent"
                  />
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-4">
              <p className="text-xs text-slate-600">Métricas consolidadas</p>
              <button className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-700">
                Ver estadísticas completas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
