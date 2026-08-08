import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF Size Kam Kaise Kare — 100KB 200KB 500KB Online Free",
  description:
    "PDF size kam kaise kare? SizeToKB.in par free — marksheet/certificate PDF ko 100KB, 200KB, 500KB tak compress karein. Unlock PDF, PDF to JPG bhi available.",
  path: "/pdf-size-kam-kaise-kare/",
  keywords: [
    "pdf size kam kaise kare",
    "PDF size 100KB kaise kare",
    "PDF size 200KB kaise kare",
    "compress PDF online free",
    "marksheet PDF size kam kare",
  ],
});

export default function PdfSizeKamPage() {
  return (
    <LegalLayout title="PDF Size Kam Kaise Kare (100KB / 200KB / 500KB)">
      <p>
        <strong>PDF size kam kaise kare</strong> — scholarship, job aur exam portals aksar 100KB,
        200KB ya 500KB limit dete hain. SizeToKB PDF compressor scanned marksheets ko shrink karta
        hai.
      </p>
      <h2>Steps</h2>
      <ol>
        <li>
          <Link href="/pdf-compressor/">PDF compressor</Link> ya{" "}
          <Link href="/marksheet-pdf/">Marksheet PDF</Link> kholo.
        </li>
        <li>Target KB set karo (200KB common) → Compress → Download.</li>
        <li>
          Password lage ho to pehle <Link href="/pdf-unlock/">Unlock PDF</Link>. Page image chahiye
          to <Link href="/pdf-to-jpg/">PDF to JPG</Link>.
        </li>
      </ol>
      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/size-kam-kaise-kare/">Photo size kam kaise kare</Link>
        </li>
        <li>
          <Link href="/pdf-merge/">Merge PDF</Link>
        </li>
        <li>
          <Link href="/pdf-organize/">Reorder / delete PDF pages</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
