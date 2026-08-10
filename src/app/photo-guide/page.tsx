"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { analyzePhotoGuide, type PhotoGuideResult } from "@/lib/photoGuide";

export default function PhotoGuidePage() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PhotoGuideResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setName(file.name);
    try {
      setResult(await analyzePhotoGuide(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
      setResult(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Photo <span className="text-[var(--accent)]">Guidelines</span> Checker
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Check brightness, blur, white background and resolution before you reduce size to KB.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {busy ? "Checking…" : name ? name : "Select photo to check"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic" className="hidden" onChange={(e) => void run(e.target.files?.[0] ?? null)} />
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        {result && (
          <div className="mt-5 space-y-4">
            <p className="text-center text-2xl font-extrabold text-[var(--ink)]">
              Score {result.score}/100
            </p>
            <p className="text-center text-sm text-[var(--muted)]">
              {result.width}×{result.height} · {result.sizeKb} KB · aspect {result.aspect}
            </p>
            <ul className="space-y-2">
              {result.checks.map((c) => (
                <li
                  key={c.label}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    c.ok ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <span className="font-bold">{c.ok ? "✓" : "!"} {c.label}</span>
                  <span className="mt-0.5 block text-[var(--muted)]">{c.detail}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <Link href="/#custom-tool" className="rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-bold text-white">
                Reduce to KB
              </Link>
              <Link href="/white-background/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
                White background
              </Link>
              <Link href="/passport-photo/" className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold">
                Passport crop
              </Link>
            </div>
          </div>
        )}
      </div>
      <ShareButtons className="mt-6" title="Photo guidelines checker — Size to KB" text="Check exam photo quality free on Size to KB" path="/photo-guide/" />
      <SeoKeywordBlock
        heading="Check passport photo quality online free"
        paragraphs={["Validate form photo before upload — then reduce image size to the exact KB."]}
        links={[
          { href: "/image-checker/", label: "Pixel / KB checker" },
          { href: "/upload-fixer/", label: "Upload error fixer" },
        ]}
      />
    </div>
  );
}
