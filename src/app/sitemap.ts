import type { MetadataRoute } from "next";
import { blogPosts, treatments } from "@/content/site";

const baseUrl = "https://floss-gloss.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/certificates", "/gallery", "/treatments", "/faq", "/blog", "/contact", "/book-visit"];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  entries.push(
    ...treatments.map((treatment) => ({
      url: `${baseUrl}/treatments/${treatment.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T00:00:00.000Z`),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  );

  return entries;
}
