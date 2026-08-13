import type { Metadata } from "next";
import Link from "next/link";
import { getPressReleases } from "../../lib/cms-data";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Press Releases",
  description: "Press releases and media statements issued by the regional government and its offices.",
};

const fallbackReleases: { id: string; title: string; date: string; excerpt: string }[] = [
  {
    id: "1",
    title: "Regional Development Forum Concludes with Action Plan",
    date: "July 28, 2026",
    excerpt:
      "The two-day regional development forum brought together stakeholders from all sectors to align on priority initiatives for the upcoming fiscal year.",
  },
  {
    id: "2",
    title: "Infrastructure Development Package Approved by Cabinet",
    date: "July 20, 2026",
    excerpt:
      "The regional cabinet has approved a comprehensive infrastructure development package for the fiscal year.",
  },
  {
    id: "3",
    title: "New Education Reforms Announced for 2026-2027",
    date: "July 5, 2026",
    excerpt:
      "The regional government has announced new education reforms aimed at improving quality and access for all children.",
  },
];

export default async function PressReleasesPage() {
  const t = await getT();
  const releases = await getPressReleases();
  const displayReleases =
    releases.length > 0
      ? releases.map((item) => ({
          key: String(item.id),
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          link: `/press-releases/${item.id}`,
        }))
      : fallbackReleases.map((item) => ({
          key: item.id,
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          link: `/press-releases/${item.id}`,
        }));

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.pressReleases.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.pressReleases.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {displayReleases.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.pressReleases.empty}</p>
          ) : (
            <div className="space-y-8">
              {displayReleases.map((item) => (
                <article
                  key={item.key}
                  className="group rounded-2xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {t.pressReleases.badge}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    <Link href={item.link}>{item.title}</Link>
                  </h2>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{item.excerpt}</p>
                  <Link
                    href={item.link}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t.pressReleases.readMore}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}