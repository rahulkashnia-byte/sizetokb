"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { bulkReduceToZip } from "@/lib/bulkReduce";

export default function BulkReducePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [minKb, setMinKb] = useState(20);
  const [maxKb, setMaxKb] = useState(50);
  const [scan, setScan] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [results, setResults] = useState<{ name: string; sizeKb: number; inRange: boolean }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const { blob, results: r } = await bulkReduceToZip({
        files,
        minKb,
        maxKb,
        scanEffect: scan,
        onProgress: setProgress,
      });
      setResults(r);
      downloadBlob(blob, "sizetokb-bulk-reduced.zip");
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
          Bulk <span className="text-[var(--accent)]">Reduce</span> Image Size to KB
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Reduce many photos or signatures to the same min–max KB and download one ZIP — free &
          private.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Min KB
            <input type="number" value={minKb} onChange={(e) => setMinKb(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
          </label>
          <label className="text-sm font-semibold">
            Max KB
            <input type="number" value={maxKb} onChange={(e) => setMaxKb(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={scan} onChange={(e) => setScan(e.target.checked)} />
          Signature clean-up (high contrast)
        </label>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {files.length ? `${files.length} image(s) selected` : "Add multiple images"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {results && (
          <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto text-xs text-[var(--muted)]">
            {results.map((r) => (
              <li key={r.name}>
                {r.name} — {r.sizeKb} KB {r.inRange ? "✓" : "(check range)"}
              </li>
            ))}
          </ul>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Reducing…" : "Reduce all & Download ZIP"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Bulk reduce image size to KB — SizeToKB" text="Bulk compress photos to exact KB free on SizeToKB.in" path="/bulk-reduce/" />
      <SeoKeywordBlock
        heading="Bulk reduce image size online free to KB"
        paragraphs={[
          "Compress multiple photos to 20KB, 50KB or any custom range in one go. Ideal for coaching batches and family form fills.",
        ]}
        links={[
          { href: "/#custom-tool", label: "Single reduce to KB" },
          { href: "/form-wizard/", label: "Form pack wizard" },
          { href: "/signature-cleaner/", label: "Reduce signature size" },
        ]}
      />
    </div>
  );
}
