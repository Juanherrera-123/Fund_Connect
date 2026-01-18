"use client";

import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getAuthClaims, isActiveStatus, normalizeRole } from "@/lib/auth/claims";
import { getFirebaseAuth } from "@/lib/firebase";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { getUserProfile } from "@/lib/users";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { Role, Session } from "@/lib/types";

const resolveSessionRole = (normalizedRole: string): Role | "user" => {
  if (normalizedRole === "master") return "MasterUser";
  if (normalizedRole === "manager") return "Fund Manager";
  if (normalizedRole === "investor") return "Investor";
  return "user";
};

export default function VerifyEmailPage() {
  const router = useRouter();
  const [session, setSession] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const resolveVerifiedRoute = (normalizedRole: string, accountStatus: string | null) => {
    if (normalizedRole === "manager") {
      if (!isActiveStatus(accountStatus)) {
        router.replace("/pending-review");
        return;
      }
      router.replace("/dashboard/manager/overview");
      return;
    }

    if (normalizedRole === "investor") {
      router.replace("/dashboard/investor");
      return;
    }

    if (normalizedRole === "master") {
      router.replace("/dashboard/master");
      return;
    }

    router.replace("/profile");
  };

  const hydrateSession = async () => {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
      router.replace("/auth");
      return;
    }

    await user.reload();
    if (!user.emailVerified) {
      setStatus("Please verify your email to continue.");
      return;
    }

    const userProfile = await getUserProfile(user.uid);
    let normalizedRole = userProfile ? normalizeRole(userProfile.role) : "unknown";
    let accountStatus = userProfile?.status ?? null;

    if (!userProfile) {
      const claims = await getAuthClaims();
      if (claims?.role === "master") {
        normalizedRole = "master";
        accountStatus = claims.status ?? null;
      } else {
        setStatus("Unable to find your account profile. Contact support.");
        return;
      }
    }

    setSession({
      id: user.uid,
      uid: user.uid,
      email: user.email,
      role: resolveSessionRole(normalizedRole),
      authRole: normalizedRole,
      status: accountStatus ?? undefined,
      emailVerified: user.emailVerified,
      authenticatedAt: new Date().toISOString(),
    });

    resolveVerifiedRoute(normalizedRole, accountStatus);
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (user.emailVerified) {
      void hydrateSession();
      return;
    }
    setStatus("Please verify your email to continue.");
  }, [router]);

  const handleResend = async () => {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
      router.replace("/auth");
      return;
    }

    setIsSending(true);
    setStatus("");
    try {
      await sendEmailVerification(user);
      setStatus("Verification email sent. Check your inbox.");
    } catch (error) {
      console.error("Failed to resend verification email.", error);
      setStatus("Unable to send verification email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="py-10">
          <div className="mx-auto w-full max-w-3xl px-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-igates-500">
                  Email verification
                </p>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Verify your email to continue
                </h1>
                <p className="text-sm text-slate-600">
                  We sent a verification link to{" "}
                  <span className="font-semibold text-slate-800">
                    {session?.email ?? "your email"}
                  </span>
                  . Please confirm your address to unlock the onboarding flow.
                </p>
                {status ? <p className="text-sm text-slate-500">{status}</p> : null}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-slate-800"
                  onClick={() => void hydrateSession()}
                >
                  I have verified my email
                </button>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  onClick={() => void handleResend()}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Resend verification"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
