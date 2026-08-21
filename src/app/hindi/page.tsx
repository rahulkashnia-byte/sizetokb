import type { Metadata } from "next";
import { CustomResizeTool } from "@/components/CustomResizeTool";
import { TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Size to KB हिंदी — फोटो और सिग्नेचर साइज़ KB में कम करें",
  description:
    "फोटो साइज़ कम कैसे करें? Size to KB पर हिंदी में — 20KB / 50KB / 100KB में compress करें। सिग्नेचर 10–20KB। फाइल सेव नहीं होती — फ्री टूल।",
  path: "/hindi/",
  keywords: [
    "photo size kam kaise kare",
    "फोटो साइज़ कम कैसे करें",
    "signature size kam kaise kare",
    "photo 50kb",
    "size to kb hindi",
  ],
});

const FAQS = [
  {
    q: "Photo size kam kaise kare?",
    a: "नीचे टूल में फोटो चुनें, crop करें, min–max KB सेट करें, फिर Free Download दबाएँ।",
  },
  {
    q: "क्या मेरी फोटो सेव होती है?",
    a: "नहीं। प्रोसेसिंग आपके ब्राउज़र में होती है — हम फोटो/PDF सेव नहीं करते।",
  },
  {
    q: "50KB फोटो कैसे बनाएँ?",
    a: "Compress to 50KB पेज खोलें या होम टूल में max 50KB रखें।",
  },
];

export default function HindiHomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          हिंदी · Size to KB
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          फोटो और सिग्नेचर साइज़{" "}
          <span className="text-[var(--accent)]">exact KB</span> में कम करें
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          SSC, Bank, Railway फॉर्म के लिए 20KB / 50KB / 100KB। फ्री · प्राइवेट · फाइल सेव नहीं।
        </p>
        <TrustPills />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/hindi/compress-to-50kb/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            50KB में compress
          </Link>
          <Link
            href="/hindi/size-kam-kaise-kare/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold"
          >
            साइज़ कम कैसे करें
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
          >
            English
          </Link>
        </div>
      </section>

      <div id="tool" className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
          <CustomResizeTool
            embedded
            initialMinKb={20}
            initialMaxKb={50}
            headline="यहाँ KB सेट करें और resize करें"
            subhead="Crop → compress → Free Download। फॉर्म में अपलोड करें।"
          />
        </div>
        <ShareButtons
          className="mt-6"
          title="Size to KB हिंदी — फोटो साइज़ कम करें"
          text="फोटो और सिग्नेचर exact KB में फ्री — Size to KB"
          path="/hindi/"
        />
      </div>

      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Photo size kam kaise kare — हिंदी गाइड"
        paragraphs={[
          "Size to KB पर फोटो साइज़ कम कैसे करें: टूल खोलें, फोटो चुनें, KB लिमिट सेट करें, Free Download करें। सिग्नेचर के लिए 10–20KB रखें।",
        ]}
        links={[
          { href: "/hindi/compress-to-50kb/", label: "50KB tool" },
          { href: "/hindi/size-kam-kaise-kare/", label: "साइज़ कम कैसे करें" },
          { href: "/tamil/", label: "தமிழ்" },
          { href: "/marathi/", label: "मराठी" },
          { href: "/kannada/", label: "ಕನ್ನಡ" },
          { href: "/telugu/", label: "తెలుగు" },
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/", label: "English home" },
        ]}
      />
    </>
  );
}
