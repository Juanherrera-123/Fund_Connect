import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/worldmap-igates.png"
          alt="World map"
          fill
          className="object-contain opacity-15"
          priority
        />
      </div>
      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center gap-6 px-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
          IGATES · Institutional Gateway
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
          Plataforma modular para gestionar fondos con rigor institucional.
        </h1>
        <p className="max-w-2xl text-base text-slate-600 md:text-lg">
          Diseñada para MasterUsers, fund managers, investors y family offices con
          dashboards dinámicos, aprobaciones y reporting en tiempo real.
        </p>
        <div>
          <Link
            href="/dashboard/master"
            className="inline-flex items-center justify-center rounded-full bg-igates-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-igates-800"
          >
            Ingresar al dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
