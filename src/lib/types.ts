export type Role = "Investor" | "Fund Manager" | "Family Office" | "MasterUser";

export type Session = {
  id?: string;
  role: Role;
  username?: string;
} | null;

export type SurveyAnswer = string | string[];

export type InvestorPreferences = {
  objective?: string;
  horizon?: string;
  riskLevel?: string;
  strategyPreferences?: string[];
  reportingFrequency?: string;
};

export type FundManagerProfile = {
  strategyType?: string;
  strategyTypeLabel?: string;
  capitalStatus?: string;
  trackRecordLength?: string;
  operatingStructure?: string;
  strategyDescription?: string;
  status?: "pending-review" | "verified";
};

export type FamilyOfficePreferences = {
  managementRole?: string;
  diversificationLevel?: string;
  strategyPreferences?: string[];
  interactionLevel?: string;
  reportingCustomization?: string;
};

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: Exclude<Role, "MasterUser">;
  password: string;
  onboarding: Record<string, unknown>;
  fundId?: string;
  investorPreferences?: InvestorPreferences;
  fundManagerProfile?: FundManagerProfile;
  familyOfficePreferences?: FamilyOfficePreferences;
  waitlistFunds?: string[];
};

export type FundApplication = {
  id: string;
  fundName: string;
  country: string;
  region?: string;
  aum?: string;
  strategy?: string;
  strategyLabel?: string;
  description: string;
  status: "pending" | "verified";
  managerId: string;
  submittedAt: string;
  yearProfit?: number | null;
  monthlyProfit?: number | null;
  maxDrawdown?: number | null;
  winRate?: number | null;
  volatility?: number | null;
  riskLevel?: string | null;
  operatingTime?: string;
  drawdownTarget?: number | null;
  tradesPerMonth?: number | null;
  riskManagement?: string | null;
  livePerformanceLinks?: string[];
  minInvestment?: string;
  performanceFee?: string;
  subscriptionFee?: string;
  reportsFrequency?: string;
};

export type MasterNotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};

export type FundSummary = {
  name: string;
  strategy: string;
  domicile: string;
  status: string;
  summary: string;
  aum: string;
  performance: string;
  risk: string;
  highlights: string[];
};

export type Insight = {
  title: string;
  timestamp: string;
  summary: string;
};
