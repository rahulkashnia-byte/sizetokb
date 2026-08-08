"use client";

import { useEffect, useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob, processToSpec } from "@/lib/image";
import type { DocSpec, DimUnit, ProcessedImage } from "@/lib/types";

const fieldClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20";

export default function CustomPage() {
  const [minKb, setMinKb] = useState(10);
  const [maxKb, setMaxKb] = useState(100);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<DimUnit>("cm");
  const [outName, setOutName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (result?.url) URL.revokeObjectURL(result.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSelectedFile = (next: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : null);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setMinKb(10);
    setMaxKb(100);
    setWidth("");
    setHeight("");
    setUnit("cm");
    setOutName("");
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const resize = async () => {
    if (!file) {
      setError("Select an image first");
      return;
    }
    if (minKb <= 0 || maxKb <= 0 || minKb > maxKb) {
      setError("Min KB must be ≤ Max KB");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result?.url) URL.revokeObjectURL(result.url);
      const w = width ? Number(width) : undefined;
      const h = height ? Number(height) : undefined;
      const spec: DocSpec = {
        id: "custom",
        label: "Custom",
        minKb,
        maxKb,
        width: w,
        height: h,
        unit,
        format: "jpg",
      };
      const out = await processToSpec(file, spec, {
        filename: outName || "custom-resize",
      });
      setResult(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
            Resize documents for{" "}
            <span className="text-[var(--accent)]">Custom Requirements</span>
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Set exact min/max KB and optional dimensions — then resize in one click.
          </p>
          <TrustPills />
        </div>

        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Settings</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Min Size (KB) *">
              <input
                type="number"
                value={minKb}
                onChange={(e) => setMinKb(Number(e.target.value))}
                className={fieldClass}
                placeholder="e.g. 10"
              />
            </Field>
            <Field label="Max Size (KB) *">
              <input
                type="number"
                value={maxKb}
                onChange={(e) => setMaxKb(Number(e.target.value))}
                className={fieldClass}
                placeholder="e.g. 100"
              />
            </Field>
            <Field label="Width (optional)">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={fieldClass}
                placeholder="e.g. 3.5"
              />
            </Field>
            <Field label="Height (optional)">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={fieldClass}
                placeholder="e.g. 4.5"
              />
            </Field>
            <Field label="Unit">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as DimUnit)}
                className={fieldClass}
              >
                <option value="cm">cm</option>
                <option value="px">px</option>
              </select>
            </Field>
            <Field label="Output Name (optional)">
              <input
                type="text"
                value={outName}
                onChange={(e) => setOutName(e.target.value)}
                className={fieldClass}
                placeholder="Custom filename"
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const dropped = e.dataTransfer.files?.[0];
              if (dropped) setSelectedFile(dropped);
            }}
            className={`mt-5 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-sm transition ${
              dragging
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] bg-[var(--wash)] hover:border-[var(--accent)]"
            }`}
          >
            <span className="font-semibold text-[var(--ink)]">
              {file ? file.name : "Select or Drag & Drop Image"}
            </span>
            <span className="mt-1 text-xs text-[var(--muted)]">JPG, PNG, HEIC · Max 10 MB</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.heic,.heif"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />

          {(preview || result) && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--wash)]">
                <figcaption className="border-b border-[var(--line)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Original preview
                </figcaption>
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Original preview"
                    className="mx-auto max-h-56 w-full object-contain p-3"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center text-xs text-[var(--muted)]">
                    No image yet
                  </div>
                )}
                {file && (
                  <p className="border-t border-[var(--line)] px-3 py-2 text-center text-xs text-[var(--muted)]">
                    {(file.size / 1024).toFixed(1)} KB · {file.name}
                  </p>
                )}
              </figure>

              <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <figcaption className="border-b border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Result preview
                </figcaption>
                {result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.url}
                    alt="Resized preview"
                    className="mx-auto max-h-56 w-full object-contain p-3"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center text-xs text-[var(--muted)]">
                    {busy ? "Resizing…" : "Click Resize Image to see output"}
                  </div>
                )}
                {result && (
                  <p className="border-t border-[var(--line)] px-3 py-2 text-center text-xs text-[var(--accent-ink)]">
                    {result.sizeKb} KB · {result.width}×{result.height}px
                    {result.inRange ? " · In range ✓" : " · Check range"}
                  </p>
                )}
              </figure>
            </div>
          )}

          {error && <p className="mt-3 text-center text-sm text-rose-600">{error}</p>}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void resize()}
              className="flex-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
            >
              {busy ? "Resizing…" : "Resize Image"}
            </button>
            {result && (
              <button
                type="button"
                onClick={() => downloadBlob(result.blob, result.filename)}
                className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold"
              >
                Download
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--muted)]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-6 sm:px-6">
        <ShareButtons
          title="Custom reduce photo & signature size — SizeToKB"
          text="Reduce photo & signature size to any custom KB free on SizeToKB.in"
          path="/custom/"
        />
      </div>

      <SeoKeywordBlock
        heading="Reduce signature size & photo size to any custom KB"
        paragraphs={[
          "Use Custom when you need to reduce signature size to 10KB or 20KB, reduce photo size to 50KB, or hit a unique range like 15–40KB from your notification. Covers signature size kam kaise kare, resize signature to 10kb 20kb, and passport size photo maker workflows for SSC, IBPS, RRB and state PSC portals.",
          "Set min size (KB), max size (KB), optional dimensions in cm or px, then download a JPG ready for upload.",
        ]}
        links={[
          { href: "/image-resizer/", label: "Image size reducer" },
          { href: "/", label: "All exams" },
          { href: "/disclaimer/", label: "Disclaimer" },
        ]}
      />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-semibold text-[var(--ink)]">{label}</span>
      {children}
    </label>
  );
}
