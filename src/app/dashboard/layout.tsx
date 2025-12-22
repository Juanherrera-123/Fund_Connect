import Link from "next/link";

const navItems = [
  { label: "Master", href: "/dashboard/master" },
  { label: "Investor", href: "/dashboard/investor" },
  { label: "Fund Manager", href: "/dashboard/fund-manager" },
  { label: "Family Office", href: "/dashboard/family-office" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-igates-900 text-white">
      <header className="border-b border-white/10 bg-igates-800/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-igates-400">
            IGATES
          </Link>
          <nav className="flex gap-4 text-sm text-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-igates-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
