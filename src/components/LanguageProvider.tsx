"use client";

import { createContext, useContext, useMemo } from "react";

import { languageOptions, translations, type LanguageKey, STORAGE_KEYS } from "@/lib/igatesData";
import { useLocalStorage } from "@/lib/useLocalStorage";

type LanguageContextValue = {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  strings: (typeof translations)[LanguageKey];
  options: typeof languageOptions;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useLocalStorage<LanguageKey>(
    STORAGE_KEYS.preferredLanguage,
    "en"
  );

  const setLanguage = (lang: LanguageKey) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = languageOptions[lang]?.locale ?? "en";
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      strings: translations[language] ?? translations.en,
      options: languageOptions,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
