"use client";

import { useRef } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useApiForm } from "@/lib/useApiForm";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { ContactRequest } from "@/lib/types";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { strings } = useLanguage();
  const [contactRequests, setContactRequests] = useLocalStorage<ContactRequest[]>(
    STORAGE_KEYS.contactRequests,
    []
  );
  const { state, submit } = useApiForm("/contact", {
    sending: strings.contactStatusSending,
    success: strings.contactStatusSuccess,
    error: strings.contactStatusError,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const ok = await submit(payload);
    if (ok) {
      const name = String(payload.name ?? "").trim();
      const email = String(payload.email ?? "").trim();
      const phone = String(payload.phone ?? "").trim();
      const message = String(payload.message ?? "").trim();
      const receivedAt = new Date().toISOString();
      setContactRequests((prev) => [
        {
          id: `contact-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          name,
          email,
          phone,
          message,
          receivedAt,
        },
        ...prev,
      ]);
      formRef.current?.reset();
    }
  };

  return (
    <form
      id="contactForm"
      ref={formRef}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="contactNameLabel">Name</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="name"
          placeholder="Your full name"
          data-i18n-placeholder="contactNamePlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="contactEmailLabel">Email</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="email"
          name="email"
          placeholder="you@firm.com"
          data-i18n-placeholder="contactEmailPlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="contactPhoneLabel">Phone</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="tel"
          name="phone"
          placeholder="+57 300 000 0000"
          data-i18n-placeholder="contactPhonePlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-600">
        <span data-i18n="contactNotesLabel">Notes</span>
        <textarea
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          name="message"
          rows={3}
          placeholder="Mandate size, strategies, timing"
          data-i18n-placeholder="contactNotesPlaceholder"
          required
        ></textarea>
      </label>
      <button
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-igates-500 to-igates-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-none hover:bg-white hover:text-igates-500 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        data-i18n="contactSubmit"
        disabled={state.isSubmitting}
      >
        Request Advisory
      </button>
      <p className="min-h-[22px] text-xs text-slate-500" id="formStatus" aria-live="polite">
        {state.status}
      </p>
    </form>
  );
}
