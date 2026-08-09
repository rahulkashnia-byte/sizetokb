"use client";

import { useEffect, useRef, useState } from "react";
import {
  initialCrop,
  loadImageFromFile,
  rotateToCanvas,
  stepRotate,
  type CropRect,
  type RotateDeg,
} from "@/lib/image";

type Props = {
  file: File;
  /** Output aspect width/height. If set, crop frame stays locked. */
  aspect?: number;
  rotate: RotateDeg;
  crop: CropRect | null;
  onRotate: (deg: RotateDeg) => void;
  onCropChange: (crop: CropRect) => void;
  className?: string;
};

/**
 * Interactive crop + rotate stage. Crop coordinates are in rotated-source pixels.
 */
export function ImageEditStage({
  file,
  aspect,
  rotate,
  crop,
  onRotate,
  onCropChange,
  className = "",
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [srcSize, setSrcSize] = useState<{ w: number; h: number } | null>(null);
  const dragMode = useRef<"move" | "resize" | null>(null);
  const dragStart = useRef<{ x: number; y: number; crop: CropRect } | null>(null);

  useEffect(() => {
    let revoked: string | null = null;
    let cancelled = false;
    (async () => {
      try {
        const img = await loadImageFromFile(file);
        if (cancelled) return;
        const canvas = rotate === 0 ? null : rotateToCanvas(img, rotate);
        const w = canvas ? canvas.width : img.naturalWidth;
        const h = canvas ? canvas.height : img.naturalHeight;
        setSrcSize({ w, h });
        const url = canvas
          ? canvas.toDataURL("image/jpeg", 0.92)
          : URL.createObjectURL(file);
        if (canvas) {
          /* data URL — nothing to revoke */
        } else {
          revoked = url;
        }
        setPreviewSrc(url);
        if (!crop) {
          onCropChange(initialCrop(w, h, aspect));
        }
      } catch {
        if (!cancelled) setPreviewSrc(null);
      }
    })();
    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
    // Re-run when file or rotate changes; intentionally not on crop/aspect every time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, rotate]);

  // Re-fit crop when form aspect changes (e.g. user typed width/height).
  // File/rotate re-init is handled above when crop is null.
  useEffect(() => {
    if (!srcSize) return;
    onCropChange(initialCrop(srcSize.w, srcSize.h, aspect));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspect]);

  const onPointerDown = (e: React.PointerEvent, mode: "move" | "resize") => {
    if (!crop) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragMode.current = mode;
    dragStart.current = { x: e.clientX, y: e.clientY, crop: { ...crop } };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragMode.current || !dragStart.current || !srcSize || !crop) return;
    const start = dragStart.current;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - start.x) / rect.width) * srcSize.w;
    const dy = ((e.clientY - start.y) / rect.height) * srcSize.h;

    if (dragMode.current === "move") {
      let x = start.crop.x + dx;
      let y = start.crop.y + dy;
      x = Math.max(0, Math.min(x, srcSize.w - start.crop.width));
      y = Math.max(0, Math.min(y, srcSize.h - start.crop.height));
      onCropChange({ ...start.crop, x, y });
      return;
    }

    let width = Math.max(40, start.crop.width + dx);
    let height = aspect ? width / aspect : Math.max(40, start.crop.height + dy);
    if (!aspect) {
      height = Math.max(40, start.crop.height + dy);
    }
    if (start.crop.x + width > srcSize.w) width = srcSize.w - start.crop.x;
    if (aspect) height = width / aspect;
    if (start.crop.y + height > srcSize.h) {
      height = srcSize.h - start.crop.y;
      if (aspect) width = height * aspect;
    }
    onCropChange({ ...start.crop, width, height });
  };

  const onPointerUp = () => {
    dragMode.current = null;
    dragStart.current = null;
  };

  const handleRotate = (dir: 1 | -1) => {
    onRotate(stepRotate(rotate, dir));
  };

  if (!previewSrc || !srcSize || !crop) {
    return (
      <div className={`flex min-h-[200px] items-center justify-center rounded-xl bg-[var(--wash)] text-sm text-[var(--muted)] ${className}`}>
        Preparing editor…
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        Drag the frame to choose area · corner to resize · rotate if needed
      </p>
      <div
        ref={stageRef}
        className="relative mx-auto w-full touch-none overflow-hidden rounded-xl bg-[#1a1f2b]"
        style={{ aspectRatio: `${srcSize.w} / ${srcSize.h}`, maxHeight: "360px" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewSrc}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          draggable={false}
        />
        <div
          className="absolute cursor-move border-2 border-[var(--accent)] shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
          style={{
            left: `${(crop.x / srcSize.w) * 100}%`,
            top: `${(crop.y / srcSize.h) * 100}%`,
            width: `${(crop.width / srcSize.w) * 100}%`,
            height: `${(crop.height / srcSize.h) * 100}%`,
          }}
          onPointerDown={(e) => onPointerDown(e, "move")}
        >
          <span className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-white/35" />
          <span className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-white/35" />
          <span className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-white/35" />
          <span className="pointer-events-none absolute inset-y-0 left-2/3 border-l border-white/35" />
          <button
            type="button"
            aria-label="Resize crop"
            className="absolute -bottom-2 -right-2 h-5 w-5 cursor-nwse-resize rounded-sm border-2 border-white bg-[var(--accent)]"
            onPointerDown={(e) => onPointerDown(e, "resize")}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">Rotate</span>
        <button
          type="button"
          onClick={() => handleRotate(-1)}
          className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--accent)]"
        >
          ↺ Left
        </button>
        <button
          type="button"
          onClick={() => handleRotate(1)}
          className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--accent)]"
        >
          ↻ Right
        </button>
        {([0, 90, 180, 270] as RotateDeg[]).map((deg) => (
          <button
            key={deg}
            type="button"
            onClick={() => onRotate(deg)}
            className={`rounded-lg px-3 py-2 text-xs font-bold ${
              rotate === deg
                ? "bg-[var(--ink)] text-white"
                : "border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
            }`}
          >
            {deg}°
          </button>
        ))}
        <button
          type="button"
          onClick={() => onCropChange(initialCrop(srcSize.w, srcSize.h, aspect))}
          className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold text-[var(--muted)] hover:border-[var(--accent)]"
        >
          Reset crop
        </button>
      </div>
      <p className="mt-1.5 text-[11px] text-[var(--muted)]">
        Selection {Math.round(crop.width)}×{Math.round(crop.height)} px
        {aspect ? " · aspect locked to form size" : ""}
      </p>
    </div>
  );
}

export function useRotatedNaturalSize(file: File | null, rotate: RotateDeg) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    if (!file) {
      setSize(null);
      return;
    }
    let cancelled = false;
    void loadImageFromFile(file).then((img) => {
      if (cancelled) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setSize(
        rotate === 90 || rotate === 270 ? { w: h, h: w } : { w, h }
      );
    });
    return () => {
      cancelled = true;
    };
  }, [file, rotate]);
  return size;
}
