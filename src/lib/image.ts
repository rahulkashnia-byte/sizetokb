import type { DocSpec, ProcessedImage } from "./types";
import { trackToolUse } from "./usage";

const DPI = 96; // browser canvas approx for cm→px

export type RotateDeg = 0 | 90 | 180 | 270;

/** Crop in the rotated source pixel space */
export type CropRect = { x: number; y: number; width: number; height: number };

export function cmToPx(cm: number): number {
  return Math.round((cm / 2.54) * DPI);
}

export function resolvePixels(spec: DocSpec): { width?: number; height?: number } {
  if (spec.width == null || spec.height == null) return {};
  if (spec.unit === "px") return { width: Math.round(spec.width), height: Math.round(spec.height) };
  return { width: cmToPx(spec.width), height: cmToPx(spec.height) };
}

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  let blob: Blob = file;
  const name = file.name.toLowerCase();
  if (name.endsWith(".heic") || name.endsWith(".heif") || file.type === "image/heic") {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    blob = Array.isArray(converted) ? converted[0] : converted;
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Failed to load image"));
      el.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function rotatedSize(
  w: number,
  h: number,
  rotate: RotateDeg
): { w: number; h: number } {
  if (rotate === 90 || rotate === 270) return { w: h, h: w };
  return { w, h };
}

/** Draw image onto a canvas with 0/90/180/270 rotation. */
export function rotateToCanvas(
  img: HTMLImageElement | HTMLCanvasElement,
  rotate: RotateDeg
): HTMLCanvasElement {
  const sw = img instanceof HTMLCanvasElement ? img.width : img.naturalWidth;
  const sh = img instanceof HTMLCanvasElement ? img.height : img.naturalHeight;
  const { w, h } = rotatedSize(sw, sh, rotate);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  if (rotate === 90) {
    ctx.translate(w, 0);
    ctx.rotate(Math.PI / 2);
  } else if (rotate === 180) {
    ctx.translate(w, h);
    ctx.rotate(Math.PI);
  } else if (rotate === 270) {
    ctx.translate(0, h);
    ctx.rotate(-Math.PI / 2);
  }
  ctx.drawImage(img, 0, 0);
  return canvas;
}

export function initialCrop(
  srcW: number,
  srcH: number,
  aspect?: number
): CropRect {
  if (!aspect || !Number.isFinite(aspect) || aspect <= 0) {
    return { x: 0, y: 0, width: srcW, height: srcH };
  }
  const srcAspect = srcW / srcH;
  let width: number;
  let height: number;
  if (srcAspect > aspect) {
    height = srcH;
    width = height * aspect;
  } else {
    width = srcW;
    height = width / aspect;
  }
  return {
    x: (srcW - width) / 2,
    y: (srcH - height) / 2,
    width,
    height,
  };
}

function applyScanEffect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    let v = (gray - 128) * 1.65 + 128;
    if (v > 200) v = 255;
    else if (v < 90) v = Math.max(0, v * 0.55);
    else v = 255 - (255 - v) * 1.2;
    v = Math.max(0, Math.min(255, v));
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  ctx.putImageData(imageData, 0, 0);
}

function clampCrop(crop: CropRect, srcW: number, srcH: number): CropRect {
  let width = Math.max(1, Math.min(crop.width, srcW));
  let height = Math.max(1, Math.min(crop.height, srcH));
  let x = Math.max(0, Math.min(crop.x, srcW - width));
  let y = Math.max(0, Math.min(crop.y, srcH - height));
  return { x, y, width, height };
}

function drawCropToCanvas(
  source: HTMLCanvasElement | HTMLImageElement,
  crop: CropRect,
  width: number,
  height: number,
  scan: boolean
): HTMLCanvasElement {
  const srcW = source instanceof HTMLCanvasElement ? source.width : source.naturalWidth;
  const srcH = source instanceof HTMLCanvasElement ? source.height : source.naturalHeight;
  const c = clampCrop(crop, srcW, srcH);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(source, c.x, c.y, c.width, c.height, 0, 0, width, height);
  if (scan) applyScanEffect(ctx, width, height);
  return canvas;
}

/** Legacy center cover-crop when no explicit crop is passed */
function drawCoverToCanvas(
  img: HTMLImageElement | HTMLCanvasElement,
  width: number,
  height: number,
  scan: boolean
): HTMLCanvasElement {
  const sw0 = img instanceof HTMLCanvasElement ? img.width : img.naturalWidth;
  const sh0 = img instanceof HTMLCanvasElement ? img.height : img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const scale = Math.max(width / sw0, height / sh0);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (sw0 - sw) / 2;
  const sy = (sh0 - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

  if (scan) applyScanEffect(ctx, width, height);
  return canvas;
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      mime,
      quality
    );
  });
}

