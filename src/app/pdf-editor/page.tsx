"use client";

import { TrustPills } from "@/components/Features";
import { PdfEditor } from "@/components/PdfEditor";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";

export default function PdfEditorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl lg:text-5xl">
          Edit <span className="text-[var(--accent)]">PDF</span> online
        </h1>
        <p className="mt-3 text-[var(--muted)] sm:text-lg">
          Live text editing, fillable form fields, highlights, drawings and images — then download.
          Private in your browser.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8">
        <PdfEditor />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ShareButtons
          title="Edit PDF online free — SizeToKB"
          text="Free PDF editor: add text, highlight, draw & images on SizeToKB.in"
          path="/pdf-editor/"
        />
        <SeoKeywordBlock
          heading="Edit PDF online free — live text, forms & annotate"
          paragraphs={[
            "Edit existing text on the page, fill AcroForm fields, add text/images, highlight and draw. Form-only downloads keep a real PDF; annotation downloads flatten edits onto pages.",
            "True Adobe/iLovePDF content-stream rewriting needs a commercial PDF engine. SizeToKB gives the strongest private browser alternative — then use Reduce PDF size if portals cap KB.",
          ]}
          links={[
            { href: "/pdf-compressor/", label: "Reduce PDF size" },
            { href: "/pdf-merge/", label: "Merge PDF" },
            { href: "/pdf-split/", label: "Split PDF" },
            { href: "/#custom-tool", label: "Reduce image to KB" },
          ]}
        />
      </div>
    </div>
  );
}
