import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { EXAMS } from "@/lib/exams";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { toolsForNav } from "@/lib/toolsCatalog";

export const metadata: Metadata = pageMeta({
  title: "Sitemap — Reduce Image Size Tools & Exam Photo Resizers",
  description:
    "Complete sitemap of Size to KB — reduce image size to KB, reduce signature size, PDF tools, and exam photo resizers for Indian aspirants.",
  path: "/sitemap",
  keywords: [
    "Size to KB sitemap",
    "reduce image size tools",
    "SSC photo resizer list",
    "compress image to KB",
  ],
});

const TOOLS = [
  { href: "/", label: "Home — Reduce image & signature size to KB" },
  ...toolsForNav().map((t) => ({
    href: t.href.replace(/\/$/, ""),
    label: t.seoTitle.replace(/ Online Free.*$/, "").replace(/ —.*$/, "") || t.label,
  })),
];

const LEGAL = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const LANGUAGES = [
  { href: "/hindi/", label: "हिंदी (Hindi)" },
  { href: "/tamil/", label: "தமிழ் (Tamil)" },
  { href: "/marathi/", label: "मराठी (Marathi)" },
  { href: "/kannada/", label: "ಕನ್ನಡ (Kannada)" },
  { href: "/telugu/", label: "తెలుగు (Telugu)" },
];

export default function SitemapPage() {
  const sorted = [...EXAMS].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <LegalLayout title="Sitemap">
      <p>
        Browse every tool and exam photo resizer on {SITE.name}. Use this HTML sitemap for quick
        navigation; search engines also receive our XML sitemap at{" "}
        <a href={`${SITE.url}/sitemap.xml`}>{SITE.url}/sitemap.xml</a>.
      </p>

      <h2>Tools</h2>
      <ul>
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link href={t.href.endsWith("/") || t.href === "/" ? t.href : `${t.href}/`}>{t.label}</Link>
          </li>
        ))}
      </ul>

      <h2>Legal & company</h2>
      <ul>
        {LEGAL.map((t) => (
          <li key={t.href}>
            <Link href={`${t.href}/`}>{t.label}</Link>
          </li>
        ))}
      </ul>

      <h2>Languages</h2>
      <ul>
        {LANGUAGES.map((t) => (
          <li key={t.href}>
            <Link href={t.href}>{t.label}</Link>
          </li>
        ))}
      </ul>

      <h2 id="exams">Exam photo & signature size presets ({sorted.length})</h2>
      <ul className="columns-1 sm:columns-2 md:columns-3">
        {sorted.map((e) => (
          <li key={e.slug}>
            <Link href={`/${e.slug}/`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </LegalLayout>
  );
}
