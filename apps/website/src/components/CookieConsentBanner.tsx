"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@sevp/ui";
import { GA4_ID, getConsent, setConsent } from "@/lib/analytics";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!GA4_ID) return;
    if (getConsent() === null) setVisible(true);
  }, []);

  if (!visible || !GA4_ID) return null;

  const decide = (value: "accepted" | "declined") => {
    setConsent(value);
    setVisible(false);
    window.dispatchEvent(new Event("consentchange"));
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookie.title}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] sm:p-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-foreground">{t.cookie.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t.cookie.message}{" "}
            <Link href="/privacy" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
              {t.cookie.privacy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={() => decide("declined")}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t.cookie.decline}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}