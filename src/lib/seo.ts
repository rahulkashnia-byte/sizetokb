import type { Metadata } from "next";
import { SITE, SITE_KEYWORDS } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Reduce Image Size to KB · PDF to JPG, Merge & Unlock PDF | ${SITE.seoName}`,
    template: `%s | ${SITE.seoName}`,
  },
  description:
    "Free online tools: reduce image & signature size to exact KB, PDF to JPG, JPG to PDF, merge PDF, compress PDF, unlock PDF password, PDF to Word. Private browser tools for SSC, UPSC, Bank & more — Size to KB",
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
    title: `Reduce image size to KB · PDF to JPG & Unlock PDF | ${SITE.seoName}`,
    description:
      "Compress photo to 20–50KB, signature to 10–20KB. Convert PDF to JPG, merge/compress PDF, remove PDF password — free in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Reduce Image Size to KB · PDF Tools | ${SITE.seoName}`,
    description:
      "PDF to JPG, unlock PDF, merge PDF, compress PDF + exact-KB photo/signature tools. Free — Size to KB",
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
