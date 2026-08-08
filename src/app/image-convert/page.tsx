"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { convertImageFormat, type ConvertFormat } from "@/lib/extraImageTools";

const FORMATS: { value: ConvertFormat; label: string; ext: string }[] = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

export default function ImageConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ConvertFormat>("image/jpeg");
  const [busy, setBusy] = useState(false);
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
      const r = await convertImageFormat(file, format);
      setInfo(`${r.sizeKb} KB · ${r.ext.toUpperCase()}`);
      downloadBlob(r.blob, file.name.replace(/\.[^.]+$/, "") + `.${r.ext}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Convert failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Format <span className="text-[var(--accent)]">Convert</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">JPG ↔ PNG ↔ WebP in the browser.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFormat(f.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${format === f.value ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"}`}
            >
              → {f.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic,.heif" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {info && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Converting…" : "Convert & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="JPG PNG WebP converter — SizeToKB" text="Convert image formats free on SizeToKB.in" path="/image-convert/" />
      <SeoKeywordBlock
        heading="JPG PNG WebP converter online free"
        paragraphs={["Convert formats for portals that only accept JPG, or keep PNG for transparency."]}
        links={[
          { href: "/heic-to-jpg/", label: "HEIC to JPG" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
