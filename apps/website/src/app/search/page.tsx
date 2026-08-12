import type { Metadata } from "next";
import { SearchForm } from "../../components/SearchForm";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across the South Ethiopia Regional State website.",
};

export default async function SearchPage() {
  const t = await getT();
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.search.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.search.placeholder}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SearchForm />

          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">{t.search.searchResults}</h2>
              <span className="text-sm text-muted-foreground">{t.search.sampleResults.length * 2} {t.search.results}</span>
            </div>

            {[0, 1].map((section) => (
              <div key={section} className="divide-y divide-border rounded-xl border border-border">
                {t.search.sampleResults.map((r) => (
                  <a key={r.title + section} href={section === 0 ? "/announcements/1" : "/projects"} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.type}</p>
                    </div>
                    <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
