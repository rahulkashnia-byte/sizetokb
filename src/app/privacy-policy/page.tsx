import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy — SizeToKB",
  description:
    "Privacy Policy for SizeToKB.in — free photo resize and signature compress tools. We process images in your browser and do not store your files.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="8 August 2026">
      <p>
        SizeToKB (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates{" "}
        <Link href="/">{SITE.domain}</Link> (and related domains such as {SITE.altDomain}). This
        Privacy Policy explains how we handle information when you use our free online photo
        resize, signature resize, image compressor, PDF compressor, and image-to-PDF tools.
      </p>

      <h2>1. Images & documents you process</h2>
      <p>
        Our core tools (exam photo resizer, custom KB resize, image to PDF, PDF compressor) are
        designed to run <strong>in your browser</strong>. Photos, signatures, and PDFs you select
        are processed on your device using client-side technology. We do not upload your exam
        photos or signatures to our servers for resizing, and we do not store those files.
      </p>

      <h2>2. Information we may collect</h2>
      <ul>
        <li>
          <strong>Usage data:</strong> anonymous analytics (e.g. page views, device type, rough
          location/country) if analytics scripts are enabled, to improve SEO and product quality.
        </li>
        <li>
          <strong>Contact emails:</strong> if you email {SITE.email}, we receive the content you
          send so we can reply.
        </li>
        <li>
          <strong>Technical logs:</strong> standard web-server logs (IP, user agent, URL) may be
          collected by our hosting provider for security and uptime.
        </li>
      </ul>

      <h2>3. Cookies</h2>
      <p>
        We may use essential cookies for site function and optional analytics cookies. You can
        block cookies in your browser settings.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        Hosting, CDN, analytics, or advertising partners (if added later) may process limited
        technical data under their own policies. We will only enable partners that help deliver
        SizeToKB safely and quickly in India and worldwide.
      </p>

      <h2>5. Data retention</h2>
      <p>
        Because exam images are processed locally, we have no copy to retain. Contact emails are
        kept only as long as needed to support you.
      </p>

      <h2>6. Children</h2>
      <p>
        SizeToKB is a utility for exam applicants and general users. We do not knowingly collect
        personal information from children under 13.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on your location, you may request access, correction, or deletion of personal
        data we hold (such as email correspondence). Contact{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this policy. The &quot;Last updated&quot; date at the top will change when we
        do.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit{" "}
        <Link href="/contact-us">Contact Us</Link>.
      </p>
    </LegalLayout>
  );
}
