import type { Metadata } from "next";
import Link from "next/link";
import { getAnnouncements } from "../../lib/cms-data";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Official announcements and news from the Office of the Deputy Regional President.",
};

export default async function AnnouncementsPage() {
  const t = await getT();
  const announcements = await getAnnouncements();

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
          {announcements.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.announcements.empty}</p>
          ) : (
            <div className="space-y-8">
              {announcements.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/announcements/${item.id}`}>{item.title}</Link>
                  </h2>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{item.excerpt}</p>
                  <Link
                    href={`/announcements/${item.id}`}
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
