import Image from "next/image";
import Link from "next/link";

const heroHighlights = [
  "Onboarding institucional en minutos",
  "Governance y approvals multiactor",
  "Reportería ESG integrada",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-igates-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(90,75,255,0.25),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.08),_transparent_40%)]" />
        <Image
          src="/worldmap-Igates.png"
          alt="World map"
          fill
          className="object-contain opacity-20"
          priority
        />
      </div>
      <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center gap-8 px-6 py-20">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          <span className="rounded-full border border-white/20 px-4 py-2">
            IGATES · Institutional Gateway
          </span>
          <span className="text-white/40">Nueva experiencia 2024</span>
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Conecta fondos, inversores y compliance en una sola plataforma.
        </h1>
        <p className="max-w-2xl text-base text-white/70 md:text-lg">
          Migramos a la nueva arquitectura con React + Next para ofrecer un home
          institucional, modular y con métricas en tiempo real para equipos de
          gestión, distribución y back office.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/dashboard/master"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-igates-900 transition hover:bg-white/90"
          >
            Ingresar al dashboard
          </Link>
          <Link
            href="#plataforma"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Ver plataforma
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 pt-6 text-sm text-white/70">
          {heroHighlights.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-igates-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
