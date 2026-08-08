"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { makePassportPhoto, type PassportSize } from "@/lib/extraImageTools";

const SIZES: { value: PassportSize; label: string }[] = [
  { value: "india-3.5x4.5", label: "India 3.5×4.5 cm" },
  { value: "us-2x2", label: "2×2 inch" },
  { value: "india-2x2-inch", label: "2×2 inch square" },
];

export default function PassportPhotoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState<PassportSize>("india-3.5x4.5");
  const [maxKb, setMaxKb] = useState(100);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
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
      const r = await makePassportPhoto(file, size, maxKb);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      setMeta(`${r.label} · ${r.width}×${r.height} px · ${r.sizeKb} KB`);
      downloadBlob(r.blob, "passport-photo.jpg");
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
          Passport <span className="text-[var(--accent)]">Photo</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Crop to standard sizes on a white background — ready for forms.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSize(s.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                size === s.value ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold">
          Max size (KB)
          <input
            type="number"
            value={maxKb}
            onChange={(e) => setMaxKb(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select photo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setError(null);
          }}
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-64 border border-[var(--line)] bg-white object-contain" />
        )}
        {meta && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{meta}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Making…" : "Make & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Passport size photo maker — SizeToKB" text="Make passport photos free on SizeToKB.in" path="/passport-photo/" />
      <SeoKeywordBlock
        heading="Passport size photo maker online free"
        paragraphs={["Create 3.5×4.5 cm or 2×2 inch photos with white background, then compress further with Custom KB if needed."]}
        links={[
          { href: "/white-background/", label: "White background" },
          { href: "/custom/", label: "Custom KB" },
          { href: "/image-cropper/", label: "Cropper" },
        ]}
      />
    </div>
  );
}
