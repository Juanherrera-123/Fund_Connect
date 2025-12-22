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
    <form id="familyForm" ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span data-i18n="formNameLabel">Name</span>
        <input type="text" name="name" placeholder="Your full name" required />
      </label>
      <label>
        <span data-i18n="formFirmLabel">Firm</span>
        <input type="text" name="firm" placeholder="Family office name" required />
      </label>
      <label>
        <span data-i18n="formStrategyLabel">Strategy Type</span>
        <input
          type="text"
          name="strategy"
          placeholder="Macro, Credit, Digital Assets..."
          required
        />
      </label>
      <label>
        <span data-i18n="formAumLabel">AUM</span>
        <input type="text" name="aum" placeholder="$500M" required />
      </label>
      <label>
        <span data-i18n="formEmailLabel">Email</span>
        <input type="email" name="email" placeholder="you@office.com" required />
      </label>
      <label>
        <span data-i18n="formNotesLabel">Notes</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Mandate size, target strategies, timelines"
        ></textarea>
      </label>
      <button className="btn btn-primary" type="submit" data-i18n="familyFormSubmit" disabled={state.isSubmitting}>
        Request Access
      </button>
      <p className="form-status" id="familyStatus" aria-live="polite">
        {state.status}
      </p>
    </form>
  );
}
