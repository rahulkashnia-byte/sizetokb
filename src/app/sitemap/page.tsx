import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { EXAMS } from "@/lib/exams";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sitemap — All Exam Photo Resizers & Tools | SizeToKB",
  description:
    "Complete sitemap of SizeToKB.in — exam photo resizers, image compressor KB tools, PDF tools, and legal pages for Indian aspirants.",
  path: "/sitemap",
  keywords: [
    "SizeToKB sitemap",
    "SSC photo resizer list",
    "exam photo size tools India",
    "compress image to KB",
  ],
});

const TOOLS = [
  { href: "/", label: "Exam Photo & Signature Resizer (Home)" },
  { href: "/image-resizer", label: "Image Resizer — exact KB & dimensions" },
  { href: "/custom", label: "Custom Requirements Resizer" },
  { href: "/passport-photo", label: "Passport Size Photo Maker" },
  { href: "/signature-cleaner", label: "Signature Cleaner" },
  { href: "/exam-pack", label: "Exam Photo + Signature ZIP Pack" },
  { href: "/white-background", label: "White Background Photo" },
  { href: "/heic-to-jpg", label: "HEIC to JPG" },
  { href: "/image-convert", label: "JPG / PNG / WebP Converter" },
  { href: "/color-bw", label: "Color to Black & White" },
  { href: "/image-checker", label: "Image DPI & Pixel Checker" },
  { href: "/id-masker", label: "Aadhaar / ID Masker" },
  { href: "/image-to-pdf", label: "Image to PDF Converter" },
  { href: "/pdf-compressor", label: "PDF Compressor Online" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-split", label: "Split PDF" },
  { href: "/image-merger", label: "Image Merger" },
  { href: "/image-cropper", label: "Image Cropper" },
  { href: "/image-reverse", label: "Image Flip / Rotate" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/word-to-pdf", label: "Word to PDF" },
];

const LEGAL = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
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
            <Link href={t.href}>{t.label}</Link>
          </li>
        ))}
      </ul>

      <h2>Company & legal</h2>
      <ul>
        {LEGAL.map((t) => (
          <li key={t.href}>
            <Link href={t.href}>{t.label}</Link>
          </li>
        ))}
      </ul>

      <h2>All exam photo & signature resizers ({sorted.length})</h2>
      <ul className="columns-1 gap-x-8 sm:columns-2">
        {sorted.map((e) => (
          <li key={e.slug} className="break-inside-avoid">
            <Link href={`/${e.slug}`}>
              {e.name} photo size & signature resize
            </Link>
          </li>
        ))}
      </ul>
    </LegalLayout>
  );
}
