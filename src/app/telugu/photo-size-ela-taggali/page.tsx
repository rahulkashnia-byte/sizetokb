import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ఫోటో సైజ్ ఎలా తగ్గించాలి — 20KB 50KB 100KB Online Free",
  description:
    "Photo size ela taggali? తెలుగు గైడ్ — ఫోటోను 20KB, 50KB, 100KBకి compress చేయండి. సిగ్నేచర్ 10–20KB. Size to KB ఉచిత టూల్.",
  path: "/telugu/photo-size-ela-taggali/",
  keywords: [
    "photo size ela taggali",
    "ఫోటో సైజ్ ఎలా తగ్గించాలి",
    "20kb 50kb photo telugu",
    "signature size reduce telugu",
  ],
});

export default function TeluguSizeGuidePage() {
  return (
    <LegalLayout title="ఫోటో సైజ్ ఎలా తగ్గించాలి (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size ela taggali</strong> — Size to KB ఉచిత టూల్‌తో ఫోటోను exact{" "}
        <strong>20KB, 50KB లేదా 100KB</strong> వరకు compress చేయండి. ప్రాసెసింగ్ బ్రౌజర్‌లోనే;
        మేము ఫైల్ సేవ్ చేయము.
      </p>
      <h2>అతి వేగమైన మార్గం</h2>
      <ol>
        <li>
          <Link href="/telugu/compress-to-50kb/">50KB tool</Link> తెరవండి (SSC/Bankలో చాలా common).
        </li>
        <li>
          ఫోటో ఎంచుకోండి → crop → compress → <strong>Free Download</strong>.
        </li>
        <li>
          ఫారమ్‌లో JPG అప్‌లోడ్ చేయండి. Reject అయితే{" "}
          <Link href="/upload-fixer/">Upload Error Fixer</Link> చూడండి.
        </li>
      </ol>
      <h2>మరిన్ని లింకులు</h2>
      <ul>
        <li>
          <Link href="/telugu/">తెలుగు హోమ్</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">20KB</Link> ·{" "}
          <Link href="/compress-to-100kb/">100KB</Link>
        </li>
        <li>
          <Link href="/hindi/">हिंदी</Link> · <Link href="/">English</Link>
        </li>
        <li>
          <Link href="/signature-cleaner/">Signature 10–20KB</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
