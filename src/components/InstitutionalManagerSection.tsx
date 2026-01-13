"use client";

import { useState } from "react";
import Link from "next/link";

const standardSignals = [
  {
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

const strategyOptions = [
  "Crédito estructurado",
  "Macro",
  "Renta fija",
  "Renta variable",
  "Digital assets",
  "Multi-estrategia",
];

const aumRanges = [
  "< USD 10M",
  "USD 10M – 50M",
  "USD 50M – 150M",
  "USD 150M – 500M",
  "> USD 500M",
];

export function InstitutionalManagerSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="pb-20 pt-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="igates-institutional-frame shadow-[0_30px_60px_-45px_rgba(15,23,42,0.55)]">
          <div className="igates-institutional-surface rounded-[calc(2.5rem-1px)] px-8 py-10 sm:px-12 sm:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
                  PARA GESTORES DE FONDOS
                </p>
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                    Distribución institucional. Solo para estrategias listas.
                  </h2>
                  <p className="max-w-2xl text-base text-slate-700">
                    IGATES trabaja con un número limitado de gestores que operan bajo ejecución A-book, cuentas
                    segregadas y reporting verificable. Si tu estrategia cumple estándares institucionales,
                    iniciamos un proceso de evaluación privada.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {standardSignals.map((signal) => (
                    <span key={signal.title} className="igates-chip gap-2 rounded-full border-slate-200/80 bg-white/70">
                      {signal.icon}
                      <span className="text-[11px] text-slate-700">{signal.title}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
                >
                  Iniciar evaluación institucional
                </button>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  Hablar con el equipo IGATES →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-igates-500">
                  Evaluación institucional
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Datos de contacto</h3>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </button>
            </div>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setIsOpen(false);
              }}
            >
              <label className="grid gap-2 text-sm text-slate-700">
                Nombre completo
                <input
                  required
                  name="fullName"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-igates-400 focus:outline-none"
                  placeholder="Nombre y apellido"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-700">
                Firma / vehículo
                <input
                  required
                  name="firm"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-igates-400 focus:outline-none"
                  placeholder="Nombre de la firma"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-700">
                  Tipo de estrategia
                  <select
                    required
                    name="strategy"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-igates-400 focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {strategyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-700">
                  AUM aproximado
                  <select
                    required
                    name="aum"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-igates-400 focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {aumRanges.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm text-slate-700">
                Email corporativo
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-igates-400 focus:outline-none"
                  placeholder="nombre@firma.com"
                />
              </label>
              <p className="text-xs text-slate-500">
                Nuestro equipo revisa cada solicitud manualmente. Solo contactamos estrategias que encajan con
                nuestro marco operativo.
              </p>
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
