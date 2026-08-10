import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Signature Size Kam Kaise Kare — 10KB 20KB Online Free",
  description:
    "Signature size kam kaise kare? Size to KB par free — signature ko 10KB–20KB mein compress karein SSC, Bank, Railway forms ke liye. Private browser tool.",
  path: "/signature-size-kam-kaise-kare/",
  keywords: [
    "signature size kam kaise kare",
    "signature size kam kaise kare online",
    "signature 10kb 20kb kaise banaye",
    "reduce signature size to 20KB",
    "SSC signature size",
  ],
});

export default function SignatureSizeKamPage() {
  return (
    <LegalLayout title="Signature Size Kam Kaise Kare (10KB–20KB)">
      <p>
        <strong>Signature size kam kaise kare</strong> — aksar forms 10KB se 20KB ke beech signature
        maangte hain. SizeToKB cleaner ink clean karke exact KB hit karta hai.
      </p>
      <h2>Steps</h2>
      <ol>
        <li>
          <Link href="/signature-cleaner/">Signature cleaner</Link> kholo.
        </li>
        <li>Signature photo/scan upload karo.</li>
        <li>Download jab size 10–20KB range mein aa jaye.</li>
      </ol>
      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/size-kam-kaise-kare/">Photo size kam kaise kare</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">Compress image to 20KB</Link>
        </li>
        <li>
          <Link href="/exam-pack/">Photo + signature ZIP pack</Link>
        </li>
        <li>
          <Link href="/upload-fixer/">Upload error fixer</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
