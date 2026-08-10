"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DownloadReadyModal } from "@/components/DownloadReadyModal";
import { ImageEditStage } from "@/components/ImageEditStage";
import {
  cmToPx,
  downloadBlob,
  initialCrop,
  loadImageFromFile,
  processToSpec,
  type CropRect,
  type RotateDeg,
} from "@/lib/image";
import type { DocSpec, DimUnit, ProcessedImage } from "@/lib/types";

const fieldClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/20";

type Props = {
  embedded?: boolean;
  className?: string;
  initialMinKb?: number;
  initialMaxKb?: number;
  defaultFilename?: string;
  headline?: string;
  subhead?: string;
};

export function CustomResizeTool({
  embedded = false,
  className = "",
  initialMinKb = 10,
  initialMaxKb = 100,
  defaultFilename = "",
  headline,
  subhead,
}: Props) {
  const [minKb, setMinKb] = useState(initialMinKb);
  const [maxKb, setMaxKb] = useState(initialMaxKb);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<DimUnit>("cm");
  const [outName, setOutName] = useState(defaultFilename);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rotate, setRotate] = useState<RotateDeg>(0);
  const [crop, setCrop] = useState<CropRect | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aspect = useMemo(() => {
    const w = width ? Number(width) : undefined;
    const h = height ? Number(height) : undefined;
    if (!w || !h || w <= 0 || h <= 0) return undefined;
    if (unit === "px") return w / h;
    return cmToPx(w) / cmToPx(h);
  }, [width, height, unit]);

  const setSelectedFile = async (next: File | null) => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setDownloadOpen(false);
    setError(null);
    setFile(next);
    setRotate(0);
    if (!next) {
      setCrop(null);
      return;
    }
    try {
      const img = await loadImageFromFile(next);
      setCrop(initialCrop(img.naturalWidth, img.naturalHeight, aspect));
    } catch {
      setCrop(null);
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setMinKb(initialMinKb);
    setMaxKb(initialMaxKb);
    setWidth("");
    setHeight("");
    setUnit("cm");
    setOutName(defaultFilename);
    setFile(null);
    setCrop(null);
    setRotate(0);
    setResult(null);
    setDownloadOpen(false);
    setError(null);
  };

  const resize = async () => {
    if (!file || !crop) {
      setError("Select an image and set the crop area first");
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
        rotate,
        crop,
      });
      setResult(out);
      setDownloadOpen(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  const presets = [
    { label: "Photo 20–50 KB", min: 20, max: 50 },
    { label: "Sign 10–20 KB", min: 10, max: 20 },
    { label: "100 KB max", min: 10, max: 100 },
  ];

  return (
    <div className={className}>
      {(embedded || headline) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Exact KB tool
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
              {headline ?? "Set min / max KB and resize here"}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {subhead ?? "Crop the area you want, rotate if needed, then hit your KB target."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setMinKb(p.min);
                  setMaxKb(p.max);
                }}
                className="rounded-lg border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Settings</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {!file ? (
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
              if (dropped) void setSelectedFile(dropped);
            }}
            className={`mt-5 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 text-sm transition ${
              dragging
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] bg-[var(--wash)] hover:border-[var(--accent)]"
            }`}
          >
            <span className="font-semibold text-[var(--ink)]">Select or Drag & Drop Image</span>
            <span className="mt-1 text-xs text-[var(--muted)]">
              Then crop & rotate · JPG, PNG, HEIC · Max 10 MB
            </span>
          </button>
        ) : (
          <div className="mt-5">
            <ImageEditStage
              file={file}
              aspect={aspect}
              rotate={rotate}
              crop={crop}
              onRotate={(deg) => {
                setRotate(deg);
                setCrop(null);
                setResult(null);
              }}
              onCropChange={(c) => {
                setCrop(c);
                setResult(null);
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 text-sm font-semibold text-[var(--accent-ink)] hover:underline"
            >
              Change image
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => void setSelectedFile(e.target.files?.[0] ?? null)}
        />

        {result && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <p className="border-b border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              Result preview
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.url}
              alt="Resized preview"
              className="mx-auto max-h-56 w-full object-contain p-3"
            />
            <p className="border-t border-[var(--line)] px-3 py-2 text-center text-xs text-[var(--accent-ink)]">
              {result.sizeKb} KB · {result.width}×{result.height}px
              {result.inRange ? " · In range ✓" : " · Check range"}
            </p>
          </div>
        )}

        {file && result && (
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--wash)] p-4">
            <p className="text-center text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              Before → After size
            </p>
            <p className="mt-2 text-center font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)]">
              {(file.size / 1024).toFixed(1)} KB{" "}
              <span className="text-[var(--accent)]">→</span> {result.sizeKb} KB
            </p>
          </div>
        )}

        {error && <p className="mt-3 text-center text-sm text-rose-600">{error}</p>}

        {result && (
          <button
            type="button"
            onClick={() => setDownloadOpen(true)}
            className="mt-5 w-full rounded-2xl bg-[var(--accent)] py-4 text-base font-extrabold text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:brightness-95"
          >
            Free Download
          </button>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !file || !crop}
            onClick={() => void resize()}
            className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--wash)] px-4 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-60"
          >
            {busy ? "Resizing…" : result ? "Resize again" : "Crop & resize to KB"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--muted)]"
          >
            Reset
          </button>
        </div>
      </div>

      <DownloadReadyModal
        open={downloadOpen && !!result}
        onClose={() => setDownloadOpen(false)}
        onDownload={() => {
          if (result) downloadBlob(result.blob, result.filename);
        }}
        previewUrl={result?.url}
        meta={
          result
            ? `${result.sizeKb} KB · ${result.width}×${result.height}px${
                result.inRange ? " · In range" : ""
              }`
            : null
        }
        filename={result?.filename}
      />
    </div>
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
