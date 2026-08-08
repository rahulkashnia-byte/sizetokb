"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob, processToSpec } from "@/lib/image";
import type { ProcessedImage } from "@/lib/types";
import { getFormPreset } from "@/lib/formPresets";

export default function AadhaarPhotoPage() {
  const preset = getFormPreset("aadhaar")!;
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [origKb, setOrigKb] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose an image");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setOrigKb(Math.round((file.size / 1024) * 10) / 10);
      if (result?.url) URL.revokeObjectURL(result.url);
      const out = await processToSpec(file, preset.photo, { filename: "aadhaar-photo" });
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
          Reduce Aadhaar <span className="text-[var(--accent)]">Photo Size to KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Compress Aadhaar / UIDAI style photos toward common KB limits for online forms.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-center text-sm text-[var(--accent-ink)]">
          Target {preset.photo.minKb}–{preset.photo.maxKb} KB · {preset.photo.width}×{preset.photo.height} px
        </p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-4 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select photo"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {origKb != null && result && (
          <p className="mt-3 text-center text-sm font-bold text-[var(--ink)]">
            {origKb} KB → {result.sizeKb} KB {result.inRange ? "✓" : ""}
          </p>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Reducing…" : "Reduce & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Reduce Aadhaar photo size to KB — SizeToKB" text="Reduce Aadhaar photo size free on SizeToKB.in" path="/aadhaar-photo/" />
      <SeoKeywordBlock
        heading="Reduce Aadhaar photo size online free"
        paragraphs={["Aadhaar photo size KB, UIDAI photo compress, reduce photo size for Aadhaar update forms."]}
        links={[
          { href: "/pan-photo/", label: "PAN photo" },
          { href: "/id-masker/", label: "Mask Aadhaar number" },
          { href: "/#custom-tool", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
