import Link from "next/link";

import { InsightCard } from "@/components/cards/InsightCard";
import { KpiCard } from "@/components/cards/KpiCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const highlights = [
  {
    label: "Funds aprobados",
    value: "28",
    detail: "Estrategias multiactivo validadas",
  },
  {
    label: "Assets en espera",
    value: "$4.6B",
    detail: "Capital institucional en evaluación",
  },
  {
    label: "Solicitudes activas",
    value: "112",
    detail: "Fund managers en proceso",
  },
];

const insights = [
  {
    title: "YTD performance agregado",
    body: "Seguimiento en tiempo real de la curva institucional y drawdown máximo.",
  },
  {
    title: "Waitlists inteligentes",
    body: "Automatiza la priorización de inversores con perfiles verificados.",
  },
  {
    title: "Aprobaciones por comité",
    body: "Flujos de revisión con trazabilidad y control por roles.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-igates-900 via-igates-800 to-igates-700 px-6 py-12">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.4em] text-igates-400">
            IGATES · Institutional Gateway
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Plataforma modular para gestionar fondos con rigor institucional.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Diseñada para MasterUsers, fund managers, investors y family offices con
            dashboards dinámicos, aprobaciones y reporting en tiempo real.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="/dashboard/master">Ingresar al dashboard</PrimaryButton>
            <Link
              href="/blog"
              className="rounded-full border border-igates-400 px-6 py-3 text-sm font-semibold text-igates-400 transition hover:bg-igates-400 hover:text-igates-900"
            >
              Ver blog institucional
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <KpiCard key={item.label} {...item} />
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {insights.map((item) => (
            <InsightCard key={item.title} {...item} />
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Roles clave integrados</h2>
          <p className="mt-3 text-slate-200">
            Cada perfil opera con permisos definidos por custom claims en Firebase y reglas
            estrictas en Firestore.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "MasterUser",
              "Investor",
              "FundManager",
              "FamilyOffice",
            ].map((role) => (
              <div
                key={role}
                className="rounded-2xl border border-white/10 bg-igates-900/60 p-4 text-sm font-medium"
              >
                {role}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
