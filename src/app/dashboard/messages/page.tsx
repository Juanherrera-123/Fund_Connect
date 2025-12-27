"use client";

import { useMemo } from "react";

import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { MasterNotification } from "@/lib/types";

export default function MessagesDashboard() {
  const [notifications] = useLocalStorage<MasterNotification[]>(STORAGE_KEYS.notifications, []);

  const columns = useMemo(() => {
    const fundNotifications = notifications.filter((note) => note.type === "fund-registration");
    const managerNotifications = notifications.filter((note) => note.type === "fund-manager-profile");
    const otherNotifications = notifications.filter(
      (note) => note.type !== "fund-registration" && note.type !== "fund-manager-profile"
    );

    return [
      { title: "Fondos", items: fundNotifications },
      { title: "Gestores", items: managerNotifications },
      { title: "Otros", items: otherNotifications },
    ];
  }, [notifications]);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">{column.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {column.items.length ? (
                  column.items.map((note) => (
                    <li
                      key={note.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-slate-900">{note.title}</p>
                      <p className="text-xs text-slate-500">{note.message}</p>
                      <p className="mt-1 text-[0.7rem] text-slate-400">
                        {new Date(note.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400">
                    Sin mensajes por ahora.
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
