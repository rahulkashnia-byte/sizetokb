import { SITE } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Alternate names people type for brand search (“size to kb”, sizetokb, etc.). */
const BRAND_ALTERNATE_NAMES = [
  "SizeToKB",
  "sizetokb",
  "sizetokb.in",
  "sizetokb.com",
  "Size to KB online",
  "size to kb",
] as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.seoName,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    email: SITE.email,
    description:
      "Size to KB (sizetokb.in) is a free exam photo and signature compressor for Indian form uploads.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.seoName,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE.seoName,
      url: SITE.url,
    },
  };
}

export function webAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE.seoName,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: SITE.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: SITE.tagline,
    inLanguage: "en-IN",
    browserRequirements: "Requires JavaScript",
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
