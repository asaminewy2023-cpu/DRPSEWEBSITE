import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getT } from "@sevp/ui/server";
import {
  authorName,
  categoryLabel,
  getPostBySlug,
  getPostComments,
  getRelatedPosts,
  getSettings,
  postHeroImageUrl,
  postHref,
  postImageUrl,
} from "../../../lib/cms-data";
import { BlocksRenderer } from "../../../components/BlocksRenderer";
import { RichText } from "../../../components/RichText";
import { CommentSection } from "../../../components/CommentSection";

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
    title: post?.status === "publish" ? post.title : "Blog",
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getT();
  const settings = await getSettings();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "publish") {
    notFound();
  }

  const related = await getRelatedPosts(post.category, post.id);

  const commentsOpen = post.commentStatus === "open";
  const comments = commentsOpen ? await getPostComments(post.id) : [];

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
              {t.blog.publishedOn}
            </span>
            <span className="text-zinc-400">
              {t.blog.by} {authorName(post)}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{post.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {(() => {
            const imageUrl = postHeroImageUrl(post);
            const body = (
              <>
                {post.blocks && post.blocks.length > 0 ? (
                  <BlocksRenderer owner={post} className="space-y-4" />
                ) : (
                  <RichText data={post.content} />
                )}
              </>
            );

            if (!imageUrl) {
              return <div className="mx-auto max-w-3xl">{body}</div>;
            }

            return (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative overflow-hidden rounded-2xl lg:sticky lg:top-8 lg:self-start">
                  <div className="relative aspect-[4/3] w-full bg-muted sm:aspect-[16/9] lg:aspect-[4/3]">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="mx-auto max-w-3xl">{body}</div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {commentsOpen && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <CommentSection postId={post.id} comments={comments} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && settings?.showRelatedPosts !== false && (
        <section className="bg-muted py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">{t.blog.relatedPosts}</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => {
                const imageUrl = postImageUrl(p, settings);
                return (
                  <Link
                    key={p.id}
                    href={postHref(p, settings)}
                    className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] w-full bg-muted">
                        <Image
                          src={imageUrl}
                          alt={p.title}
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
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[categoryLabel(p.category)] || "bg-zinc-100 text-zinc-700"}`}>
                          {categoryLabel(p.category)}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
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
          </div>
        </section>
      )}
    </div>
  );
}
