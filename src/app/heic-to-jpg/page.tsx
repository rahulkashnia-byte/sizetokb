"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { heicToJpg } from "@/lib/extraImageTools";

export default function HeicToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a HEIC/HEIF photo");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await heicToJpg(file);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      setInfo(`${r.sizeKb} KB JPG`);
      downloadBlob(r.blob, file.name.replace(/\.(heic|heif)$/i, "") + ".jpg");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed — try another photo");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          HEIC to <span className="text-[var(--accent)]">JPG</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Convert iPhone photos so exam portals accept them.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select HEIC / HEIF"}
        </button>
        <input ref={inputRef} type="file" accept=".heic,.heif,image/heic,image/heif,image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-64 object-contain" />
        )}
        {info && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Converting…" : "Convert & Download JPG"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="HEIC to JPG converter — SizeToKB" text="Convert HEIC to JPG free on SizeToKB.in" path="/heic-to-jpg/" />
      <SeoKeywordBlock
        heading="HEIC to JPG online free"
        paragraphs={["Many Indian exam portals reject HEIC. Convert first, then resize to the required KB."]}
        links={[
          { href: "/custom/", label: "Custom KB" },
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/image-convert/", label: "JPG/PNG/WebP" },
        ]}
      />
    </div>
  );
}
