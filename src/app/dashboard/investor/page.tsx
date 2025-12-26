const breakdownCardClass =
  "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

export default function InvestorDashboard() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Requests</h1>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-700">Key metrics</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={breakdownCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Waitlist</h3>
                <p className="text-xs text-slate-500">Solicitudes en cola</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">86</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[140px,1fr]">
              <svg viewBox="0 0 140 100" className="h-24 w-full">
                <rect x="12" y="40" width="24" height="48" fill="#0f766e" />
                <rect x="52" y="25" width="24" height="63" fill="#14b8a6" />
                <rect x="92" y="55" width="24" height="33" fill="#94a3b8" />
              </svg>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Listos para asignar</span>
                  <span className="font-semibold text-slate-900">34</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>En revisión</span>
                  <span className="font-semibold text-slate-900">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Información incompleta</span>
                  <span className="font-semibold text-slate-900">14</span>
                </div>
              </div>
            </div>
          </div>

          <div className={breakdownCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Fund requests</h3>
                <p className="text-xs text-slate-500">Fondos nuevos por aprobar</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">21</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[140px,1fr]">
              <svg viewBox="0 0 140 100" className="h-24 w-full">
                <rect x="12" y="30" width="24" height="58" fill="#f97316" />
                <rect x="52" y="44" width="24" height="44" fill="#fdba74" />
                <rect x="92" y="58" width="24" height="30" fill="#94a3b8" />
              </svg>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Pendientes de aprobación</span>
                  <span className="font-semibold text-slate-900">9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>En validación</span>
                  <span className="font-semibold text-slate-900">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Documentación faltante</span>
                  <span className="font-semibold text-slate-900">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
