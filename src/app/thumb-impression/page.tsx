"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob, processToSpec } from "@/lib/image";
import type { ProcessedImage } from "@/lib/types";
import { getFormPreset } from "@/lib/formPresets";

export default function ThumbImpressionPage() {
  const preset = getFormPreset("thumb")!;
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a thumb impression image");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result?.url) URL.revokeObjectURL(result.url);
      const out = await processToSpec(file, preset.photo, {
        filename: "thumb-impression",
        forceScan: true,
      });
      setResult(out);
      downloadBlob(out.blob, out.filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Reduce Thumb Impression <span className="text-[var(--accent)]">Size to KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Clean and compress thumb impressions for police / bank / exam forms (typically 10–40 KB).
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select thumb impression"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {result && (
          <p className="mt-3 text-center text-sm font-bold text-[var(--accent-ink)]">
            {result.sizeKb} KB · {result.width}×{result.height}
          </p>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Reducing…" : "Clean, Reduce & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Reduce thumb impression size to KB — SizeToKB" text="Compress thumb impression free on SizeToKB.in" path="/thumb-impression/" />
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
