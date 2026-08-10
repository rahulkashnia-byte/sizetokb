"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { toGrayscaleOrBw, type BwMode } from "@/lib/extraImageTools";

export default function ColorBwPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<BwMode>("grayscale");
  const [threshold, setThreshold] = useState(140);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
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
      const r = await toGrayscaleOrBw(file, mode, threshold);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      setInfo(`${r.sizeKb} KB`);
      downloadBlob(r.blob, file.name.replace(/\.[^.]+$/, "") + `-${mode}.jpg`);
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
          Color → <span className="text-[var(--accent)]">B&W</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Grayscale or pure black-and-white for forms that require it.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode("grayscale")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${mode === "grayscale" ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"}`}>
            Grayscale
          </button>
          <button type="button" onClick={() => setMode("bw")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${mode === "bw" ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"}`}>
            Pure B&W
          </button>
        </div>
        {mode === "bw" && (
          <label className="mt-4 block text-sm font-semibold">
            Threshold ({threshold})
            <input type="range" min={60} max={200} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="mt-2 w-full" />
          </label>
        )}
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-64 object-contain" />
        )}
        {info && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Converting…" : "Convert & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Color to black and white — Size to KB" text="Convert photos to B&W free on Size to KB" path="/color-bw/" />
      <SeoKeywordBlock
        heading="Color to black and white online free"
        paragraphs={["Useful when a notification asks for black-and-white photograph or signature."]}
        links={[
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
