"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@sevp/ui";
import { trackSearch } from "@/lib/analytics";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [advanced, setAdvanced] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const { t } = useLanguage();
  const router = useRouter();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    trackSearch(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <form
      onSubmit={submitSearch}
      className="rounded-2xl border border-border bg-muted p-6 sm:p-8"
    >
      <div className="space-y-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full rounded-xl border border-border bg-white py-3.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setAdvanced(!advanced)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {advanced ? t.search.hideAdvanced : t.search.advanced}
          </button>
          <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90">
            {t.nav.search}
          </button>
        </div>

        {advanced && (
          <div className="grid gap-4 pt-4 border-t border-border sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">{t.search.category}</label>
              <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="">{t.search.allCategories}</option>
                <option value="announcements">Announcements</option>
                <option value="projects">Projects</option>
                <option value="documents">Documents</option>
                <option value="news">News</option>
                <option value="programs">Programs</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">{t.search.dateFrom}</label>
              <input type="date" className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">{t.search.dateTo}</label>
              <input type="date" className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
