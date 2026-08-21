import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "फोटो साइझ कसा कमी करायचा — 20KB 50KB 100KB Online Free",
  description:
    "Photo size kami kara? मराठी गाइड — फोटो 20KB, 50KB, 100KB मध्ये compress करा. सही 10–20KB. Size to KB मोफत टूल.",
  path: "/marathi/photo-size-kami-kara/",
  keywords: [
    "photo size kami kara",
    "फोटो साइझ कमी करा",
    "20kb 50kb photo marathi",
    "signature size kami kara",
  ],
});

export default function MarathiPhotoSizeGuidePage() {
  return (
    <LegalLayout title="फोटो साइझ कसा कमी करायचा (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size kami kara</strong> — Size to KB मोफत टूलने फोटो exact{" "}
        <strong>20KB, 50KB किंवा 100KB</strong> पर्यंत compress करा. प्रोसेसिंग ब्राउझरमध्ये;
        आम्ही फाइल सेव्ह करत नाही.
      </p>
      <h2>सर्वात जलद पद्धत</h2>
      <ol>
        <li>
          <Link href="/marathi/compress-to-50kb/">50KB tool</Link> उघडा (SSC/Bank साठी सामान्य).
        </li>
        <li>फोटो निवडा → crop → compress → <strong>Free Download</strong>.</li>
        <li>
          फॉर्ममध्ये JPG अपलोड करा. नाकारले तर{" "}
          <Link href="/upload-fixer/">Upload Error Fixer</Link> पहा.
        </li>
      </ol>
      <h2>अधिक लिंक</h2>
      <ul>
        <li>
          <Link href="/marathi/">मराठी होम</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">20KB</Link> ·{" "}
          <Link href="/compress-to-100kb/">100KB</Link>
        </li>
        <li>
          <Link href="/signature-cleaner/">सही cleaner / KB</Link>
        </li>
        <li>
          <Link href="/hindi/">हिंदी</Link> · <Link href="/tamil/">தமிழ்</Link> ·{" "}
          <Link href="/kannada/">ಕನ್ನಡ</Link> · <Link href="/">English</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
