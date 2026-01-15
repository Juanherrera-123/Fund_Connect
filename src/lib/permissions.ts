import type { Role } from "@/types/roles";

export const rolePermissions: Record<Role, string[]> = {
  MasterUser: [
    "funds:approve",
    "users:manage",
    "reports:view",
    "waitlists:manage",
  ],
  Investor: ["funds:view", "waitlists:join", "reports:view"],
  "Fund Manager": ["funds:create", "funds:update", "reports:upload"],
  "Family Office": ["funds:view", "reports:view", "messages:send"],
};

export function canAccess(role: Role, permission: string) {
  return rolePermissions[role]?.includes(permission) ?? false;
}
