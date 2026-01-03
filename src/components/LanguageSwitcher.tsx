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
    <div className="relative">
      <button
        className="inline-flex min-w-[140px] items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-igates-500/40"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {shortLabel} ▾
      </button>
      <ul
        className={`absolute right-0 top-full mt-2 min-w-[190px] rounded-lg border border-slate-200 bg-white p-2 text-sm shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
        role="listbox"
        aria-label="Language options"
      >
        {(Object.keys(options) as LanguageKey[]).map((key) => (
          <li
            key={key}
            role="option"
            aria-selected={language === key}
            onClick={() => handleSelect(key)}
            className={`cursor-pointer rounded-md px-3 py-2 font-medium transition ${
              language === key
                ? "bg-igates-500/10 text-igates-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {options[key].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
