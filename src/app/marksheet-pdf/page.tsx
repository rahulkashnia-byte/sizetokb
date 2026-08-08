"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { compressPdfFile } from "@/lib/pdf";

const PRESETS = [
  { label: "200 KB (common)", kb: 200 },
  { label: "300 KB", kb: 300 },
  { label: "500 KB", kb: 500 },
  { label: "1 MB (1024 KB)", kb: 1024 },
];

export default function MarksheetPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [maxKb, setMaxKb] = useState(200);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a marksheet PDF");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const orig = Math.round((file.size / 1024) * 10) / 10;
      const { blob, sizeKb, pages } = await compressPdfFile(file, maxKb, setProgress);
      setMeta(`${orig} KB → ${sizeKb} KB · ${pages} page(s)`);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-marksheet-reduced.pdf");
      if (sizeKb > maxKb) {
        setError(`Best effort ${sizeKb} KB (still above ${maxKb} KB). Try a higher target.`);
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
          Reduce Marksheet <span className="text-[var(--accent)]">PDF Size to KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Compress scanned marksheet / certificate PDFs toward 200KB, 500KB or your portal limit.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.kb}
              type="button"
              onClick={() => setMaxKb(p.kb)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                maxKb === p.kb ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold">
          Custom max KB
          <input type="number" value={maxKb} onChange={(e) => setMaxKb(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
        </label>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select marksheet PDF"}
        </button>
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {meta && <p className="mt-3 text-center text-sm font-bold text-[var(--accent-ink)]">{meta}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Reducing…" : "Reduce PDF & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Reduce marksheet PDF size to KB — SizeToKB" text="Compress marksheet PDF free on SizeToKB.in" path="/marksheet-pdf/" />
      <SeoKeywordBlock
        heading="Reduce marksheet PDF size online free to 200KB 500KB"
        paragraphs={["Compress certificate PDF for scholarship and job portals. Scanned marksheets shrink best."]}
        links={[
          { href: "/pdf-compressor/", label: "PDF compressor" },
          { href: "/pdf-organize/", label: "Reorder PDF pages" },
          { href: "/watermark/", label: "Watermark PDF" },
        ]}
      />
    </div>
  );
}
