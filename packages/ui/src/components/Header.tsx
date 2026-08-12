"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../lib/LanguageContext";
import { LangSwitcher } from "./LangSwitcher";

export type HeaderNavLink = { label: string; href: string };

export type HeaderProps = {
  logoUrl?: string | null;
  organizationTitle?: { line1?: string | null; line2?: string | null } | null;
  navLinks?: HeaderNavLink[] | null;
};

type NavKey = "home" | "about" | "cluster" | "projects" | "news" | "documents" | "media" | "contact";

const builtInLinks: { href: string; label: NavKey }[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/cluster", label: "cluster" },
  { href: "/projects", label: "projects" },
  { href: "/news", label: "news" },
  { href: "/documents", label: "documents" },
  { href: "/media", label: "media" },
  { href: "/contact", label: "contact" },
];

export default function Header({
  logoUrl,
  organizationTitle,
  navLinks,
}: HeaderProps = {}) {
  const { t } = useLanguage();

  const links =
    Array.isArray(navLinks) && navLinks.length > 0
      ? navLinks.map((l) => ({ href: l.href, title: l.label }))
      : builtInLinks.map((l) => ({ href: l.href, title: t.nav[l.label] }));

  const titleLine1 = organizationTitle?.line1 ?? "Deputy Regional President of the";
  const titleLine2 = organizationTitle?.line2 ?? "South Ethiopia Regional State";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
            <Image
              src={logoUrl ?? "/logo-modified.png"}
              alt="South Ethiopia Regional State"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-[13px] font-bold text-foreground sm:text-sm md:text-[15px]">
              {titleLine1}
            </span>
            <span className="text-[13px] font-bold text-foreground sm:text-sm md:text-[15px]">
              {titleLine2}
            </span>
          </div>
        </Link>

        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex whitespace-nowrap rounded px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-primary hover:text-white sm:px-3 sm:text-sm"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/search"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={t.nav.search}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </Link>
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}