import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Photo Size Kam Kaise Kare — 20KB 50KB Photo Online Free",
  description:
    "Photo size kam kaise kare? SizeToKB.in par free — photo ko 20KB, 50KB, 100KB mein compress karein. Signature size kam kaise kare (10–20KB). SSC, Bank, Railway forms.",
  path: "/size-kam-kaise-kare/",
  keywords: [
    "photo size kam kaise kare",
    "photo size kam kaise kare online",
    "20kb 50kb photo kaise banaye",
    "image size reduce kaise kare",
    "photo size reduce online free",
    "signature size kam kaise kare",
  ],
});

const LINKS = [
  { href: "/compress-to-20kb/", label: "Photo 20KB mein compress karein" },
  { href: "/compress-to-50kb/", label: "Photo 50KB mein compress karein" },
  { href: "/compress-to-100kb/", label: "Photo 100KB mein compress karein" },
  { href: "/signature-size-kam-kaise-kare/", label: "Signature size kam kaise kare" },
  { href: "/pdf-size-kam-kaise-kare/", label: "PDF size kam kaise kare" },
  { href: "/signature-cleaner/", label: "Signature 10–20 KB tool" },
  { href: "/passport-photo/", label: "Passport size photo maker" },
  { href: "/upload-fixer/", label: "Form reject / upload error fixer" },
  { href: "/heic-to-jpg/", label: "iPhone HEIC to JPG" },
  { href: "/#custom-tool", label: "Custom min–max KB tool" },
];

export default function SizeKamKaiseKarePage() {
  return (
    <LegalLayout title="Photo Size Kam Kaise Kare (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size kam kaise kare</strong> — SizeToKB.in par free tool se aap photo ko exact{" "}
        <strong>20KB, 50KB ya 100KB</strong> tak compress kar sakte ho. Processing browser mein hoti
        hai; file server par upload nahi hoti.
      </p>
      <h2>Sabse tez tareeka</h2>
      <ol>
        <li>
          Neeche tool link kholo — <Link href="/compress-to-50kb/">50KB</Link> (SSC/Bank sabse
          common), <Link href="/compress-to-20kb/">20KB</Link>, ya{" "}
          <Link href="/compress-to-100kb/">100KB</Link>.
        </li>
        <li>Photo upload karo → Resize → Download.</li>
        <li>
          Agar form reject kare to <Link href="/upload-fixer/">Upload Error Fixer</Link> mein message
          paste karo.
        </li>
      </ol>
      <h2>Signature aur PDF</h2>
      <p>
        <Link href="/signature-size-kam-kaise-kare/">Signature size kam kaise kare</Link> (10–20KB)
        aur <Link href="/pdf-size-kam-kaise-kare/">PDF size kam kaise kare</Link> (100/200/500KB)
        ke alag guides bhi hain.
      </p>
      <h2>Tools</h2>
      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <p>
        English: compress image to 20KB / 50KB / 100KB, reduce photo size online free for SSC IBPS
        Railway form fill.
      </p>
    </LegalLayout>
  );
}
