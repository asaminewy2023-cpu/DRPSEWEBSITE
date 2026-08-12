import type { Metadata } from "next";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, announcements, and updates from the South Ethiopia Regional State.",
};

const categoryStyles = [
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.502.502 0 01-.774-.315 12.521 12.521 0 01-.908-3.598m0-9.18a12.53 12.53 0 01.908-3.598.502.502 0 01.774-.315l.657.38c.523.301.71.961.463 1.511a12.62 12.62 0 00-.985 2.783m0 0h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: "from-green-600 to-green-800",
    badge: "bg-green-100 text-green-700",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
    color: "from-blue-600 to-blue-800",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: "from-amber-600 to-amber-800",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    color: "from-purple-600 to-purple-800",
    badge: "bg-purple-100 text-purple-700",
  },
];

export default async function NewsPage() {
  const t = await getT();
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.news.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.news.subtitle}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.news.categories}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.news.categoriesList.map((cat, i) => (
              <div key={cat.title} className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className={`bg-gradient-to-r ${categoryStyles[i].color} px-6 py-5`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-white">
                    {categoryStyles[i].icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{cat.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                  <p className="mt-3 text-xs font-medium text-primary">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.news.latestArticles}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.news.articles.map((article) => (
              <div key={article.title} className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[article.category].badge}`}>
                    {t.news.categoriesList[article.category].title}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{article.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
