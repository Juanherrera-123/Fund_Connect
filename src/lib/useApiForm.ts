"use client";

import { useState } from "react";

import { apiBase } from "@/lib/igatesData";

export type ApiFormState = {
  status: string;
  isSubmitting: boolean;
};

export function useApiForm(endpoint: string, statusMessages?: {
  sending?: string;
  success?: string;
  error?: string;
}) {
  const [state, setState] = useState<ApiFormState>({
    status: "",
    isSubmitting: false,
  });

  const submit = async (payload: Record<string, FormDataEntryValue>) => {
    setState({ status: statusMessages?.sending ?? "Sending...", isSubmitting: true });
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setState({ status: statusMessages?.success ?? "Submitted!", isSubmitting: false });
      return true;
    } catch (error) {
      console.error(error);
      setState({ status: statusMessages?.error ?? "Unable to submit right now.", isSubmitting: false });
      return false;
    }
  };

  return { state, submit };
}
