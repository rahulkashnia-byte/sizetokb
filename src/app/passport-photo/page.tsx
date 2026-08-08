"use client";

import { TrustPills } from "@/components/Features";
import { PassportPhotoMaker } from "@/components/PassportPhotoMaker";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";

export default function PassportPhotoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl lg:text-5xl">
          Passport Size <span className="text-[var(--accent)]">Photo Maker</span>
        </h1>
        <p className="mt-3 text-[var(--muted)] sm:text-lg">
          Crop precisely to country or exam standards, change background colour, fine-tune
          brightness and contrast — then download a print-ready JPG or an A4 multi-photo sheet.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8">
        <PassportPhotoMaker />
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ShareButtons
          title="Passport size photo maker — SizeToKB"
          text="Make passport photos free on SizeToKB.in"
          path="/passport-photo/"
        />
        <SeoKeywordBlock
          heading="Passport size photo maker online free"
          paragraphs={[
            "Create India passport 3.5×4.5 cm (35×45 mm at 300 DPI), USA 2×2 inch, UK/Schengen 35×45 mm, or exam portal sizes (200×230). Private browser tool — your photo never uploads to a server.",
            "Use the crop editor to frame your face, switch background to white/blue/custom, adjust lighting, and download a single photo or a sheet of 2–12 for the studio.",
          ]}
          links={[
            { href: "/#custom-tool", label: "Compress to exact KB" },
            { href: "/white-background/", label: "White background" },
            { href: "/image-cropper/", label: "Image cropper" },
          ]}
        />
      </div>
    </div>
  );
}
