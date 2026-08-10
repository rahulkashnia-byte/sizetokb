"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { pdfToDocx } from "@/lib/docsConvert";

export default function PdfToWordPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a PDF first");
      return;
    }
    setBusy(true);
    setError(null);
    setStats(null);
    try {
      const { blob, filename, pages, chars } = await pdfToDocx(file, setProgress);
      downloadBlob(blob, filename);
      setStats(`${pages} page(s) · ${chars.toLocaleString()} characters extracted`);
      if (chars < 20) {
        setError(
          "Little or no text found — this PDF is likely scanned. Try Image→PDF tools or an OCR app for scans."
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          PDF to <span className="text-[var(--accent)]">Word</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Extract text from a PDF into an editable .docx — runs in your browser.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
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
            setStats(null);
            setError(null);
          }}
        />
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {stats && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{stats}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Converting…" : "Convert to Word (.docx)"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Layout and images are not preserved 1:1. Best for text-based PDFs (not pure scans).
        </p>
      </div>

      <ShareButtons
        className="mt-6"
        title="PDF to Word online free — Size to KB"
        text="Convert PDF to Word free on Size to KB"
        path="/pdf-to-word/"
      />
      <SeoKeywordBlock
        heading="PDF to Word converter online free"
        paragraphs={[
          "Convert PDF to DOCX for editing notification text, forms notes, and typed documents. Scanned marksheets need OCR separately.",
        ]}
        links={[
          { href: "/word-to-pdf/", label: "Word to PDF" },
          { href: "/pdf-compressor/", label: "PDF shrink" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
        ]}
      />
    </div>
  );
}
