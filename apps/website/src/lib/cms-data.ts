import { cmsFetch, cmsList } from "@sevp/shared";
import type {
  Announcement,
  Comment,
  Document,
  Event,
  GalleryItem,
  NewsCategory,
  Page,
  Post,
  PressRelease,
  Program,
  PublicNotice,
  Setting,
  Short,
  SiteSetting,
  SuccessStory,
} from "@sevp/shared";

/** ISR revalidation tiers, in seconds. Override globally via CMS_REVALIDATE_SECONDS. */
const REVALIDATE_FAST = 30; // events, announcements
const REVALIDATE_DEFAULT = 60; // everything else
const REVALIDATE_STATIC = 300; // site settings, pages, programs

/** Log a failed CMS lookup, then hand back a safe fallback. */
function logCmsError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[cms-data] ${context}: ${message}`);
}

/** Fetch a single record; return null instead of crashing on failure. */
async function fetchOrNull<T>(
  context: string,
  path: string,
  options?: Parameters<typeof cmsFetch<T>>[1],
): Promise<T | null> {
  try {
    return await cmsFetch<T>(path, options);
  } catch (error) {
    logCmsError(context, error);
    return null;
  }
}

/** List records; return an empty array instead of crashing on failure. */
async function listOrEmpty<T>(
  context: string,
  slug: string,
  params: Record<string, unknown> = {},
  options?: Parameters<typeof cmsFetch<T>>[1],
): Promise<T[]> {
  try {
    return await cmsList<T>(slug, params, options);
  } catch (error) {
    logCmsError(context, error);
    return [];
  }
}

export function getSiteSettings(): Promise<SiteSetting | null> {
  return fetchOrNull("getSiteSettings", "/api/globals/site-settings", {
    revalidate: REVALIDATE_STATIC,
  });
}

export function getSettings(): Promise<Setting | null> {
  return fetchOrNull("getSettings", "/api/globals/settings", {
    revalidate: REVALIDATE_STATIC,
  });
}

export function getPages(): Promise<Page[]> {
  return listOrEmpty(
    "getPages",
    "pages",
    {
      where: { published: { equals: true } },
      sort: "createdAt",
      limit: 0,
    },
    { revalidate: REVALIDATE_STATIC },
  );
}

export async function getPage(slug: string): Promise<Page | null> {
  const pages = await listOrEmpty<Page>(
    "getPage",
    "pages",
    {
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    },
    { revalidate: REVALIDATE_STATIC },
  );
  return pages[0] ?? null;
}

export function getPosts(limit = 0): Promise<Post[]> {
  return listOrEmpty("getPosts", "posts", {
    where: { status: { equals: "publish" } },
    sort: "-sticky,-createdAt",
    limit,
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await listOrEmpty<Post>("getPostBySlug", "posts", {
    where: { slug: { equals: slug }, status: { equals: "publish" } },
    limit: 1,
  });
  return posts[0] ?? null;
}

export function getRelatedPosts(
  category: Post["category"],
  excludeId: number,
): Promise<Post[]> {
  const categoryId =
    typeof category === "object" && category !== null
      ? category.id
      : category;
  return listOrEmpty("getRelatedPosts", "posts", {
    where: {
      status: { equals: "publish" },
      category: { equals: categoryId },
      id: { not_equals: excludeId },
    },
    sort: "-sticky,-createdAt",
    limit: 3,
  });
}

export function categoryLabel(category: Post["category"]): string {
  if (typeof category === "object" && category !== null) {
    return category.name ?? "";
  }
  return String(category ?? "");
}

export function categorySlug(category: Post["category"]): string {
  if (typeof category === "object" && category !== null) {
    return category.slug ?? "";
  }
  return String(category ?? "");
}

export function authorName(post: Pick<Post, "author">): string {
  const author = post.author;
  if (typeof author === "object" && author !== null) {
    return author.name ?? author.email ?? "";
  }
  return String(author ?? "");
}

export function getAnnouncements(): Promise<Announcement[]> {
  return listOrEmpty(
    "getAnnouncements",
    "announcements",
    {
      sort: "-createdAt",
      limit: 0,
    },
    { revalidate: REVALIDATE_FAST },
  );
}

export function getPublicNotices(): Promise<PublicNotice[]> {
  return listOrEmpty("getPublicNotices", "public-notices", {
    sort: "-createdAt",
    limit: 0,
  });
}

export function getPublicNoticeById(id: number): Promise<PublicNotice | null> {
  return fetchOrNull("getPublicNoticeById", `/api/public-notices/${id}`);
}

export function getSuccessStories(): Promise<SuccessStory[]> {
  return listOrEmpty("getSuccessStories", "success-stories", {
    sort: "-createdAt",
    limit: 0,
  });
}

export function getSuccessStoryById(id: number): Promise<SuccessStory | null> {
  return fetchOrNull("getSuccessStoryById", `/api/success-stories/${id}`);
}

export function getPressReleases(): Promise<PressRelease[]> {
  return listOrEmpty("getPressReleases", "press-releases", {
    sort: "-createdAt",
    limit: 0,
  });
}

export function getPressReleaseById(id: number): Promise<PressRelease | null> {
  return fetchOrNull("getPressReleaseById", `/api/press-releases/${id}`);
}

export function getAnnouncementById(id: number): Promise<Announcement | null> {
  return fetchOrNull("getAnnouncementById", `/api/announcements/${id}`);
}

export function getPrograms(): Promise<Program[]> {
  return listOrEmpty(
    "getPrograms",
    "programs",
    {
      sort: "sortOrder",
      limit: 0,
    },
    { revalidate: REVALIDATE_STATIC },
  );
}

export function getDocuments(category?: string): Promise<Document[]> {
  return listOrEmpty("getDocuments", "documents", {
    where: {
      published: { equals: true },
      ...(category ? { category: { equals: category } } : {}),
    },
    depth: 1,
    sort: "-createdAt",
    limit: 0,
  });
}

export function documentFileUrl(doc: Document): string | null {
  const media = doc.file;
  if (!media || typeof media !== "object" || !media.url) return null;
  const base =
    process.env.CMS_BASE_URL ??
    process.env.NEXT_PUBLIC_CMS_BASE_URL ??
    "http://localhost:3000";
  return media.url.startsWith("http") ? media.url : `${base}${media.url}`;
}

export function postImageUrl(
  post: Post,
  settings?: Pick<Setting, "listImageSize"> | null,
): string | null {
  const media = post.thumbnail;
  if (!media || typeof media === "number") return null;
  const base =
    process.env.CMS_BASE_URL ??
    process.env.NEXT_PUBLIC_CMS_BASE_URL ??
    "http://localhost:3000";
  const size = settings?.listImageSize ?? "card";
  const path =
    size === "original"
      ? media.url
      : size === "thumbnail"
        ? media.sizes?.thumbnail?.url ??
          media.thumbnailURL ??
          media.sizes?.card?.url ??
          media.url
        : media.sizes?.card?.url ??
          media.thumbnailURL ??
          media.sizes?.thumbnail?.url ??
          media.url;
  if (!path) return null;
  return path.startsWith("http") ? path : `${base}${path}`;
}

export function postHeroImageUrl(post: Post): string | null {
  const media = post.thumbnail;
  if (!media || typeof media === "number") return null;
  const base =
    process.env.CMS_BASE_URL ??
    process.env.NEXT_PUBLIC_CMS_BASE_URL ??
    "http://localhost:3000";
  const path =
    media.sizes?.hero?.url ??
    media.url ??
    media.sizes?.card?.url ??
    media.thumbnailURL;
  if (!path) return null;
  return path.startsWith("http") ? path : `${base}${path}`;
}

export function postHref(
  post: Pick<Post, "slug">,
  settings?: Pick<Setting, "postBase" | "useTrailingSlash"> | null,
): string {
  const base = (settings?.postBase ?? "/blog").replace(/\/+$/, "");
  const slug = post.slug.replace(/^\/+/, "");
  const path = `${base}/${slug}`;
  return settings?.useTrailingSlash ? `${path}/` : path;
}

export function getUpcomingEvents(): Promise<Event[]> {
  return listOrEmpty(
    "getUpcomingEvents",
    "events",
    {
      sort: "createdAt",
      limit: 0,
    },
    { revalidate: REVALIDATE_FAST },
  );
}

export function getGalleryItems(): Promise<GalleryItem[]> {
  return listOrEmpty("getGalleryItems", "gallery-items", {
    sort: "-createdAt",
    limit: 0,
  });
}

export function getShorts(): Promise<Short[]> {
  return listOrEmpty("getShorts", "shorts", {
    where: { published: { equals: true } },
    sort: "-createdAt",
    limit: 0,
  });
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SearchResult {
  title: string;
  type: string;
  href: string;
  excerpt?: string;
}

function contains(term: string) {
  return { contains: term };
}

/**
 * Search the CMS across multiple collections for a query term.
 * Results are unified into a flat SearchResult[] with type labels + links.
 */
export async function searchCms(term: string): Promise<SearchResult[]> {
  const q = term.trim();
  if (!q) return [];

  const [, posts, announcements, pressReleases, programs, publicNotices] =
    await Promise.all([
      Promise.resolve(null),
      listOrEmpty<Post>("search posts", "posts", {
        where: {
          status: { equals: "publish" },
          or: [
            { title: contains(q) },
            { excerpt: contains(q) },
          ],
        },
        sort: "-sticky,-createdAt",
        limit: 10,
      }),
      listOrEmpty<Announcement>("search announcements", "announcements", {
        where: {
          or: [{ title: contains(q) }, { excerpt: contains(q) }],
        },
        sort: "-createdAt",
        limit: 10,
      }),
      listOrEmpty<PressRelease>("search press-releases", "press-releases", {
        where: {
          or: [{ title: contains(q) }, { excerpt: contains(q) }],
        },
        sort: "-createdAt",
        limit: 10,
      }),
      listOrEmpty<Program>("search programs", "programs", {
        where: {
          or: [{ title: contains(q) }, { description: contains(q) }],
        },
        sort: "sortOrder",
        limit: 10,
      }),
      listOrEmpty<PublicNotice>("search public-notices", "public-notices", {
        where: {
          or: [{ title: contains(q) }, { excerpt: contains(q) }],
        },
        sort: "-createdAt",
        limit: 10,
      }),
    ]);

  const results: SearchResult[] = [
    ...posts.map((post) => ({
      title: post.title,
      type: "Post",
      href: `/blog/${post.slug}`,
      excerpt: post.excerpt,
    })),
    ...announcements.map((a) => ({
      title: a.title,
      type: "Announcement",
      href: `/announcements/${a.id}`,
      excerpt: a.excerpt,
    })),
    ...pressReleases.map((p) => ({
      title: p.title,
      type: "Press Release",
      href: `/press-releases/${p.id}`,
      excerpt: p.excerpt,
    })),
    ...programs.map((p) => ({
      title: p.title,
      type: "Program",
      href: `/programs`,
      excerpt: p.description,
    })),
    ...publicNotices.map((n) => ({
      title: n.title,
      type: "Public Notice",
      href: `/public-notices/${n.id}`,
      excerpt: n.excerpt,
    })),
  ];

  return results;
}

export async function submitContactMessage(
  data: ContactSubmission,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${process.env.CMS_BASE_URL ?? process.env.NEXT_PUBLIC_CMS_BASE_URL ?? "http://localhost:3000"}/api/contact-messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      logCmsError("submitContactMessage", `HTTP ${res.status}`);
      return { success: false, error: `Request failed (${res.status})` };
    }
    return { success: true };
  } catch (error) {
    logCmsError("submitContactMessage", error);
    return { success: false, error: "Failed to send message." };
  }
}

export async function getPostComments(postId: number): Promise<Comment[]> {
  return listOrEmpty("getPostComments", "comments", {
    where: { post: { equals: postId } },
    depth: 1,
    sort: "createdAt",
  });
}

export async function submitComment(data: {
  post: number;
  name: string;
  email?: string;
  content: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${process.env.CMS_BASE_URL ?? process.env.NEXT_PUBLIC_CMS_BASE_URL ?? "http://localhost:3000"}/api/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      logCmsError("submitComment", `HTTP ${res.status}`);
      return { success: false, error: `Request failed (${res.status})` };
    }
    return { success: true };
  } catch (error) {
    logCmsError("submitComment", error);
    return { success: false, error: "Failed to submit comment." };
  }
}