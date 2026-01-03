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
      className="relative overflow-hidden bg-[url('/worldmap-Igates.png')] bg-cover bg-center text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-igates-800/80 via-igates-700/70 to-igates-900/80" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60"
            data-i18n="heroEyebrow"
          >
            Acceso institucional
          </p>
          <div className="space-y-4">
            <h1
              className="bg-gradient-to-r from-igates-400 via-igates-500 to-igates-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl"
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
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-igates-500 to-igates-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-none hover:bg-white hover:text-igates-500"
              href="#contact"
              data-i18n="heroCtaInvestor"
            >
              Solicitar asesoría de inversión
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
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="text-xs uppercase tracking-[0.2em]">Rendimiento YTD</span>
              <span className="text-lg font-semibold text-emerald-300">+14.8%</span>
            </div>
            <div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-emerald-300/30 via-emerald-400/10 to-transparent" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-3 text-sm">
              {[
                { label: "Volatilidad", value: "12.4%" },
                { label: "Máx. caída", value: "-3.1%", negative: true },
                { label: "Riesgo", value: "Medio-Bajo", badge: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-white/60">{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                      {item.value}
                    </span>
                  ) : (
                    <span className={item.negative ? "text-rose-300" : "text-white"}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">AUM verificado</div>
            <div className="mt-2 text-3xl font-semibold">$212M</div>
            <p className="mt-1 text-sm text-white/60">Con 10 gestores</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="absolute inset-0 opacity-40">
              <div className="grid h-full w-full grid-cols-4 gap-2 p-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-full rounded-2xl bg-gradient-to-t from-white/15 to-transparent"
                  />
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-4">
              <p className="text-sm text-white/70">Métricas consolidadas</p>
              <button className="rounded-full bg-gradient-to-r from-igates-500 to-igates-400 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-none hover:bg-white hover:text-igates-500">
                Ver estadísticas completas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
