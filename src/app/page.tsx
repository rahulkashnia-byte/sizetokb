import { CustomResizeTool } from "@/components/CustomResizeTool";
import { ExamPicker } from "@/components/ExamPicker";
import { Features, TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { HotToolsStrip } from "@/components/HotToolsStrip";
import { IndiaKeywordHub } from "@/components/IndiaKeywordHub";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { PopularExamsStrip } from "@/components/PopularExamsStrip";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { ShareButtons } from "@/components/ShareButtons";
import { ToolsGrid } from "@/components/ToolsGrid";
import Link from "next/link";

const HOME_FAQS = [
  {
    q: "What is Size to KB (sizetokb.in)?",
    a: "Size to KB is the free exam photo & signature site at sizetokb.in (also sizetokb.com). Compress photos and signatures to the exact KB your SSC, Railway, Bank or state form needs — privately in your browser.",
  },
  {
    q: "How do I reduce KB / reduce image size online free?",
    a: "Use Reduce to KB on this homepage: upload your photo, set min–max KB (e.g. 20–50), crop, then Free Download. Or open Compress to 50KB / 20KB / 200KB presets.",
  },
  {
    q: "How do I reduce image size to 50KB online free?",
    a: "Open Compress to 50KB (or use Reduce to KB on this homepage): upload your photo and download when the output is at or under 50KB.",
  },
  {
    q: "How do I reduce signature size to 10KB–20KB?",
    a: "Use Signature cleaner, or on the homepage tool tap “Sign 10–20 KB”, upload, then download when it falls inside 10–20KB.",
  },
  {
    q: "Photo size / signature size kam kaise kare without app?",
    a: "Use sizetokb.in in Chrome or Safari — Hindi guides + 20/50/100KB tools. No install; processing stays on your device.",
  },
  {
    q: "How do I convert PDF to JPG or unlock a PDF?",
    a: "Use PDF to JPG for page images (optional 50KB cap), or Unlock PDF to remove an open password — both run in your browser on SizeToKB.",
  },
  {
    q: "What if my exam is not listed?",
    a: "Use Reduce to KB on the home page. Enter min KB, max KB, and optional width/height from your notification.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <section className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% -30%, rgba(61, 155, 120, 0.2), transparent 55%), linear-gradient(180deg, #f7fcfa 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
          <div className="animate-rise mx-auto max-w-4xl text-center">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Size to KB · Free · Private
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[2.25rem] font-extrabold leading-[1.06] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.35rem]">
              Size to KB — photo & signature to the{" "}
              <span className="text-[var(--accent)]">exact limit</span> your form needs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Official sizetokb.in tools: compress to 20KB / 50KB / 100KB / 200KB, plus PDF to JPG,
              unlock PDF — for SSC, Railway, UPSSSC, IBPS, UPSC and more.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#custom-tool"
                className="inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-sm hover:brightness-95"
              >
                Reduce KB now
              </a>
              <Link
                href="/compress-to-50kb/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Compress to 50KB
              </Link>
              <Link
                href="/hindi/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                हिंदी
              </Link>
              <Link
                href="/tamil/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                தமிழ்
              </Link>
              <Link
                href="/marathi/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                मराठी
              </Link>
              <Link
                href="/kannada/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                ಕನ್ನಡ
              </Link>
              <Link
                href="/telugu/"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                తెలుగు
              </Link>
            </div>
            <div className="mt-5 flex justify-center">
              <TrustPills />
            </div>
          </div>

          <div className="animate-rise-delay mx-auto mt-8 max-w-5xl">
            <HotToolsStrip />
            <PopularExamsStrip />
          </div>
        </div>
      </section>

      <section
        id="custom-tool"
        className="scroll-mt-20 border-y border-[var(--line)] bg-white py-10 sm:py-12"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CustomResizeTool
            embedded
            headline="Reduce KB — set any min–max"
            subhead="Crop → compress photo or signature → Free Download. Searched “reduce kb”? Start here."
          />
          <ShareButtons
            className="mt-6"
            title="Reduce KB — photo & signature size to exact KB — Size to KB"
            text="Free tool to reduce KB / photo & signature size for exam forms — Size to KB"
            path="/"
          />
        </div>
      </section>

      <div className="border-b border-[var(--line)] bg-[var(--wash)]/40 py-12 sm:py-14">
        <ToolsGrid />
      </div>

      <div id="presets" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6">
        <ExamPicker />
      </div>

      <Features />
      <SevaDeskPartnerStrip />
      <Faq items={HOME_FAQS} />
      <IndiaKeywordHub />

      <SeoKeywordBlock
        heading="Reduce KB · reduce image size & signature size online free"
        paragraphs={[
          "People search reduce kb, compress image to 50KB, compress image to 200KB, reduce photo size to 50KB, photo size kam kaise kare, signature size kam kaise kare, PDF to JPG 50KB, unlock PDF, and exam photo size (UPSSSC PET, RRB Section Controller, ISRO, ITAT). Size to KB is built for those jobs.",
          "Also: compress PDF, HEIC to JPG, Word to PDF, and exam photo packs — always verify the latest official notification.",
        ]}
        links={[
          { href: "/compress-to-50kb/", label: "Compress to 50KB" },
          { href: "/compress-to-200kb/", label: "Compress to 200KB" },
          { href: "/pdf-to-jpg/", label: "PDF to JPG 50KB" },
          { href: "/upsssc-pet/", label: "UPSSSC PET" },
          { href: "/rrb-section-controller/", label: "Section Controller" },
          { href: "/signature-cleaner/", label: "Reduce signature size" },
        ]}
      />
    </>
  );
}
