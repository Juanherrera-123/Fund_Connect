"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useLanguage } from "@/components/LanguageProvider";
import { isActiveStatus, normalizeRole, refreshClaims, setManagerPendingClaims } from "@/lib/auth/claims";
import {
  STORAGE_KEYS,
  SURVEY_DEFINITIONS,
  countryCallingCodes,
  countryFlags,
  languageOptions,
  getStrategyLabel,
} from "@/lib/igatesData";
import { getFirebaseAuth } from "@/lib/firebase";
import { uploadFundApplicationFile, upsertFundApplication } from "@/lib/funds";
import { createManagerUserProfile, getUserProfile } from "@/lib/users";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type {
  FundApplication,
  FundApplicationFile,
  MasterNotification,
  Role,
  Session,
  SurveyAnswer,
  UserProfile,
} from "@/lib/types";

const requiredKycFields = ["fullName", "email", "phone", "country", "role", "password"] as const;

type SurveyQuestion =
  | ((typeof SURVEY_DEFINITIONS)[keyof typeof SURVEY_DEFINITIONS][number] & {
      prompt?: string;
    })
  | {
      id: string;
      label: string;
      type: "text";
      prompt?: string;
    };

type SignupStep =
  | { type: "kyc" }
  | { type: "survey"; questions: SurveyQuestion[] }
  | { type: "fund-details" };

const riskOptions = [
  { label: "Controlado", labelKey: "dashboardRiskControlled" },
  { label: "Medio", labelKey: "dashboardRiskMedium" },
  { label: "Arriesgado", labelKey: "dashboardRiskAggressive" },
];
const reportOptions = [
  { label: "Semanal", labelKey: "dashboardReportWeekly" },
  { label: "Quincenal", labelKey: "dashboardReportBiweekly" },
  { label: "Mensual", labelKey: "dashboardReportMonthly" },
];

const parseNumericValue = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number.parseFloat(trimmed);
  return Number.isNaN(parsed) ? null : parsed;
};

const getFlagEmoji = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const normalizeCountryName = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const countryIsoAliases: Record<string, string> = {
  "costa de marfil": "CI",
  "congo r dem": "CD",
  "congo r dem.": "CD",
  "congo r. dem": "CD",
  "congo r. dem.": "CD",
  "republica dominicana": "DO",
  "republica centroafricana": "CF",
  "republica checa": "CZ",
  "hong kong": "HK",
  "macao": "MO",
  "brunei": "BN",
  "myanmar": "MM",
  "arabia saudita": "SA",
  "san vicente y granadinas": "VC",
  "anguilla": "AI",
  "bermuda": "BM",
};

