"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { mergeImages, type MergeLayout } from "@/lib/imageTools";

type Item = { id: string; file: File; url: string };

export default function ImageMergerPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [layout, setLayout] = useState<MergeLayout>("horizontal");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...items];
    Array.from(list).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      next.push({ id: `${file.name}-${file.size}-${Math.random()}`, file, url: URL.createObjectURL(file) });
    });
    setItems(next);
    setPreview(null);
  };

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const { blob, url } = await mergeImages(
        items.map((i) => i.file),
        layout
      );
      if (preview) URL.revokeObjectURL(preview);
      setPreview(url);
      downloadBlob(blob, "sizetokb-merged.jpg");
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
          Image <span className="text-[var(--accent)]">Merger</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Combine 2+ photos into one JPG — side by side, stacked, or grid.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["horizontal", "Side by side"],
              ["vertical", "Stacked"],
              ["grid", "Grid"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLayout(value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                layout === value
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {items.length ? `${items.length} image(s) selected` : "Add images (2+)"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {items.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {items.map((item, index) => (
              <div key={item.id} className="relative overflow-hidden rounded-xl border border-[var(--line)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="aspect-square w-full object-cover" />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded bg-black/70 px-1.5 text-[10px] font-bold text-white"
                  onClick={() => {
                    URL.revokeObjectURL(item.url);
                    setItems(items.filter((_, i) => i !== index));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {preview && (
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Merged preview" className="max-h-72 w-full object-contain bg-[var(--wash)]" />
          </div>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Merging…" : "Merge & Download"}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="Image merger online free — SizeToKB"
        text="Merge photos online free on SizeToKB.in"
        path="/image-merger/"
      />
      <SeoKeywordBlock
        heading="Merge images online free"
        paragraphs={[
          "Join photos for forms, ID sets, or side-by-side comparisons without uploading to a server.",
        ]}
        links={[
          { href: "/image-cropper/", label: "Image cropper" },
          { href: "/image-to-pdf/", label: "Image to PDF" },
          { href: "/image-reverse/", label: "Flip / rotate" },
        ]}
      />
    </div>
  );
}
