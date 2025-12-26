import { Footer } from "@/components/Footer";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileView } from "@/components/ProfileView";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <ProfileHeader />
          </div>
        </section>

        <section className="profile-section">
          <div className="container">
            <ProfileView />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
