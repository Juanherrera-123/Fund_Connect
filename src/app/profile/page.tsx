"use client";

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileView } from "@/components/ProfileView";
import { useLanguage } from "@/components/LanguageProvider";
import { isActiveStatus, normalizeRole } from "@/lib/auth/claims";
import { isProtectedPath } from "@/lib/auth/protectedPaths";
import { getFirebaseAuth } from "@/lib/firebase";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Session } from "@/lib/types";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { strings } = useLanguage();
  const [session, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const authRole = session?.authRole ?? normalizeRole(session?.role);

  useEffect(() => {
    if (authRole === "master" && isActiveStatus(session?.status)) {
      router.replace("/dashboard/master");
    }
  }, [authRole, router, session?.status]);

  const handleLogout = async () => {
    setSession(null);
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Failed to sign out of Firebase Auth.", error);
      }
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-igates-500/10 to-igates-400/10 p-6">
              <ProfileHeader />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                onClick={handleLogout}
                data-i18n="dashboardLogout"
              >
                {strings.dashboardLogout ?? "Cerrar sesión"}
              </button>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="mx-auto w-full max-w-6xl px-6">
            <ProfileView />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
