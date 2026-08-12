import { cmsFetch, cmsList } from "@sevp/shared";
import type {
  Announcement,
  GalleryItem,
  NewsCategory,
  Page,
  Post,
  Program,
  PublicNotice,
  Short,
  SiteSetting,
  SuccessStory,
} from "@sevp/shared";

export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    return await cmsFetch<SiteSetting>("/api/globals/site-settings");
  } catch {
    return null;
  }
}

export async function getPages(): Promise<Page[]> {
  try {
    return await cmsList<Page>("pages", {
      where: { published: { equals: true } },
      sort: "createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const pages = await cmsList<Page>("pages", {
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await cmsList<Post>("posts", {
      where: { published: { equals: true } },
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await cmsList<Post>("posts", {
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(
  category: Post["category"],
  excludeId: number,
): Promise<Post[]> {
  const categoryId =
    typeof category === "object" && category !== null
      ? category.id
      : category;
  try {
    return await cmsList<Post>("posts", {
      where: {
        published: { equals: true },
        category: { equals: categoryId },
        id: { not_equals: excludeId },
      },
      sort: "-createdAt",
      limit: 3,
    });
  } catch {
    return [];
  }
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

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    return await cmsList<Announcement>("announcements", {
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getPublicNotices(): Promise<PublicNotice[]> {
  try {
    return await cmsList<PublicNotice>("public-notices", {
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getPublicNoticeById(
  id: number,
): Promise<PublicNotice | null> {
  try {
    return await cmsFetch<PublicNotice>(`/api/public-notices/${id}`);
  } catch {
    return null;
  }
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    return await cmsList<SuccessStory>("success-stories", {
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getSuccessStoryById(
  id: number,
): Promise<SuccessStory | null> {
  try {
    return await cmsFetch<SuccessStory>(`/api/success-stories/${id}`);
  } catch {
    return null;
  }
}

export async function getAnnouncementById(
  id: number,
): Promise<Announcement | null> {
  try {
    return await cmsFetch<Announcement>(`/api/announcements/${id}`);
  } catch {
    return null;
  }
}

export async function getPrograms(): Promise<Program[]> {
  try {
    return await cmsList<Program>("programs", {
      sort: "sortOrder",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    return await cmsList<GalleryItem>("gallery-items", {
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export async function getShorts(): Promise<Short[]> {
  try {
    return await cmsList<Short>("shorts", {
      where: { published: { equals: true } },
      sort: "-createdAt",
      limit: 0,
    });
  } catch {
    return [];
  }
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
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
      return { success: false, error: `Request failed (${res.status})` };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message." };
  }
}