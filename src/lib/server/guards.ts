export type AuthContext = {
  id: string;
  role: string;
};

const normalizeRole = (role: string) => role.trim().toUpperCase().replace(/[\s_-]+/g, "");

export function getAuthContext(request: Request): AuthContext | null {
  const id = request.headers.get("x-user-id");
  const role = request.headers.get("x-user-role");

  if (!id || !role) {
    return null;
  }

  return { id, role };
}

export function isAdminRole(role: string): boolean {
  const normalized = normalizeRole(role);
  return normalized === "MASTER" || normalized === "MASTERUSER" || normalized === "ADMIN";
}

export function isRequesterRole(role: string): boolean {
  const normalized = normalizeRole(role);
  return normalized === "INVESTOR" || normalized === "FAMILYOFFICE";
}

export function getNormalizedRequesterRole(role: string): "INVESTOR" | "FAMILY_OFFICE" | null {
  const normalized = normalizeRole(role);
  if (normalized === "INVESTOR") return "INVESTOR";
  if (normalized === "FAMILYOFFICE") return "FAMILY_OFFICE";
  return null;
}
