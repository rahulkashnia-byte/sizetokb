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
  title: "Size to KB தமிழ் — புகைப்படம் & கையொப்பம் KBக்கு சுருக்கவும்",
  description:
    "புகைப்பட அளவை எப்படி குறைப்பது? Size to KB தமிழில் — 20KB / 50KB / 100KBக்கு compress செய்யுங்கள். கையொப்பம் 10–20KB. கோப்பு சேமிக்கப்படாது — இலவசம்.",
  path: "/tamil/",
  keywords: [
    "photo size reduce tamil",
    "புகைப்பட அளவு குறைக்க",
    "signature size reduce tamil",
    "photo 50kb tamil",
    "size to kb tamil",
    "பட அளவு KB",
  ],
});

const FAQS = [
  {
    q: "புகைப்பட அளவை எப்படி குறைப்பது?",
    a: "கீழே உள்ள டூலில் புகைப்படத்தைத் தேர்ந்தெடுத்து, crop செய்து, min–max KB அமைத்து Free Download அழுத்தவும்.",
  },
  {
    q: "என் புகைப்படம் சேமிக்கப்படுமா?",
    a: "இல்லை. செயலாக்கம் உங்கள் உலாவியிலேயே — நாங்கள் புகைப்படம்/PDF சேமிக்க மாட்டோம்.",
  },
  {
    q: "50KB புகைப்படம் எப்படி செய்வது?",
    a: "Compress to 50KB பக்கத்தைத் திறக்கவும் அல்லது டூலில் max 50KB வைக்கவும்.",
  },
];

export default function TamilHomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          தமிழ் · Size to KB
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          புகைப்படம் & கையொப்பம் அளவை{" "}
          <span className="text-[var(--accent)]">exact KB</span>க்கு சுருக்கவும்
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          SSC, Bank, Railway படிவங்களுக்கு 20KB / 50KB / 100KB. இலவசம் · தனியுரிமை · கோப்பு சேமிப்பு இல்லை.
        </p>
        <TrustPills />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/tamil/compress-to-50kb/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            50KBக்கு compress
          </Link>
          <Link
            href="/tamil/photo-size-kurai/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold"
          >
            அளவு எப்படி குறைப்பது
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
            headline="இங்கே KB அமைத்து resize செய்யுங்கள்"
            subhead="Crop → compress → Free Download. பிறகு படிவத்தில் பதிவேற்றவும்."
          />
        </div>
        <ShareButtons
          className="mt-6"
          title="Size to KB தமிழ் — புகைப்பட அளவு குறைக்க"
          text="புகைப்படம் & கையொப்பம் exact KB — Size to KB"
          path="/tamil/"
        />
      </div>

      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Photo size reduce Tamil — தமிழ் வழிகாட்டி"
        paragraphs={[
          "Size to KB-ல் புகைப்பட அளவை குறைக்க: டூலைத் திறந்து, படத்தைத் தேர்ந்தெடுத்து, KB வரம்பை அமைத்து Free Download செய்யுங்கள். கையொப்பத்திற்கு 10–20KB வைக்கவும். TNPSC / Bank படிவங்களுக்கும் பொருந்தும்.",
        ]}
        links={[
          { href: "/tamil/compress-to-50kb/", label: "50KB tool" },
          { href: "/tamil/photo-size-kurai/", label: "அளவு குறைக்க" },
          { href: "/marathi/", label: "मराठी" },
          { href: "/kannada/", label: "ಕನ್ನಡ" },
          { href: "/telugu/", label: "తెలుగు" },
          { href: "/hindi/", label: "हिंदी" },
          { href: "/", label: "English home" },
        ]}
      />
    </>
  );
}
