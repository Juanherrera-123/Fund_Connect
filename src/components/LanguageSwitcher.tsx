"use client";

import {
  useMemo,
  useRef,
  useState,
  useEffect,
  type KeyboardEvent,
} from "react";

import { type LanguageKey } from "@/lib/igatesData";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage, options } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const optionKeys = useMemo(
    () => Object.keys(options) as LanguageKey[],
    [options]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const selectedIndex = Math.max(optionKeys.indexOf(language), 0);
    setActiveIndex(selectedIndex);
    requestAnimationFrame(() => {
      optionRefs.current[selectedIndex]?.focus();
    });
  }, [isOpen, language, optionKeys]);

  const handleSelect = (nextLanguage: LanguageKey) => {
    setLanguage(nextLanguage);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (activeIndex + direction + optionKeys.length) % optionKeys.length;
      setActiveIndex(nextIndex);
      optionRefs.current[nextIndex]?.focus();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      optionRefs.current[0]?.focus();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastIndex = optionKeys.length - 1;
      setActiveIndex(lastIndex);
      optionRefs.current[lastIndex]?.focus();
    }
  };

  const shortLabel = options[language]?.shortLabel ?? "EN";
  const triggerLabel = `🌐 ${shortLabel}`;

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-igates-500/40"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        data-i18n-aria-label="languageSelectLabel"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        {triggerLabel}
        <span aria-hidden="true">▾</span>
      </button>
      <ul
        className={`absolute right-0 top-full mt-2 w-max rounded-lg border border-slate-200 bg-white p-2 text-sm shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
        role="listbox"
        aria-label="Language options"
        data-i18n-aria-label="languageOptionsLabel"
        onKeyDown={handleListKeyDown}
      >
        {optionKeys.map((key, index) => {
          const isSelected = language === key;
          return (
            <li key={key}>
              <button
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`language-option-${key}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(key)}
                className={`flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-left font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-igates-500/30 ${
                  isSelected
                    ? "bg-igates-500/10 text-igates-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {options[key].label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
