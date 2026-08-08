"use client";

import { useEffect, useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { cropImage, loadFileImage } from "@/lib/imageTools";

type CropBox = { x: number; y: number; width: number; height: number };

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropBox | null>(null);
  const [drag, setDrag] = useState<{ startX: number; startY: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const pick = async (f: File | null) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setCrop(null);
    setError(null);
    if (!f) {
      setPreviewUrl(null);
      setNatural(null);
      return;
    }
    const img = await loadFileImage(f);
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setPreviewUrl(URL.createObjectURL(f));
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    setCrop({
      x: Math.round((img.naturalWidth - side) / 2),
      y: Math.round((img.naturalHeight - side) / 2),
      width: side,
      height: side,
    });
  };

  const toImageCoords = (clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el || !natural) return null;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * natural.w;
    const y = ((clientY - rect.top) / rect.height) * natural.h;
    return {
      x: Math.max(0, Math.min(natural.w, x)),
      y: Math.max(0, Math.min(natural.h, y)),
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const pt = toImageCoords(e.clientX, e.clientY);
    if (!pt) return;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setDrag({ startX: pt.x, startY: pt.y });
    setCrop({ x: pt.x, y: pt.y, width: 1, height: 1 });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag || !natural) return;
    const pt = toImageCoords(e.clientX, e.clientY);
    if (!pt) return;
    const x = Math.min(drag.startX, pt.x);
    const y = Math.min(drag.startY, pt.y);
    const width = Math.max(1, Math.abs(pt.x - drag.startX));
    const height = Math.max(1, Math.abs(pt.y - drag.startY));
    setCrop({
      x: Math.max(0, Math.min(x, natural.w - 1)),
      y: Math.max(0, Math.min(y, natural.h - 1)),
      width: Math.min(width, natural.w - x),
      height: Math.min(height, natural.h - y),
    });
  };

  const run = async () => {
    if (!file || !crop) {
      setError("Choose an image and drag a crop area");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob } = await cropImage(file, crop);
      downloadBlob(blob, file.name.replace(/\.\w+$/, "") + "-crop.jpg");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Crop failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Image <span className="text-[var(--accent)]">Cropper</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Drag on the photo to select the area, then download the crop as JPG.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-8 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void pick(e.target.files?.[0] ?? null)}
        />

        {previewUrl && natural && (
          <div className="mt-5 flex justify-center rounded-2xl bg-[var(--wash)] p-3">
            <div
              ref={frameRef}
              className="relative max-h-[60vh] cursor-crosshair touch-none overflow-hidden"
              style={{ aspectRatio: `${natural.w} / ${natural.h}`, width: "min(100%, 560px)" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={() => setDrag(null)}
              onPointerCancel={() => setDrag(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full select-none"
                draggable={false}
              />
              {crop && (
                <div
                  className="pointer-events-none absolute border-2 border-[var(--accent)] bg-[var(--accent)]/15"
                  style={{
                    left: `${(crop.x / natural.w) * 100}%`,
                    top: `${(crop.y / natural.h) * 100}%`,
                    width: `${(crop.width / natural.w) * 100}%`,
                    height: `${(crop.height / natural.h) * 100}%`,
                  }}
                />
              )}
            </div>
          </div>
        )}

        {crop && natural && (
          <p className="mt-3 text-center text-xs text-[var(--muted)]">
            Crop {Math.round(crop.width)}×{Math.round(crop.height)} px · Image {natural.w}×
            {natural.h}
          </p>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        <button
          type="button"
          disabled={busy || !file}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Cropping…" : "Crop & Download"}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="Image cropper online free — SizeToKB"
        text="Crop photos for exam forms free on SizeToKB.in"
        path="/image-cropper/"
      />
      <SeoKeywordBlock
        heading="Crop photo online free"
        paragraphs={["Crop passport or form photos in the browser, then compress to exact KB."]}
        links={[
          { href: "/custom/", label: "Custom KB resize" },
          { href: "/image-merger/", label: "Image merger" },
          { href: "/image-reverse/", label: "Flip / rotate" },
        ]}
      />
    </div>
  );
}
