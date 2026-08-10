import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service — Size to KB",
  description:
    "Terms of Service for Size to KB free online image compressor, photo resize to KB, and exam form document tools.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="8 August 2026">
      <p>
        By using {SITE.name} at <Link href="/">{SITE.url}</Link>, you agree to these Terms of
        Service. If you do not agree, please do not use the site.
      </p>

      <h2>1. Service description</h2>
      <p>
        SizeToKB provides free browser-based utilities to resize and compress photos and
        signatures to target KB sizes, convert images to PDF, and compress PDFs—primarily for
        Indian government and entrance exam form uploads (SSC, UPSC, NEET, JEE, Railway, Bank,
        etc.).
      </p>

      <h2>2. No registration</h2>
      <p>Most tools work without creating an account. Access may be rate-limited to prevent abuse.</p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>Use the tools only for lawful purposes.</li>
        <li>Do not attempt to disrupt, scrape aggressively, or overload the service.</li>
        <li>Do not upload illegal content.</li>
      </ul>

      <h2>4. Accuracy of exam specifications</h2>
      <p>
        Exam photo and signature requirements change with official notifications. Profiles on
        SizeToKB are provided for convenience. <strong>You are responsible</strong> for verifying
        dimensions, file size (KB), and format against the latest official exam notice before
        submitting any application.
      </p>

      <h2>5. No warranty</h2>
      <p>
        Tools are provided &quot;as is&quot; without warranties of any kind. We do not guarantee
        that a resized file will be accepted by every exam portal, that compression will always
        hit an exact KB target on every source image, or that the site will be uninterrupted.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, SizeToKB and its operators are not liable for
        rejected applications, missed deadlines, data loss on your device, or any indirect or
        consequential damages arising from use of the site.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        Site design, branding, and original content belong to SizeToKB. You retain rights to
        images you process; we do not claim ownership of your photos or signatures.
      </p>

      <h2>8. Changes</h2>
      <p>We may modify these terms or the service at any time. Continued use means acceptance.</p>

      <h2>9. Contact</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <Link href="/contact-us">Contact Us</Link>
      </p>
    </LegalLayout>
  );
}
