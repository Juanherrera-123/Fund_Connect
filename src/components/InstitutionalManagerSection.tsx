import Link from "next/link";

const standardSignals = [
  {
    key: "managersInstitutionalSignal1",
    title: "Ejecución real en broker regulado",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-igates-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 8-8" />
      </svg>
    ),
  },
  {
    key: "managersInstitutionalSignal2",
    title: "Historial verificable (no señales)",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-igates-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "managersInstitutionalSignal3",
    title: "Modelo de riesgo definido",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-igates-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V7l8-4z" />
      </svg>
    ),
  },
];

export function InstitutionalManagerSection() {
  return (
    <section className="pb-12 pt-6 sm:pb-16 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="igates-institutional-frame shadow-[0_30px_60px_-45px_rgba(15,23,42,0.55)]">
          <div className="igates-institutional-surface rounded-[calc(2.5rem-1px)] px-6 py-8 sm:px-12 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600"
                  data-i18n="managersInstitutionalEyebrow"
                >
                  PARA GESTORES DE FONDOS
                </p>
                <div className="space-y-3">
                  <h2
                    className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl"
                    data-i18n="managersInstitutionalTitle"
                  >
                    Distribución institucional. Solo para estrategias listas.
                  </h2>
                  <p className="max-w-2xl text-base text-slate-700" data-i18n="managersInstitutionalLead">
                    IGATES trabaja con un número limitado de gestores que operan bajo ejecución A-book, cuentas
                    segregadas y reporting verificable. Si tu estrategia cumple estándares institucionales,
                    iniciamos un proceso de evaluación privada.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {standardSignals.map((signal) => (
                    <span key={signal.title} className="igates-chip gap-2 rounded-full border-slate-200/80 bg-white/70">
                      {signal.icon}
                      <span className="text-[11px] text-slate-700" data-i18n={signal.key}>
                        {signal.title}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Link
                  href="/auth"
                  className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
                  data-i18n="managersInstitutionalCta"
                >
                  Iniciar evaluación institucional
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                  data-i18n="managersInstitutionalSecondaryCta"
                >
                  Hablar con el equipo IGATES →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
