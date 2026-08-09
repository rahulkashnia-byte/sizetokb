import type { DocSpec, ProcessedImage } from "./types";

const DPI = 96; // browser canvas approx for cm→px

export function cmToPx(cm: number): number {
  return Math.round((cm / 2.54) * DPI);
}

export function resolvePixels(spec: DocSpec): { width?: number; height?: number } {
  if (spec.width == null || spec.height == null) return {};
  if (spec.unit === "px") return { width: Math.round(spec.width), height: Math.round(spec.height) };
  return { width: cmToPx(spec.width), height: cmToPx(spec.height) };
}

async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
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

export type RotateDeg = 0 | 90 | 180 | 270;

/** Draw image onto a new canvas with 90°-step rotation. */
export function canvasFromRotatedImage(
  img: HTMLImageElement,
  rotate: RotateDeg
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  if (rotate === 90 || rotate === 270) {
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
  } else {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }
  ctx.save();
  if (rotate === 90) {
    ctx.translate(canvas.width, 0);
    ctx.rotate(Math.PI / 2);
  } else if (rotate === 180) {
    ctx.translate(canvas.width, canvas.height);
    ctx.rotate(Math.PI);
  } else if (rotate === 270) {
    ctx.translate(0, canvas.height);
    ctx.rotate(-Math.PI / 2);
  }
  ctx.drawImage(img, 0, 0);
  ctx.restore();
  return canvas;
}

function sourceSize(src: HTMLImageElement | HTMLCanvasElement): { w: number; h: number } {
  if (src instanceof HTMLCanvasElement) return { w: src.width, h: src.height };
  return { w: src.naturalWidth, h: src.naturalHeight };
}

function applyScanEffect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    // grayscale + contrast boost + white background cleanup
    const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    // stretch contrast
    let v = (gray - 128) * 1.65 + 128;
    // threshold soft: push lights to white, darks to ink
    if (v > 200) v = 255;
    else if (v < 90) v = Math.max(0, v * 0.55);
    else v = 255 - (255 - v) * 1.2;
    v = Math.max(0, Math.min(255, v));
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawToCanvas(
  src: HTMLImageElement | HTMLCanvasElement,
  width: number,
  height: number,
  scan: boolean
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const { w: nw, h: nh } = sourceSize(src);
  // cover-fit (crop center) for passport-style photos
  const scale = Math.max(width / nw, height / nh);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (nw - sw) / 2;
  const sy = (nh - sh) / 2;
  ctx.drawImage(src, sx, sy, sw, sh, 0, 0, width, height);

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

/**
 * Binary-search JPEG quality (and slight downscale if needed) to land in [minKb, maxKb].
 */
export async function processToSpec(
  file: File,
  spec: DocSpec,
  options?: { filename?: string; forceScan?: boolean; rotate?: RotateDeg }
): Promise<ProcessedImage> {
  const img = await loadImageFromFile(file);
  const rotate = options?.rotate ?? 0;
  const source: HTMLImageElement | HTMLCanvasElement =
    rotate === 0 ? img : canvasFromRotatedImage(img, rotate);
  const { w: srcW, h: srcH } = sourceSize(source);
  const mime = spec.format === "png" ? "image/png" : "image/jpeg";
  const scan = options?.forceScan ?? !!spec.scanEffect;

  let { width, height } = resolvePixels(spec);
  if (!width || !height) {
    // size-only: start from natural dims, capped
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(srcW, srcH));
    width = Math.round(srcW * scale);
    height = Math.round(srcH * scale);
  }

  const minBytes = spec.minKb * 1024;
  const maxBytes = spec.maxKb * 1024;
  const targetMid = (minBytes + maxBytes) / 2;

  let best: { blob: Blob; w: number; h: number } | null = null;
  let scaleFactor = 1;

  for (let attempt = 0; attempt < 8; attempt++) {
    const w = Math.max(40, Math.round(width * scaleFactor));
    const h = Math.max(40, Math.round(height * scaleFactor));
    const canvas = drawToCanvas(source, w, h, scan);

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

    // binary search quality
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
        // nudge toward mid
        if (blob.size < targetMid) lo = q;
        else hi = q;
      }
    }

    if (localBest) {
      best = { blob: localBest, w, h };
      if (localBest.size >= minBytes && localBest.size <= maxBytes) break;
      if (localBest.size > maxBytes) scaleFactor *= 0.88;
      else if (localBest.size < minBytes && scaleFactor < 1.4) {
        // too small even at high quality — upscale a bit
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
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export { formatSpecSummary } from "./format";
