"use client";

import { BiodataMaker } from "@/components/BiodataMaker";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";

export default function BiodataPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Sarkari <span className="text-[var(--accent)]">Biodata</span> / Resume Maker
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
          Fill photo, education, skills and declaration — then Print / Save as PDF. Draft stays in
          your browser; nothing uploads to our servers.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8">
        <BiodataMaker />
      </div>

      <ShareButtons
        className="mt-8"
        title="Free sarkari biodata & resume maker — SizeToKB"
        text="Make print-ready biodata free on SizeToKB.in"
        path="/biodata/"
      />
      <SeoKeywordBlock
        heading="Free biodata maker for government jobs"
        paragraphs={[
          "Search: biodata maker, sarkari biodata format, resume maker online free, bio data with photo for SSC Bank Railway Police. Pair with passport photo and signature KB tools before form upload.",
        ]}
        links={[
          { href: "/passport-photo/", label: "Passport photo maker" },
          { href: "/compress-to-50kb/", label: "Compress photo to 50KB" },
          { href: "/signature-cleaner/", label: "Signature 10–20KB" },
          { href: "/form-wizard/", label: "Form photo pack" },
        ]}
      />
    </div>
  );
}
