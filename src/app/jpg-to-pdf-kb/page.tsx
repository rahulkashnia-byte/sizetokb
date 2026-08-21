"use client";

import { useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { imagesToPdf } from "@/lib/pdf";

type Band = { id: string; label: string; minKb?: number; maxKb: number };

const BANDS: Band[] = [
  { id: "50-100", label: "50–100 KB", minKb: 50, maxKb: 100 },
  { id: "under-70", label: "Under 70 KB", maxKb: 70 },
  { id: "under-200", label: "Under 200 KB", maxKb: 200 },
  { id: "under-500", label: "Under 500 KB", maxKb: 500 },
  { id: "under-10", label: "Under 10 KB", maxKb: 10 },
];

const FAQS = [
  {
    q: "Can I make a JPG into a PDF of 50–100 KB?",
    a: "Yes. Pick the 50–100 KB band, add your photo(s), and download. We compress toward that window for certificate / ID style uploads.",
  },
  {
    q: "Is this different from Image to PDF?",
    a: "Same engine — this page is SEO-focused on exact KB bands people search (50–100 KB, 200 KB, 500 KB). Use Image to PDF for a custom max only.",
  },
  {
    q: "Will text stay readable?",
    a: "Very low KB targets (like under 10 KB) can blur small text. Prefer 50–100 or 200 KB for certificates when the portal allows it.",
  },
];

type Item = { id: string; file: File; url: string };

export default function JpgToPdfKbPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [bandId, setBandId] = useState("50-100");
  const [customMax, setCustomMax] = useState("");
  const [customMin, setCustomMin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultKb, setResultKb] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const band = BANDS.find((b) => b.id === bandId) ?? BANDS[0];
  const minKb = customMin ? Number(customMin) : band.minKb;
  const maxKb = customMax ? Number(customMax) : band.maxKb;

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...items];
    Array.from(list).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      next.push({
        id: `${file.name}-${file.size}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
      });
    });
    setItems(next);
    setResultKb(null);
  };

  const build = async () => {
    if (!items.length) {
      setError("Add at least one JPG / photo");
      return;
    }
    if (!maxKb || maxKb <= 0) {
      setError("Set a valid max KB");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob, sizeKb, inRange } = await imagesToPdf(
        items.map((i) => ({ blob: i.file, name: i.file.name })),
        { minKb, maxKb }
      );
      setResultKb(sizeKb);
      downloadBlob(blob, "sizetokb-jpg-to-pdf.pdf");
      if (!inRange) {
        setError(
          `Best effort ${sizeKb} KB (target ${minKb ? `${minKb}–` : "≤"}${maxKb} KB)`
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          JPG to PDF <span className="text-[var(--accent)]">Exact KB</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Turn certificate / ID photos into a PDF that lands in the KB band your
          form asks for — 50–100 KB, 200 KB, 500 KB and more.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-sm font-semibold">KB band presets</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setBandId(b.id);
                setCustomMin("");
                setCustomMax("");
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                bandId === b.id && !customMax
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Custom min KB (optional)
            <input
              type="number"
              value={customMin}
              onChange={(e) => setCustomMin(e.target.value)}
              placeholder={band.minKb ? String(band.minKb) : "—"}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Custom max KB
            <input
              type="number"
              value={customMax}
              onChange={(e) => setCustomMax(e.target.value)}
              placeholder={String(band.maxKb)}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          Add JPG / photos
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
            {items.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-[var(--wash)] px-3 py-2 text-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt=""
                  className="h-10 w-10 rounded object-cover"
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {item.file.name}
                </span>
                <button
                  type="button"
                  className="text-xs font-semibold text-red-700"
                  onClick={() => {
                    URL.revokeObjectURL(item.url);
                    setItems(items.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {resultKb != null && (
          <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">
            Built PDF · {resultKb} KB
          </p>
        )}
        {error && (
          <p className="mt-2 text-center text-sm text-amber-700">{error}</p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => void build()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Building PDF…" : `Build PDF (${minKb ? `${minKb}–` : "≤"}${maxKb} KB)`}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="JPG to PDF exact KB — Size to KB"
        text="Convert photos to PDF at 50–100 KB free on Size to KB"
        path="/jpg-to-pdf-kb/"
      />
      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="JPG to PDF 50KB to 100KB online free"
        paragraphs={[
          "Convert image to PDF with size reduction for exam certificate uploads. Popular searches: jpg to pdf 70 kb, photo to pdf resize, convert image to pdf 500kb, pdf size from photos under 200 KB.",
        ]}
        links={[
          { href: "/image-to-pdf/", label: "Image to PDF" },
          { href: "/pdf-compressor/", label: "PDF compressor" },
          { href: "/marksheet-pdf/", label: "Marksheet PDF reduce" },
          { href: "/pdf-to-jpg/", label: "PDF to JPG" },
        ]}
      />
    </div>
  );
}