export function AuthFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { strings, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [stepIndex, setStepIndex] = useState(0);
  const [signupStatus, setSignupStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [kycAnswers, setKycAnswers] = useState<Record<string, string>>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, SurveyAnswer>>({});
  const [fundDetails, setFundDetails] = useState({
    fundName: "",
    country: "",
    description: "",
    operatingTime: "",
    monthlyProfit: "",
    winRate: "",
    winRatio: "",
    drawdownTarget: "",
    maxDrawdown: "",
    tradesPerMonth: "",
    riskManagement: "",
    minInvestment: "",
    performanceFee: "",
    subscriptionFee: "",
    reportsFrequency: "",
  });
  const [fundLinks, setFundLinks] = useState<string[]>(["", "", ""]);
  const [presentationFile, setPresentationFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const [profiles, setProfiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    []
  );
  const [, setSession] = useFirebaseStorage<Session>(STORAGE_KEYS.session, null);
  const [notifications, setNotifications] = useFirebaseStorage<MasterNotification[]>(
    STORAGE_KEYS.notifications,
    []
  );

  useEffect(() => {
    if (!logoFile) {
      setLogoPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const role = kycAnswers.role as keyof typeof SURVEY_DEFINITIONS | undefined;
  const steps = useMemo<SignupStep[]>(() => {
    const surveyQuestions = role ? SURVEY_DEFINITIONS[role] : [];
    const groups: SurveyQuestion[][] = [];
    for (let index = 0; index < surveyQuestions.length; index += 2) {
      groups.push(surveyQuestions.slice(index, index + 2));
    }
    const surveySteps: SignupStep[] = groups.map((group) => ({
      type: "survey",
      questions: group,
    }));
    if (role === "Fund Manager") {
      return [{ type: "kyc" }, ...surveySteps, { type: "fund-details" }];
    }
    return [{ type: "kyc" }, ...surveySteps];
  }, [role]);

  const totalSteps = role ? steps.length : 4;
  const currentStep = steps[stepIndex] ?? steps[0];

  const countryNameToIso = useMemo(() => {
    if (
      typeof Intl === "undefined" ||
      typeof Intl.supportedValuesOf !== "function" ||
      typeof Intl.DisplayNames !== "function"
    ) {
      return new Map<string, string>();
    }
    try {
      const displayNames = new Intl.DisplayNames(["es"], { type: "region" });
      const supportedRegions = (
        Intl as typeof Intl & { supportedValuesOf: (key: "region") => string[] }
      ).supportedValuesOf("region");
      const lookup = new Map<string, string>();
      supportedRegions.forEach((code) => {
        const name = displayNames.of(code);
        if (name) {
          lookup.set(normalizeCountryName(name), code);
        }
      });
      return lookup;
    } catch (error) {
      return new Map<string, string>();
    }
  }, []);

  const resolveCountryIso = useCallback(
    (name: string) => {
      const normalized = normalizeCountryName(name);
      return countryIsoAliases[normalized] ?? countryNameToIso.get(normalized) ?? "";
    },
    [countryNameToIso]
  );

  const phoneCountryOptions = useMemo(
    () =>
      countryCallingCodes.map((entry) => {
        const code = resolveCountryIso(entry.name);
        const flag = code ? getFlagEmoji(code) : countryFlags[entry.name] || "🌍";
        return {
          code: code || entry.name,
          name: entry.name,
          dialCode: entry.dialCode,
          displayDialCode: entry.displayDialCode ?? entry.dialCode,
          flag,
        };
      }),
    [resolveCountryIso]
  );

  const countryOptions = useMemo(() => {
    const fallback = countryCallingCodes.map((entry) => {
      const code = resolveCountryIso(entry.name);
      const flag = code ? getFlagEmoji(code) : countryFlags[entry.name] || "🌍";
      return {
        code: code || entry.name,
        name: entry.name,
        flag,
      };
    });
    if (
      typeof Intl === "undefined" ||
      typeof Intl.supportedValuesOf !== "function" ||
      typeof Intl.DisplayNames !== "function"
    ) {
      return fallback;
    }
    try {
      const locale = languageOptions[language]?.locale ?? "en";
      const displayNames = new Intl.DisplayNames([locale], { type: "region" });
      const supportedRegions = (
        Intl as typeof Intl & { supportedValuesOf: (key: "region") => string[] }
      ).supportedValuesOf("region");
      return supportedRegions
        .map((code) => ({
          code,
          name: displayNames.of(code) ?? code,
          flag: getFlagEmoji(code),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      return fallback;
    }
  }, [language, resolveCountryIso]);

  useEffect(() => {
    setStepIndex(0);
  }, [role]);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "Fund Manager") {
      setActiveTab("signup");
      setKycAnswers((prev) => ({ ...prev, role: "Fund Manager" }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (kycAnswers.role !== "Fund Manager") {
      setKycAnswers((prev) => ({ ...prev, role: "Fund Manager" }));
    }
  }, [kycAnswers.role]);

  const updateKyc = useCallback((field: string, value: string) => {
    setKycAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateSurvey = (id: string, value: SurveyAnswer) => {
    setSurveyAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const selectedPhoneOption = useMemo(
    () => phoneCountryOptions.find((option) => option.code === phoneCountryCode),
    [phoneCountryOptions, phoneCountryCode]
  );

  useEffect(() => {
    if (!phoneCountryCode && phoneCountryOptions.length) {
      setPhoneCountryCode(phoneCountryOptions[0].code);
    }
  }, [phoneCountryOptions, phoneCountryCode]);

  useEffect(() => {
    if (!phoneCountryCode && !phoneNumber) return;
    const dialCode = selectedPhoneOption?.dialCode ?? "";
    const fullPhone = [dialCode, phoneNumber].filter(Boolean).join(" ").trim();
    updateKyc("phone", fullPhone);
  }, [phoneCountryCode, phoneNumber, selectedPhoneOption, updateKyc]);

  const validateKyc = () => {
    const missing: string[] = requiredKycFields.filter((field) => !kycAnswers[field]);
    if (!confirmPassword.trim()) {
      missing.push("confirmPassword");
    }
    if (!phoneCountryCode || !phoneNumber.trim()) {
      missing.push("phone");
    }
    if (missing.length) {
      setSignupStatus(strings.authStatusMissingFields);
      return false;
    }
    const missingRequirements: string[] = [];
    if (!/[A-Z]/.test(kycAnswers.password || "")) {
      missingRequirements.push(strings.authPasswordRequirementUppercase);
    }
    if (!/[0-9]/.test(kycAnswers.password || "")) {
      missingRequirements.push(strings.authPasswordRequirementNumber);
    }
    if (!/[^A-Za-z0-9]/.test(kycAnswers.password || "")) {
      missingRequirements.push(strings.authPasswordRequirementSymbol);
    }
    if (missingRequirements.length) {
      setSignupStatus(
        `${strings.authStatusPasswordRequirements} ${missingRequirements.join(", ")}`
      );
      return false;
    }
    if (kycAnswers.password !== confirmPassword) {
      setSignupStatus(strings.authStatusPasswordMismatch);
      return false;
    }
    return true;
  };

  const validateSurvey = (questions: SurveyQuestion[]) => {
    const isValid = questions.every((question) => {
      const answer = surveyAnswers[question.id];
      if (question.type === "multi") {
        return Array.isArray(answer) && answer.length > 0;
      }
      return typeof answer === "string" && answer.trim().length > 0;
    });

    if (!isValid) {
      setSignupStatus(strings.authStatusMissingSurvey);
    }

    return isValid;
  };

  const validateFundDetails = () => {
    const requiredFields = [
      fundDetails.fundName,
      fundDetails.country,
      fundDetails.description,
      fundDetails.operatingTime,
      fundDetails.riskManagement,
      fundDetails.reportsFrequency,
    ];
    if (requiredFields.some((value) => !value.trim())) {
      setSignupStatus(strings.dashboardFundDetailsRequiredFields);
      return false;
    }
    const hasLinks = fundLinks.some((link) => link.trim().length > 0);
    if (!hasLinks) {
      setSignupStatus(strings.dashboardFundDetailsAddLink);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setSignupStatus("");
    if (currentStep.type === "kyc") {
      if (!validateKyc()) return;
      if (!role) return;
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    if (currentStep.type === "survey") {
      if (!validateSurvey(currentStep.questions)) return;
      if (stepIndex === steps.length - 1) {
        void completeSignup();
        return;
      }
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    if (currentStep.type === "fund-details") {
      if (!validateFundDetails()) return;
      void completeSignup();
      return;
    }
  };

  const handleBack = () => {
    setSignupStatus("");
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  const completeSignup = async () => {
    if (!role) return;
    const auth = getFirebaseAuth();
    if (!auth) {
      setSignupStatus("Firebase authentication is not configured.");
      return;
    }

    let credential;
    try {
      credential = await createUserWithEmailAndPassword(
        auth,
        kycAnswers.email,
        kycAnswers.password
      );
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
        setSignupStatus(strings.authStatusEmailExists);
        return;
      }
      setSignupStatus("Unable to create account. Please try again.");
      return;
    }

    const user = credential.user;
    await createManagerUserProfile({
      uid: user.uid,
      email: user.email,
      fullName: kycAnswers.fullName,
    });
    if (role === "Fund Manager") {
      try {
        await setManagerPendingClaims(user.uid);
      } catch (error) {
        console.error("Unable to assign manager claims", error);
        setSignupStatus("Unable to initialize manager access. Please try again.");
        return;
      }
    }
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error("Unable to send verification email", error);
      setSignupStatus("Unable to send verification email. Please try again.");
      return;
    }

    const profileId = user.uid;
    const resolvedRole = role as Exclude<Role, "MasterUser">;
    const baseProfile: UserProfile = {
      id: profileId,
      fullName: kycAnswers.fullName,
      email: kycAnswers.email,
      phone: kycAnswers.phone,
      country: kycAnswers.country,
      role: resolvedRole,
      password: kycAnswers.password,
      onboardingCompleted: true,
      onboarding: {
        role: resolvedRole,
        completedAt: new Date().toISOString(),
      },
    };

    if (resolvedRole === "Investor") {
      const preferences = {
        objective: surveyAnswers.objective as string,
        horizon: surveyAnswers.horizon as string,
        riskLevel: surveyAnswers.riskLevel as string,
        strategyPreferences: surveyAnswers.strategyPreferences as string[],
        reportingFrequency: surveyAnswers.reportingFrequency as string,
      };
      baseProfile.investorPreferences = preferences;
      baseProfile.onboarding = { ...baseProfile.onboarding, investorPreferences: preferences };
      baseProfile.waitlistFunds = [];
    }

    if (resolvedRole === "Fund Manager") {
      const fundId = `fund-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
      const normalizedLinks = fundLinks.map((link) => link.trim()).filter(Boolean);
      const managerProfile = {
        strategyType: surveyAnswers.strategyType as string,
        strategyTypeLabel: getStrategyLabel(surveyAnswers.strategyType as string),
        capitalStatus: surveyAnswers.capitalStatus as string,
        trackRecordLength: surveyAnswers.trackRecordLength as string,
        operatingStructure: surveyAnswers.operatingStructure as string,
        strategyDescription: fundDetails.description || "Pendiente de completar.",
        status: "pending-review" as const,
      };
      baseProfile.fundManagerProfile = managerProfile;
      baseProfile.onboarding = {
        ...baseProfile.onboarding,
        fundManagerProfile: managerProfile,
        fundDetails,
        fundId,
      };
      baseProfile.fundId = fundId;
      let logoMetadata: FundApplicationFile | null = null;
      let presentationMetadata: FundApplicationFile | null = null;

      try {
        if (logoFile) {
          logoMetadata = await uploadFundApplicationFile(user.uid, fundId, logoFile, "logo");
        }
        if (presentationFile) {
          presentationMetadata = await uploadFundApplicationFile(
            user.uid,
            fundId,
            presentationFile,
            "presentation"
          );
        }
      } catch (error) {
        console.error("Unable to upload fund application files", error);
        setSignupStatus(strings.formStatusError);
        return;
      }

      const draftFundApplication: FundApplication = {
        id: fundId,
        user: {
          id: baseProfile.id,
          name: baseProfile.fullName,
          email: baseProfile.email,
          country: baseProfile.country,
          role: baseProfile.role,
        },
        onboardingAnswers: baseProfile.onboarding ?? {},
        fundData: {
          fundName: fundDetails.fundName,
          country: fundDetails.country,
          region: "Global",
          aum: "Pendiente",
          strategy: managerProfile.strategyType ?? "Multi-Strategy",
          strategyLabel: managerProfile.strategyTypeLabel ?? "Multi-Strategy",
          description:
            fundDetails.description ||
            managerProfile.strategyDescription ||
            "Pendiente de completar.",
          monthlyProfit: parseNumericValue(fundDetails.monthlyProfit),
          yearProfit: parseNumericValue(fundDetails.monthlyProfit),
          winRate: parseNumericValue(fundDetails.winRate),
          winRatio: fundDetails.winRatio || null,
          drawdownTarget: parseNumericValue(fundDetails.drawdownTarget),
          maxDrawdown: parseNumericValue(fundDetails.maxDrawdown),
          tradesPerMonth: parseNumericValue(fundDetails.tradesPerMonth),
          riskLevel: fundDetails.riskManagement || null,
          riskManagement: fundDetails.riskManagement || null,
          livePerformanceLinks: normalizedLinks,
          minInvestment: fundDetails.minInvestment || undefined,
          performanceFee: fundDetails.performanceFee || undefined,
          subscriptionFee: fundDetails.subscriptionFee || undefined,
          reportsFrequency: fundDetails.reportsFrequency || undefined,
          operatingTime: fundDetails.operatingTime || undefined,
          files: {
            logo: logoMetadata,
            presentation: presentationMetadata,
            trackRecordStatements: [],
          },
        },
        status: "pending",
        createdAt: new Date().toISOString(),
        reviewedAt: null,
        reviewedBy: null,
      };
      const nextNotification: MasterNotification = {
        id: `notif-${Date.now()}`,
        type: "fund-manager-profile",
        title: strings.masterNotificationManagerPendingTitle,
        message: strings.masterNotificationManagerPendingMessage.replace("{name}", baseProfile.fullName),
        createdAt: new Date().toISOString(),
      };
      setNotifications([nextNotification, ...notifications]);
      void upsertFundApplication(draftFundApplication);
    }

    if (resolvedRole === "Family Office") {
      const familyPreferences = {
        managementRole: surveyAnswers.managementRole as string,
        diversificationLevel: surveyAnswers.diversificationLevel as string,
        strategyPreferences: surveyAnswers.strategyPreferences as string[],
        interactionLevel: surveyAnswers.interactionLevel as string,
        reportingCustomization: surveyAnswers.reportingCustomization as string,
      };
      baseProfile.familyOfficePreferences = familyPreferences;
      baseProfile.onboarding = { ...baseProfile.onboarding, familyOfficePreferences: familyPreferences };
    }

    setProfiles([...profiles, baseProfile]);
    setSession({
      id: profileId,
      uid: profileId,
      email: user.email ?? kycAnswers.email,
      role: "Fund Manager",
      authRole: "manager",
      status: "pending",
      emailVerified: user.emailVerified,
    });

    router.push("/verify-email");
  };

  const resolveLoginErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          return strings.authStatusInvalidCredentials;
        case "auth/user-disabled":
          return "This account has been disabled. Contact support for access.";
        case "auth/network-request-failed":
          return "Network error. Check your connection and try again.";
        default:
          return "Unable to sign in. Please try again.";
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Unable to sign in. Please try again.";
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus("");

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!identifier || !password) {
      setLoginStatus(strings.authStatusMissingCredentials);
      return;
    }

    const auth = getFirebaseAuth();

    if (!auth) {
      setLoginStatus("Firebase authentication is not configured.");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, identifier, password);
      if (!credential.user.emailVerified) {
        setSession({
          id: credential.user.uid,
          uid: credential.user.uid,
          email: credential.user.email ?? identifier,
          role: "Fund Manager",
          authRole: "manager",
          status: "pending",
          emailVerified: credential.user.emailVerified,
          authenticatedAt: new Date().toISOString(),
        });
        router.push("/verify-email");
        return;
      }

      const claims = await refreshClaims();
      if (!claims) {
        setLoginStatus("Unable to validate your session. Please try again.");
        return;
      }
      let normalizedRole = claims.role;
      let status = claims.status ?? null;
      if (normalizedRole === "unknown") {
        const userProfile = await getUserProfile(credential.user.uid);
        if (userProfile) {
          normalizedRole = normalizeRole(userProfile.role);
          status = userProfile.status ?? null;
        }
      }
      const sessionRole: Role | "user" =
        normalizedRole === "master"
          ? "MasterUser"
          : normalizedRole === "manager"
            ? "Fund Manager"
            : normalizedRole === "investor"
              ? "Investor"
              : "user";

      setSession({
        id: credential.user.uid,
        uid: credential.user.uid,
        email: credential.user.email ?? identifier,
        role: sessionRole,
        authRole: normalizedRole,
        status: status ?? undefined,
        emailVerified: credential.user.emailVerified,
        authenticatedAt: new Date().toISOString(),
      });

      if (normalizedRole === "manager") {
        if (!isActiveStatus(status)) {
          router.push("/pending-review");
          return;
        }
        router.push("/dashboard/manager/overview");
        return;
      }

      if (!isActiveStatus(status)) {
        router.push("/profile");
        return;
      }

      if (normalizedRole === "investor") {
        router.push("/dashboard/investor");
        return;
      }

      if (normalizedRole === "master") {
        router.push("/dashboard/master");
        return;
      }

      router.push("/profile");
    } catch (error) {
      setLoginStatus(resolveLoginErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        className="flex gap-2 rounded-full bg-slate-100 p-1"
        role="tablist"
        aria-label="Access options"
        data-i18n-aria-label="authAccessOptionsLabel"
      >
        <button
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
            activeTab === "signup"
              ? "bg-white text-slate-900 shadow"
              : "text-slate-500 hover:text-slate-700"
          }`}
          type="button"
          role="tab"
          aria-selected={activeTab === "signup"}
          onClick={() => setActiveTab("signup")}
          data-i18n="authTabSignup"
        >
          {strings.authTabSignup}
        </button>
        <button
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
            activeTab === "login"
              ? "bg-white text-slate-900 shadow"
              : "text-slate-500 hover:text-slate-700"
          }`}
          type="button"
          role="tab"
          aria-selected={activeTab === "login"}
          onClick={() => setActiveTab("login")}
          data-i18n="authTabLogin"
        >
          {strings.authTabLogin}
        </button>
      </div>

      <div className="mt-6">
        <div className={activeTab === "signup" ? "block" : "hidden"} role="tabpanel">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {strings.authStepLabel} {stepIndex + 1} {strings.authStepOf} {totalSteps}
          </div>
          <form
            className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2"
            autoComplete="off"
          >
            {currentStep.type === "kyc" && (
              <>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authFullNameLabel">Nombre completo</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="text"
                    name="fullName"
                    placeholder="Nombre y apellido"
                    data-i18n-placeholder="authFullNamePlaceholder"
                    value={kycAnswers.fullName ?? ""}
                    onChange={(event) => updateKyc("fullName", event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authEmailLabel">Email</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    data-i18n-placeholder="authEmailPlaceholder"
                    value={kycAnswers.email ?? ""}
                    onChange={(event) => updateKyc("email", event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authPhoneLabel">Teléfono</span>
                  <div className="flex gap-2">
                    <div className="relative min-w-[120px]">
                      <select
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 focus:outline-none"
                        aria-label={strings.authPhoneCountryCodeLabel}
                        value={phoneCountryCode}
                        onChange={(event) => setPhoneCountryCode(event.target.value)}
                        required
                      >
                        {phoneCountryOptions.map((option) => (
                          <option key={`${option.code}-${option.dialCode}`} value={option.code}>
                            {option.flag} {option.displayDialCode} · {option.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                        <span>
                          {(selectedPhoneOption?.flag ?? "🌍") +
                            " " +
                            (selectedPhoneOption?.displayDialCode ?? "")}
                        </span>
                        <span aria-hidden="true">▾</span>
                      </div>
                    </div>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                      type="tel"
                      name="phone"
                      placeholder="600 000 000"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      required
                    />
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authCountryLabel">País</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    name="country"
                    required
                    value={kycAnswers.country ?? ""}
                    onChange={(event) => updateKyc("country", event.target.value)}
                  >
                    <option value="" data-i18n="authCountryPlaceholder">
                      País
                    </option>
                    {countryOptions.map((option) => (
                      <option key={option.code} value={option.name}>
                        {option.flag} {option.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authRoleLabel">Tipo de perfil</span>
                  <input
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
                    name="role"
                    value={strings.authRoleFundManager}
                    readOnly
                    aria-readonly="true"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authPasswordLabel">Contraseña</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    data-i18n-placeholder="authPasswordPlaceholder"
                    value={kycAnswers.password ?? ""}
                    onChange={(event) => updateKyc("password", event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authConfirmPasswordLabel">Confirmar contraseña</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    data-i18n-placeholder="authConfirmPasswordPlaceholder"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </label>
              </>
            )}

            {currentStep.type === "survey" &&
              currentStep.questions.map((question) => (
                <div
                  className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  key={question.id}
                >
                  <span className="text-sm font-semibold text-slate-700">{question.label}</span>
                  {question.type === "text" && question.prompt ? (
                    <p className="text-xs text-slate-500">{question.prompt}</p>
                  ) : null}
                  {question.type === "text" ? (
                    <textarea
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                      name={question.id}
                      rows={3}
                      placeholder={question.prompt}
                      value={(surveyAnswers[question.id] as string) ?? ""}
                      onChange={(event) => updateSurvey(question.id, event.target.value)}
                    />
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options?.map((option) => {
                        const isMulti = question.type === "multi";
                        const checked = isMulti
                          ? Array.isArray(surveyAnswers[question.id]) &&
                            (surveyAnswers[question.id] as string[]).includes(option.value)
                          : surveyAnswers[question.id] === option.value;
                        return (
                          <label
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                              checked
                                ? "border-igates-500 bg-igates-500/10 text-igates-700"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                            key={option.value}
                          >
                            <input
                              className="accent-igates-500"
                              type={isMulti ? "checkbox" : "radio"}
                              name={question.id}
                              value={option.value}
                              checked={checked}
                              onChange={(event) => {
                                if (isMulti) {
                                  const selections = Array.isArray(surveyAnswers[question.id])
                                    ? [...(surveyAnswers[question.id] as string[])]
                                    : [];
                                  if (event.target.checked) {
                                    selections.push(option.value);
                                  } else {
                                    const index = selections.indexOf(option.value);
                                    if (index >= 0) selections.splice(index, 1);
                                  }
                                  updateSurvey(question.id, selections);
                                } else {
                                  updateSurvey(question.id, option.value);
                                }
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            {currentStep.type === "fund-details" && (
              <>
                <div className="md:col-span-2 grid gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span data-i18n="dashboardTitleFundDetails">Detalles del fondo</span>
                </div>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardFundNameLabel">Nombre del fondo</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="text"
                    value={fundDetails.fundName}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, fundName: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardCountryLabel">País</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    value={fundDetails.country}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, country: event.target.value }))
                    }
                    required
                  >
                    <option value="" data-i18n="dashboardSelectPlaceholder">
                      Selecciona
                    </option>
                    {Object.entries(countryFlags).map(([country, flag]) => (
                      <option key={country} value={country}>
                        {flag} {country}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="md:col-span-2 grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardDescriptionLabel">Descripción</span>
                  <textarea
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    rows={3}
                    value={fundDetails.description}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, description: event.target.value }))
                    }
                    required
                  />
                </label>
                <div className="md:col-span-2 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-600">Logo del fondo</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                      {logoPreviewUrl ? (
                        <img src={logoPreviewUrl} alt="Logo del fondo" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-center">Sin logo</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          setLogoFile(file);
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                      />
                      {logoPreviewUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoFile(null)}
                          className="text-left text-xs font-semibold text-rose-500"
                        >
                          Quitar logo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardOperatingTimeLabel">Tiempo operando</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      placeholder="Ej: 3"
                      data-i18n-placeholder="dashboardExampleYears"
                      value={fundDetails.operatingTime}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, operatingTime: event.target.value }))
                      }
                      required
                    />
                    <span className="ml-2 text-slate-500" data-i18n="dashboardYearsLabel">
                      años
                    </span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardMonthlyProfitLabel">Profit mensual (último año)</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 2.4"
                      data-i18n-placeholder="dashboardExamplePercent"
                      value={fundDetails.monthlyProfit}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, monthlyProfit: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span>Win rate</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 60"
                      value={fundDetails.winRate}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, winRate: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span>Win ratio</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="text"
                    placeholder="Ej: 1.8:1"
                    value={fundDetails.winRatio}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, winRatio: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardDrawdownTargetLabel">Drawdown target</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 5"
                      data-i18n-placeholder="dashboardExamplePercent"
                      value={fundDetails.drawdownTarget}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, drawdownTarget: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardMaxDrawdownLabel">Max drawdown</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 8"
                      data-i18n-placeholder="dashboardExamplePercent"
                      value={fundDetails.maxDrawdown}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, maxDrawdown: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardTradesLabel">Trades mensuales</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="number"
                    step="0.01"
                    placeholder="Ej: 60"
                    data-i18n-placeholder="dashboardExampleTrades"
                    value={fundDetails.tradesPerMonth}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, tradesPerMonth: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardRiskLabel">Gestión de riesgo</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    value={fundDetails.riskManagement}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, riskManagement: event.target.value }))
                    }
                    required
                  >
                    <option value="" data-i18n="dashboardSelectPlaceholder">
                      Selecciona
                    </option>
                    {riskOptions.map((option) => (
                      <option key={option.label} value={option.label} data-i18n={option.labelKey}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="md:col-span-2 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-600" data-i18n="dashboardLiveTracking">
                    Live performance tracking
                  </p>
                  {fundLinks.map((link, index) => (
                    <input
                      key={`link-${index}`}
                      type="url"
                      placeholder={`${strings.dashboardMyfxbookLink} ${index + 1}`}
                      value={link}
                      onChange={(event) =>
                        setFundLinks((prev) =>
                          prev.map((item, position) =>
                            position === index ? event.target.value : item
                          )
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    />
                  ))}
                </div>
                <div className="md:col-span-2 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-600">Presentación (PDF opcional)</p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      setPresentationFile(file);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                  {presentationFile && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <span>{presentationFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setPresentationFile(null)}
                        className="text-xs font-semibold text-rose-500"
                      >
                        Quitar
                      </button>
                    </div>
                  )}
                </div>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardMinInvestmentLabel">Min investment</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      placeholder="Ej: 50000"
                      data-i18n-placeholder="dashboardExampleAmount"
                      value={fundDetails.minInvestment}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, minInvestment: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">USD</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardPerformanceFeeLabel">Performance fee</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      placeholder="Ej: 20"
                      data-i18n-placeholder="dashboardExamplePercent"
                      value={fundDetails.performanceFee}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, performanceFee: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardSubscriptionFeeLabel">Subscription fee</span>
                  <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                    <input
                      className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                      type="number"
                      placeholder="Ej: 1"
                      data-i18n-placeholder="dashboardExamplePercent"
                      value={fundDetails.subscriptionFee}
                      onChange={(event) =>
                        setFundDetails((prev) => ({ ...prev, subscriptionFee: event.target.value }))
                      }
                    />
                    <span className="ml-2 text-slate-500">%</span>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="dashboardReportsLabel">Reports</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    value={fundDetails.reportsFrequency}
                    onChange={(event) =>
                      setFundDetails((prev) => ({ ...prev, reportsFrequency: event.target.value }))
                    }
                    required
                  >
                    <option value="" data-i18n="dashboardSelectPlaceholder">
                      Selecciona
                    </option>
                    {reportOptions.map((option) => (
                      <option key={option.label} value={option.label} data-i18n={option.labelKey}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              data-i18n="authBack"
            >
              {strings.authBack}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-igates-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
              type="button"
              onClick={handleNext}
              data-i18n={stepIndex === steps.length - 1 ? "authCompleteOnboarding" : "authNext"}
            >
              {stepIndex === steps.length - 1 ? strings.authCompleteOnboarding : strings.authNext}
            </button>
          </div>
          <p className="mt-3 min-h-[22px] text-xs text-slate-500" aria-live="polite">
            {signupStatus}
          </p>
        </div>

        <div className={activeTab === "login" ? "block" : "hidden"} role="tabpanel">
          <form
            className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <label className="grid gap-2 text-sm font-medium text-slate-600">
              <span data-i18n="authLoginIdentifierLabel">Usuario o email</span>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                type="text"
                name="identifier"
                placeholder="tu correo"
                data-i18n-placeholder="authLoginIdentifierPlaceholder"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-600">
              <span data-i18n="authPasswordLabel">Contraseña</span>
              <div className="flex items-center gap-2">
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                  type={isLoginPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  data-i18n-placeholder="authLoginPasswordPlaceholder"
                  required
                />
                <button
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  type="button"
                  onClick={() => setIsLoginPasswordVisible((prev) => !prev)}
                  aria-pressed={isLoginPasswordVisible}
                >
                  {isLoginPasswordVisible ? strings.authHidePassword : strings.authShowPassword}
                </button>
              </div>
            </label>
            <button
              className="inline-flex items-center justify-center rounded-full bg-igates-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-igates-500/30 transition hover:bg-igates-400"
              type="submit"
              data-i18n="authTabLogin"
            >
              {strings.authTabLogin}
            </button>
            <p className="min-h-[22px] text-xs text-slate-500" aria-live="polite">
              {loginStatus}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
