import type { Metadata } from "next";
import Link from "next/link";
import { getT } from "@sevp/ui/server";
import { categoryLabel, getPosts } from "../../lib/cms-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "In-depth articles, perspectives, and stories from across the South Ethiopia Regional State.",
};

const badgeStyles: Record<string, string> = {
  Announcements: "bg-green-100 text-green-700",
  "Press Releases": "bg-blue-100 text-blue-700",
  "Success Stories": "bg-amber-100 text-amber-700",
  "Public Notices": "bg-purple-100 text-purple-700",
};

export default async function BlogPage() {
  const t = await getT();
  const posts = await getPosts();

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.blog.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.blog.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.blog.latestPosts}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          {posts.length === 0 ? (
            <p className="mt-8 text-muted-foreground">{t.blog.empty}</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[categoryLabel(post.category)] || "bg-zinc-100 text-zinc-700"}`}>
                      {categoryLabel(post.category)}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    {t.blog.readMore}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
