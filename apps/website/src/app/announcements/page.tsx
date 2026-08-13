import type { Metadata } from "next";
import Link from "next/link";
import { getAnnouncements } from "../../lib/cms-data";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Official announcements and news from the Office of the Deputy Regional President.",
};

const fallbackAnnouncements: { id: string; title: string; date: string; category: string; excerpt: string }[] = [
  {
    id: "1",
    title: "Regional Development Forum Announced",
    date: "July 25, 2026",
    category: "Events",
    excerpt:
      "The Deputy Regional President's office announces a regional development forum to discuss economic growth strategies for the upcoming fiscal year.",
  },
  {
    id: "2",
    title: "New Infrastructure Projects Underway",
    date: "July 18, 2026",
    category: "Development",
    excerpt:
      "Multiple infrastructure projects have been launched across the region, focusing on road construction, water supply, and healthcare facilities.",
  },
  {
    id: "3",
    title: "Peace and Reconciliation Initiative",
    date: "July 10, 2026",
    category: "Governance",
    excerpt:
      "A new peace and reconciliation initiative has been launched to strengthen social harmony among communities in the region.",
  },
  {
    id: "4",
    title: "Education Sector Reform Update",
    date: "June 28, 2026",
    category: "Education",
    excerpt:
      "Updates on the education reform program, including new school construction and teacher training programs across the region.",
  },
];

export default async function AnnouncementsPage() {
  const t = await getT();
  const announcements = await getAnnouncements();
  const displayAnnouncements =
    announcements.length > 0
      ? announcements.map((item) => ({
          key: String(item.id),
          category: item.category,
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          link: `/announcements/${item.id}`,
        }))
      : fallbackAnnouncements.map((item) => ({
          key: item.id,
          category: item.category,
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          link: `/announcements/${item.id}`,
        }));

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.announcements.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.announcements.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {displayAnnouncements.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.announcements.empty}</p>
          ) : (
            <div className="space-y-8">
              {displayAnnouncements.map((item) => (
                <article
                  key={item.key}
                  className="group rounded-2xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.category}
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
                    {t.announcements.readMore}
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
