"use client";

import { useEffect, useState } from "react";

import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { ContactRequest, Session, WaitlistRequest } from "@/lib/types";

export default function MessagesDashboard() {
  const [contactRequests] = useFirebaseStorage<ContactRequest[]>(STORAGE_KEYS.contactRequests, []);
  const [waitlistRequests, setWaitlistRequests] = useState<WaitlistRequest[]>([]);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [session] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);

  useEffect(() => {
    let isMounted = true;
    const loadWaitlistRequests = async () => {
      setWaitlistLoading(true);
      setWaitlistError(null);
      try {
        const headers: Record<string, string> = {};
        if (session?.id && session?.role) {
          headers["x-user-id"] = session.id;
          headers["x-user-role"] = session.role;
        }
        const response = await fetch("/api/admin/waitlist?status=PENDING", { headers });
        if (!response.ok) {
          throw new Error("Unable to load waitlist requests.");
        }
        const data = (await response.json()) as { data?: WaitlistRequest[] };
        if (isMounted) {
          setWaitlistRequests(data.data ?? []);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setWaitlistError("No pudimos cargar las solicitudes de waitlist.");
        }
      } finally {
        if (isMounted) {
          setWaitlistLoading(false);
        }
      }
    };

    loadWaitlistRequests();
    return () => {
      isMounted = false;
    };
  }, [session?.id, session?.role]);

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
        <div className="mt-6">
          {contactRequests.length ? (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nombre</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Teléfono</th>
                    <th className="px-4 py-3 font-semibold">Mensaje</th>
                    <th className="px-4 py-3 font-semibold">Recibido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contactRequests.map((request) => (
                    <tr key={request.id} className="bg-white">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                        {request.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{request.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{request.phone}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {request.message}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {request.receivedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
              <span data-i18n="dashboardMessagesEmpty">Sin mensajes por ahora.</span>
            </div>
          )}
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Solicitudes de waitlist
            </h2>
            <p className="text-xs text-slate-500">Solicitudes enviadas desde el formulario.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {waitlistRequests.length} solicitudes
          </span>
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          {waitlistLoading ? (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
              Cargando solicitudes...
            </div>
          ) : waitlistError ? (
            <div className="rounded-lg border border-dashed border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-500">
              {waitlistError}
            </div>
          ) : waitlistRequests.length ? (
            waitlistRequests.map((request) => {
              const formattedAmount =
                typeof request.amount === "number"
                  ? request.amount.toLocaleString("en-US")
                  : request.intendedInvestmentAmount ?? "—";
              const formattedCreatedAt = request.createdAt
                ? new Date(request.createdAt).toLocaleString("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—";
              return (
                <div
                  key={request.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-900">
                      {request.requesterName ?? "—"}
                    </p>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {request.fundName}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {request.requesterEmail} · {request.requesterPhone ?? "Sin teléfono"}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Monto: {formattedAmount} · País: {request.requesterCountry || "—"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Recibido: {formattedCreatedAt}
                  </p>
                  {request.note ? (
                    <p className="mt-2 text-xs text-slate-600">Nota: {request.note}</p>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
              Sin solicitudes de waitlist por ahora.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
