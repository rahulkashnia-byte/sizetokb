import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us — SizeToKB",
  description:
    "About SizeToKB.in — free photo resize to KB, signature compressor, and exam form document tools built for Indian aspirants.",
  path: "/about-us",
  keywords: [
    "about SizeToKB",
    "photo resize online India",
    "exam photo resizer",
    "compress image to KB free",
  ],
});

export default function AboutPage() {
  return (
    <LegalLayout title="About SizeToKB" updated="8 August 2026">
      <p>
        <strong>{SITE.name}</strong> ({SITE.domain} / {SITE.altDomain}) helps students and job
        aspirants across India resize photos and signatures to the exact kilobyte (KB) limits
        required by online application portals.
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

      <h2>Contact</h2>
      <p>
        Reach us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or the{" "}
        <Link href="/contact-us">Contact Us</Link> page. For legal notes see our{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    </LegalLayout>
  );
}
