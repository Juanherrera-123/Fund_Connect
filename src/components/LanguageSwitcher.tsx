"use client";

import { useState } from "react";

import { type LanguageKey } from "@/lib/igatesData";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage, options } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (nextLanguage: LanguageKey) => {
    setLanguage(nextLanguage);
    setIsOpen(false);
  };

  const shortLabel = options[language]?.shortLabel ?? "EN";

  return (
    <div className="language-switcher">
      <button
        className="language-toggle"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {shortLabel} ▾
      </button>
      <ul className={`language-menu ${isOpen ? "open" : ""}`} role="listbox" aria-label="Language options">
        {(Object.keys(options) as LanguageKey[]).map((key) => (
          <li
            key={key}
            role="option"
            aria-selected={language === key}
            onClick={() => handleSelect(key)}
          >
            {options[key].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
