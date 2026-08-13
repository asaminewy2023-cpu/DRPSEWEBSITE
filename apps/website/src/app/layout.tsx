import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { Header } from "@sevp/ui";
import { Footer } from "@sevp/ui";
import { AccessibilityToolbar } from "@sevp/ui";
import { LanguageProvider } from "@sevp/ui";
import { AccessibilityProvider } from "@sevp/ui";
import { CMS_BASE_URL } from "@sevp/shared";
import type { SiteSetting } from "@sevp/shared";
import { getSiteSettings } from "@/lib/cms-data";
import { Analytics } from "@/components/Analytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import "./globals.css";

const cmsOrigin = (() => {
  try {
    return new URL(CMS_BASE_URL).origin;
  } catch {
    return CMS_BASE_URL;
  }
})();

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  title: {
    default: "Deputy Regional President of the South Ethiopia Regional State",
    template: "%s | Deputy Regional President of the South Ethiopia Regional State",
  },
  description:
    "Official website of the Office of the Deputy Regional President of the South Ethiopia Regional State. Learn about our leadership, programs, and initiatives.",
  ...(gscVerification
    ? {
        verification: {
          google: gscVerification,
        },
      }
    : {}),
};

function logoUrl(settings: SiteSetting | null): string | null {
  const logo = settings?.branding?.logo;
  if (logo && typeof logo === "object" && "url" in logo && logo.url) {
    return logo.url;
  }
  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href={cmsOrigin} />
        <link rel="preconnect" href={cmsOrigin} crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AccessibilityProvider>
          <LanguageProvider>
            <Header
              logoUrl={logoUrl(settings)}
              organizationTitle={settings?.organizationTitle}
              navLinks={settings?.navLinks}
            />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer
              logoUrl={logoUrl(settings)}
              siteName={settings?.branding?.siteName}
              siteSubtitle={settings?.branding?.siteSubtitle}
              description={settings?.footer?.description}
              quickLinks={settings?.navLinks}
              contact={settings?.contact}
              copyright={settings?.footer?.copyright}
              developedBy={settings?.footer?.developedBy}
              socialLinks={settings?.socialLinks}
            />
            <AccessibilityToolbar />
            <CookieConsentBanner />
          </LanguageProvider>
        </AccessibilityProvider>
        <Analytics />
      </body>
    </html>
  );
}