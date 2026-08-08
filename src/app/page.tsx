import { CustomResizeTool } from "@/components/CustomResizeTool";
import { ExamPicker } from "@/components/ExamPicker";
import { Features, TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { IndiaKeywordHub } from "@/components/IndiaKeywordHub";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { ShareButtons } from "@/components/ShareButtons";
import { ToolsGrid } from "@/components/ToolsGrid";
import Link from "next/link";
import { featuredTools } from "@/lib/toolsCatalog";

const HOME_FAQS = [
  {
    q: "How do I reduce image size to 50KB online free?",
    a: "Use Reduce to KB on this homepage: set max to 50KB (or 20–50), upload your photo, and download when the output is in range.",
  },
  {
    q: "How do I reduce signature size to 10KB–20KB?",
    a: "On the homepage tool, tap “Sign 10–20 KB”, upload the signature, then download the JPG when it falls inside 10–20KB.",
  },
  {
    q: "Photo size / signature size kam kaise kare without app?",
    a: "Use sizetokb.in in Chrome or Safari on phone or laptop — no install. Processing stays on your device.",
  },
  {
    q: "What if my exam is not listed?",
    a: "Use Reduce to KB on the home page. Enter min KB, max KB, and optional width/height from your notification.",
  },
];

export default function HomePage() {
  const featured = featuredTools().filter((t) => !t.href.startsWith("/#"));

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <section className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% -30%, rgba(232, 93, 4, 0.18), transparent 55%), linear-gradient(180deg, #fff 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
          <div className="animate-rise mx-auto max-w-4xl text-center">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              SizeToKB.in · Free · Private
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-[2.25rem] font-extrabold leading-[1.06] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.35rem]">
              Reduce image & signature size to the{" "}
              <span className="text-[var(--accent)]">exact KB</span> your form needs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Reduce photo size to 20–50 KB and signature size to 10–20 KB for SSC, UPSC, NEET, JEE,
              Railway, IBPS and 190+ exams — right on this page.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#custom-tool"
                className="inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-sm hover:brightness-95"
              >
                Reduce size to KB now
              </a>
              <a
                href="#tools"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Browse all tools
              </a>
              <a
                href="#presets"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Exam presets
              </a>
            </div>
            <div className="mt-5 flex justify-center">
              <TrustPills />
            </div>
          </div>

          {/* Featured tools — always visible */}
          <div className="animate-rise-delay mx-auto mt-8 grid max-w-5xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-[var(--line)] bg-white/90 px-4 py-3 text-left shadow-sm transition hover:border-[var(--accent)]"
              >
                <span className="block text-sm font-bold text-[var(--ink)]">{tool.label}</span>
                <span className="mt-0.5 block text-xs text-[var(--muted)]">{tool.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="custom-tool"
        className="scroll-mt-20 border-y border-[var(--line)] bg-white py-10 sm:py-12"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CustomResizeTool embedded />
          <ShareButtons
            className="mt-6"
            title="Reduce image & signature size to exact KB — SizeToKB"
            text="Free tool to reduce photo & signature size to the exact KB your exam form needs — SizeToKB.in"
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
          "People search reduce image size online free, reduce photo size to 50KB, reduce signature size to 20KB, photo size kam kaise kare, signature size kam kaise kare, compress image to 20KB / 50KB, and passport size photo maker. SizeToKB is built for those exact form limits.",
          "Also: reduce PDF size online, HEIC to JPG, image to PDF, and exam photo packs — always verify the latest official notification.",
        ]}
        links={[
          { href: "/#custom-tool", label: "Reduce size to KB" },
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/signature-cleaner/", label: "Reduce signature size" },
          { href: "/pdf-compressor/", label: "Reduce PDF size" },
          { href: "/ssc-cgl/", label: "SSC CGL" },
          { href: "/neet-ug/", label: "NEET photo size" },
        ]}
      />
    </>
  );
}
