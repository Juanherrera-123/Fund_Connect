import { ContactForm } from "@/components/forms/ContactForm";

const contactMeta = [
  {
    labelKey: "contactResponseLabel",
    metricKey: "contactResponseMetric",
    label: "Tiempo de respuesta",
    metric: "< 24 horas",
  },
  {
    labelKey: "contactCoverageLabel",
    metricKey: "contactCoverageMetric",
    label: "Cobertura",
    metric: "Allocators globales",
  },
  {
    labelKey: "contactSecurityLabel",
    metricKey: "contactSecurityMetric",
    label: "Infraestructura",
    metric: "A-book / Prime of Prime",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50 py-12 sm:py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute left-8 top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-[90px]" />
        <div className="absolute bottom-10 right-12 h-72 w-72 rounded-full bg-cyan-200/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(125,211,252,0.14),transparent_60%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.25)_1px,transparent_1px)] opacity-30 [background-size:26px_26px]" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-600"
            data-i18n="contactEyebrow"
          >
            CONVERSEMOS
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            data-i18n="contactTitle"
          >
            Inicia tu proceso de acceso.
          </h2>
          <p className="text-base text-slate-600" data-i18n="contactLead">
            Cuéntanos tu mandato o estrategia. Coordinamos el proceso de due diligence, data rooms y
            acceso operativo vía infraestructura A-book / Prime of Prime.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {contactMeta.map((item) => (
              <div
                key={item.labelKey}
                className="rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500" data-i18n={item.labelKey}>
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900" data-i18n={item.metricKey}>
                  {item.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xl shadow-sky-200/40 backdrop-blur">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
