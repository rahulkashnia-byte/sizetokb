"use client";

import { TrustPills } from "@/components/Features";
import { FormSpecUploader } from "@/components/FormSpecUploader";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { getFormPreset } from "@/lib/formPresets";

export default function AadhaarPhotoPage() {
  const preset = getFormPreset("aadhaar")!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Reduce Aadhaar <span className="text-[var(--accent)]">Photo Size to KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Crop, rotate, and compress Aadhaar / UIDAI style photos toward common KB limits for online
          forms.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <FormSpecUploader
          spec={preset.photo}
          filename="aadhaar-photo"
          pickLabel="Select photo"
          actionLabel="Crop & compress to KB"
        />
      </div>
      <ShareButtons
        className="mt-6"
        title="Reduce Aadhaar photo size to KB — SizeToKB"
        text="Reduce Aadhaar photo size free on SizeToKB.in"
        path="/aadhaar-photo/"
      />
      <SeoKeywordBlock
        heading="Reduce Aadhaar photo size online free"
        paragraphs={[
          "Aadhaar photo size KB, UIDAI photo compress, reduce photo size for Aadhaar update forms.",
        ]}
        links={[
          { href: "/pan-photo/", label: "PAN photo" },
          { href: "/id-masker/", label: "Mask Aadhaar number" },
          { href: "/#custom-tool", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
