"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@sevp/ui";

export default function WelcomeMessage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const paragraphs = t.home.welcomeDesc.split("\n\n");
  const preview = paragraphs.slice(0, 3);
  const visible = expanded ? paragraphs : preview;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl bg-muted shadow-xl">
              <Image
                src="/ababayehu-tadesse.jpeg"
                alt="Photo of the Deputy Regional President"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.home.welcome}
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              {visible.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              {expanded ? "Read Less" : "Read More"}
              <svg
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
            >
              Read Full Biography
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
