"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { reverseImage, type ReverseMode } from "@/lib/imageTools";

const MODES: { value: ReverseMode; label: string }[] = [
  { value: "flip-h", label: "Flip horizontal" },
  { value: "flip-v", label: "Flip vertical" },
  { value: "rotate-90", label: "Rotate 90°" },
  { value: "rotate-180", label: "Rotate 180°" },
  { value: "rotate-270", label: "Rotate 270°" },
];

export default function ImageReversePage() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<ReverseMode>("flip-h");
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File | null) => {
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setFile(f);
    setOutUrl(null);
    setError(null);
    setSrcUrl(f ? URL.createObjectURL(f) : null);
  };

  const run = async () => {
    if (!file) {
      setError("Choose an image first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob, url } = await reverseImage(file, mode);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url);
      downloadBlob(blob, file.name.replace(/\.\w+$/, "") + "-edit.jpg");
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
          Flip / <span className="text-[var(--accent)]">Rotate</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Mirror or rotate photos before resizing to exam KB limits.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                mode === m.value
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-8 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0] ?? null)}
        />

        {(srcUrl || outUrl) && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {srcUrl && (
              <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--wash)]">
                <p className="px-2 py-1 text-center text-[10px] font-bold uppercase text-[var(--muted)]">
                  Original
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={srcUrl} alt="" className="mx-auto max-h-56 object-contain" />
              </div>
            )}
            {outUrl && (
              <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--wash)]">
                <p className="px-2 py-1 text-center text-[10px] font-bold uppercase text-[var(--muted)]">
                  Result
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={outUrl} alt="" className="mx-auto max-h-56 object-contain" />
              </div>
            )}
          </div>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Working…" : "Apply & Download"}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="Flip rotate image online free — SizeToKB"
        text="Flip or rotate photos free on SizeToKB.in"
        path="/image-reverse/"
      />
      <SeoKeywordBlock
        heading="Reverse / flip image online"
        paragraphs={["Fix mirrored camera photos, then compress to the exact KB your form needs."]}
        links={[
          { href: "/image-cropper/", label: "Image cropper" },
          { href: "/image-merger/", label: "Image merger" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
