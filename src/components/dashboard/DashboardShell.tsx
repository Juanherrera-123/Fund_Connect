"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard/master" },
  { label: "Funds", href: "/dashboard/fund-manager" },
  { label: "Requests", href: "/dashboard/investor" },
  { label: "Analytics", href: "/dashboard/family-office" },
  { label: "Messages", href: "/dashboard/master" },
  { label: "Settings", href: "/dashboard/master" },
];

const actionIconClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900";

export default function DashboardShell({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-slate-200 bg-white px-5 py-6 md:flex">
        <div className="flex h-12 items-center text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          IGATES
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col md:ml-60">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
          <div className="flex flex-1 items-center gap-3">
            <input
              className="h-10 w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
              placeholder="Search funds, users, requests…"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className={actionIconClass} type="button" aria-label="Notifications">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 18.75a2.25 2.25 0 0 1-4.5 0m9-4.5V11a6.75 6.75 0 1 0-13.5 0v3.75l-1.5 1.5h16.5l-1.5-1.5Z"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                IG
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {role}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
