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
  title: "Size to KB తెలుగు — ఫోటో & సిగ్నేచర్ సైజ్ KBకి తగ్గించండి",
  description:
    "ఫోటో సైజ్ ఎలా తగ్గించాలి? Size to KB తెలుగులో — 20KB / 50KB / 100KBకి compress చేయండి. సిగ్నేచర్ 10–20KB. ఫైల్ సేవ్ కాదు — ఉచితం.",
  path: "/telugu/",
  keywords: [
    "photo size ela taggali",
    "ఫోటో సైజ్ ఎలా తగ్గించాలి",
    "photo size reduce telugu",
    "signature size reduce telugu",
    "photo 50kb telugu",
  ],
});

const FAQS = [
  {
    q: "ఫోటో సైజ్ ఎలా తగ్గించాలి?",
    a: "కింది టూల్‌లో ఫోటో ఎంచుకోండి, crop చేయండి, min–max KB సెట్ చేసి Free Download నొక్కండి.",
  },
  {
    q: "నా ఫోటో సేవ్ అవుతుందా?",
    a: "లేదు. ప్రాసెసింగ్ మీ బ్రౌజర్‌లోనే — మేము ఫోటో/PDF సేవ్ చేయము.",
  },
  {
    q: "50KB ఫోటో ఎలా చేయాలి?",
    a: "Compress to 50KB పేజీ తెరవండి లేదా హోమ్ టూల్‌లో max 50KB ఉంచండి.",
  },
];

export default function TeluguHomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          తెలుగు · Size to KB
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          ఫోటో & సిగ్నేచర్ సైజ్‌ను{" "}
          <span className="text-[var(--accent)]">exact KB</span>కి తగ్గించండి
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          SSC, Bank, Railway ఫారమ్‌లకు 20KB / 50KB / 100KB. ఉచితం · ప్రైవేట్ · ఫైల్ సేవ్ కాదు.
        </p>
        <TrustPills />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/telugu/compress-to-50kb/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            50KBకి compress
          </Link>
          <Link
            href="/telugu/photo-size-ela-taggali/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold"
          >
            సైజ్ ఎలా తగ్గించాలి
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
            headline="ఇక్కడ KB సెట్ చేసి resize చేయండి"
            subhead="Crop → compress → Free Download. ఆపై ఫారమ్‌లో అప్‌లోడ్ చేయండి."
          />
        </div>
        <ShareButtons
          className="mt-6"
          title="Size to KB తెలుగు — ఫోటో సైజ్ తగ్గించండి"
          text="ఫోటో & సిగ్నేచర్ exact KBలో ఉచితం — Size to KB"
          path="/telugu/"
        />
      </div>

      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Photo size ela taggali — తెలుగు గైడ్"
        paragraphs={[
          "Size to KBలో ఫోటో సైజ్ ఎలా తగ్గించాలి: టూల్ తెరవండి, ఫోటో ఎంచుకోండి, KB లిమిట్ సెట్ చేసి Free Download చేయండి. సిగ్నేచర్‌కు 10–20KB ఉంచండి.",
        ]}
        links={[
          { href: "/telugu/compress-to-50kb/", label: "50KB tool" },
          { href: "/telugu/photo-size-ela-taggali/", label: "సైజ్ ఎలా తగ్గించాలి" },
          { href: "/hindi/", label: "हिंदी" },
          { href: "/", label: "English home" },
        ]}
      />
    </>
  );
}
