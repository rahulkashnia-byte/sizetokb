"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { whiteBackground } from "@/lib/extraImageTools";

export default function WhiteBackgroundPage() {
  const [file, setFile] = useState<File | null>(null);
  const [tolerance, setTolerance] = useState(42);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a photo first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await whiteBackground(file, tolerance);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      downloadBlob(r.blob, "white-bg.jpg");
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
          White <span className="text-[var(--accent)]">Background</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Flood plain backgrounds to white — best for studio / wall photos, not busy scenes.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Sensitivity ({tolerance})
          <input type="range" min={20} max={80} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select photo"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic,.heif" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-72 object-contain" />
        )}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Processing…" : "Whitened Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="White background photo maker — Size to KB" text="White background photos free on Size to KB" path="/white-background/" />
      <SeoKeywordBlock
        heading="White background for passport photos"
        paragraphs={["Not a full AI cutout — edge flood works well on uniform backgrounds common in form photos."]}
        links={[
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
