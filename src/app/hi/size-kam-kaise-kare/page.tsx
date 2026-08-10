import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "फोटो साइज़ कम कैसे करें — 20KB 50KB 100KB Online Free",
  description:
    "Photo size kam kaise kare? हिंदी गाइड — फोटो को 20KB, 50KB, 100KB में compress करें। सिग्नेचर 10–20KB। Size to KB फ्री टूल।",
  path: "/hi/size-kam-kaise-kare/",
  keywords: [
    "photo size kam kaise kare",
    "फोटो साइज़ कम कैसे करें",
    "20kb 50kb photo",
    "signature size kam kaise kare",
  ],
});

export default function HindiSizeKamPage() {
  return (
    <LegalLayout title="फोटो साइज़ कम कैसे करें (20KB / 50KB / 100KB)">
      <p>
        <strong>Photo size kam kaise kare</strong> — Size to KB पर फ्री टूल से फोटो को exact{" "}
        <strong>20KB, 50KB या 100KB</strong> तक compress करें। प्रोसेसिंग ब्राउज़र में होती है;
        हम फाइल सेव नहीं करते।
      </p>
      <h2>सबसे तेज़ तरीका</h2>
      <ol>
        <li>
          <Link href="/hi/compress-to-50kb/">50KB tool</Link> खोलें (SSC/Bank में सबसे common)।
        </li>
        <li>फोटो चुनें → crop → compress → <strong>Free Download</strong>।</li>
        <li>
          फॉर्म में JPG अपलोड करें। रिजेक्ट हो तो{" "}
          <Link href="/upload-fixer/">Upload Error Fixer</Link> देखें।
        </li>
      </ol>
      <h2>और लिंक</h2>
      <ul>
        <li>
          <Link href="/hi/">हिंदी होम</Link>
        </li>
        <li>
          <Link href="/compress-to-20kb/">20KB</Link> ·{" "}
          <Link href="/compress-to-100kb/">100KB</Link>
        </li>
        <li>
          <Link href="/signature-size-kam-kaise-kare/">Signature size kam kaise kare</Link>
        </li>
        <li>
          <Link href="/size-kam-kaise-kare/">English / Hinglish guide</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
