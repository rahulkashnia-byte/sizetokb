"use client";

import { useEffect, useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { getPdfPageCount, organizePdf } from "@/lib/pdfOrganize";

export default function PdfOrganizePage() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doneMsg, setDoneMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setOrder([]);
      return;
    }
    void (async () => {
      try {
        const n = await getPdfPageCount(file);
        setOrder(Array.from({ length: n }, (_, i) => i));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to read PDF");
      }
    })();
  }, [file]);

  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[index], next[j]] = [next[j], next[index]];
    setOrder(next);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { blob, pages } = await organizePdf(file, order);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-organized.pdf");
      setError(null);
      setDoneMsg(`Downloaded ${pages} page(s)`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          PDF <span className="text-[var(--accent)]">Organize</span> — Reorder & Delete Pages
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Fix page order or remove extra pages before upload. Then reduce PDF size if needed.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select PDF"}
        </button>
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {order.length > 0 && (
          <ul className="mt-4 space-y-2">
            {order.map((pageIndex, i) => (
              <li key={`${pageIndex}-${i}`} className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm">
                <span className="font-semibold">Page {pageIndex + 1}</span>
                <span className="flex gap-1">
                  <button type="button" className="rounded border border-[var(--line)] bg-white px-2 py-1 text-xs font-bold" onClick={() => move(i, -1)}>
                    ↑
                  </button>
                  <button type="button" className="rounded border border-[var(--line)] bg-white px-2 py-1 text-xs font-bold" onClick={() => move(i, 1)}>
                    ↓
                  </button>
                  <button
                    type="button"
                    className="rounded border border-[var(--line)] bg-white px-2 py-1 text-xs font-bold text-rose-700"
                    onClick={() => setOrder(order.filter((_, j) => j !== i))}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        {doneMsg && <p className="mt-3 text-center text-sm font-semibold text-[var(--accent-ink)]">{doneMsg}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy || !order.length} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Saving…" : "Download organized PDF"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="PDF reorder delete pages — SizeToKB" text="Reorder PDF pages free on SizeToKB.in" path="/pdf-organize/" />
      <SeoKeywordBlock
        heading="Reorder PDF pages online free"
        paragraphs={["Delete blank pages and rearrange certificates before portal upload."]}
        links={[
          { href: "/pdf-merge/", label: "Merge PDF" },
          { href: "/pdf-compressor/", label: "Reduce PDF size" },
          { href: "/pdf-editor/", label: "Edit PDF" },
        ]}
      />
    </div>
  );
}
