"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { compressPdfFile } from "@/lib/pdf";

export default function PdfCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [maxKb, setMaxKb] = useState(200);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultKb, setResultKb] = useState<number | null>(null);
  const [origKb, setOrigKb] = useState<number | null>(null);
  const [pages, setPages] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a PDF first");
      return;
    }
    if (maxKb < 20) {
      setError("Target should be at least 20 KB");
      return;
    }
    setBusy(true);
    setError(null);
    setProgress(null);
    try {
      setOrigKb(Math.round((file.size / 1024) * 10) / 10);
      const { blob, sizeKb, pages: pageCount } = await compressPdfFile(file, maxKb, setProgress);
      setResultKb(sizeKb);
      setPages(pageCount);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-compressed.pdf");
      if (sizeKb > maxKb) {
        setError(
          `Best effort: ${sizeKb} KB (still above ${maxKb} KB). Try a higher target, or fewer pages / Image→PDF for photo-only files.`
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          PDF <span className="text-[var(--accent)]">Shrink</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Actually recompresses pages (render → JPEG → rebuild) to hit your target KB — in the
          browser.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Target max size (KB)
          <input
            type="number"
            value={maxKb}
            onChange={(e) => setMaxKb(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:bg-white"
          />
        </label>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select PDF"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setResultKb(null);
            setPages(null);
            setError(null);
          }}
        />

        {origKb != null && resultKb != null && (
          <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">
            {origKb} KB → {resultKb} KB
            {pages != null ? ` · ${pages} page${pages === 1 ? "" : "s"}` : ""}
          </p>
        )}
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Shrinking…" : "Shrink & Download"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Tip: scanned marksheets/photos compress well. Already-tiny text PDFs may not shrink much.
        </p>
      </div>

      <ShareButtons
        className="mt-6"
        title="PDF compressor / shrink online free — Size to KB"
        text="Shrink PDF size in KB free for exam uploads on Size to KB"
        path="/pdf-compressor/"
      />

      <SeoKeywordBlock
        heading="PDF compressor online free — reduce PDF size in KB"
        paragraphs={[
          "Compress PDF online free for government exam and job application uploads. Search intent we cover: PDF compressor online free, reduce PDF size online, compress PDF to KB, PDF size reducer India, and exam PDF compressor.",
          "SizeToKB re-renders each page and rebuilds the file so image-heavy PDFs actually get smaller.",
        ]}
        links={[
          { href: "/image-to-pdf/", label: "Image to PDF" },
          { href: "/pdf-to-word/", label: "PDF to Word" },
          { href: "/word-to-pdf/", label: "Word to PDF" },
        ]}
      />
    </div>
  );
}
