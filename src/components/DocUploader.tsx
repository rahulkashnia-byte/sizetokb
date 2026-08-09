"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ImageEditStage } from "@/components/ImageEditStage";
import type { DocSpec, ProcessedImage } from "@/lib/types";
import { formatSpecSummary } from "@/lib/format";
import {
  downloadBlob,
  initialCrop,
  loadImageFromFile,
  processToSpec,
  resolvePixels,
  rotatedSize,
  type CropRect,
  type RotateDeg,
} from "@/lib/image";

export function DocUploader({
  spec,
  examSlug,
}: {
  spec: DocSpec;
  examSlug: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scanOn, setScanOn] = useState(!!spec.scanEffect);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rotate, setRotate] = useState<RotateDeg>(0);
  const [crop, setCrop] = useState<CropRect | null>(null);

  const summary = formatSpecSummary(spec);
  const isSign = spec.scanEffect || spec.id === "sign";

  const aspect = useMemo(() => {
    const px = resolvePixels(spec);
    if (px.width && px.height) return px.width / px.height;
    return undefined;
  }, [spec]);

  const resetEditor = useCallback(async (next: File) => {
    setFile(next);
    setRotate(0);
    setResult(null);
    setError(null);
    if (result?.url) URL.revokeObjectURL(result.url);
    try {
      const img = await loadImageFromFile(next);
      const { w, h } = rotatedSize(img.naturalWidth, img.naturalHeight, 0);
      const px = resolvePixels(spec);
      const a = px.width && px.height ? px.width / px.height : undefined;
      setCrop(initialCrop(w, h, a));
    } catch {
      setCrop(null);
    }
  }, [result?.url, spec]);

  const run = useCallback(async () => {
    if (!file || !crop) {
      setError("Choose an image and adjust the crop area first");
      return;
    }
    setError(null);
    setBusy(true);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    try {
      const out = await processToSpec(file, spec, {
        forceScan: isSign ? scanOn : false,
        filename: `${examSlug}-${spec.id}`,
        rotate,
        crop,
      });
      setResult(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed");
    } finally {
      setBusy(false);
    }
  }, [crop, examSlug, file, isSign, result?.url, rotate, scanOn, spec]);

  const onFiles = (files: FileList | null) => {
    const next = files?.[0];
    if (next) void resetEditor(next);
  };

  const onRotate = (deg: RotateDeg) => {
    setRotate(deg);
    setResult(null);
    setCrop(null); // ImageEditStage will re-init for new orientation
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-3">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
          {spec.label}
        </h3>
        <div className="flex items-center gap-2">
          {isSign && (
            <label className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
              <span>Scan</span>
              <button
                type="button"
                role="switch"
                aria-checked={scanOn}
                onClick={() => setScanOn((v) => !v)}
                className={`relative h-5 w-9 rounded-full transition ${
                  scanOn ? "bg-[var(--accent)]" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition ${
                    scanOn ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {isSign && scanOn && (
          <p className="mb-2 text-center text-xs font-medium text-[var(--muted)]">
            High-contrast pass enabled for ink signatures
          </p>
        )}

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
              onFiles(e.dataTransfer.files);
            }}
            className={`relative flex min-h-[180px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 transition ${
              dragging
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] bg-[var(--wash)] hover:border-[var(--accent)]"
            }`}
          >
            <p className="text-sm font-medium text-[var(--ink)]">Drop image or tap to choose</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Then crop the area you want & rotate — JPG, PNG, HEIC
            </p>
          </button>
        ) : (
          <ImageEditStage
            file={file}
            aspect={aspect}
            rotate={rotate}
            crop={crop}
            onRotate={onRotate}
            onCropChange={(c) => {
              setCrop(c);
              setResult(null);
            }}
          />
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
          <SpecChip label="Size" value={summary.size} />
          <SpecChip label="Dim" value={summary.dim} />
          <SpecChip label="Fmt" value={summary.fmt} />
        </div>

        {error && <p className="mt-3 text-center text-xs text-rose-600">{error}</p>}

        {result && (
          <div className="mt-3 space-y-2">
            <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--wash)] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.url}
                alt="Compressed output"
                className="mx-auto max-h-40 rounded-lg object-contain"
              />
            </div>
            <div className="rounded-xl bg-[var(--wash)] px-3 py-2 text-center text-xs">
              <span className={result.inRange ? "text-[var(--accent-ink)]" : "text-amber-700"}>
                Output: {result.sizeKb} KB · {result.width}×{result.height}px
                {result.inRange ? " · Within limit" : " · Outside limit — try a larger source"}
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {file ? "Change photo" : "Choose photo"}
          </button>
          <button
            type="button"
            disabled={busy || !file || !crop}
            onClick={() => void run()}
            className={`flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60 ${
              isSign ? "bg-[var(--sign)]" : "bg-[var(--accent)]"
            }`}
          >
            {busy
              ? "Compressing…"
              : isSign && scanOn
                ? "Crop, clean & compress"
                : "Crop & compress to KB"}
          </button>
          {result && (
            <button
              type="button"
              onClick={() => downloadBlob(result.blob, result.filename)}
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[var(--wash)] px-2 py-2">
      <div className="font-bold uppercase tracking-wide text-[var(--muted)]">{label}</div>
      <div className="mt-0.5 font-semibold text-[var(--ink)]">{value}</div>
    </div>
  );
}
