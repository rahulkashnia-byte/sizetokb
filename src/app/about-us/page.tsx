import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Size to KB (sizetokb.in) — Official Site",
  description:
    "About Size to KB — the official free exam photo & signature compressor at sizetokb.in (also sizetokb.com). Built for Indian form uploads.",
  path: "/about-us",
  keywords: [
    "about Size to KB",
    "size to kb",
    "sizetokb.in",
    "sizetokb",
    "photo resize online India",
    "exam photo resizer",
    "compress image to KB free",
  ],
});

export default function AboutPage() {
  return (
    <LegalLayout title="About Size to KB" updated="22 August 2026">
      <p>
        <strong>Size to KB</strong> ({SITE.name}) is the official free website at{" "}
        <strong>{SITE.domain}</strong> (also {SITE.altDomain}). We help students and job aspirants
        across India resize photos and signatures to the exact kilobyte (KB) limits required by
        online application portals.
      </p>
      <p>
        If you searched “size to kb” or “sizetokb”, this is the site: compress exam photos and
        signatures privately in your browser — no signup.
      </p>

      <h2>What we built</h2>
      <p>
        Filling SSC, UPSC, NEET, JEE, Railway, IBPS, SBI, and state PSC forms often fails because a
        photo is 52KB instead of 50KB, or a signature is outside 10KB–20KB. SizeToKB gives you:
      </p>
      <ul>
        <li>Pre-set exam profiles for 190+ recruitments</li>
        <li>Custom resize to any min–max KB with optional cm/px dimensions</li>
        <li>Image to PDF and PDF compressor utilities</li>
        <li>On-device processing for privacy — no signup required</li>
      </ul>

      <h2>Our principle</h2>
      <p>
        One job, done right: <em>size to KB</em> accurately enough for form upload, while keeping
        your documents on your phone or laptop.
      </p>

      <h2>Related: government jobs &amp; exam updates</h2>
      <p>
        For vacancies, important dates, results and admit cards, we partner with{" "}
        <strong>SarkariSuchi</strong> (
        <a href="https://sarkarisuchi.com" target="_blank" rel="noopener noreferrer">
          sarkarisuchi.com
        </a>
        ) — clearer summaries of public recruitment notices with official apply links. Resize your
        photo here, then check the notice details there.
      </p>

      <h2>Contact</h2>
      <p>
        Reach us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or the{" "}
        <Link href="/contact-us">Contact Us</Link> page. For legal notes see our{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    </LegalLayout>
  );
}
