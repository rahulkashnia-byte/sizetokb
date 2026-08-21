"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { imagesToPdf } from "@/lib/pdf";

type Item = { id: string; file: File; url: string };

export default function ImageToPdfPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [maxKb, setMaxKb] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultKb, setResultKb] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...items];
    Array.from(list).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      next.push({ id: `${file.name}-${file.size}-${Math.random()}`, file, url: URL.createObjectURL(file) });
    });
    setItems(next);
    setResultKb(null);
  };

  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[index], copy[j]] = [copy[j], copy[index]];
    setItems(copy);
  };

  const build = async () => {
    if (!items.length) {
      setError("Add at least one image");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob, sizeKb } = await imagesToPdf(
        items.map((i) => ({ blob: i.file, name: i.file.name })),
        { maxKb: maxKb ? Number(maxKb) : undefined }
      );
      setResultKb(sizeKb);
      downloadBlob(blob, "sizetokb-images.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Image to <span className="text-[var(--accent)]">PDF</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Combine multiple photos into one PDF. Reorder pages and optionally target a max KB.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Target max size (KB, optional)
          <input
            type="number"
            value={maxKb}
            onChange={(e) => setMaxKb(e.target.value)}
            placeholder="e.g. 200"
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:bg-white"
          />
        </label>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          Add images
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        {items.length > 0 && (
          <ul className="mt-4 space-y-2">
            {items.map((item, i) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-[var(--line)] px-3 py-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <span className="flex-1 truncate text-sm">{item.file.name}</span>
                <button type="button" className="text-xs font-bold" onClick={() => move(i, -1)}>
                  ↑
                </button>
                <button type="button" className="text-xs font-bold" onClick={() => move(i, 1)}>
                  ↓
                </button>
                <button
                  type="button"
                  className="text-xs font-bold text-rose-600"
                  onClick={() => setItems(items.filter((x) => x.id !== item.id))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && <p className="mt-3 text-center text-sm text-rose-600">{error}</p>}
        {resultKb != null && (
          <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">Built PDF · {resultKb} KB</p>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={() => void build()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Building…" : "Download PDF"}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="Image to PDF converter — Size to KB"
        text="Convert photos to PDF free for exam documents on Size to KB"
        path="/image-to-pdf/"
      />

      <SeoKeywordBlock
        heading="Image to PDF converter free for exam documents"
        paragraphs={[
          "Convert JPG/PNG photos to a single PDF for certificates, marksheets and multi-page exam uploads. Users searching image to PDF converter, JPG to PDF online free, and photos to PDF India can reorder pages and optionally target a max PDF size in KB.",
          "Pair with our PDF compressor if the portal has a strict upload limit.",
        ]}
        links={[
          { href: "/jpg-to-pdf-kb/", label: "JPG to PDF exact KB bands" },
          { href: "/pdf-compressor/", label: "PDF compressor" },
          { href: "/image-resizer/", label: "Image resizer KB" },
        ]}
      />
    </div>
  );
}
