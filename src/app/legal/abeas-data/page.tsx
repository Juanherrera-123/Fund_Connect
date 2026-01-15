import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const legalSections = [
  {
    id: "proteccion-de-datos",
    titleKey: "legalSectionDataTitle",
    title: "Protección de datos y derechos del titular (Habeas Data)",
    bodyKey: "legalSectionDataBody",
    body:
      "IGATES reconoce la importancia de la protección de datos personales y trata la información únicamente para procesos de verificación, debida diligencia, coordinación operativa y comunicaciones institucionales. No comercializamos datos ni autorizamos su uso con fines no vinculados al modelo de acceso curado. Los titulares pueden ejercer derechos de acceso, actualización, rectificación, supresión, revocatoria y oposición conforme a la normativa aplicable.",
  },
  {
    id: "seguridad-informacion",
    titleKey: "legalSectionSecurityTitle",
    title: "Política de seguridad de la información",
    bodyKey: "legalSectionSecurityBody",
    body:
      "Aplicamos controles técnicos y administrativos alineados con estándares institucionales: gobierno de roles, cifrado en tránsito y en reposo, principio de mínimo privilegio y monitoreo continuo de eventos. Realizamos revisiones periódicas, gestión de incidentes y evaluación de terceros para mantener la integridad, disponibilidad y confidencialidad de la información.",
  },
  {
    id: "custodia-ejecucion-riesgo",
    titleKey: "legalSectionCustodyTitle",
    title: "Custodia de capital, ejecución y gestión de riesgo",
    bodyKey: "legalSectionCustodyBody",
    body:
      "IGATES no es broker ni custodio. El capital permanece en cuentas segregadas a nombre del inversionista en brokers A-book y Prime of Prime, bajo estructuras MAM administradas por gestores verificados. IGATES no ejecuta órdenes ni recibe fondos; coordina el acceso operativo y la verificación. El inversionista asume el riesgo económico asociado a la estrategia y a las condiciones de mercado.",
  },
  {
    id: "condiciones-uso",
    titleKey: "legalSectionUseTitle",
    title: "Condiciones de uso de la plataforma",
    bodyKey: "legalSectionUseBody",
    body:
      "El acceso a la plataforma se limita a usuarios autorizados que proporcionen información veraz y utilicen el servicio con fines lícitos. Se prohíbe el acceso no autorizado, la interferencia con sistemas y cualquier uso que comprometa la seguridad o la integridad del ecosistema. IGATES podrá suspender o restringir accesos ante incumplimientos o riesgos operativos.",
  },
  {
    id: "limitacion-responsabilidad",
    titleKey: "legalSectionLiabilityTitle",
    title: "Limitación de responsabilidad",
    bodyKey: "legalSectionLiabilityBody",
    body:
      "La información entregada tiene fines informativos y no constituye asesoría financiera, legal o tributaria. IGATES no garantiza resultados ni rendimientos, y no es responsable por pérdidas derivadas de decisiones de inversión, acciones de terceros, fallas operativas externas o eventos de fuerza mayor.",
  },
  {
    id: "cumplimiento-marco-operativo",
    titleKey: "legalSectionComplianceTitle",
    title: "Cumplimiento y marco operativo",
    bodyKey: "legalSectionComplianceBody",
    body:
      "IGATES opera como capa institucional de acceso, verificación y coordinación, sin constituirse como fondo, vehículo de inversión o custodio. El marco operativo se ajusta a requerimientos regulatorios y a estándares de mercado aplicables, con actualizaciones cuando cambien las condiciones de cumplimiento.",
  },
  {
    id: "contacto-derechos",
    titleKey: "legalSectionContactTitle",
    title: "Contacto y ejercicio de derechos",
    bodyKey: "legalSectionContactBody",
    body:
      "Las solicitudes relacionadas con datos personales, cumplimiento o uso de la plataforma deben enviarse a los canales oficiales de IGATES. Atendemos requerimientos en tiempos razonables conforme a la normativa aplicable y registramos la trazabilidad de cada gestión.",
  },
];

export default function LegalAbeasDataPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="bg-gradient-to-br from-sky-50 via-slate-50 to-white">
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
              data-i18n="legalEyebrow"
            >
              Abeas Data / Legal
            </p>
            <h1
              className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl"
              data-i18n="legalTitle"
            >
              Abeas Data / Legal
            </h1>
            <p className="mt-4 max-w-3xl text-base text-slate-600" data-i18n="legalSubtitle">
              Políticas y condiciones institucionales que describen la operación de IGATES, la
              custodia de capital y el tratamiento de datos personales en el modelo de acceso curado.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-2xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500" data-i18n="legalTocTitle">
                Índice
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                {legalSections.map((section) => (
                  <Link
                    key={section.id}
                    className="rounded-lg border border-slate-200/60 bg-white/60 px-4 py-3 transition hover:border-slate-300 hover:text-slate-900"
                    href={`/legal/abeas-data#${section.id}`}
                    data-i18n={section.titleKey}
                  >
                    {section.title}
                  </Link>
                ))}
              </div>
            </div>

            {legalSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur"
                aria-labelledby={`${section.id}-title`}
              >
                <h2
                  id={`${section.id}-title`}
                  className="text-xl font-semibold text-slate-900"
                  data-i18n={section.titleKey}
                >
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600" data-i18n={section.bodyKey}>
                  {section.body}
                </p>
              </section>
            ))}

            <p className="text-xs text-slate-500" data-i18n="legalUpdated">
              Última actualización: 2026
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
