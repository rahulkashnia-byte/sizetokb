"use client";

import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { CustomResizeTool } from "@/components/CustomResizeTool";

export default function CustomPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
            Resize documents for{" "}
            <span className="text-[var(--accent)]">Custom Requirements</span>
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Set exact min/max KB and optional dimensions — then resize in one click.
          </p>
          <TrustPills />
        </div>

        <div className="mt-8">
          <CustomResizeTool />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-6 sm:px-6">
        <ShareButtons
          title="Custom reduce photo & signature size — Size to KB"
          text="Reduce photo & signature size to any custom KB free on Size to KB"
          path="/custom/"
        />
      </div>

      <SeoKeywordBlock
        heading="Reduce signature size & photo size to any custom KB"
        paragraphs={[
          "Use Custom when you need to reduce signature size to 10KB or 20KB, reduce photo size to 50KB, or hit a unique range like 15–40KB from your notification. Covers signature size kam kaise kare, resize signature to 10kb 20kb, and passport size photo maker workflows for SSC, IBPS, RRB and state PSC portals.",
          "Set min size (KB), max size (KB), optional dimensions in cm or px, then download a JPG ready for upload.",
        ]}
        links={[
          { href: "/image-resizer/", label: "Image size reducer" },
          { href: "/", label: "All exams" },
          { href: "/disclaimer/", label: "Disclaimer" },
        ]}
      />
    </>
  );
}
