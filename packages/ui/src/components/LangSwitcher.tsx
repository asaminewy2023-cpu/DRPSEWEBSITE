"use client";

import { useState } from "react";
import { useLanguage, type Lang } from "../lib/LanguageContext";

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "am", label: "አማርኛ" },
];

export function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === lang) || languages[0];

  const handleChange = (code: Lang) => {
    setLang(code);
    document.cookie = `lang=${code};path=/;max-age=31536000`;
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
          {lang.toUpperCase()}
        </span>
        {current.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-border bg-white shadow-lg">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleChange(l.code)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  lang === l.code
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-muted"
                } ${l === languages[0] ? "rounded-t-lg" : ""} ${l === languages[languages.length - 1] ? "rounded-b-lg" : ""}`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {l.code.toUpperCase()}
                </span>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
