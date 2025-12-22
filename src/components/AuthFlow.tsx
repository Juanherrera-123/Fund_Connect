"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MASTER_USER, STORAGE_KEYS, SURVEY_DEFINITIONS, getStrategyLabel } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { MasterNotification, Session, SurveyAnswer, UserProfile } from "@/lib/types";

const requiredKycFields = ["fullName", "email", "phone", "country", "role", "password"] as const;

type SurveyQuestion = (typeof SURVEY_DEFINITIONS)[keyof typeof SURVEY_DEFINITIONS][number];

type SignupStep =
  | { type: "kyc" }
  | { type: "survey"; questions: SurveyQuestion[] };

export function AuthFlow() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [stepIndex, setStepIndex] = useState(0);
  const [signupStatus, setSignupStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [kycAnswers, setKycAnswers] = useState<Record<string, string>>({});
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, SurveyAnswer>>({});

  const [profiles, setProfiles] = useLocalStorage<UserProfile[]>(STORAGE_KEYS.profiles, []);
  const [, setSession] = useLocalStorage<Session>(STORAGE_KEYS.session, null);
  const [notifications, setNotifications] = useLocalStorage<MasterNotification[]>(
    STORAGE_KEYS.notifications,
    []
  );

  const role = kycAnswers.role as keyof typeof SURVEY_DEFINITIONS | undefined;

  const steps = useMemo<SignupStep[]>(() => {
    const surveyQuestions = role ? SURVEY_DEFINITIONS[role] : [];
    const groups: SurveyQuestion[][] = [];
    for (let index = 0; index < surveyQuestions.length; index += 2) {
      groups.push(surveyQuestions.slice(index, index + 2));
    }
    return [{ type: "kyc" }, ...groups.map((group) => ({ type: "survey", questions: group }))];
  }, [role]);

  const totalSteps = role ? steps.length : 4;
  const currentStep = steps[stepIndex] ?? steps[0];

  useEffect(() => {
    setStepIndex(0);
  }, [role]);

  const updateKyc = (field: string, value: string) => {
    setKycAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const updateSurvey = (id: string, value: SurveyAnswer) => {
    setSurveyAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const validateKyc = () => {
    const missing = requiredKycFields.filter((field) => !kycAnswers[field]);
    if (missing.length) {
      setSignupStatus("Completa todos los campos para continuar.");
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
      setSignupStatus("Responde todas las preguntas para continuar.");
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
      setSignupStatus("Este email ya está registrado.");
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
        title: "Nuevo gestor pendiente",
        message: `${baseProfile.fullName} envió su perfil de gestor.`,
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
      router.push("/funds-explore");
      return;
    }

    if (baseProfile.role === "Fund Manager") {
      router.push("/pending-review");
      return;
    }

    if (baseProfile.role === "Family Office") {
      router.push("/family-dashboard");
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus("");

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get("identifier") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!identifier || !password) {
      setLoginStatus("Ingresa tus credenciales.");
      return;
    }

    if (identifier === MASTER_USER.username && password === MASTER_USER.password) {
      setSession({ role: "MasterUser", username: MASTER_USER.username });
      router.push("/master-dashboard");
      return;
    }

    const match = profiles.find(
      (profile) => profile.email.toLowerCase() === identifier.toLowerCase() && profile.password === password
    );

    if (!match) {
      setLoginStatus("Credenciales inválidas.");
      return;
    }

    setSession({ id: match.id, role: match.role });
    router.push("/profile");
  };

  return (
    <div className="auth-shell">
      <div className="auth-tabs" role="tablist" aria-label="Access options">
        <button
          className={`auth-tab ${activeTab === "signup" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "signup"}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
        <button
          className={`auth-tab ${activeTab === "login" ? "is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "login"}
          onClick={() => setActiveTab("login")}
        >
          Log In
        </button>
      </div>

      <div className="auth-panels">
        <div className={`auth-panel ${activeTab === "signup" ? "" : "is-hidden"}`} role="tabpanel">
          <div className="progress-indicator">Step {stepIndex + 1} of {totalSteps}</div>
          <form className="contact-form" autoComplete="off">
            {currentStep.type === "kyc" && (
              <>
                <label>
                  <span>Nombre completo</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nombre y apellido"
                    value={kycAnswers.fullName ?? ""}
                    onChange={(event) => updateKyc("fullName", event.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={kycAnswers.email ?? ""}
                    onChange={(event) => updateKyc("email", event.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>Teléfono</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+34 600 000 000"
                    value={kycAnswers.phone ?? ""}
                    onChange={(event) => updateKyc("phone", event.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>País</span>
                  <input
                    type="text"
                    name="country"
                    placeholder="País"
                    value={kycAnswers.country ?? ""}
                    onChange={(event) => updateKyc("country", event.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>Tipo de perfil</span>
                  <select
                    name="role"
                    required
                    value={kycAnswers.role ?? ""}
                    onChange={(event) => updateKyc("role", event.target.value)}
                  >
                    <option value="">Selecciona un perfil</option>
                    {Object.keys(SURVEY_DEFINITIONS).map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Contraseña</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    value={kycAnswers.password ?? ""}
                    onChange={(event) => updateKyc("password", event.target.value)}
                    required
                  />
                </label>
              </>
            )}

            {currentStep.type === "survey" &&
              currentStep.questions.map((question) => (
                <div className="question-block" key={question.id}>
                  <span className="question-label">{question.label}</span>
                  {question.type === "text" && question.prompt ? (
                    <p className="small">{question.prompt}</p>
                  ) : null}
                  {question.type === "text" ? (
                    <textarea
                      name={question.id}
                      rows={3}
                      placeholder={question.prompt}
                      value={(surveyAnswers[question.id] as string) ?? ""}
                      onChange={(event) => updateSurvey(question.id, event.target.value)}
                    />
                  ) : (
                    <div className="choice-grid">
                      {question.options?.map((option) => {
                        const isMulti = question.type === "multi";
                        const checked = isMulti
                          ? Array.isArray(surveyAnswers[question.id]) &&
                            (surveyAnswers[question.id] as string[]).includes(option.value)
                          : surveyAnswers[question.id] === option.value;
                        return (
                          <label className="choice-card" key={option.value}>
                            <input
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
          <div className="wizard-actions">
            <button className="btn btn-secondary" type="button" onClick={handleBack} disabled={stepIndex === 0}>
              Back
            </button>
            <button className="btn btn-primary" type="button" onClick={handleNext}>
              {stepIndex === steps.length - 1 ? "Complete onboarding" : "Next"}
            </button>
          </div>
          <p className="form-status" aria-live="polite">
            {signupStatus}
          </p>
        </div>

        <div className={`auth-panel ${activeTab === "login" ? "" : "is-hidden"}`} role="tabpanel">
          <form className="contact-form" autoComplete="off" onSubmit={handleLogin}>
            <label>
              <span>Usuario o email</span>
              <input type="text" name="identifier" placeholder="Sebastian_ACY o tu correo" required />
            </label>
            <label>
              <span>Contraseña</span>
              <input type="password" name="password" placeholder="••••••••" required />
            </label>
            <button className="btn btn-primary" type="submit">
              Log In
            </button>
            <p className="form-status" aria-live="polite">
              {loginStatus}
            </p>
            <div className="auth-hint">
              <p className="small">
                MasterUser: <strong>{MASTER_USER.username}</strong> / <strong>{MASTER_USER.password}</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
