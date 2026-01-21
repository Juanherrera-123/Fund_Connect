import Link from "next/link";
import { Suspense } from "react";

import { AuthFlow } from "@/components/AuthFlow";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="relative">
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mb-6 flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.78 4.22a.75.75 0 0 1 0 1.06L8.56 9.5H16a.75.75 0 0 1 0 1.5H8.56l4.22 4.22a.75.75 0 1 1-1.06 1.06l-5.5-5.5a.75.75 0 0 1 0-1.06l5.5-5.5a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Go back home
              </Link>
            </div>
            <Suspense fallback={<div className="py-12 text-center text-slate-600">Loading...</div>}>
              <AuthFlow />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
