export const roles = [
  "MasterUser",
  "Investor",
  "Fund Manager",
  "Family Office",
] as const;

export type Role = (typeof roles)[number];
