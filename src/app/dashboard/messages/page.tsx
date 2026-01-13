"use client";

import { useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { ContactRequest } from "@/lib/types";

type ContactMessage = {
  id: string;
  title: string;
  subtitle: string;
};

export default function MessagesDashboard() {
  const [contactRequests] = useLocalStorage<ContactRequest[]>(STORAGE_KEYS.contactRequests, []);
  const [selectedId, setSelectedId] = useState<string | null>(contactRequests[0]?.id ?? null);

  const contactMessages = useMemo<ContactMessage[]>(() => {
    return contactRequests.map((request) => {
      const details = [
        request.email,
        request.phone,
        request.message?.trim().length ? request.message.trim() : null,
      ].filter(Boolean);
      return {
        id: request.id,
        title: request.name,
        subtitle: details.join(" · "),
      };
    });
  }, [contactRequests]);

  const selectedRequest = useMemo(() => {
    return contactRequests.find((request) => request.id === selectedId) ?? null;
  }, [contactRequests, selectedId]);

  useEffect(() => {
    if (!contactRequests.length) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !contactRequests.some((request) => request.id === selectedId)) {
      setSelectedId(contactRequests[0].id);
    }
  }, [contactRequests, selectedId]);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleMessages">
          Messages
        </h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900" data-i18n="dashboardMessagesContact">
              Solicitudes de asesoría
            </h2>
            <p className="text-xs text-slate-500">Mensajes recibidos desde el formulario.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {contactRequests.length} solicitudes
          </span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Bandeja de entrada
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {contactMessages.length ? (
                contactMessages.map((item) => {
                  const isActive = item.id === selectedId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full rounded-lg border px-3 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-igates-500/40 ${
                          isActive
                            ? "border-igates-200 bg-igates-50"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                        aria-pressed={isActive}
                      >
                        <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.subtitle}</p>
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                  <span data-i18n="dashboardMessagesEmpty">Sin mensajes por ahora.</span>
                </li>
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
            {selectedRequest ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Mensaje seleccionado
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {selectedRequest.name}
                  </h3>
                  <p className="text-sm text-slate-500">Recibido: {selectedRequest.receivedAt}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Correo</p>
                    <p className="text-sm text-slate-900">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Teléfono</p>
                    <p className="text-sm text-slate-900">{selectedRequest.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Mensaje</p>
                  <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">
                    {selectedRequest.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-slate-400">
                Selecciona una solicitud para ver el detalle.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
