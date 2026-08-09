"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { RotateControls } from "@/components/RotateControls";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob, type RotateDeg } from "@/lib/image";
import { cleanSignature } from "@/lib/extraImageTools";

export default function SignatureCleanerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [minKb, setMinKb] = useState(10);
  const [maxKb, setMaxKb] = useState(20);
  const [threshold, setThreshold] = useState(165);
  const [rotate, setRotate] = useState<RotateDeg>(0);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a signature image");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await cleanSignature(file, { minKb, maxKb, threshold, rotate });
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      setMeta(`${r.width}×${r.height} · ${r.sizeKb} KB`);
      downloadBlob(r.blob, "signature-clean.jpg");
      if (r.sizeKb > maxKb) setError(`Best effort: ${r.sizeKb} KB (still above ${maxKb} KB)`);
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
          Signature <span className="text-[var(--accent)]">Cleaner</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          High-contrast cleanup, rotate, auto-crop, and KB target for form signatures.
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
        <label className="mt-3 block text-sm font-semibold">
          Ink threshold ({threshold})
          <input
            type="range"
            min={100}
            max={220}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>
        <RotateControls className="mt-4" value={rotate} onChange={setRotate} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select signature"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setRotate(0);
            setPreview(null);
            setMeta(null);
          }}
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-40 bg-white object-contain" />
        )}
        {meta && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{meta}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Cleaning…" : "Clean & Download"}
        </button>
      </div>
      <ShareButtons
        className="mt-6"
        title="Signature cleaner — SizeToKB"
        text="Clean signatures to 10–20KB on SizeToKB.in"
        path="/signature-cleaner/"
      />
      <SeoKeywordBlock
        heading="Signature cleaner for SSC Bank Railway"
        paragraphs={[
          "Push paper noise to white, keep ink dark, rotate if needed, crop empty margins, then land near 10–20 KB.",
        ]}
        links={[
          { href: "/custom/", label: "Custom KB" },
          { href: "/color-bw/", label: "B&W convert" },
          { href: "/exam-pack/", label: "Exam ZIP pack" },
        ]}
      />
    </div>
  );
}
