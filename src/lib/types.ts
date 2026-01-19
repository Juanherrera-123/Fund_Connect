import type { NormalizedRole } from "@/types/auth";

export type Role = "Investor" | "Fund Manager" | "Family Office" | "MasterUser";

export type MasterUserCredentials = {
  username: string;
  password: string;
  role: "MasterUser";
};

export type Session = {
  id?: string;
  uid?: string;
  email?: string | null;
  role: Role | "user";
  status?: string;
  authRole?: NormalizedRole;
  emailVerified?: boolean;
  authenticatedAt?: string;
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
  org?: string;
  onboardingCompleted: boolean;
  onboarding: Record<string, unknown>;
  fundId?: string;
  investorPreferences?: InvestorPreferences;
  fundManagerProfile?: FundManagerProfile;
  familyOfficePreferences?: FamilyOfficePreferences;
  waitlistFunds?: string[];
};

export type WaitlistStatus = "PENDING" | "APPROVED" | "REJECTED";

export type WaitlistRequest = {
  id: string;
  fundId: string;
  fundName: string;
  requesterId: string;
  requesterRole: "INVESTOR" | "FAMILY_OFFICE" | "PUBLIC";
  requesterName?: string | null;
  requesterEmail: string;
  requesterPhone?: string | null;
  intendedInvestmentAmount?: string | null;
  amount?: number | null;
  requesterCountry: string;
  requesterOrg?: string | null;
  note?: string | null;
  status: WaitlistStatus;
  createdAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
  decisionNote?: string | null;
};

export type FundApplication = {
  id: string;
  user: {
    id: string;
    uid: string;
    name: string;
    email: string;
    country: string;
    role: Role;
  };
  onboardingAnswers: Record<string, unknown>;
  fundData: FundApplicationFundData;
  status: "pending" | "approved" | "rejected";
  createdAt: string | null;
  reviewedAt?: string | null;
  reviewedBy?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
};

export type PublishedFund = {
  id: string;
  fundData: FundApplicationFundData;
  status: "approved";
  managerId?: string | null;
  createdAt?: string | null;
  publishedAt?: unknown;
  updatedAt?: unknown;
};

export type FundApplicationFile = {
  name: string;
  url: string;
  path: string;
  size?: number;
  contentType?: string;
};

export type FundApplicationFundData = {
  fundName: string;
  country: string;
  region?: string;
  aum?: string;
  capital_allocated?: number;
  strategy?: string;
  strategyLabel?: string;
  description: string;
  yearProfit?: number | null;
  monthlyProfit?: number | null;
  maxDrawdown?: number | null;
  winRate?: number | null;
  winRatio?: string | null;
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
  files?: {
    logo?: FundApplicationFile | null;
    presentation?: FundApplicationFile | null;
    trackRecordStatements?: FundApplicationFile[];
  };
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  preferredLanguage?: string;
  source?: string;
  status?: string;
  uid?: string | null;
  createdAt?: unknown;
};

export type MasterNotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};

export type FundSummary = {
  id: string;
  name: string;
  strategy: string;
  domicile: string;
  status: string;
  summary: string;
  aum: string;
  performance: string;
  risk: string;
  highlights: string[];
  capital_allocated?: number;
};

export type Insight = {
  title: string;
  timestamp: string;
  summary: string;
};
