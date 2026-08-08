import type { Metadata } from "next";
import { SITE, SITE_KEYWORDS } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Reduce Image & Signature Size Online Free (KB) India`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Reduce image size & reduce signature size online free in KB for SSC, UPSC, NEET, JEE, Railway, IBPS forms. Compress photo to 20KB/50KB, signature to 10KB–20KB. Private browser tool — SizeToKB.in",
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: SITE.url,
    languages: { "en-IN": SITE.url },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Reduce image & signature size to exact KB`,
    description:
      "Free tool to reduce photo size (20–50KB) and signature size (10–20KB) for Indian exam form uploads.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Reduce Image & Signature Size`,
    description: "Reduce photo & signature size in KB online free for SSC, UPSC, Bank & more.",
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
      siteName: SITE.name,
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
