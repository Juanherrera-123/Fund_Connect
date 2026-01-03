"use client";

import { useRef } from "react";

import { useApiForm } from "@/lib/useApiForm";

export function FamilyAccessForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { state, submit } = useApiForm("/request-access");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const ok = await submit(payload);
    if (ok) {
      formRef.current?.reset();
    }
  };

  return (
    <form
      id="familyForm"
      ref={formRef}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formNameLabel">Name</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="name"
          placeholder="Your full name"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formFirmLabel">Firm</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="firm"
          placeholder="Family office name"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formStrategyLabel">Strategy Type</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="strategy"
          placeholder="Macro, Credit, Digital Assets..."
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formAumLabel">AUM</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="aum"
          placeholder="$500M"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formEmailLabel">Email</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="email"
          name="email"
          placeholder="you@office.com"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="formNotesLabel">Notes</span>
        <textarea
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          name="notes"
          rows={3}
          placeholder="Mandate size, target strategies, timelines"
        ></textarea>
      </label>
      <button
        className="inline-flex items-center justify-center rounded-full bg-igates-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        data-i18n="familyFormSubmit"
        disabled={state.isSubmitting}
      >
        Request Access
      </button>
      <p className="min-h-[22px] text-xs text-slate-500" id="familyStatus" aria-live="polite">
        {state.status}
      </p>
    </form>
  );
}
