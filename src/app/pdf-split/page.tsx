"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { splitPdf } from "@/lib/pdfTools";

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"each" | "range">("each");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a PDF first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blobs, pages } = await splitPdf(file, { mode, from, to });
      setInfo(`${pages} page source · downloaded ${blobs.length} file(s)`);
      for (const b of blobs) downloadBlob(b.blob, b.filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Split failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Split <span className="text-[var(--accent)]">PDF</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Extract every page or a page range.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode("each")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${mode === "each" ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"}`}>
            One PDF per page
          </button>
          <button type="button" onClick={() => setMode("range")} className={`rounded-lg px-3 py-2 text-xs font-semibold ${mode === "range" ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-[var(--wash)]"}`}>
            Page range
          </button>
        </div>
        {mode === "range" && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold">
              From
              <input type="number" min={1} value={from} onChange={(e) => setFrom(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm font-semibold">
              To
              <input type="number" min={1} value={to} onChange={(e) => setTo(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
            </label>
          </div>
        )}
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select PDF"}
        </button>
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {info && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Splitting…" : "Split & Download"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">Browsers may block multiple downloads — allow pop-ups if needed.</p>
      </div>
      <ShareButtons className="mt-6" title="Split PDF online free — SizeToKB" text="Split PDFs free on SizeToKB.in" path="/pdf-split/" />
      <SeoKeywordBlock
        heading="Split PDF online free"
        paragraphs={["Pull out single pages from multi-page certificate scans."]}
        links={[
          { href: "/pdf-merge/", label: "Merge PDF" },
          { href: "/pdf-compressor/", label: "PDF shrink" },
        ]}
      />
    </div>
  );
}
