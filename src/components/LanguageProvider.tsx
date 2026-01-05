"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

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
    "es"
  );
  const pathname = usePathname();

  const strings = useMemo(() => translations[language] ?? translations.en, [language]);

  const applyTranslations = useCallback(
    (activeStrings: typeof strings) => {
      if (typeof document === "undefined") return;

      const translate = (key?: string | null) => {
        if (!key) return null;
        return (activeStrings as Record<string, string>)[key] ?? null;
      };

      document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
        const value = translate(element.dataset.i18n);
        if (value) {
          element.textContent = value;
        }
      });

      const applyAttribute = (dataAttribute: string, attributeName: string) => {
        document.querySelectorAll<HTMLElement>(`[data-${dataAttribute}]`).forEach((element) => {
          const key = element.getAttribute(`data-${dataAttribute}`);
          const value = translate(key);
          if (value) {
            element.setAttribute(attributeName, value);
          }
        });
      };

      applyAttribute("i18n-placeholder", "placeholder");
      applyAttribute("i18n-aria-label", "aria-label");
      applyAttribute("i18n-alt", "alt");
      applyAttribute("i18n-title", "title");
    },
    []
  );

  const setLanguage = (lang: LanguageKey) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = languageOptions[lang]?.locale ?? "en";
    }
    const nextStrings = translations[lang] ?? translations.en;
    requestAnimationFrame(() => {
      applyTranslations(nextStrings);
    });
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = languageOptions[language]?.locale ?? "en";
    applyTranslations(strings);
  }, [language, pathname, strings, applyTranslations]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      strings,
      options: languageOptions,
    }),
    [language, setLanguage, strings]
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
