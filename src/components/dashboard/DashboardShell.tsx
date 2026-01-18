"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getFirebaseAuth } from "@/lib/firebase";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { Role, Session, UserProfile } from "@/lib/types";

const masterNavItems = [
  {
    label: "Overview",
    labelKey: "dashboardNavOverview",
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
    label: "Messages",
    labelKey: "dashboardNavMessages",
    href: "/dashboard/master/messages",
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
    label: "Logout",
    labelKey: "dashboardLogout",
    action: "logout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V6.75A2.25 2.25 0 0 0 13.5 4.5h-6A2.25 2.25 0 0 0 5.25 6.75v10.5A2.25 2.25 0 0 0 7.5 19.5h6A2.25 2.25 0 0 0 15.75 17.25V15m3-3H9m9.75 0-2.25-2.25m2.25 2.25-2.25 2.25"
        />
      </svg>
    ),
  },
];

const fundManagerNavItems = [
  {
    label: "Overview",
    labelKey: "dashboardNavOverview",
    href: "/dashboard/manager/overview",
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
    label: "Fund details",
    labelKey: "dashboardNavFundDetails",
    href: "/dashboard/manager/fund-details",
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
    label: "Messages",
    labelKey: "dashboardNavMessages",
    href: "/dashboard/manager/messages",
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
    labelKey: "dashboardNavSettings",
    href: "/dashboard/manager/settings",
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

const investorNavItems = [
  {
    label: "Dashboard",
    labelKey: "dashboardNavOverview",
    href: "/dashboard/investor",
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
    label: "Profile",
    labelKey: "profileTitleFallback",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
        />
      </svg>
    ),
  },
];

const familyOfficeNavItems = [
  {
    label: "Dashboard",
    labelKey: "dashboardNavOverview",
    href: "/dashboard/family-office",
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
    label: "Profile",
    labelKey: "profileTitleFallback",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
        />
      </svg>
    ),
  },
];

const actionIconClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900";

const roleMap: Record<string, { label: string; labelKey: string }> = {
  "/dashboard/master": { label: "MasterUser", labelKey: "dashboardRoleMaster" },
  "/dashboard/fund-manager": { label: "MasterUser", labelKey: "dashboardRoleMaster" },
  "/dashboard/investor": { label: "Investor", labelKey: "dashboardRoleUser" },
  "/dashboard/family-office": { label: "Family Office", labelKey: "dashboardRoleUser" },
  "/dashboard/master/messages": { label: "MasterUser", labelKey: "dashboardRoleMaster" },
  "/dashboard/manager": { label: "Fund Manager", labelKey: "dashboardRoleManager" },
};

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [profiles] = useFirebaseStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const sessionRole = session?.role;
  const navItems =
    sessionRole === "Fund Manager"
      ? fundManagerNavItems
      : sessionRole === "Investor"
        ? investorNavItems
        : sessionRole === "Family Office"
          ? familyOfficeNavItems
          : masterNavItems;
  const role =
    Object.entries(roleMap).find(([href]) => pathname?.startsWith(href))?.[1] ?? {
      label: "Dashboard User",
      labelKey: "dashboardRoleUser",
    };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionRole) return;
    const profile = profiles.find((item) => item.id === session?.id);
    if (sessionRole !== "MasterUser" && profile?.onboardingCompleted === false) {
      router.push("/auth");
      return;
    }

    const routeForRole: Record<Role, string> = {
      MasterUser: "/dashboard/master",
      Investor: "/dashboard/investor",
      "Fund Manager": "/dashboard/manager/overview",
      "Family Office": "/dashboard/family-office",
    };
    if (!(sessionRole in routeForRole)) {
      return;
    }

    const expected = routeForRole[sessionRole as Role];

    if (pathname?.startsWith("/dashboard")) {
      const isManagerRoute = pathname?.startsWith("/dashboard/manager");
      const isMasterRoute = pathname?.startsWith("/dashboard/master");
      const isInvestorRoute = pathname?.startsWith("/dashboard/investor");
      const isFamilyOfficeRoute = pathname?.startsWith("/dashboard/family-office");

      if (
        (sessionRole === "Fund Manager" && !isManagerRoute) ||
        (sessionRole === "MasterUser" && !isMasterRoute) ||
        (sessionRole === "Investor" && !isInvestorRoute) ||
        (sessionRole === "Family Office" && !isFamilyOfficeRoute)
      ) {
        router.push(expected);
      }
    }
  }, [pathname, profiles, router, session, sessionRole]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setSession(null);
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Failed to sign out of Firebase Auth.", error);
      }
    }
    router.push("/auth");
  };

  return (
    <div className="relative h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-slate-200 bg-white px-4 py-5 md:flex">
        <div className="flex h-12 items-center">
          <img
            src="/IGATESLOGO.png"
            alt="IGATES Fund Intelligence logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="mt-4 flex flex-1 flex-col gap-1 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = item.href ? pathname === item.href : false;
            const itemClasses = `relative flex items-center gap-3 rounded-md px-3 py-2 transition ${
              isActive
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`;
            const itemContent = (
              <>
                <span
                  className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full ${
                    isActive ? "bg-slate-900" : "bg-transparent"
                  }`}
                />
                <span className="flex h-4 w-4 items-center justify-center text-slate-500">
                  {item.icon}
                </span>
                <span data-i18n={item.labelKey}>{item.label}</span>
              </>
            );

            if (item.href) {
              return (
                <Link key={`${item.label}-${item.href}`} href={item.href} className={itemClasses}>
                  {itemContent}
                </Link>
              );
            }

            return (
              <button
                key={`${item.label}-${item.labelKey}`}
                type="button"
                className={itemClasses}
                onClick={handleLogout}
              >
                {itemContent}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex h-screen flex-col md:ml-56">
        <header className="fixed left-0 right-0 top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 md:left-56">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-sm font-semibold text-slate-900" data-i18n="dashboardLabel">
              Dashboard
            </h1>
            <input
              className="h-9 w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
              placeholder="Search funds, users, requests…"
              data-i18n-placeholder="dashboardSearchPlaceholder"
            />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              className={actionIconClass}
              type="button"
              aria-label="Notifications"
              data-i18n-aria-label="dashboardNotificationsLabel"
            >
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
            <div className="relative" ref={menuRef}>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white transition hover:bg-slate-800"
                type="button"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                IG
              </button>
              {isMenuOpen ? (
                <div
                  className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-lg"
                  role="menu"
                >
                  <button
                    className="flex w-full items-center justify-start rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    data-i18n="dashboardLogout"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : null}
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              <span data-i18n={role.labelKey}>{role.label}</span>
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
