import Link from "next/link";

export function Cta() {
  return (
    <section className="bg-igates-900 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-igates-600/30 via-white/5 to-igates-600/20 p-10 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                Agenda un demo
              </p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Recupera la experiencia IGATES con la nueva plataforma.
              </h2>
              <p className="text-sm text-white/70">
                Migramos a React + Next para acelerar integraciones, mejorar
                performance y habilitar módulos customizables.
              </p>
            </div>
            <Link
              href="/dashboard/master"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-igates-900 transition hover:bg-white/90"
            >
              Solicitar demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
