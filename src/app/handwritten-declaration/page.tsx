"use client";

import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { FormSpecUploader } from "@/components/FormSpecUploader";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { getFormPreset } from "@/lib/formPresets";

const FAQS = [
  {
    q: "What is the IBPS handwritten declaration size in KB?",
    a: "Most IBPS / SBI forms ask for a JPG between 50 KB and 100 KB, commonly around 800×400 pixels (about 10 cm × 5 cm). Always confirm the latest notification.",
  },
  {
    q: "Can I type the declaration instead of handwriting?",
    a: "No. Portals require your own handwriting in English (not all capitals), black ink on white paper. This tool only resizes the scan/photo of what you wrote.",
  },
  {
    q: "Why was my declaration rejected?",
    a: "Common reasons: file over 100 KB, under 50 KB, wrong pixels, blurry text, capitals-only writing, or non-JPG format. Compress here after a clear scan.",
  },
  {
    q: "Is this handwritten declaration tool free and private?",
    a: "Yes. Processing stays in your browser — we do not upload your declaration to a server.",
  },
];

export default function HandwrittenDeclarationPage() {
  const preset = getFormPreset("handwritten-declaration")!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Handwritten Declaration{" "}
          <span className="text-[var(--accent)]">Size in KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          IBPS / SBI style: crop to ~800×400 px and compress to{" "}
          <strong className="text-[var(--ink)]">50–100 KB</strong> JPG for form
          upload. Free · private.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="mb-4 rounded-xl bg-[var(--wash)] px-3 py-2 text-xs text-[var(--muted)]">
          Write the official English text in running hand (not ALL CAPS) on white
          paper with black ink → photograph/scan clearly → use the tool below.
        </p>
        <FormSpecUploader
          spec={preset.photo}
          filename="handwritten-declaration"
          forceScan
          pickLabel="Select handwritten declaration scan"
          actionLabel="Crop, clean & compress to 50–100 KB"
        />
      </div>
      <ShareButtons
        className="mt-6"
        title="IBPS handwritten declaration size KB — Size to KB"
        text="Compress handwritten declaration to 50–100 KB free on Size to KB"
        path="/handwritten-declaration/"
      />
      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="IBPS handwritten declaration resize online free"
        paragraphs={[
          "Searchers looking for IBPS PO / Clerk / SBI handwritten declaration 50KB to 100KB, 800x400 declaration compressor, and bank exam declaration size can crop and Free Download here. Also useful for IBPS RRB declaration uploads when the notification matches 50–100 KB.",
        ]}
        links={[
          { href: "/thumb-impression/", label: "Thumb impression" },
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/join-photo-signature/", label: "Join photo + signature" },
          { href: "/upload-checker/", label: "Upload checker" },
          { href: "/ibps-po/", label: "IBPS PO exam page" },
          { href: "/ibps-clerk/", label: "IBPS Clerk exam page" },
        ]}
      />
    </div>
  );
}
