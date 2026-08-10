import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Disclaimer — Size to KB",
  description:
    "Disclaimer for Size to KB — always verify official SSC, UPSC, NEET, IBPS photo and signature size requirements before submitting forms.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updated="8 August 2026">
      <p>
        The information and tools on {SITE.name} ({SITE.domain}) are for general guidance only.
      </p>

      <h2>Not an official exam body</h2>
      <p>
        SizeToKB is an independent free utility. We are <strong>not</strong> affiliated with SSC,
        UPSC, NTA, IBPS, RRB, state PSCs, banks, or any recruiting organisation. Official
        notifications always override any sizes shown here.
      </p>

      <h2>Verify before you submit</h2>
      <p>
        Photo size (e.g. 20KB–50KB), signature size (e.g. 10KB–20KB), dimensions (cm/px), and
        format (JPG/JPEG) can change every recruitment cycle. Always cross-check the latest PDF
        notification and the live application portal before uploading.
      </p>

      <h2>No guarantee of acceptance</h2>
      <p>
        A file that meets the KB range on SizeToKB may still be rejected due to portal-side
        validation, crop rules, live photo capture, background colour, face detection, or other
        checks outside our control.
      </p>

      <h2>Technical limitations</h2>
      <p>
        Compression quality depends on your source image. Extremely small, blurry, or already
        heavily compressed photos may not land inside a portal&apos;s min–max KB window.
      </p>

      <h2>External links</h2>
      <p>
        Links to third-party sites (if any) are for convenience. We are not responsible for their
        content or policies.
      </p>

      <h2>Read more</h2>
      <p>
        <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
        <Link href="/terms-of-service">Terms of Service</Link> ·{" "}
        <Link href="/contact-us">Contact Us</Link>
      </p>
    </LegalLayout>
  );
}
