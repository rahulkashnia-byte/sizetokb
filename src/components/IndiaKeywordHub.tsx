"use client";

import Link from "next/link";

/** Dense India-intent SEO block: reduce image / signature size phrasing. */
export function IndiaKeywordHub() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="space-y-8 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            Reduce image size & signature size online free (KB)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Millions of aspirants in India search for ways to <strong>reduce image size</strong>,{" "}
            <strong>reduce photo size online free</strong>, and{" "}
            <strong>reduce signature size in KB</strong> before uploading to sarkari and entrance
            exam portals. SizeToKB is built for that exact job: compress your JPG until it fits
            20KB, 50KB, 100KB — or any min–max range from your notification — without installing an
            app.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--ink)]">
            How to reduce photo size for online form fill
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Pick your exam preset or open <Link href="/custom/" className="font-semibold text-[var(--accent-ink)]">Custom</Link>.
            Upload the photo, then download when the tool shows your file inside the allowed KB
            window. Common targets: <strong>reduce photo size to 50KB</strong>,{" "}
            <strong>reduce photo size to 20KB</strong>, compress image to 100KB, change photo size
            in KB for SSC / UPSC / NEET / Railway / IBPS uploads. Also covers{" "}
            <em>photo size kam kaise kare</em> and <em>image size reduce online free</em> searches.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--ink)]">
            How to reduce signature size for SSC, Bank & Railway
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Portals often reject signatures outside <strong>10KB–20KB</strong>. Use SizeToKB to{" "}
            <strong>reduce signature size online</strong>, compress signature to 10KB or 20KB, and
            optionally apply a high-contrast clean-up so ink stays readable. Useful for SSC CGL /
            CHSL / MTS / GD signature size, IBPS signature size, RRB signature size, and anyone
            searching <em>signature size kam kaise kare</em> or{" "}
            <strong>how to reduce signature size for SSC</strong>.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--ink)]">Popular KB targets aspirants type</h3>
          <ul className="mt-2 columns-1 gap-x-8 text-sm text-[var(--muted)] sm:columns-2">
            {[
              "reduce image size in KB",
              "reduce image size for online form",
              "compress image to 20kb / 50kb",
              "resize photo to 20kb 50kb",
              "resize signature to 10kb 20kb",
              "JPG compressor online free",
              "passport size photo maker",
              "SSC photo size & signature size",
              "UPSC photo size",
              "NEET / JEE photo size",
              "Railway RRB NTPC photo size",
              "IBPS / SBI clerk photo size",
              "decrease image size online",
              "make photo smaller KB",
              "photo for online application",
              "sarkari form photo size",
            ].map((k) => (
              <li key={k} className="mb-1 list-disc ml-4">
                {k}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/custom/" className="rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-bold text-white">
            Reduce to any KB (Custom)
          </Link>
          <Link href="/image-resizer/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
            Image size reducer
          </Link>
          <Link href="/pdf-compressor/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
            PDF shrink
          </Link>
          <Link href="/image-cropper/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
            Crop photo
          </Link>
          <Link href="/ssc-gd/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
            SSC photo / sign size
          </Link>
          <Link href="/ibps-po/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
            Bank exam photo size
          </Link>
        </div>
      </div>
    </section>
  );
}
