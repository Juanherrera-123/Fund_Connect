"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/master",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 4.5l7.5 6v8.25a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75V13.5h-3v5.25a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75Z"
        />
      </svg>
    ),
  },
  {
    label: "Funds",
    href: "/dashboard/fund-manager",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 7.5h15m-15 4.5h15m-15 4.5h9"
        />
      </svg>
    ),
  },
  {
    label: "Requests",
    href: "/dashboard/investor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 9.75h7.5m-7.5 4.5h4.5M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z"
        />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/dashboard/family-office",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 18.75V5.25m5.25 13.5V9m5.25 9.75v-6m5.25 6v-9"
        />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25a8.25 8.25 0 1 1-4.08-7.08L21 5.25l-1.08 4.08A8.2 8.2 0 0 1 21 11.25Z"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9.75A2.25 2.25 0 1 0 12 14.25 2.25 2.25 0 0 0 12 9.75Zm7.5 2.25a7.49 7.49 0 0 0-.12-1.35l2.07-1.62-2.25-3.9-2.46.96a7.47 7.47 0 0 0-2.34-1.35l-.39-2.61h-4.5l-.39 2.61a7.47 7.47 0 0 0-2.34 1.35l-2.46-.96-2.25 3.9 2.07 1.62a7.49 7.49 0 0 0 0 2.7l-2.07 1.62 2.25 3.9 2.46-.96a7.47 7.47 0 0 0 2.34 1.35l.39 2.61h4.5l.39-2.61a7.47 7.47 0 0 0 2.34-1.35l2.46.96 2.25-3.9-2.07-1.62c.08-.44.12-.89.12-1.35Z"
        />
      </svg>
    ),
  },
];

const actionIconClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900";

const roleMap: Record<string, string> = {
  "/dashboard/master": "MasterUser",
  "/dashboard/fund-manager": "Fund Manager",
  "/dashboard/investor": "Investor",
  "/dashboard/family-office": "Family Office",
  "/dashboard/messages": "MasterUser",
  "/dashboard/settings": "MasterUser",
};

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role =
    Object.entries(roleMap).find(([href]) => pathname?.startsWith(href))?.[1] ??
    "Dashboard User";

  return (
    <div className="relative h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-slate-200 bg-white px-4 py-5 md:flex">
        <div className="flex h-12 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-[10px] text-slate-700">
            IG
          </span>
          <span>IGATES</span>
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-md px-3 py-2 transition ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full ${
                    isActive ? "bg-slate-900" : "bg-transparent"
                  }`}
                />
                <span className="flex h-4 w-4 items-center justify-center text-slate-500">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex h-screen flex-col md:ml-56">
        <header className="fixed left-0 right-0 top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 md:left-56">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-sm font-semibold text-slate-900">Dashboard</h1>
            <input
              className="h-9 w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
              placeholder="Search funds, users, requests…"
            />
          </div>
          <div className="flex items-center gap-3 text-sm">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              IG
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              {role}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
