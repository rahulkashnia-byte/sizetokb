import { CustomResizeTool } from "@/components/CustomResizeTool";
import { ExamPicker } from "@/components/ExamPicker";
import { Features } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { HomeFormReady } from "@/components/HomeFormReady";
import { HotToolsStrip } from "@/components/HotToolsStrip";
import { IndiaKeywordHub } from "@/components/IndiaKeywordHub";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { ShareButtons } from "@/components/ShareButtons";
import { ToolsGrid } from "@/components/ToolsGrid";
import Link from "next/link";

const HOME_FAQS = [
  {
    q: "How do I reduce image size to 50KB online free?",
    a: "Pick your exam on the homepage (or open Compress to 50KB): upload your photo and download when the output is at or under 50KB.",
  },
  {
    q: "How do I reduce signature size to 10KB–20KB?",
    a: "Use the homepage form helper with your exam selected, or Signature cleaner — upload, then download when it falls inside the KB range.",
  },
  {
    q: "Photo size / signature size kam kaise kare without app?",
    a: "Use sizetokb.in in Chrome or Safari — Hindi guides + exam presets. No install; processing stays on your device.",
  },
  {
    q: "How do I convert PDF to JPG or unlock a PDF?",
    a: "Use PDF to JPG for page images, or Unlock PDF to remove an open password — both run in your browser on SizeToKB.",
  },
  {
    q: "What if my exam is not listed?",
    a: "Use Reduce to KB (Custom) further down the home page. Enter min KB, max KB, and optional width/height from your notification.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <HomeFormReady />

      <div className="border-y border-[var(--line)] bg-white py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <HotToolsStrip />
        </div>
      </div>

      <section
        id="custom-tool"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--wash)]/30 py-10 sm:py-12"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
              Or set any custom KB
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              No exam match? Enter min–max KB from your notification PDF.
            </p>
          </div>
          <CustomResizeTool embedded />
          <ShareButtons
            className="mt-6"
            title="Reduce image & signature size to exact KB — Size to KB"
            text="Free tool to reduce photo & signature size to the exact KB your exam form needs — Size to KB"
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
        heading="Reduce image size & reduce signature size online free (KB)"
        paragraphs={[
          "People search compress image to 50KB, compress image to 20KB, reduce photo size to 50KB, photo size kam kaise kare, signature size kam kaise kare, PDF to JPG, unlock PDF, jpg to pdf, and merge PDF. SizeToKB is built for those exact jobs.",
          "Also: compress PDF, HEIC to JPG, Word to PDF, and exam photo packs — always verify the latest official notification.",
        ]}
        links={[
          { href: "/compress-to-50kb/", label: "Compress to 50KB" },
          { href: "/compress-to-20kb/", label: "Compress to 20KB" },
          { href: "/pdf-to-jpg/", label: "PDF to JPG" },
          { href: "/pdf-unlock/", label: "Unlock PDF" },
          { href: "/size-kam-kaise-kare/", label: "Size kam kaise kare" },
          { href: "/signature-cleaner/", label: "Reduce signature size" },
        ]}
      />

      <p className="sr-only">
        <Link href="/hindi/">Hindi</Link> <Link href="/telugu/">Telugu</Link>
      </p>
    </>
  );
}
