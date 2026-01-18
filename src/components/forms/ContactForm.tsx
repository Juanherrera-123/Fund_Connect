"use client";

import { useRef } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase";
import { useApiForm } from "@/lib/useApiForm";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { language, strings } = useLanguage();
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
      const country = String(payload.country ?? "").trim();
      const message = String(payload.message ?? "").trim();
      const preferredLanguage = String(payload.preferredLanguage ?? language ?? "").trim();
      const db = getFirestoreDb();
      if (db) {
        try {
          await addDoc(collection(db, "contactRequests"), {
            createdAt: serverTimestamp(),
            name,
            email,
            phone,
            country,
            message,
            preferredLanguage,
            source: "contact_form",
            status: "new",
            uid: getFirebaseAuth()?.currentUser?.uid ?? null,
          });
        } catch (error) {
          console.error("Unable to save contact request", error);
        }
      } else {
        console.warn("Firestore not configured; skipping contactRequests write.");
      }
      formRef.current?.reset();
    }
  };

  return (
    <form
      id="contactForm"
      ref={formRef}
      className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-sky-200/40 backdrop-blur"
      onSubmit={handleSubmit}
    >
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span data-i18n="contactNameLabel">Name</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-igates-500 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="text"
          name="name"
          placeholder="Your full name"
          data-i18n-placeholder="contactNamePlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span data-i18n="contactEmailLabel">Email</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-igates-500 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="email"
          name="email"
          placeholder="you@firm.com"
          data-i18n-placeholder="contactEmailPlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span data-i18n="contactPhoneLabel">Phone</span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-igates-500 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          type="tel"
          name="phone"
          placeholder="+57 300 000 0000"
          data-i18n-placeholder="contactPhonePlaceholder"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        <span data-i18n="contactNotesLabel">Notes</span>
        <textarea
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-igates-500 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
          name="message"
          rows={3}
          placeholder="Mandate, strategy, horizon, risk constraints"
          data-i18n-placeholder="contactNotesPlaceholder"
          required
        ></textarea>
      </label>
      <button
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-sky-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        type="submit"
        data-i18n="contactSubmit"
        disabled={state.isSubmitting}
      >
        Request access
      </button>
      <p className="text-xs text-slate-500" data-i18n="contactSubmitNote">
        We received your request. A team member will confirm the next step.
      </p>
      <p className="min-h-[22px] text-xs text-slate-500" id="formStatus" aria-live="polite">
        {state.status}
      </p>
    </form>
  );
}
