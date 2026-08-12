"use client";

import { useLanguage } from "@sevp/ui";

const news = [
  {
    title: "Regional Cabinet Meeting",
    category: "Governance",
    date: "July 28, 2026",
    excerpt: "The regional cabinet convened to review progress on key development initiatives and approve the upcoming fiscal year budget allocation.",
  },
  {
    title: "Development Projects",
    category: "Infrastructure",
    date: "July 25, 2026",
    excerpt: "Multiple infrastructure projects have been launched across the region, focusing on road construction, water supply, and healthcare facilities.",
  },
  {
    title: "Agriculture",
    category: "Economy",
    date: "July 22, 2026",
    excerpt: "New agricultural initiatives announced to support farmers with modern techniques, irrigation systems, and improved market access.",
  },
  {
    title: "Education",
    category: "Social",
    date: "July 20, 2026",
    excerpt: "Education sector reforms introduced to improve access to quality education and enhance teacher training programs across the region.",
  },
  {
    title: "Health",
    category: "Social",
    date: "July 18, 2026",
    excerpt: "Healthcare expansion program launched to construct and renovate health centers, aiming to improve access to medical services.",
  },
  {
    title: "Investment",
    category: "Economy",
    date: "July 15, 2026",
    excerpt: "Regional government announces new investment incentives to attract businesses and stimulate economic growth across the state.",
  },
];

const categoryColors: Record<string, string> = {
  Governance: "bg-blue-100 text-blue-700",
  Infrastructure: "bg-green-100 text-green-700",
  Economy: "bg-amber-100 text-amber-700",
  Social: "bg-purple-100 text-purple-700",
};

export default function LatestNews() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.home.latestNews}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">
            {t.home.latestNewsDesc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[item.category] || "bg-zinc-100 text-zinc-700"}`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
