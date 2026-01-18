"use client";

export default function MasterMessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-slate-900">Advisory requests</h2>
          <p className="text-sm text-slate-500">No advisory requests yet.</p>
        </div>
      </section>
    </div>
  );
}
