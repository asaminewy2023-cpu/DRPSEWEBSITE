import type { MetadataRoute } from "next";
import { CMS_BASE_URL } from "@sevp/shared";
import { getPosts } from "@/lib/cms-data";

const base = (() => {
  try {
    return new URL(CMS_BASE_URL).origin;
  } catch {
    return "http://localhost:3001";
  }
})();

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/cluster",
  "/projects",
  "/programs",
  "/news",
  "/blog",
  "/documents",
  "/media",
  "/gallery",
  "/public-services",
  "/contact",
  "/announcements",
  "/public-notices",
  "/press-releases",
  "/success-stories",
  "/search",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(0);

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}