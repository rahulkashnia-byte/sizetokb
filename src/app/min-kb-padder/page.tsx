"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { padImageToMinKb } from "@/lib/minKbPad";

export default function MinKbPadderPage() {
  const [minKb, setMinKb] = useState(20);
  const [maxKb, setMaxKb] = useState(50);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setFileName(file.name);
    try {
      if (preview) URL.revokeObjectURL(preview);
      const r = await padImageToMinKb(file, { minKb, maxKb, filename: "min-kb-padded" });
      setPreview(r.url);
      setMeta(`${r.width}×${r.height} · ${r.sizeKb} KB${r.inRange ? " · in range" : ""}`);
      downloadBlob(r.blob, r.filename);
      if (!r.inRange) setError(`Best effort: ${r.sizeKb} KB (target ${minKb}–${maxKb} KB)`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Min KB <span className="text-[var(--accent)]">Padder</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Portal says file is too small? Increase photo/signature size into a min–max KB band.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Min KB
            <input
              type="number"
              value={minKb}
              onChange={(e) => setMinKb(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Max KB
            <input
              type="number"
              value={maxKb}
              onChange={(e) => setMaxKb(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {busy ? "Padding…" : fileName || "Select image (too small for portal)"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => void run(e.target.files?.[0] ?? null)}
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-48 object-contain" />
        )}
        {meta && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{meta}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
      </div>
      <ShareButtons
        className="mt-6"
        title="Min KB padder — Size to KB"
        text="Increase photo size to minimum KB for forms on Size to KB"
        path="/min-kb-padder/"
      />
      <SeoKeywordBlock
        heading="Increase photo size to minimum KB online"
        paragraphs={[
          "Some SSC, Bank and state portals reject files below a minimum KB. Pad up into the allowed band without leaving your browser.",
        ]}
        links={[
          { href: "/compress-to-50kb/", label: "Compress to 50KB" },
          { href: "/custom/", label: "Custom KB" },
          { href: "/upload-fixer/", label: "Upload fixer" },
        ]}
      />
    </div>
  );
}
