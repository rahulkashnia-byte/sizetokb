import { ExamPicker } from "@/components/ExamPicker";
import { Features, TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { IndiaKeywordHub } from "@/components/IndiaKeywordHub";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import Link from "next/link";

const HOME_FAQS = [
  {
    q: "How do I reduce image size to 50KB online free?",
    a: "Open an exam preset or Custom on SizeToKB, upload your photo, and download when the output shows within 20–50KB (or your chosen max).",
  },
  {
    q: "How do I reduce signature size to 10KB–20KB?",
    a: "Select your exam or Custom, upload the signature, enable the clean-up toggle if needed, then download the JPG when it falls inside 10–20KB.",
  },
  {
    q: "Photo size / signature size kam kaise kare without app?",
    a: "Use sizetokb.in in Chrome or Safari on phone or laptop — no install. Processing stays on your device.",
  },
  {
    q: "What if my exam is not listed?",
    a: "Custom is always available in the header and on the home page. Enter min KB, max KB, and optional width/height from your notification.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="animate-rise">
          <p className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            SizeToKB.in
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.25rem]">
            Reduce image & signature size to the{" "}
            <span className="text-[var(--accent)]">exact KB</span> your form needs
          </h1>
          <p className="mt-4 max-w-xl text-base text-[var(--muted)] sm:text-lg">
            Free online tool to reduce photo size (20KB / 50KB) and reduce signature size (10KB–
            20KB) for SSC, UPSC, NEET, JEE, Railway, IBPS and 190+ exams — or set any custom KB
            limit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/custom/"
              className="inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-sm hover:brightness-95"
            >
              Reduce to custom KB
            </Link>
            <a
              href="#presets"
              className="inline-flex rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Exam photo size presets
            </a>
          </div>
          <TrustPills />
        </div>

        <div className="animate-rise-delay kb-meter rounded-2xl p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Common reduce-size targets
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>Reduce photo size</span>
              <span className="font-bold text-[var(--accent-ink)]">20–50 KB</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>Reduce signature size</span>
              <span className="font-bold text-[var(--accent-ink)]">10–20 KB</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line)] pb-2">
              <span>Banking photo (px)</span>
              <span className="font-bold text-[var(--accent-ink)]">200×230</span>
            </li>
            <li className="flex justify-between">
              <span>Any notification limit</span>
              <Link href="/custom/" className="font-bold text-[var(--accent)]">
                Custom →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <div id="presets" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-10 sm:px-6">
        <ExamPicker />
      </div>

      <Features />
      <Faq items={HOME_FAQS} />
      <IndiaKeywordHub />

      <SeoKeywordBlock
        heading="Also searched: compress image, resize photo, JPG compressor, form fill photo"
        paragraphs={[
          "Besides reduce image size / reduce signature size, SizeToKB covers compress image to 20KB, compress image to 50KB, photo resize online free, signature resize online free, passport size photo maker, decrease image size online, make photo smaller KB, and sarkari form photo size.",
          "Tool extras: image to PDF converter and PDF compressor online free when certificates must stay under a portal upload cap. Always match the latest official notification.",
        ]}
        links={[
          { href: "/custom/", label: "Custom reduce size" },
          { href: "/image-resizer/", label: "Compress image to KB" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
          { href: "/pdf-compressor/", label: "PDF compressor" },
          { href: "/ssc-cgl/", label: "SSC CGL" },
          { href: "/neet-ug/", label: "NEET photo size" },
        ]}
      />
    </>
  );
}
