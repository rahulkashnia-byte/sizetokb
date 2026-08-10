"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { mergePdfs } from "@/lib/pdfTools";

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const { blob, pages } = await mergePdfs(files);
      setInfo(`Merged ${files.length} files · ${pages} pages`);
      downloadBlob(blob, "sizetokb-merged.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Merge <span className="text-[var(--accent)]">PDF</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Combine certificates into one PDF for portal uploads.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {files.length ? `${files.length} PDF(s) selected` : "Add PDFs (2+)"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            const list = Array.from(e.target.files ?? []);
            setFiles((prev) => [...prev, ...list]);
            e.target.value = "";
          }}
        />
        {files.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex justify-between gap-2">
                <span className="truncate">{i + 1}. {f.name}</span>
                <button type="button" className="text-xs font-bold text-[var(--accent-ink)]" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {info && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Merging…" : "Merge & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Merge PDF online free — Size to KB" text="Merge PDFs free on Size to KB" path="/pdf-merge/" />
      <SeoKeywordBlock
        heading="Merge PDF online free"
        paragraphs={["Join marksheets, caste certificates, and ID scans into one upload-ready PDF."]}
        links={[
          { href: "/pdf-split/", label: "Split PDF" },
          { href: "/pdf-compressor/", label: "PDF shrink" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
        ]}
      />
    </div>
  );
}
