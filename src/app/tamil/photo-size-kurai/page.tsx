import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "புகைப்பட அளவு எப்படி குறைப்பது — 20KB 50KB 100KB Free",
  description:
    "Photo size reduce Tamil guide — புகைப்படத்தை 20KB, 50KB, 100KBக்கு compress செய்யுங்கள். கையொப்பம் 10–20KB. Size to KB இலவச கருவி.",
  path: "/tamil/photo-size-kurai/",
  keywords: [
    "photo size reduce tamil",
    "புகைப்பட அளவு குறைக்க",
    "20kb 50kb photo tamil",
    "signature size reduce tamil",
  ],
});

export default function TamilPhotoSizeGuidePage() {
  return (
    <LegalLayout title="புகைப்பட அளவு எப்படி குறைப்பது (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size reduce Tamil</strong> — Size to KB இலவச கருவியால் புகைப்படத்தை exact{" "}
        <strong>20KB, 50KB அல்லது 100KB</strong>க்கு compress செய்யுங்கள். செயலாக்கம் உலாவியில்;
        நாங்கள் கோப்பை சேமிக்க மாட்டோம்.
      </p>
      <h2>வேகமான வழி</h2>
      <ol>
        <li>
          <Link href="/tamil/compress-to-50kb/">50KB tool</Link> திறக்கவும் (SSC/Bank-க்கு பொதுவானது).
        </li>
        <li>புகைப்படம் → crop → compress → <strong>Free Download</strong>.</li>
        <li>
          படிவத்தில் JPG பதிவேற்றவும். நிராகரித்தால்{" "}
          <Link href="/upload-fixer/">Upload Error Fixer</Link> பார்க்கவும்.
        </li>
      </ol>
      <h2>மேலும் இணைப்புகள்</h2>
      <ul>
        <li>
          <Link href="/tamil/">தமிழ் முகப்பு</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">20KB</Link> ·{" "}
          <Link href="/compress-to-100kb/">100KB</Link>
        </li>
        <li>
          <Link href="/signature-cleaner/">கையொப்பம் சுத்தம் / KB</Link>
        </li>
        <li>
          <Link href="/hindi/">हिंदी</Link> · <Link href="/marathi/">मराठी</Link> ·{" "}
          <Link href="/kannada/">ಕನ್ನಡ</Link> · <Link href="/">English</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
