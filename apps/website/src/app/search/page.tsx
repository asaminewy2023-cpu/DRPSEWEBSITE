import type { Metadata } from "next";
import Link from "next/link";
import { SearchForm } from "../../components/SearchForm";
import { getT } from "@sevp/ui/server";
import { searchCms } from "@/lib/cms-data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across the South Ethiopia Regional State website.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const t = await getT();
  const { q } = await searchParams;
  const term = (q ?? "").trim();
  const results = term ? await searchCms(term) : [];

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
          <SearchForm initialQuery={term} />

          <div className="mt-12">
            {!term ? (
              <p className="text-center text-muted-foreground">
                {t.search.enterTerm}
              </p>
            ) : results.length === 0 ? (
              <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
                {t.search.noResults}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">{t.search.searchResults}</h2>
                  <span className="text-sm text-muted-foreground">{results.length} {t.search.results}</span>
                </div>
                <div className="divide-y divide-border rounded-xl border border-border">
                  {results.map((r) => (
                    <Link
                      key={r.type + r.href}
                      href={r.href}
                      className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.type}</p>
                        {r.excerpt ? (
                          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                            {r.excerpt}
                          </p>
                        ) : null}
                      </div>
                      <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}