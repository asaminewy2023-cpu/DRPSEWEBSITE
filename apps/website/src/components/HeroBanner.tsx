"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@sevp/ui";

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-yellow-900">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12 sm:pb-32 lg:px-8">
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-yellow-300 backdrop-blur-sm border border-yellow-500/30">
            {t.hero.badge}
          </span>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {t.hero.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-200 max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
              >
                {t.hero.learnMore}
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-green-900 shadow-sm transition-all hover:bg-yellow-400 hover:shadow-md"
              >
                {t.hero.strategicPlan}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                {t.hero.contactOffice}
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-72 aspect-square overflow-hidden rounded-full shadow-xl ring-4 ring-yellow-400/60 sm:w-80 lg:w-96">
              <Image
                src="/Flag_of_Southern_Ethiopia.png"
                alt="Flag of South Ethiopia Regional State"
                width={720}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
