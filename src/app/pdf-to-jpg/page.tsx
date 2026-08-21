"use client";

import { useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { pdfToImages, pdfToImagesZip, type PdfImageFormat } from "@/lib/pdfConvert";

const MAX_PRESETS: { label: string; maxKb?: number }[] = [
  { label: "No KB cap", maxKb: undefined },
  { label: "PDF → JPG 50KB", maxKb: 50 },
  { label: "Under 100KB", maxKb: 100 },
  { label: "Under 200KB", maxKb: 200 },
];

const FAQS = [
  {
    q: "How do I convert PDF to JPG 50KB?",
    a: "Select PDF → JPG 50KB, upload your PDF, then Convert. Each page is compressed toward 50KB (JPG). Free Download the images or ZIP.",
  },
  {
    q: "Can I convert PDF to JPG under 100KB?",
    a: "Yes. Choose Under 100KB (or 200KB). We lower JPEG quality/scale until each page image fits the cap when possible.",
  },
  {
    q: "Is PDF to JPG private?",
    a: "Yes. Conversion runs in your browser — we don’t upload or store your PDF.",
  },
  {
    q: "Still too large after convert?",
    a: "Pick a stricter KB cap, or open Compress to 50KB / Custom KB for a single photo after conversion.",
  },
];

export default function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<PdfImageFormat>("jpg");
  const [scale, setScale] = useState(2);
  const [maxKb, setMaxKb] = useState<number | undefined>(50);
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
    if (format === "png" && maxKb != null) {
      setError("KB cap works with JPG. Switch format to JPG or choose No KB cap.");
      return;
    }
    setBusy(true);
    setError(null);
    setStats(null);
    clearPreviews();
    try {
      const opts = {
        format,
        scale,
        maxKb,
        password: password || undefined,
        onProgress: setProgress,
      };
      if (asZip) {
        const { blob, images, pages } = await pdfToImagesZip(file, opts);
        downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + `-pages.zip`);
        setStats(
          `${pages} page(s) → ZIP (${images.length} images${maxKb ? ` · target ≤${maxKb}KB` : ""})`
        );
        setPreviews(
          images.slice(0, 6).map((img) => ({
            url: URL.createObjectURL(img.blob),
            name: img.filename,
            sizeKb: img.sizeKb,
          }))
        );
      } else {
        const { images, pages } = await pdfToImages(file, opts);
        for (const img of images) downloadBlob(img.blob, img.filename);
        setStats(
          `${pages} page(s) downloaded as ${format.toUpperCase()}${maxKb ? ` · target ≤${maxKb}KB` : ""}`
        );
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
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          PDF to <span className="text-[var(--accent)]">JPG 50KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Convert PDF pages to JPG or PNG online free — optionally hit 50KB / 100KB / 200KB per
          page for form uploads.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-sm font-semibold">Output KB target (per page)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {MAX_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setMaxKb(p.maxKb);
                if (p.maxKb != null) setFormat("jpg");
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                maxKb === p.maxKb
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
        {stats && (
          <p className="mt-3 text-center text-sm font-semibold text-[var(--accent-ink)]">{stats}</p>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {previews.map((p) => (
              <figure
                key={p.url}
                className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--wash)]"
              >
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
            {busy
              ? "Converting…"
              : `Convert to ${format.toUpperCase()}${maxKb ? ` ≤${maxKb}KB` : ""}`}
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
        title="PDF to JPG 50KB online free — Size to KB"
        text="Convert PDF to JPG 50KB free on Size to KB"
        path="/pdf-to-jpg/"
      />
      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="PDF to JPG 50KB · convert PDF to image online free"
        paragraphs={[
          "Searchers looking for pdf to jpg 50kb, pdf to jpg 90 kb, pdf convert to jpg 50 kb, and convert pdf to jpg less than 100kb can convert here then Free Download. Pair with Compress to 50KB if a single photo still needs a tighter crop.",
        ]}
        links={[
          { href: "/compress-to-50kb/", label: "Compress image to 50KB" },
          { href: "/compress-to-200kb/", label: "Compress to 200KB" },
          { href: "/jpg-to-pdf-kb/", label: "JPG to PDF exact KB" },
          { href: "/image-to-pdf/", label: "JPG to PDF" },
          { href: "/pdf-unlock/", label: "Unlock PDF password" },
          { href: "/pdf-compressor/", label: "Compress PDF" },
        ]}
      />
    </div>
  );
}
