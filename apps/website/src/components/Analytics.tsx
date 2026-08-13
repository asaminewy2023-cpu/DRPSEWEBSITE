"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  GA4_ID,
  getConsent,
  hasConsent,
  isDownloadLink,
  fileNameFromUrl,
  trackEvent,
} from "@/lib/analytics";

const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;

function gaBaseScript(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
gtag('js', new Date());
gtag('config', '${GA4_ID}', {
  'anonymize_ip': true,
  'send_page_view': true
});
`;
}

function gaConsentUpdateScript(): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
`;
}

/**
 * Consent-gated Google Analytics 4 loader.
 * gtag is initialized with consent-mode denied; the full tag only fires once
 * the visitor accepts the cookie banner. Tracks file downloads globally.
 */
export function Analytics() {
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    setConsented(hasConsent());
  }, []);

  useEffect(() => {
    const onConsentChange = () => {
      setConsented(hasConsent());
    };
    window.addEventListener("consentchange", onConsentChange);
    return () => window.removeEventListener("consentchange", onConsentChange);
  }, []);

  useEffect(() => {
    if (!window.gtag || typeof document === "undefined") return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = (anchor as HTMLAnchorElement).getAttribute("href") ?? "";
      const useDownload = (anchor as HTMLAnchorElement).hasAttribute("download");
      if (useDownload || isDownloadLink(href)) {
        trackEvent("file_download", {
          file_name: fileNameFromUrl(href),
          file_url: href,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA4_ID) return null;
  if (consented === null) return null;

  return (
    <>
      <Script
        id="ga-base"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: gaBaseScript() }}
      />
      {consented && (
        <Script
          id="ga-consent-update"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: gaConsentUpdateScript() }}
        />
      )}
      {consented && <Script id="ga-script" strategy="afterInteractive" src={GA_SRC} />}
    </>
  );
}