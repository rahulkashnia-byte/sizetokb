import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Photo Size Kam Kaise Kare — Reduce Image & Signature Size to KB Free",
  description:
    "Photo size kam kaise kare aur signature size kam kaise kare — SizeToKB.in par free. Reduce image size to 20KB/50KB, signature to 10–20KB for SSC, Bank, Railway forms.",
  path: "/size-kam-kaise-kare/",
  keywords: [
    "photo size kam kaise kare",
    "signature size kam kaise kare",
    "image size reduce kaise kare",
    "photo size reduce online free",
    "20kb 50kb photo kaise banaye",
  ],
});

const LINKS = [
  { href: "/#custom-tool", label: "Reduce size to KB (home tool)" },
  { href: "/signature-cleaner/", label: "Signature size kam kare (10–20 KB)" },
  { href: "/bulk-reduce/", label: "Bulk reduce photos" },
  { href: "/passport-photo/", label: "Passport size photo" },
  { href: "/upload-fixer/", label: "Portal upload error fixer" },
  { href: "/photo-guide/", label: "Photo quality check" },
  { href: "/heic-to-jpg/", label: "iPhone HEIC to JPG" },
  { href: "/marksheet-pdf/", label: "Marksheet PDF size kam kare" },
];

export default function SizeKamKaiseKarePage() {
  return (
    <LegalLayout title="Photo / Signature Size Kam Kaise Kare">
      <p>
        <strong>Photo size kam kaise kare</strong> aur <strong>signature size kam kaise kare</strong>{" "}
        — SizeToKB.in par free tools se aap exact KB target (20KB, 50KB, 10–20KB) hit kar sakte ho.
        Processing browser mein hoti hai; file server par upload nahi hoti.
      </p>
      <h2>Step-by-step</h2>
      <ol>
        <li>Home page par Custom tool kholo — min/max KB daalo (jaise photo 20–50, sign 10–20).</li>
        <li>Photo ya signature upload karo → Resize → Download.</li>
        <li>Agar portal reject kare to Upload Error Fixer mein message paste karo.</li>
      </ol>
      <h2>Tools</h2>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <p>
        English: reduce image size online free, reduce signature size to 20KB, compress photo to
        50KB for SSC / IBPS / Railway form fill.
      </p>
    </LegalLayout>
  );
}