export type ProcessOptions = {
  filename?: string;
  forceScan?: boolean;
  rotate?: RotateDeg;
  /** Crop in rotated-source pixel space. If omitted, center-cover is used. */
  crop?: CropRect;
};

/**
 * Binary-search JPEG quality (and slight downscale if needed) to land in [minKb, maxKb].
 */
export async function processToSpec(
  file: File,
  spec: DocSpec,
  options?: ProcessOptions
): Promise<ProcessedImage> {
  const img = await loadImageFromFile(file);
  const mime = spec.format === "png" ? "image/png" : "image/jpeg";
  const scan = options?.forceScan ?? !!spec.scanEffect;
  const rotate = options?.rotate ?? 0;
  const rotated = rotate === 0 ? null : rotateToCanvas(img, rotate);
  const source: HTMLImageElement | HTMLCanvasElement = rotated ?? img;

  let { width, height } = resolvePixels(spec);
  if (!width || !height) {
    const maxSide = 1600;
    const sw = source instanceof HTMLCanvasElement ? source.width : source.naturalWidth;
    const sh = source instanceof HTMLCanvasElement ? source.height : source.naturalHeight;
    if (options?.crop) {
      const c = clampCrop(options.crop, sw, sh);
      const scale = Math.min(1, maxSide / Math.max(c.width, c.height));
      width = Math.max(40, Math.round(c.width * scale));
      height = Math.max(40, Math.round(c.height * scale));
    } else {
      const scale = Math.min(1, maxSide / Math.max(sw, sh));
      width = Math.round(sw * scale);
      height = Math.round(sh * scale);
    }
  }

  const minBytes = spec.minKb * 1024;
  const maxBytes = spec.maxKb * 1024;
  const targetMid = (minBytes + maxBytes) / 2;

  let best: { blob: Blob; w: number; h: number } | null = null;
  let scaleFactor = 1;

  for (let attempt = 0; attempt < 8; attempt++) {
    const w = Math.max(40, Math.round(width * scaleFactor));
    const h = Math.max(40, Math.round(height * scaleFactor));
    const canvas = options?.crop
      ? drawCropToCanvas(source, options.crop, w, h, scan)
      : drawCoverToCanvas(source, w, h, scan);

    if (mime === "image/png") {
      const blob = await canvasToBlob(canvas, mime, 1);
      best = { blob, w, h };
      if (blob.size <= maxBytes && blob.size >= minBytes) break;
      if (blob.size > maxBytes) {
        scaleFactor *= 0.85;
        continue;
      }
      break;
    }

    let lo = 0.08;
    let hi = 0.95;
    let localBest: Blob | null = null;

    for (let i = 0; i < 12; i++) {
      const q = (lo + hi) / 2;
      const blob = await canvasToBlob(canvas, mime, q);
      if (blob.size > maxBytes) {
        hi = q;
      } else if (blob.size < minBytes) {
        lo = q;
        localBest = blob;
      } else {
        localBest = blob;
        if (blob.size < targetMid) lo = q;
        else hi = q;
      }
    }

    if (localBest) {
      best = { blob: localBest, w, h };
      if (localBest.size >= minBytes && localBest.size <= maxBytes) break;
      if (localBest.size > maxBytes) scaleFactor *= 0.88;
      else if (localBest.size < minBytes && scaleFactor < 1.4) {
        scaleFactor *= 1.12;
      } else break;
    } else {
      scaleFactor *= 0.85;
    }
  }

  if (!best) throw new Error("Could not process image to target size");

  const sizeKb = Math.round((best.blob.size / 1024) * 10) / 10;
  const inRange = best.blob.size >= minBytes && best.blob.size <= maxBytes;
  const ext = mime === "image/png" ? "png" : "jpg";
  const base =
    options?.filename?.replace(/\.[^.]+$/, "") ||
    `${spec.id}-${spec.label.toLowerCase().replace(/\s+/g, "-")}`;

  return {
    blob: best.blob,
    url: URL.createObjectURL(best.blob),
    width: best.w,
    height: best.h,
    sizeKb,
    inRange,
    filename: `${base}.${ext}`,
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  try {
    trackToolUse();
  } catch {
    /* ignore analytics failures */
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function stepRotate(current: RotateDeg, dir: 1 | -1): RotateDeg {
  const next = (((current + dir * 90) % 360) + 360) % 360;
  return next as RotateDeg;
}

export { formatSpecSummary } from "./format";
