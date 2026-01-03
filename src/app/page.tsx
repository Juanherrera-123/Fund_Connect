import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Compliance } from "@/components/home/Compliance";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Learn } from "@/components/home/Learn";
import { Why } from "@/components/home/Why";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Why />
        <Learn />
        <Compliance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
