"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, limit, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";
import type { ContactRequest } from "@/lib/types";

const resolveDate = (value: ContactRequest["createdAt"]) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate() as Date;
  }
  if (typeof value === "object" && "seconds" in value && typeof value.seconds === "number") {
    return new Date(value.seconds * 1000);
  }
  return null;
};

const statusBadgeStyles: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  read: "bg-slate-100 text-slate-600",
};

export default function MasterMessagesPage() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) {
      setIsLoading(false);
      return;
    }
    const contactQuery = query(
      collection(db, "contactRequests"),
      orderBy("createdAt", "desc"),
      limit(200)
    );
    const unsubscribe = onSnapshot(
      contactQuery,
      (snapshot) => {
        const nextRequests = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<ContactRequest, "id">),
        }));
        setContactRequests(nextRequests);
        setIsLoading(false);
      },
      (error) => {
        console.error("Unable to load contact requests", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleMarkRead = useCallback(async (requestId: string) => {
    const db = getFirestoreDb();
    if (!db) return;
    try {
      await updateDoc(doc(db, "contactRequests", requestId), {
        status: "read",
      });
    } catch (error) {
      console.error("Unable to update contact request", error);
    }
  }, []);

  const totalLabel = useMemo(() => {
    if (isLoading) return "Cargando...";
    return `${contactRequests.length} solicitudes`;
  }, [contactRequests.length, isLoading]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Advisory requests</h2>
            <p className="text-xs text-slate-500">Mensajes recibidos desde el formulario.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {totalLabel}
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
                    <th className="px-4 py-3 font-semibold">Estado</th>
                    <th className="px-4 py-3 font-semibold">Recibido</th>
                    <th className="px-4 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contactRequests.map((request) => {
                    const resolvedDate = resolveDate(request.createdAt);
                    const status = request.status ?? "new";
                    const badgeStyle = statusBadgeStyles[status] ?? "bg-slate-100 text-slate-600";
                    return (
                      <tr key={request.id} className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                          {request.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{request.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{request.phone}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {request.message}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs ${badgeStyle}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {resolvedDate ? resolvedDate.toLocaleString() : "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          <button
                            className="text-xs font-semibold text-sky-600 transition hover:text-sky-700 disabled:cursor-not-allowed disabled:text-slate-300"
                            type="button"
                            onClick={() => handleMarkRead(request.id)}
                            disabled={status === "read"}
                          >
                            Marcar como leído
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
              {isLoading ? "Cargando mensajes..." : "No advisory requests yet."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
