import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MarketInfrastructureSection } from "@/components/home/Compliance";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Learn } from "@/components/home/Learn";
import { Why } from "@/components/home/Why";

export default function HomePage() {
  return (
    <>
      <Navbar floating />
      <main>
        <Hero />
        <Why />
        <Learn />
        <MarketInfrastructureSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
