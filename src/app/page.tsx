import { CustomResizeTool } from "@/components/CustomResizeTool";
import { ExamPicker } from "@/components/ExamPicker";
import { Features, TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { IndiaKeywordHub } from "@/components/IndiaKeywordHub";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { ShareButtons } from "@/components/ShareButtons";

const HOME_FAQS = [
  {
    q: "How do I reduce image size to 50KB online free?",
    a: "Use the Custom KB tool on this homepage: set max to 50KB (or 20–50), upload your photo, and download when the output is in range.",
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
    a: "Use the Custom KB tool on the home page (or open Custom anytime from the header). Enter min KB, max KB, and optional width/height from your notification.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <section className="relative w-full overflow-hidden border-b border-[var(--line)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(232, 93, 4, 0.16), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.55), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16">
          <div className="animate-rise mx-auto max-w-5xl text-center">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              SizeToKB.in
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Reduce image & signature size to the{" "}
              <span className="text-[var(--accent)]">exact KB</span> your form needs
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">
              Free online tool to reduce photo size (20KB / 50KB) and reduce signature size (10KB–
              20KB) for SSC, UPSC, NEET, JEE, Railway, IBPS and 190+ exams — or set any custom KB
              limit below.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#custom-tool"
                className="inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-sm hover:brightness-95"
              >
                Resize on this page
              </a>
              <a
                href="#presets"
                className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Exam photo size presets
              </a>
            </div>
            <div className="mt-5 flex justify-center">
              <TrustPills />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold text-[var(--muted)]">
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5">
                Photo 20–50 KB
              </span>
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5">
                Signature 10–20 KB
              </span>
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5">
                Banking 200×230 px
              </span>
              <span className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5">
                Any custom limit
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <ShareButtons path="/" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="custom-tool"
        className="scroll-mt-20 border-b border-[var(--line)] bg-white/50 py-10 sm:py-12"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CustomResizeTool embedded />
        </div>
      </section>

      <div id="presets" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:px-6">
        <ExamPicker />
      </div>

      <Features />
      <SevaDeskPartnerStrip />
      <Faq items={HOME_FAQS} />
      <IndiaKeywordHub />

      <SeoKeywordBlock
        heading="Also searched: compress image, resize photo, JPG compressor, form fill photo"
        paragraphs={[
          "Besides reduce image size / reduce signature size, SizeToKB covers compress image to 20KB, compress image to 50KB, photo resize online free, signature resize online free, passport size photo maker, decrease image size online, make photo smaller KB, and sarkari form photo size.",
          "Tool extras: image to PDF, PDF shrink, image merger/cropper/flip, and PDF↔Word converters when portals need documents under a size cap. Always match the latest official notification.",
        ]}
        links={[
          { href: "/#custom-tool", label: "Custom reduce size" },
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/exam-pack/", label: "Exam ZIP pack" },
          { href: "/pdf-compressor/", label: "PDF shrink" },
          { href: "/heic-to-jpg/", label: "HEIC to JPG" },
          { href: "/ssc-cgl/", label: "SSC CGL" },
          { href: "/neet-ug/", label: "NEET photo size" },
        ]}
      />
    </>
  );
}
