export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const CONSENT_COOKIE = "site-consent";

export type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): Consent {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(^| )${CONSENT_COOKIE}=([^;]+)`),
  );
  const value = match ? decodeURIComponent(match[2]) : null;
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(consent: Exclude<Consent, null>): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE}=${consent};path=/;max-age=31536000;SameSite=Lax`;
}

export function hasConsent(): boolean {
  return getConsent() === "accepted";
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, { ...params });
}

export function trackSearch(
  term: string,
  category?: string,
): void {
  if (!term.trim()) return;
  trackEvent("search", {
    search_term: term.trim(),
    ...(category ? { search_category: category } : {}),
  });
}

export function trackDownload(
  fileName: string,
  url: string,
): void {
  trackEvent("file_download", {
    file_name: fileName,
    file_url: url,
    file_extension: fileName.includes(".")
      ? fileName.split(".").pop()
      : undefined,
  });
}

const DOWNLOAD_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
  "csv",
  "txt",
];

export function isDownloadLink(href: string): boolean {
  const clean = href.split("?")[0].split("#")[0].toLowerCase();
  return DOWNLOAD_EXTENSIONS.some((ext) => clean.endsWith(`.${ext}`));
}

export function fileNameFromUrl(url: string): string {
  const clean = url.split("?")[0].split("/").pop() ?? url;
  return decodeURIComponent(clean) || "download";
}