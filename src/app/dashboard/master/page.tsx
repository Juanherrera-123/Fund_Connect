"use client";

import Link from "next/link";

export default function MasterDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Master Dashboard</h1>
        <p className="text-sm text-slate-500">Operational overview of platform activity.</p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Available sections</h2>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Messages</h3>
          <p className="mt-1 text-sm text-slate-600">
            Review advisory requests submitted through the platform.
          </p>
          <Link
            href="/dashboard/master/messages"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Messages
          </Link>
        </div>
      </section>
    </div>
  );
}
