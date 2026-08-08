"use client";

import { useState } from "react";
import Link from "next/link";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { suggestFixes, type FixSuggestion } from "@/lib/uploadFixer";

export default function UploadFixerPage() {
  const [text, setText] = useState("");
  const [hits, setHits] = useState<FixSuggestion[]>([]);

  const analyze = () => setHits(suggestFixes(text));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Portal Upload <span className="text-[var(--accent)]">Error Fixer</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Paste the reject message (file too large, invalid format, HEIC…) — we point you to the
          right reduce-to-KB tool.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Error / reject text from portal
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="e.g. File size should be less than 50KB / Only JPG allowed / HEIC not supported"
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {["File size should be less than 50KB", "Only JPG/JPEG allowed", "HEIC not supported", "Signature size 10KB to 20KB", "Background must be white"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setText(s);
                setHits(suggestFixes(s));
              }}
              className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-2 py-1 text-[11px] font-semibold"
            >
              {s}
            </button>
          ))}
        </div>
        <button type="button" onClick={analyze} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white">
          Suggest fixes
        </button>
        {hits.length > 0 && (
          <ul className="mt-5 space-y-3">
            {hits.map((h) => (
              <li key={h.href} className="rounded-2xl border border-[var(--line)] bg-[var(--wash)] p-4">
                <p className="font-bold text-[var(--ink)]">{h.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{h.reason}</p>
                <Link href={h.href} className="mt-3 inline-flex rounded-lg bg-[var(--ink)] px-3 py-2 text-xs font-bold text-white">
                  {h.cta} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ShareButtons className="mt-6" title="Fix exam portal upload errors — SizeToKB" text="Fix photo upload reject errors on SizeToKB.in" path="/upload-fixer/" />
      <SeoKeywordBlock
        heading="Fix photo upload error file size too large"
        paragraphs={[
          "Common searches: photo upload failed file size, signature size not accepted, HEIC not supported, reduce image size for online form.",
        ]}
        links={[
          { href: "/#custom-tool", label: "Reduce to KB" },
          { href: "/heic-to-jpg/", label: "HEIC to JPG" },
          { href: "/photo-guide/", label: "Photo guide" },
        ]}
      />
    </div>
  );
}
