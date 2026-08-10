import { loadImageFromFile } from "@/lib/image";

export type PadResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  sizeKb: number;
  inRange: boolean;
  filename: string;
};

async function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), "image/jpeg", quality);
  });
}

/**
 * Increase JPEG size into [minKb, maxKb] when the source is too small for portals.
 * Upscales / raises quality; never invents fake bytes that break image decode.
 */
export async function padImageToMinKb(
  file: File,
  options: { minKb: number; maxKb: number; filename?: string }
): Promise<PadResult> {
  const minBytes = options.minKb * 1024;
  const maxBytes = options.maxKb * 1024;
  if (minBytes <= 0 || maxBytes < minBytes) throw new Error("Invalid min/max KB");

  const img = await loadImageFromFile(file);
  let scale = 1;
  let best: { blob: Blob; w: number; h: number } | null = null;

  for (let attempt = 0; attempt < 14; attempt++) {
    const w = Math.max(40, Math.round(img.naturalWidth * scale));
    const h = Math.max(40, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);

    // Prefer high quality when padding up
    let lo = 0.55;
    let hi = 0.98;
    let localBest: Blob | null = null;

    for (let i = 0; i < 10; i++) {
      const q = (lo + hi) / 2;
      const blob = await canvasToJpeg(canvas, q);
      if (blob.size < minBytes) {
        lo = q;
        localBest = blob;
      } else if (blob.size > maxBytes) {
        hi = q;
      } else {
        localBest = blob;
        // nudge toward mid of band
        const mid = (minBytes + maxBytes) / 2;
        if (blob.size < mid) lo = q;
        else hi = q;
      }
    }

    if (localBest) {
      best = { blob: localBest, w, h };
      if (localBest.size >= minBytes && localBest.size <= maxBytes) break;
      if (localBest.size < minBytes) {
        scale *= 1.18;
        continue;
      }
      if (localBest.size > maxBytes && scale > 1) {
        scale *= 0.92;
        continue;
      }
      break;
    }
    scale *= 1.15;
  }

  if (!best) throw new Error("Could not reach target KB range");

  const sizeKb = Math.round((best.blob.size / 1024) * 10) / 10;
  return {
    blob: best.blob,
    url: URL.createObjectURL(best.blob),
    width: best.w,
    height: best.h,
    sizeKb,
    inRange: best.blob.size >= minBytes && best.blob.size <= maxBytes,
    filename: `${options.filename || "min-kb-padded"}.jpg`,
  };
}
