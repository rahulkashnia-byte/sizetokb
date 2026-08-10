import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us — Size to KB",
  description:
    "Contact Size to KB support for photo resize, signature compress, exam form KB issues, and feedback.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <LegalLayout title="Contact Us">
      <p>
        Need help with photo resize to KB, signature compression, or an exam profile on SizeToKB?
        We are happy to hear from aspirants across India.
      </p>

      <h2>Email</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>Typical topics we can help with:</p>
      <ul>
        <li>Request a new exam photo/signature profile</li>
        <li>Report incorrect KB or dimension specs</li>
        <li>Tool bugs (mobile upload, HEIC, download)</li>
        <li>Partnership or SEO / content queries</li>
      </ul>

      <h2>Website</h2>
      <p>
        <Link href="/">{SITE.url}</Link>
        <br />
        Also: https://{SITE.altDomain}
      </p>

      <h2>Before you write</h2>
      <p>
        For rejected form uploads, attach (1) the official notification screenshot of size rules
        and (2) your output file size in KB — that helps us fix profiles faster. Always re-check
        our <Link href="/disclaimer">Disclaimer</Link> about official sources.
      </p>
    </LegalLayout>
  );
}
