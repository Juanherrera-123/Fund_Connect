export const roles = [
  "MasterUser",
  "Investor",
  "FundManager",
  "FamilyOffice",
] as const;

export type Role = (typeof roles)[number];
