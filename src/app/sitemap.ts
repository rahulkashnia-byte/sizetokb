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
    "/pdf-editor",
    "/pdf-merge",
    "/pdf-split",
    "/image-merger",
    "/image-cropper",
    "/image-reverse",
    "/pdf-to-word",
    "/word-to-pdf",
    "/pdf-to-jpg",
    "/pdf-unlock",
    "/passport-photo",
    "/white-background",
    "/signature-cleaner",
    "/exam-pack",
    "/heic-to-jpg",
    "/image-convert",
    "/color-bw",
    "/image-checker",
    "/id-masker",
    "/bulk-reduce",
    "/form-wizard",
    "/upload-fixer",
    "/pan-photo",
    "/aadhaar-photo",
    "/thumb-impression",
    "/marksheet-pdf",
    "/pdf-organize",
    "/watermark",
    "/photo-guide",
    "/size-kam-kaise-kare",
    "/signature-size-kam-kaise-kare",
    "/pdf-size-kam-kaise-kare",
    "/compress-to-10kb",
    "/compress-to-20kb",
    "/compress-to-50kb",
    "/compress-to-100kb",
    "/compress-to-200kb",
    "/compress-to-500kb",
    "/min-kb-padder",
    "/photo-name-date",
    "/age-calculator",
    "/biodata",
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
    priority:
      path === ""
        ? 1
        : path.includes("image") ||
            path === "/custom" ||
            path === "/pdf-compressor" ||
            path === "/passport-photo" ||
            path === "/signature-cleaner" ||
            path === "/bulk-reduce" ||
            path === "/form-wizard" ||
            path === "/upload-fixer" ||
            path === "/marksheet-pdf" ||
            path === "/size-kam-kaise-kare" ||
            path === "/pdf-to-jpg" ||
            path === "/pdf-unlock" ||
            path === "/image-to-pdf" ||
            path === "/pdf-merge" ||
            path === "/pdf-to-word" ||
            path === "/word-to-pdf" ||
            path === "/compress-to-10kb" ||
            path === "/compress-to-20kb" ||
            path === "/compress-to-50kb" ||
            path === "/compress-to-100kb" ||
            path === "/compress-to-200kb" ||
            path === "/compress-to-500kb" ||
            path === "/min-kb-padder" ||
            path === "/photo-name-date" ||
            path === "/age-calculator" ||
            path === "/biodata" ||
            path === "/signature-size-kam-kaise-kare" ||
            path === "/pdf-size-kam-kaise-kare"
          ? 0.9
          : 0.5,
  }));

  const exams: MetadataRoute.Sitemap = EXAMS.map((e) => ({
    url: `${SITE.url}/${e.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...exams];
}
