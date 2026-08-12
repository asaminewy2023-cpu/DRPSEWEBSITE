import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getT } from "@sevp/ui/server";
import { categoryLabel, getPostBySlug, getRelatedPosts } from "../../../lib/cms-data";
import { BlocksRenderer } from "../../../components/BlocksRenderer";
import { RichText } from "../../../components/RichText";

const badgeStyles: Record<string, string> = {
  Announcements: "bg-green-100 text-green-700",
  "Press Releases": "bg-blue-100 text-blue-700",
  "Success Stories": "bg-amber-100 text-amber-700",
  "Public Notices": "bg-purple-100 text-purple-700",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post?.published ? post.title : "Blog",
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getT();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const related = await getRelatedPosts(post.category, post.id);

  const badge = badgeStyles[categoryLabel(post.category)] || "bg-zinc-100 text-zinc-700";

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.blog.backToBlog}
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge}`}>
              {categoryLabel(post.category)}
            </span>
            <span>
              {t.blog.publishedOn} {post.date}
            </span>
            <span className="text-zinc-400">
              {t.blog.by} {post.author}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{post.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.blocks && post.blocks.length > 0 ? (
            <BlocksRenderer owner={post} className="space-y-4" />
          ) : (
            <RichText data={post.content} />
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-muted py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">{t.blog.relatedPosts}</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[categoryLabel(p.category)] || "bg-zinc-100 text-zinc-700"}`}>
                      {categoryLabel(p.category)}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    {t.blog.readMore}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
