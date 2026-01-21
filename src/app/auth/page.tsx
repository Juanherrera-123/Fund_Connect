import { Suspense } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AuthFlow } from "@/components/AuthFlow";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="relative z-0">
        <section className="py-6">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Suspense fallback={<div className="py-12 text-center text-slate-600">Loading...</div>}>
              <AuthFlow />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
