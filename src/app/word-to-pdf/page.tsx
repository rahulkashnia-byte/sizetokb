"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { docxToPdf } from "@/lib/docsConvert";

export default function WordToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a .docx file first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob, filename } = await docxToPdf(file, setProgress);
      downloadBlob(blob, filename);
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
          Word to <span className="text-[var(--accent)]">PDF</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Turn a .docx into a PDF for uploads — private, browser-only.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select Word (.docx)"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setError(null);
          }}
        />
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Converting…" : "Convert to PDF"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Complex Word layouts may differ from Microsoft Word. Then use PDF Shrink if you need a KB
          cap.
        </p>
      </div>

      <ShareButtons
        className="mt-6"
        title="Word to PDF online free — Size to KB"
        text="Convert Word to PDF free on Size to KB"
        path="/word-to-pdf/"
      />
      <SeoKeywordBlock
        heading="Word to PDF converter online free"
        paragraphs={[
          "Convert DOCX to PDF for government portals that only accept PDF. Follow up with PDF compressor if the portal has a size limit.",
        ]}
        links={[
          { href: "/pdf-to-word/", label: "PDF to Word" },
          { href: "/pdf-compressor/", label: "PDF shrink" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
        ]}
      />
    </div>
  );
}
