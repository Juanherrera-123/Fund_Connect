import type { Role } from "@/types/roles";

export const rolePermissions: Record<Role, string[]> = {
  MasterUser: ["funds:approve", "users:manage", "reports:view"],
  "Fund Manager": ["funds:create", "funds:update", "reports:upload"],
};

export function canAccess(role: Role, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}
