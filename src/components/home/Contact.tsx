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
    label: "Seguridad",
    metric: "Listo para SOC2",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em] text-igates-400"
            data-i18n="contactEyebrow"
          >
            Conversemos
          </p>
          <h2 className="text-3xl font-semibold" data-i18n="contactTitle">
            Inicia tu proceso de acceso.
          </h2>
          <p className="text-base text-white/70" data-i18n="contactLead">
            Cuéntanos sobre tu mandato o estrategia. Nuestro equipo coordinará data rooms,
            solicitudes de due diligence y acceso seguro.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {contactMeta.map((item) => (
              <div key={item.labelKey} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50" data-i18n={item.labelKey}>
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold" data-i18n={item.metricKey}>
                  {item.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
