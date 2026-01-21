export const roles = [
  "MasterUser",
  "Fund Manager",
] as const;

export type Role = (typeof roles)[number];
