import { Cta } from "@/components/home/Cta";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { Modules } from "@/components/home/Modules";
import { Stats } from "@/components/home/Stats";
import { TopBar } from "@/components/home/TopBar";
import { Workflow } from "@/components/home/Workflow";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-igates-900 text-white">
      <TopBar />
      <Hero />
      <Stats />
      <Insights />
      <Modules />
      <Workflow />
      <Cta />
      <Footer />
    </main>
  );
}
