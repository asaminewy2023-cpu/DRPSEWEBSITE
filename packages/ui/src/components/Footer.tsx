"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from "../lib/LanguageContext"

export type FooterSocialLink = { label: string; url: string };

export type FooterContact = {
  emergencyHotline?: string | null;
  email?: string | null;
  address?: string | null;
  officeHours?: string | null;
};

export type FooterProps = {
  logoUrl?: string | null;
  siteName?: string | null;
  siteSubtitle?: string | null;
  description?: string | null;
  quickLinks?: { label: string; href: string }[] | null;
  contact?: FooterContact | null;
  copyright?: string | null;
  developedBy?: string | null;
  socialLinks?: FooterSocialLink[] | null;
};

const SOCIAL_ICONS: Record<string, string> = {
  Facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  Twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  Telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  Other: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244",
};

const DEFAULT_SOCIALS: { label: string; href: string }[] = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61570972895493" },
  { label: "Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Telegram", href: "#" },
];

export default function Footer({
  logoUrl,
  siteName,
  siteSubtitle,
  description,
  quickLinks,
  contact,
  copyright,
  developedBy,
  socialLinks,
}: FooterProps = {}) {
  const { t } = useLanguage();

  const brandName = siteName ?? "South Ethiopia";
  const brandSubtitle = siteSubtitle ?? "Deputy Regional President";
  const about =
    description && description.trim()
      ? description
      : t.footer.description;
  const contacts = {
    emergencyHotline: contact?.emergencyHotline ?? "Emergency Hotline: 911",
    email: contact?.email ?? "emergency@southethiopia.gov.et",
    address: contact?.address ?? "Regional HQ: Hawassa, Ethiopia",
    officeHours: contact?.officeHours ?? "Office Hours: Mon-Fri 8:00-17:00",
  };
  const links = Array.isArray(quickLinks) && quickLinks.length > 0
    ? quickLinks
    : [
        { href: '/about', label: 'About Us' },
        { href: '/announcements', label: 'Announcements' },
        { href: '/programs', label: 'Programs' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
        {
          href: `${process.env.NEXT_PUBLIC_CMS_BASE_URL ?? 'http://localhost:3000'}/admin`,
          label: 'Admin',
        },
      ];
  const socials =
    Array.isArray(socialLinks) && socialLinks.length > 0
      ? socialLinks.map((s) => ({ label: s.label, href: s.url }))
      : DEFAULT_SOCIALS;
  const copyYear = new Date().getFullYear();
  const copyText = copyright && copyright.trim() ? `${copyright}. All rights reserved.` : t.footer.copyright;
  const builtBy = developedBy && developedBy.trim() ? developedBy : t.footer.developedBy;

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
                <Image
                  src={logoUrl ?? "/logo-modified.png"}
                  alt="South Ethiopia Regional State"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">{brandName}</p>
                <p className="text-xs leading-tight text-muted-foreground">{brandSubtitle}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {about}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">{t.footer.emergencyContacts}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>{contacts.emergencyHotline}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>Email: {contacts.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{contacts.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{contacts.officeHours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">{t.footer.socialMedia}</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const icon = SOCIAL_ICONS[social.label] ?? SOCIAL_ICONS.Other;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                    aria-label={social.label}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Stay connected through our official channels for the latest updates and announcements.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary">
            &copy; {copyYear} {copyText}
          </p>
          <p className="text-xs text-muted-foreground">{builtBy}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}