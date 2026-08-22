import type { Metadata } from "next";
import { SITE, SITE_KEYWORDS } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Reduce KB Online Free · Exam Photo & Signature Size | ${SITE.seoName}`,
    template: `%s | ${SITE.seoName}`,
  },
  description:
    "Reduce KB online free — compress exam photo & signature to exact KB (20/50/100/200). PDF to JPG, unlock PDF. For SSC, Railway, UPSSSC, IBPS & more — Size to KB",
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
    title: `Reduce KB · Exam Photo & Signature Size | ${SITE.seoName}`,
    description:
      "Reduce KB online free. Compress photo to 20–50KB, signature to 10–20KB. PDF to JPG & unlock PDF — free in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Reduce KB Online Free · Exact Size Tools | ${SITE.seoName}`,
    description:
      "Reduce KB for exam forms — photo, signature, PDF to JPG. Free browser tools — Size to KB",
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
