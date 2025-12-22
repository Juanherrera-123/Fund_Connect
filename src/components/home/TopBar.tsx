import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Funds", href: "/dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "Login", href: "/dashboard/master" },
];

export function TopBar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/IGATESLOGO.png"
            alt="IGATES"
            width={148}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
