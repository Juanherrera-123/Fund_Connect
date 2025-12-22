import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { TopBar } from "@/components/home/TopBar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Hero />
      <Stats />
    </main>
  );
}
