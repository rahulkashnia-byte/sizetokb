import { EXAMS } from "@/lib/exams";
import { SITE } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/image-resizer",
    "/custom",
    "/image-to-pdf",
    "/pdf-compressor",
    "/image-merger",
    "/image-cropper",
    "/image-reverse",
    "/pdf-to-word",
    "/word-to-pdf",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-of-service",
    "/disclaimer",
    "/sitemap",
  ].map((path) => ({
    url: `${SITE.url}${path === "" ? "/" : path.endsWith("/") ? path : `${path}/`}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.includes("image") || path === "/custom" || path === "/pdf-compressor" ? 0.9 : 0.5,
  }));

  const exams: MetadataRoute.Sitemap = EXAMS.map((e) => ({
    url: `${SITE.url}/${e.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...exams];
}
