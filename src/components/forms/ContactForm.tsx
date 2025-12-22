"use client";

import { useRef } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { useApiForm } from "@/lib/useApiForm";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { strings } = useLanguage();
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
      formRef.current?.reset();
    }
  };

  return (
    <form id="contactForm" ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span data-i18n="contactNameLabel">Name</span>
        <input type="text" name="name" placeholder="Your full name" required />
      </label>
      <label>
        <span data-i18n="contactEmailLabel">Email</span>
        <input type="email" name="email" placeholder="you@firm.com" required />
      </label>
      <label>
        <span data-i18n="contactRoleLabel">Role</span>
        <select name="role" required aria-label="Role">
          <option value="" data-i18n="contactRolePlaceholder">
            Select your role
          </option>
          <option value="allocator" data-i18n="contactRoleAllocator">
            Allocator / Investor
          </option>
          <option value="manager" data-i18n="contactRoleManager">
            Fund Manager
          </option>
          <option value="ops" data-i18n="contactRoleOps">
            Operations / Compliance
          </option>
        </select>
      </label>
      <label>
        <span data-i18n="contactNotesLabel">Notes</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Mandate size, strategies, timing"
        ></textarea>
      </label>
      <button className="btn btn-primary" type="submit" data-i18n="contactSubmit" disabled={state.isSubmitting}>
        Request Advisory
      </button>
      <p className="form-status" id="formStatus" aria-live="polite">
        {state.status}
      </p>
    </form>
  );
}
