/** Extra client-side image utilities for aspirant tools */

export async function loadImageFile(file: File): Promise<HTMLImageElement> {
  let blob: Blob = file;
  const name = file.name.toLowerCase();
  if (name.endsWith(".heic") || name.endsWith(".heif") || file.type === "image/heic") {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    blob = Array.isArray(converted) ? converted[0] : converted;
  }
  const url = URL.createObjectURL(blob);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/jpeg",
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), type, quality);
  });
}

export type PassportSize = "india-3.5x4.5" | "us-2x2" | "india-2x2-inch";

const PASSPORT_PX: Record<PassportSize, { w: number; h: number; label: string }> = {
  "india-3.5x4.5": { w: 413, h: 531, label: "3.5×4.5 cm" }, // ~300 dpi
  "us-2x2": { w: 600, h: 600, label: "2×2 inch" },
  "india-2x2-inch": { w: 600, h: 600, label: "2×2 inch (India)" },
};

export function passportPresets() {
  return PASSPORT_PX;
}

/** Cover-crop to passport size on white background */
export async function makePassportPhoto(
  file: File,
  size: PassportSize,
  maxKb = 100
): Promise<{ blob: Blob; url: string; width: number; height: number; sizeKb: number; label: string }> {
  const preset = PASSPORT_PX[size];
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = preset.w;
  canvas.height = preset.h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, preset.w, preset.h);
  const scale = Math.max(preset.w / img.naturalWidth, preset.h / img.naturalHeight);
  const sw = preset.w / scale;
  const sh = preset.h / scale;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, preset.w, preset.h);

  let quality = 0.92;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);
  for (let i = 0; i < 10 && blob.size / 1024 > maxKb && quality > 0.2; i++) {
    quality *= 0.8;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: preset.w,
    height: preset.h,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
    label: preset.label,
  };
}

/** Soft edge flood: push near-background colors toward white (studio / plain walls) */
export async function whiteBackground(
  file: File,
  tolerance = 42
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imageData.data;
  const w = canvas.width;
  const h = canvas.height;

  const sample = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return [d[i], d[i + 1], d[i + 2]] as const;
  };
  const corners = [sample(2, 2), sample(w - 3, 2), sample(2, h - 3), sample(w - 3, h - 3)];
  const bg = corners
    .reduce(
      (a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]],
      [0, 0, 0]
    )
    .map((v) => v / 4) as [number, number, number];

  const visited = new Uint8Array(w * h);
  const stack: number[] = [];
  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    stack.push(idx);
  };
  // seed from edges
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  const tol2 = tolerance * tolerance * 3;
  while (stack.length) {
    const idx = stack.pop()!;
    const i = idx * 4;
    const dr = d[i] - bg[0];
    const dg = d[i + 1] - bg[1];
    const db = d[i + 2] - bg[2];
    if (dr * dr + dg * dg + db * db > tol2) continue;
    d[i] = d[i + 1] = d[i + 2] = 255;
    d[i + 3] = 255;
    const x = idx % w;
    const y = Math.floor(idx / w);
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  ctx.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
  return { blob, url: URL.createObjectURL(blob), width: canvas.width, height: canvas.height };
}

