import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getT } from "@sevp/ui/server";
import {
  categoryLabel,
  getPosts,
  getSettings,
  postHref,
  postImageUrl,
} from "../../lib/cms-data";

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
  const settings = await getSettings();
  const posts = await getPosts(settings?.postsPerPage ?? 9);

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
              {posts.map((post) => {
                const imageUrl = postImageUrl(post, settings);
                return (
                  <Link
                    key={post.id}
                    href={postHref(post, settings)}
                    className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] w-full bg-muted">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                        <svg className="h-10 w-10 text-primary/40" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[categoryLabel(post.category)] || "bg-zinc-100 text-zinc-700"}`}>
                          {categoryLabel(post.category)}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                        {t.blog.readMore}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
