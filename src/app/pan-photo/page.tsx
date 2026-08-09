"use client";

import { TrustPills } from "@/components/Features";
import { FormSpecUploader } from "@/components/FormSpecUploader";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { getFormPreset } from "@/lib/formPresets";
import type { DocSpec } from "@/lib/types";

function SpecTool({
  title,
  accentWord,
  subtitle,
  spec,
  path,
  seoHeading,
  seoParagraphs,
  links,
  filename,
}: {
  title: string;
  accentWord: string;
  subtitle: string;
  spec: DocSpec;
  path: string;
  seoHeading: string;
  seoParagraphs: string[];
  links: { href: string; label: string }[];
  filename: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          {title} <span className="text-[var(--accent)]">{accentWord}</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">{subtitle}</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <FormSpecUploader
          spec={spec}
          filename={filename}
          forceScan={!!spec.scanEffect}
          pickLabel="Select image"
          actionLabel="Crop & compress to KB"
        />
      </div>
      <ShareButtons
        className="mt-6"
        title={seoHeading}
        text={`${seoHeading} free on SizeToKB.in`}
        path={path}
      />
      <SeoKeywordBlock heading={seoHeading} paragraphs={seoParagraphs} links={links} />
    </div>
  );
}

export default function PanPhotoPage() {
  const preset = getFormPreset("pan")!;
  return (
    <SpecTool
      title="Reduce PAN Card"
      accentWord="Photo Size to KB"
      subtitle="Crop, rotate, and compress PAN application photos to typical portal KB limits — private browser tool."
      spec={preset.photo}
      filename={preset.photo.id}
      path="/pan-photo/"
      seoHeading="Reduce PAN card photo size online free to KB"
      seoParagraphs={[
        "Search intent: PAN photo size KB, reduce PAN photo size, UTIITSL photo size. Always match the live portal notice.",
      ]}
      links={[
        { href: "/aadhaar-photo/", label: "Aadhaar photo" },
        { href: "/form-wizard/", label: "Form wizard" },
        { href: "/#custom-tool", label: "Custom KB" },
      ]}
    />
  );
}