export async function cleanSignature(
  file: File,
  options?: { maxKb?: number; minKb?: number; threshold?: number }
): Promise<{ blob: Blob; url: string; width: number; height: number; sizeKb: number }> {
  const maxKb = options?.maxKb ?? 20;
  const minKb = options?.minKb ?? 10;
  const threshold = options?.threshold ?? 165;
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = data.data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const ink = gray < threshold;
    if (ink) {
      d[i] = d[i + 1] = d[i + 2] = Math.max(0, gray * 0.35);
      const p = i / 4;
      const x = p % canvas.width;
      const y = Math.floor(p / canvas.width);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    } else {
      d[i] = d[i + 1] = d[i + 2] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);

  const pad = 8;
  if (maxX > minX && maxY > minY) {
    const cw = Math.min(canvas.width, maxX - minX + 1 + pad * 2);
    const ch = Math.min(canvas.height, maxY - minY + 1 + pad * 2);
    const sx = Math.max(0, minX - pad);
    const sy = Math.max(0, minY - pad);
    const out = document.createElement("canvas");
    // typical signature slot ~ 140×60-ish; keep aspect, max width 600
    const targetW = Math.min(600, Math.max(180, cw));
    const targetH = Math.round((ch / cw) * targetW);
    out.width = targetW;
    out.height = Math.max(40, targetH);
    const octx = out.getContext("2d")!;
    octx.fillStyle = "#fff";
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(canvas, sx, sy, cw, ch, 0, 0, out.width, out.height);

    let quality = 0.85;
    let blob = await canvasToBlob(out, "image/jpeg", quality);
    for (let i = 0; i < 12 && blob.size / 1024 > maxKb && quality > 0.15; i++) {
      quality *= 0.78;
      blob = await canvasToBlob(out, "image/jpeg", quality);
    }
    // if still under minKb, bump quality
    if (blob.size / 1024 < minKb) {
      blob = await canvasToBlob(out, "image/jpeg", 0.95);
    }
    return {
      blob,
      url: URL.createObjectURL(blob),
      width: out.width,
      height: out.height,
      sizeKb: Math.round((blob.size / 1024) * 10) / 10,
    };
  }

  const blob = await canvasToBlob(canvas, "image/jpeg", 0.8);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

export type ConvertFormat = "image/jpeg" | "image/png" | "image/webp";

export async function convertImageFormat(
  file: File,
  format: ConvertFormat,
  quality = 0.92
): Promise<{ blob: Blob; url: string; ext: string; sizeKb: number }> {
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  if (format === "image/jpeg") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  const blob = await canvasToBlob(canvas, format, quality);
  const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
  return {
    blob,
    url: URL.createObjectURL(blob),
    ext,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

export type BwMode = "grayscale" | "bw";

export async function toGrayscaleOrBw(
  file: File,
  mode: BwMode,
  threshold = 140
): Promise<{ blob: Blob; url: string; sizeKb: number }> {
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const v = mode === "bw" ? (g < threshold ? 0 : 255) : g;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  ctx.putImageData(data, 0, 0);
  const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
  return {
    blob,
    url: URL.createObjectURL(blob),
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

export type ImageStats = {
  width: number;
  height: number;
  sizeKb: number;
  mime: string;
  aspect: string;
  dpiEstimate300: { wCm: number; hCm: number; wInch: number; hInch: number };
  notes: string[];
};

export async function analyzeImage(file: File): Promise<ImageStats> {
  const img = await loadImageFile(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(w, h) || 1;
  const notes: string[] = [];
  if (w < 200 || h < 200) notes.push("Resolution looks low for passport-style prints.");
  if (w >= 413 && h >= 531) notes.push("Meets ~3.5×4.5 cm at 300 DPI pixel count.");
  if (file.size / 1024 > 500) notes.push("File is large — many portals want under 100–200 KB.");
  if (file.size / 1024 < 10) notes.push("File is very small — may look blurry after upload.");
  const aspect = `${w / g}:${h / g}`;
  return {
    width: w,
    height: h,
    sizeKb: Math.round((file.size / 1024) * 10) / 10,
    mime: file.type || "unknown",
    aspect,
    dpiEstimate300: {
      wCm: Math.round(((w / 300) * 2.54) * 10) / 10,
      hCm: Math.round(((h / 300) * 2.54) * 10) / 10,
      wInch: Math.round((w / 300) * 100) / 100,
      hInch: Math.round((h / 300) * 100) / 100,
    },
    notes,
  };
}

/** Blur rectangular regions (image-space coords) for ID masking */
export async function maskRegions(
  file: File,
  regions: { x: number; y: number; width: number; height: number }[],
  blurPx = 18
): Promise<{ blob: Blob; url: string }> {
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  for (const r of regions) {
    const x = Math.max(0, Math.floor(r.x));
    const y = Math.max(0, Math.floor(r.y));
    const rw = Math.min(canvas.width - x, Math.floor(r.width));
    const rh = Math.min(canvas.height - y, Math.floor(r.height));
    if (rw < 2 || rh < 2) continue;
    const tmp = document.createElement("canvas");
    tmp.width = rw;
    tmp.height = rh;
    const tctx = tmp.getContext("2d")!;
    tctx.filter = `blur(${blurPx}px)`;
    tctx.drawImage(canvas, x, y, rw, rh, 0, 0, rw, rh);
    // solid fallback stripe for strong privacy
    tctx.filter = "none";
    tctx.fillStyle = "rgba(30,30,30,0.55)";
    tctx.fillRect(0, 0, rw, rh);
    ctx.drawImage(tmp, x, y);
  }

  const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);
  return { blob, url: URL.createObjectURL(blob) };
}

export async function heicToJpg(file: File): Promise<{ blob: Blob; url: string; sizeKb: number }> {
  const name = file.name.toLowerCase();
  const isHeic =
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    file.type === "image/heic" ||
    file.type === "image/heif";
  if (!isHeic) {
    // still re-encode as jpg for consistency
    return convertImageFormat(file, "image/jpeg").then((r) => ({
      blob: r.blob,
      url: r.url,
      sizeKb: r.sizeKb,
    }));
  }
  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  const blob = (Array.isArray(converted) ? converted[0] : converted) as Blob;
  return {
    blob,
    url: URL.createObjectURL(blob),
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}
