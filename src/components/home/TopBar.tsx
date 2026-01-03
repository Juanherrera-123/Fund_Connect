import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Módulos", href: "#modulos" },
  { label: "Flujos", href: "#flujos" },
  { label: "Blog", href: "/blog" },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-igates-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/IGATESLOGO.png"
            alt="IGATES"
            width={178}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="hidden flex-wrap items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard/master"
          className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:text-white"
        >
          Solicitar demo
        </Link>
      </div>
    </header>
  );
}
