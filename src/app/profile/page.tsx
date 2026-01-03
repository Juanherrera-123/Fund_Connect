import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileView } from "@/components/ProfileView";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <section className="py-8">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-igates-500/10 to-indigo-500/5 p-6">
              <ProfileHeader />
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
