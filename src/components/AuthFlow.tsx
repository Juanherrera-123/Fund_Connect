"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useLanguage } from "@/components/LanguageProvider";
import {
  MASTER_USER,
  STORAGE_KEYS,
  SURVEY_DEFINITIONS,
  getStrategyLabel,
} from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type {
  MasterNotification,
  MasterUserCredentials,
  Session,
  SurveyAnswer,
  UserProfile,
} from "@/lib/types";

const requiredKycFields = ["fullName", "email", "phone", "country", "role", "password"] as const;

type SurveyQuestion = (typeof SURVEY_DEFINITIONS)[keyof typeof SURVEY_DEFINITIONS][number];

type SignupStep =
  | { type: "kyc" }
  | { type: "survey"; questions: SurveyQuestion[] };

export function AuthFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { strings } = useLanguage();
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [stepIndex, setStepIndex] = useState(0);
  const [signupStatus, setSignupStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [kycAnswers, setKycAnswers] = useState<Record<string, string>>({});
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, SurveyAnswer>>({});

  const [profiles, setProfiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    []
  );
  const [masterUser] = useFirebaseStorage<MasterUserCredentials>(
    STORAGE_KEYS.masterUser,
    MASTER_USER
  );
  const [, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [notifications, setNotifications] = useFirebaseStorage<MasterNotification[]>(
    STORAGE_KEYS.notifications,
    []
  );

  const role = kycAnswers.role as keyof typeof SURVEY_DEFINITIONS | undefined;
  const roleLabels = useMemo(
    () => ({
      Investor: strings.authRoleInvestor,
      "Fund Manager": strings.authRoleFundManager,
      "Family Office": strings.authRoleFamilyOffice,
    }),
    [strings.authRoleFamilyOffice, strings.authRoleFundManager, strings.authRoleInvestor]
  );

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
    return [{ type: "kyc" }, ...surveySteps];
  }, [role]);

  const totalSteps = role ? steps.length : 4;
  const currentStep = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    setStepIndex(0);
  }, [role]);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam && Object.prototype.hasOwnProperty.call(SURVEY_DEFINITIONS, roleParam)) {
      setActiveTab("signup");
      setKycAnswers((prev) =>
        prev.role === roleParam ? prev : { ...prev, role: roleParam }
      );
    }
  }, [searchParams]);

  const updateKyc = (field: string, value: string) => {
    setKycAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const updateSurvey = (id: string, value: SurveyAnswer) => {
    setSurveyAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const validateKyc = () => {
    const missing = requiredKycFields.filter((field) => !kycAnswers[field]);
    if (missing.length) {
      setSignupStatus(strings.authStatusMissingFields);
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

  const handleNext = () => {
    setSignupStatus("");
    if (currentStep.type === "kyc") {
      if (!validateKyc()) return;
      if (!role) return;
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    if (!validateSurvey(currentStep.questions)) return;

    if (stepIndex === steps.length - 1) {
      completeSignup();
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setSignupStatus("");
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  const completeSignup = () => {
    if (!role) return;
    const existing = profiles.find((profile) => profile.email.toLowerCase() === kycAnswers.email?.toLowerCase());
    if (existing) {
      setSignupStatus(strings.authStatusEmailExists);
      return;
    }

    const profileId = `profile-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const baseProfile: UserProfile = {
      id: profileId,
      fullName: kycAnswers.fullName,
      email: kycAnswers.email,
      phone: kycAnswers.phone,
      country: kycAnswers.country,
      role,
      password: kycAnswers.password,
      onboardingCompleted: true,
      onboarding: {
        role,
        completedAt: new Date().toISOString(),
      },
    };

    if (role === "Investor") {
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

    if (role === "Fund Manager") {
      const managerProfile = {
        strategyType: surveyAnswers.strategyType as string,
        strategyTypeLabel: getStrategyLabel(surveyAnswers.strategyType as string),
        capitalStatus: surveyAnswers.capitalStatus as string,
        trackRecordLength: surveyAnswers.trackRecordLength as string,
        operatingStructure: surveyAnswers.operatingStructure as string,
        strategyDescription: surveyAnswers.strategyDescription as string,
        status: "pending-review" as const,
      };
      baseProfile.fundManagerProfile = managerProfile;
      baseProfile.onboarding = { ...baseProfile.onboarding, fundManagerProfile: managerProfile };
      const nextNotification: MasterNotification = {
        id: `notif-${Date.now()}`,
        type: "fund-manager-profile",
        title: strings.masterNotificationManagerPendingTitle,
        message: strings.masterNotificationManagerPendingMessage.replace("{name}", baseProfile.fullName),
        createdAt: new Date().toISOString(),
      };
      setNotifications([nextNotification, ...notifications]);
    }

    if (role === "Family Office") {
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
    setSession({ id: profileId, role: baseProfile.role });

    if (baseProfile.role === "Investor") {
      router.push("/dashboard/investor");
      return;
    }

    if (baseProfile.role === "Fund Manager") {
      router.push("/pending-review");
      return;
    }

    if (baseProfile.role === "Family Office") {
      router.push("/dashboard/family-office");
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus("");

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!identifier || !password) {
      setLoginStatus(strings.authStatusMissingCredentials);
      return;
    }

    const activeMasterUser = masterUser?.username ? masterUser : MASTER_USER;

    if (
      identifier.toLowerCase() === activeMasterUser.username.toLowerCase() &&
      password === activeMasterUser.password
    ) {
      setSession({ role: "MasterUser", username: activeMasterUser.username });
      router.push("/dashboard/master");
      return;
    }

    const match = profiles.find(
      (profile) => profile.email.toLowerCase() === identifier.toLowerCase() && profile.password === password
    );

    if (!match) {
      setLoginStatus(strings.authStatusInvalidCredentials);
      return;
    }

    setSession({ id: match.id, role: match.role });
    if (match.role === "Fund Manager") {
      if (match.fundManagerProfile?.status !== "verified") {
        router.push("/pending-review");
        return;
      }
      router.push("/dashboard/manager/overview");
      return;
    }

    if (match.role === "Investor") {
      router.push("/dashboard/investor");
      return;
    }

    if (match.role === "Family Office") {
      router.push("/dashboard/family-office");
      return;
    }

    router.push("/profile");
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
            className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
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
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="tel"
                    name="phone"
                    placeholder="+34 600 000 000"
                    data-i18n-placeholder="authPhonePlaceholder"
                    value={kycAnswers.phone ?? ""}
                    onChange={(event) => updateKyc("phone", event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authCountryLabel">País</span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    type="text"
                    name="country"
                    placeholder="País"
                    data-i18n-placeholder="authCountryPlaceholder"
                    value={kycAnswers.country ?? ""}
                    onChange={(event) => updateKyc("country", event.target.value)}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-600">
                  <span data-i18n="authRoleLabel">Tipo de perfil</span>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-igates-500/30"
                    name="role"
                    required
                    value={kycAnswers.role ?? ""}
                    onChange={(event) => updateKyc("role", event.target.value)}
                  >
                    <option value="" data-i18n="authRolePlaceholder">
                      Selecciona un perfil
                    </option>
                    {Object.keys(SURVEY_DEFINITIONS).map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleLabels[roleOption as keyof typeof roleLabels] ?? roleOption}
                      </option>
                    ))}
                  </select>
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
