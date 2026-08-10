"use client";

import { useMemo, useRef, useState } from "react";
import { DownloadReadyModal } from "@/components/DownloadReadyModal";
import { ImageEditStage } from "@/components/ImageEditStage";
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
import type { DocSpec, ProcessedImage } from "@/lib/types";

type Props = {
  spec: DocSpec;
  filename: string;
  forceScan?: boolean;
  pickLabel?: string;
  actionLabel?: string;
};

/**
 * Crop + rotate + compress for form landers (PAN / Aadhaar / thumb, etc.).
 */
export function FormSpecUploader({
  spec,
  filename,
  forceScan,
  pickLabel = "Select or drop image",
  actionLabel = "Crop & compress to KB",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rotate, setRotate] = useState<RotateDeg>(0);
  const [crop, setCrop] = useState<CropRect | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [origKb, setOrigKb] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const aspect = useMemo(() => {
    const px = resolvePixels(spec);
    if (px.width && px.height) return px.width / px.height;
    return undefined;
  }, [spec]);

  const setSelected = async (next: File | null) => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setDownloadOpen(false);
    setError(null);
    setFile(next);
    setRotate(0);
    if (!next) {
      setCrop(null);
      setOrigKb(null);
      return;
    }
    setOrigKb(Math.round((next.size / 1024) * 10) / 10);
    try {
      const img = await loadImageFromFile(next);
      const { w, h } = rotatedSize(img.naturalWidth, img.naturalHeight, 0);
      setCrop(initialCrop(w, h, aspect));
    } catch {
      setCrop(null);
    }
  };

  const run = async () => {
    if (!file || !crop) {
      setError("Choose an image and adjust the crop area first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result?.url) URL.revokeObjectURL(result.url);
      const out = await processToSpec(file, spec, {
        filename,
        forceScan: forceScan ?? !!spec.scanEffect,
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

  return (
    <div>
      <p className="text-center text-sm text-[var(--accent-ink)]">
        Target {spec.minKb}–{spec.maxKb} KB
        {spec.width && spec.height
          ? ` · ${spec.width}×${spec.height} ${spec.unit ?? "px"}`
          : ""}
      </p>

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
            if (dropped) void setSelected(dropped);
          }}
          className={`mt-4 w-full rounded-2xl border-2 border-dashed py-10 text-sm font-semibold transition ${
            dragging
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--line)] bg-[var(--wash)]"
          }`}
        >
          {pickLabel}
          <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
            Then crop & rotate before compressing
          </span>
        </button>
      ) : (
        <div className="mt-4">
          <ImageEditStage
            file={file}
            aspect={aspect}
            rotate={rotate}
            crop={crop}
            onRotate={(deg) => {
              setRotate(deg);
              setCrop(null);
              setResult(null);
              setDownloadOpen(false);
            }}
            onCropChange={(c) => {
              setCrop(c);
              setResult(null);
              setDownloadOpen(false);
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
        onChange={(e) => void setSelected(e.target.files?.[0] ?? null)}
      />

      {origKb != null && result && (
        <div className="mt-4 rounded-xl bg-[var(--wash)] p-3 text-center text-sm">
          <p className="font-bold text-[var(--ink)]">
            {origKb} KB → {result.sizeKb} KB {result.inRange ? "✓ in range" : ""}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.url}
            alt="Output preview"
            className="mx-auto mt-2 max-h-40 object-contain"
          />
        </div>
      )}

      {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

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
          onClick={() => void run()}
          className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--wash)] py-3 text-sm font-bold text-[var(--ink)] disabled:opacity-60"
        >
          {busy ? "Compressing…" : result ? "Compress again" : actionLabel}
        </button>
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
