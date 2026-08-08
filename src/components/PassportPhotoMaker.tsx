"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { downloadBlob } from "@/lib/image";
import { loadImageFile } from "@/lib/extraImageTools";
import {
  DEFAULT_ADJUST,
  exportPassportPhoto,
  exportPrintSheet,
  initialCrop,
  PASSPORT_PRESETS,
  type CropRect,
  type PassportAdjust,
  type PrintLayout,
  drawTransformed,
} from "@/lib/passportPhoto";

const BG_SWATCHES = ["#ffffff", "#e8f1ff", "#cfd8e3", "#f5f5f5", "#ffecec", "#000080"];

export function PassportPhotoMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [presetId, setPresetId] = useState(PASSPORT_PRESETS[0].id);
  const [crop, setCrop] = useState<CropRect | null>(null);
  const [adjust, setAdjust] = useState<PassportAdjust>(DEFAULT_ADJUST);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [replaceBg, setReplaceBg] = useState(true);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [maxKb, setMaxKb] = useState(100);
  const [printCount, setPrintCount] = useState<PrintLayout>(8);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultMeta, setResultMeta] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragMode = useRef<"move" | "resize" | null>(null);
  const dragStart = useRef<{ x: number; y: number; crop: CropRect } | null>(null);

  const preset = useMemo(
    () => PASSPORT_PRESETS.find((p) => p.id === presetId) ?? PASSPORT_PRESETS[0],
    [presetId]
  );

  const transformedSize = useMemo(() => {
    if (!img) return null;
    const canvas = drawTransformed(img, adjust);
    return { w: canvas.width, h: canvas.height };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img, adjust.rotate, adjust.flipH]);

  useEffect(() => {
    if (!transformedSize) {
      setCrop(null);
      return;
    }
    setCrop(initialCrop(transformedSize.w, transformedSize.h, preset));
  }, [transformedSize?.w, transformedSize?.h, preset.id, preset, transformedSize]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const loadFile = async (f: File | null) => {
    setError(null);
    setResultMeta(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setFile(f);
    if (!f) {
      setImg(null);
      return;
    }
    try {
      const loaded = await loadImageFile(f);
      setImg(loaded);
      setAdjust(DEFAULT_ADJUST);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load image");
      setImg(null);
    }
  };

  const onPointerDown = (e: React.PointerEvent, mode: "move" | "resize") => {
    if (!crop) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragMode.current = mode;
    dragStart.current = { x: e.clientX, y: e.clientY, crop: { ...crop } };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragMode.current || !dragStart.current || !transformedSize || !crop) return;
    const start = dragStart.current;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - start.x) / rect.width) * transformedSize.w;
    const dy = ((e.clientY - start.y) / rect.height) * transformedSize.h;
    const aspect = preset.widthPx / preset.heightPx;

    if (dragMode.current === "move") {
      let x = start.crop.x + dx;
      let y = start.crop.y + dy;
      x = Math.max(0, Math.min(x, transformedSize.w - start.crop.width));
      y = Math.max(0, Math.min(y, transformedSize.h - start.crop.height));
      setCrop({ ...start.crop, x, y });
    } else {
      // resize from bottom-right, keep aspect + top-left
      let width = Math.max(40, start.crop.width + dx);
      let height = width / aspect;
      if (start.crop.x + width > transformedSize.w) {
        width = transformedSize.w - start.crop.x;
        height = width / aspect;
      }
      if (start.crop.y + height > transformedSize.h) {
        height = transformedSize.h - start.crop.y;
        width = height * aspect;
      }
      setCrop({ ...start.crop, width, height });
    }
  };

  const onPointerUp = () => {
    dragMode.current = null;
    dragStart.current = null;
  };

  const rotate = (dir: 1 | -1) => {
    setAdjust((a) => {
      const next = (((a.rotate + dir * 90) % 360) + 360) % 360;
      return { ...a, rotate: next as PassportAdjust["rotate"] };
    });
  };

  const runExport = async (sheet: boolean) => {
    if (!img || !crop) {
      setError("Upload a photo first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const single = await exportPassportPhoto({
        source: img,
        crop,
        preset,
        bgColor,
        replaceBg,
        adjust,
        format,
        maxKb: format === "image/jpeg" ? maxKb : undefined,
      });
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(single.url);
      setResultMeta(
        `${preset.label} · ${single.width}×${single.height} px · ${single.sizeKb} KB`
      );

      if (sheet) {
        const page = await exportPrintSheet({
          photoBlob: single.blob,
          preset,
          count: printCount,
        });
        downloadBlob(page.blob, `passport-sheet-${printCount}.jpg`);
        URL.revokeObjectURL(page.url);
      } else {
        const ext = format === "image/png" ? "png" : "jpg";
        downloadBlob(single.blob, `passport-photo.${ext}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setBusy(false);
    }
  };

  const previewSrc = useMemo(() => {
    if (!img) return null;
    const canvas = drawTransformed(img, adjust);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [img, adjust.rotate, adjust.flipH]);

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) void loadFile(f);
        }}
        className={`rounded-3xl border-2 border-dashed p-6 text-center transition sm:p-8 ${
          dragging
            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
            : "border-[var(--line)] bg-white"
        }`}
      >
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
          {file ? file.name : "Drop your photo here"}
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Supports JPG, PNG, WEBP, HEIC — crop, change background, download print-ready
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            Choose Photo
          </button>
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="rounded-xl border border-[var(--line)] bg-[var(--wash)] px-4 py-2.5 text-sm font-bold"
          >
            Use Camera
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => void loadFile(e.target.files?.[0] ?? null)}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(e) => void loadFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Presets */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Supported sizes
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PASSPORT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPresetId(p.id)}
              className={`rounded-2xl border px-3 py-3 text-left transition ${
                presetId === p.id
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-white hover:border-[var(--accent)]"
              }`}
            >
              <span className="block text-sm font-bold text-[var(--ink)]">{p.label}</span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">{p.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      {img && crop && transformedSize && previewSrc && (
        <div className="rounded-3xl border border-[var(--line)] bg-white p-4 shadow-[var(--card-shadow)] sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Crop editor — drag frame · corner to resize (aspect locked)
              </p>
              <div
                ref={stageRef}
                className="relative mx-auto max-h-[70vh] w-full touch-none overflow-hidden rounded-2xl bg-[#1a1f2b]"
                style={{ aspectRatio: `${transformedSize.w} / ${transformedSize.h}` }}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrc}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full select-none"
                  draggable={false}
                />
                <div
                  className="absolute cursor-move border-2 border-[var(--accent)] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
                  style={{
                    left: `${(crop.x / transformedSize.w) * 100}%`,
                    top: `${(crop.y / transformedSize.h) * 100}%`,
                    width: `${(crop.width / transformedSize.w) * 100}%`,
                    height: `${(crop.height / transformedSize.h) * 100}%`,
                  }}
                  onPointerDown={(e) => onPointerDown(e, "move")}
                >
                  <span className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-white/40" />
                  <span className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-white/40" />
                  <span className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-white/40" />
                  <span className="pointer-events-none absolute inset-y-0 left-2/3 border-l border-white/40" />
                  <button
                    type="button"
                    aria-label="Resize crop"
                    className="absolute -bottom-2 -right-2 h-5 w-5 cursor-nwse-resize rounded-sm border-2 border-white bg-[var(--accent)]"
                    onPointerDown={(e) => onPointerDown(e, "resize")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Background
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {BG_SWATCHES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      title={c}
                      onClick={() => setBgColor(c)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        bgColor.toLowerCase() === c ? "border-[var(--ink)]" : "border-[var(--line)]"
                      }`}
                      style={{ background: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-[var(--line)] bg-white"
                  />
                </div>
                <label className="mt-2 flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={replaceBg}
                    onChange={(e) => setReplaceBg(e.target.checked)}
                  />
                  Replace plain background with this colour
                </label>
              </div>

              <AdjustSlider
                label="Brightness"
                value={adjust.brightness}
                onChange={(v) => setAdjust((a) => ({ ...a, brightness: v }))}
              />
              <AdjustSlider
                label="Contrast"
                value={adjust.contrast}
                onChange={(v) => setAdjust((a) => ({ ...a, contrast: v }))}
              />
              <AdjustSlider
                label="Saturation"
                value={adjust.saturation}
                onChange={(v) => setAdjust((a) => ({ ...a, saturation: v }))}
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => rotate(-1)}
                  className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
                >
                  Rotate left
                </button>
                <button
                  type="button"
                  onClick={() => rotate(1)}
                  className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
                >
                  Rotate right
                </button>
                <button
                  type="button"
                  onClick={() => setAdjust((a) => ({ ...a, flipH: !a.flipH }))}
                  className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
                >
                  Flip H
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold">
                  Format
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "image/jpeg" | "image/png")}
                    className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm"
                  >
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                  </select>
                </label>
                <label className="text-xs font-semibold">
                  Max KB (JPG)
                  <input
                    type="number"
                    value={maxKb}
                    onChange={(e) => setMaxKb(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm"
                  />
                </label>
              </div>

              <label className="block text-xs font-semibold">
                Print sheet count
                <select
                  value={printCount}
                  onChange={(e) => setPrintCount(Number(e.target.value) as PrintLayout)}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm"
                >
                  {[2, 4, 6, 8, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} photos on A4
                    </option>
                  ))}
                </select>
              </label>

              {resultUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resultUrl}
                  alt="Result preview"
                  className="mx-auto max-h-40 border border-[var(--line)] object-contain"
                  style={{ background: bgColor }}
                />
              )}
              {resultMeta && (
                <p className="text-center text-xs font-semibold text-[var(--accent-ink)]">
                  {resultMeta}
                </p>
              )}
              {error && <p className="text-center text-sm text-amber-700">{error}</p>}

              <button
                type="button"
                disabled={busy}
                onClick={() => void runExport(false)}
                className="w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
              >
                {busy ? "Working…" : "Download photo"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void runExport(true)}
                className="w-full rounded-xl border border-[var(--line)] py-3 text-sm font-bold disabled:opacity-60"
              >
                Download A4 print sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {!img && (
        <p className="text-center text-sm text-[var(--muted)]">
          Pick a size above, then upload a photo to open the crop editor.
        </p>
      )}
    </div>
  );
}

function AdjustSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-xs font-semibold">
      {label} ({value})
      <input
        type="range"
        min={-60}
        max={60}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full"
      />
    </label>
  );
}
