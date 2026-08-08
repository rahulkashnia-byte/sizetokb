"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { watermarkImage, watermarkPdf } from "@/lib/watermark";

export default function WatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("FOR UPLOAD ONLY");
  const [opacity, setOpacity] = useState(0.28);
  const [tiled, setTiled] = useState(true);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf = !!file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));

  const run = async () => {
    if (!file) {
      setError("Choose an image or PDF");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const opts = {
        text: text || "FOR UPLOAD ONLY",
        opacity,
        color: "#991b1b",
        fontSize: 42,
        angle: -28,
        tiled,
      };
      if (isPdf) {
        const blob = await watermarkPdf(file, opts, setProgress);
        downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
      } else {
        const r = await watermarkImage(file, opts);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(r.url);
        downloadBlob(r.blob, "watermarked.jpg");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Watermark Photo / PDF — <span className="text-[var(--accent)]">FOR UPLOAD ONLY</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Stamp documents before sharing so copies are marked for form upload use.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Stamp text
          <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
        </label>
        <label className="mt-3 block text-sm font-semibold">
          Opacity ({opacity.toFixed(2)})
          <input type="range" min={0.1} max={0.6} step={0.02} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={tiled} onChange={(e) => setTiled(e.target.checked)} />
          Tile across page
        </label>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select image or PDF"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,application/pdf,.heic" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-64 object-contain" />
        )}
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Stamping…" : "Add watermark & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Watermark FOR UPLOAD ONLY — SizeToKB" text="Stamp photos & PDFs free on SizeToKB.in" path="/watermark/" />
      <SeoKeywordBlock
        heading="Add watermark online free for upload documents"
        paragraphs={["Mark certificates and photos as FOR UPLOAD ONLY before sharing on WhatsApp."]}
        links={[
          { href: "/id-masker/", label: "ID masker" },
          { href: "/pdf-compressor/", label: "Reduce PDF size" },
        ]}
      />
    </div>
  );
}
