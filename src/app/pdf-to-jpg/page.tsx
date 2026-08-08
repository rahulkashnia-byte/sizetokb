"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { pdfToImages, pdfToImagesZip, type PdfImageFormat } from "@/lib/pdfConvert";

export default function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<PdfImageFormat>("jpg");
  const [scale, setScale] = useState(2);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ url: string; name: string; sizeKb: number }[]>([]);
  const [stats, setStats] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearPreviews = () => {
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
  };

  const run = async (asZip: boolean) => {
    if (!file) {
      setError("Choose a PDF first");
      return;
    }
    setBusy(true);
    setError(null);
    setStats(null);
    clearPreviews();
    try {
      if (asZip) {
        const { blob, images, pages } = await pdfToImagesZip(file, {
          format,
          scale,
          password: password || undefined,
          onProgress: setProgress,
        });
        downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + `-pages.zip`);
        setStats(`${pages} page(s) → ZIP (${images.length} images)`);
        setPreviews(
          images.slice(0, 6).map((img) => ({
            url: URL.createObjectURL(img.blob),
            name: img.filename,
            sizeKb: img.sizeKb,
          }))
        );
      } else {
        const { images, pages } = await pdfToImages(file, {
          format,
          scale,
          password: password || undefined,
          onProgress: setProgress,
        });
        for (const img of images) downloadBlob(img.blob, img.filename);
        setStats(`${pages} page(s) downloaded as ${format.toUpperCase()}`);
        setPreviews(
          images.slice(0, 6).map((img) => ({
            url: URL.createObjectURL(img.blob),
            name: img.filename,
            sizeKb: img.sizeKb,
          }))
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
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          PDF to <span className="text-[var(--accent)]">JPG</span> / Image
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Convert PDF pages to JPG or PNG online free — one image per page, private in your browser.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm font-semibold">
            Format
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as PdfImageFormat)}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            >
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Quality / scale
            <select
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            >
              <option value={1}>Standard (1×)</option>
              <option value={1.5}>Sharp (1.5×)</option>
              <option value={2}>High (2×)</option>
              <option value={2.5}>Print (2.5×)</option>
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Password (if locked)
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Optional"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>

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
            setStats(null);
            setError(null);
            clearPreviews();
          }}
        />

        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {stats && <p className="mt-3 text-center text-sm font-semibold text-[var(--accent-ink)]">{stats}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {previews.map((p) => (
              <figure key={p.url} className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--wash)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.name} className="mx-auto max-h-36 w-full object-contain p-2" />
                <figcaption className="border-t border-[var(--line)] px-2 py-1 text-center text-[10px] text-[var(--muted)]">
                  {p.sizeKb} KB
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => void run(false)}
            className="flex-1 rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
          >
            {busy ? "Converting…" : `Convert to ${format.toUpperCase()}`}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void run(true)}
            className="flex-1 rounded-xl border border-[var(--line)] py-3 text-sm font-bold disabled:opacity-60"
          >
            Download ZIP
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Each page becomes one image. Multi-page PDFs download separately or as one ZIP.
        </p>
      </div>

      <ShareButtons
        className="mt-6"
        title="PDF to JPG online free — SizeToKB"
        text="Convert PDF to JPG free on SizeToKB.in"
        path="/pdf-to-jpg/"
      />
      <SeoKeywordBlock
        heading="PDF to JPG converter online free"
        paragraphs={[
          "Search: PDF to JPG, PDF to image, convert PDF pages to JPEG, PDF to PNG online free. Use high scale for print-quality page images, then reduce image size to KB if a portal needs a small photo.",
        ]}
        links={[
          { href: "/image-to-pdf/", label: "JPG to PDF" },
          { href: "/pdf-unlock/", label: "Unlock PDF password" },
          { href: "/#custom-tool", label: "Reduce image to KB" },
          { href: "/pdf-compressor/", label: "Compress PDF" },
        ]}
      />
    </div>
  );
}
