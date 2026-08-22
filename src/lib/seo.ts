import type { Metadata } from "next";
import { SITE, SITE_KEYWORDS } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Brand-first so “size to kb” / sizetokb navigational searches match the homepage.
    default: `Size to KB (sizetokb.in) — Free Exam Photo & Signature Resizer`,
    template: `%s | ${SITE.seoName}`,
  },
  description:
    "Size to KB (sizetokb.in) — free exam photo & signature tools. Compress to exact KB (20/50/100/200), PDF to JPG, unlock PDF. Official site for SizeToKB.",
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE.seoName, url: SITE.url }],
  creator: SITE.seoName,
  publisher: SITE.seoName,
  alternates: {
    canonical: SITE.url,
    languages: { "en-IN": SITE.url },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.seoName,
    title: `Size to KB (sizetokb.in) — Free Exam Photo & Signature Resizer`,
    description:
      "Official Size to KB site. Compress photo to 20–50KB, signature to 10–20KB. PDF to JPG & unlock PDF — free in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Size to KB (sizetokb.in) — Exact KB Tools`,
    description:
      "Official Size to KB / sizetokb.in — exam photo, signature & PDF tools. Free in your browser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "utilities",
};

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords ?? [...SITE_KEYWORDS],
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.seoName,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
