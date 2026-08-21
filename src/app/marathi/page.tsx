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
  title: "Size to KB मराठी — फोटो आणि सही साइझ KB मध्ये कमी करा",
  description:
    "फोटो साइझ कसा कमी करायचा? Size to KB मराठीत — 20KB / 50KB / 100KB मध्ये compress करा. सही 10–20KB. फाइल सेव्ह होत नाही — मोफत.",
  path: "/marathi/",
  keywords: [
    "photo size kami kara marathi",
    "फोटो साइझ कमी करा",
    "signature size kami kara",
    "photo 50kb marathi",
    "size to kb marathi",
  ],
});

const FAQS = [
  {
    q: "फोटो साइझ कसा कमी करायचा?",
    a: "खालील टूलमध्ये फोटो निवडा, crop करा, min–max KB सेट करून Free Download दाबा.",
  },
  {
    q: "माझा फोटो सेव्ह होतो का?",
    a: "नाही. प्रोसेसिंग तुमच्या ब्राउझरमध्ये होते — आम्ही फोटो/PDF सेव्ह करत नाही.",
  },
  {
    q: "50KB फोटो कसा बनवायचा?",
    a: "Compress to 50KB पेज उघडा किंवा टूलमध्ये max 50KB ठेवा.",
  },
];

export default function MarathiHomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          मराठी · Size to KB
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          फोटो आणि सही साइझ{" "}
          <span className="text-[var(--accent)]">exact KB</span> मध्ये कमी करा
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          SSC, Bank, Railway फॉर्मसाठी 20KB / 50KB / 100KB. मोफत · खाजगी · फाइल सेव्ह नाही.
        </p>
        <TrustPills />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/marathi/compress-to-50kb/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            50KB मध्ये compress
          </Link>
          <Link
            href="/marathi/photo-size-kami-kara/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold"
          >
            साइझ कसा कमी करायचा
          </Link>
          <Link
            href="/hindi/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
          >
            हिंदी
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
            headline="इथे KB सेट करून resize करा"
            subhead="Crop → compress → Free Download. नंतर फॉर्ममध्ये अपलोड करा."
          />
        </div>
        <ShareButtons
          className="mt-6"
          title="Size to KB मराठी — फोटो साइझ कमी करा"
          text="फोटो आणि सही exact KB मध्ये मोफत — Size to KB"
          path="/marathi/"
        />
      </div>

      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Photo size kami kara — मराठी गाइड"
        paragraphs={[
          "Size to KB वर फोटो साइझ कसा कमी करायचा: टूल उघडा, फोटो निवडा, KB मर्यादा सेट करून Free Download करा. सहीसाठी 10–20KB ठेवा. MPSC / Bank फॉर्मसाठी उपयुक्त.",
        ]}
        links={[
          { href: "/marathi/compress-to-50kb/", label: "50KB tool" },
          { href: "/marathi/photo-size-kami-kara/", label: "साइझ कमी करा" },
          { href: "/tamil/", label: "தமிழ்" },
          { href: "/kannada/", label: "ಕನ್ನಡ" },
          { href: "/hindi/", label: "हिंदी" },
          { href: "/", label: "English home" },
        ]}
      />
    </>
  );
}
