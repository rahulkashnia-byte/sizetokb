"use client";

import { TrustPills } from "@/components/Features";
import { FormSpecUploader } from "@/components/FormSpecUploader";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { getFormPreset } from "@/lib/formPresets";

export default function ThumbImpressionPage() {
  const preset = getFormPreset("thumb")!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Reduce Thumb Impression <span className="text-[var(--accent)]">Size to KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Crop, rotate, clean, and compress thumb impressions for police / bank / exam forms
          (typically 10–40 KB).
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <FormSpecUploader
          spec={preset.photo}
          filename="thumb-impression"
          forceScan
          pickLabel="Select thumb impression"
          actionLabel="Crop, clean & compress"
        />
      </div>
      <ShareButtons
        className="mt-6"
        title="Reduce thumb impression size to KB — SizeToKB"
        text="Compress thumb impression free on SizeToKB.in"
        path="/thumb-impression/"
      />
      <SeoKeywordBlock
        heading="Thumb impression size reduce online free"
        paragraphs={["Police form thumb impression KB, reduce left thumb impression size online."]}
        links={[
          { href: "/signature-cleaner/", label: "Reduce signature size" },
          { href: "/#custom-tool", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
