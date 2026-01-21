const PUBLIC_PATHS = new Set(["/", "/auth"]);

export const isProtectedPath = (pathname?: string | null) => {
  if (!pathname) return false;
  if (PUBLIC_PATHS.has(pathname)) return false;
  if (pathname.startsWith("/legal/")) return false;
  return (
    pathname.startsWith("/dashboard") || pathname === "/profile" || pathname === "/verify-email"
  );
};
