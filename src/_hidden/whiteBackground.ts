/**
 * Turn photo backgrounds white using edge flood-fill + color distance.
 * Best for plain / near-plain backdrops (exam / passport style).
 */

export interface WhiteBgOptions {
  /** 0–100: how far from sampled bg color to treat as background (default 28) */
  tolerance?: number;
  /** Soft edge blend in px (default 2) */
  feather?: number;
  /** Output JPEG quality 0–1 (default 0.92) */
  quality?: number;
}

export interface WhiteBgResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  filename: string;
}

async function loadImage(file: File): Promise<HTMLImageElement> {
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

function colorDist(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/** Sample average color from image corners / edge strips. */
function sampleBackground(data: Uint8ClampedArray, w: number, h: number): [number, number, number] {
  const points: [number, number][] = [];
  const inset = Math.max(2, Math.floor(Math.min(w, h) * 0.02));
  const step = Math.max(1, Math.floor(Math.min(w, h) / 40));

  for (let x = 0; x < w; x += step) {
    points.push([x, inset], [x, h - 1 - inset]);
  }
  for (let y = 0; y < h; y += step) {
    points.push([inset, y], [w - 1 - inset, y]);
  }
  // corners
  points.push([inset, inset], [w - 1 - inset, inset], [inset, h - 1 - inset], [w - 1 - inset, h - 1 - inset]);

  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (const [x, y] of points) {
    const i = (y * w + x) * 4;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n++;
  }
  return [r / n, g / n, b / n];
}

function floodMask(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  bg: [number, number, number],
  maxDist: number
): Uint8Array {
  const mask = new Uint8Array(w * h); // 1 = background
  const visited = new Uint8Array(w * h);
  const queue: number[] = [];

  const tryPush = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    const i = idx * 4;
    const d = colorDist(data[i], data[i + 1], data[i + 2], bg[0], bg[1], bg[2]);
    if (d <= maxDist) {
      mask[idx] = 1;
      queue.push(idx);
    }
  };

  // seed from full border
  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop()!;
    const x = idx % w;
    const y = (idx / w) | 0;
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }

  return mask;
}

function dilateMask(mask: Uint8Array, w: number, h: number, radius: number): Float32Array {
  // soft alpha: 0 = keep subject, 1 = full white bg
  const soft = new Float32Array(w * h);
  for (let i = 0; i < mask.length; i++) soft[i] = mask[i] ? 1 : 0;
  if (radius <= 0) return soft;

  // distance-ish blur of mask for feather
  const tmp = new Float32Array(w * h);
  const r = Math.max(1, Math.round(radius));

  // box blur passes
  for (let pass = 0; pass < 2; pass++) {
    // horizontal
    for (let y = 0; y < h; y++) {
      let sum = 0;
      for (let x = -r; x <= r; x++) {
        const xx = Math.min(w - 1, Math.max(0, x));
        sum += soft[y * w + xx];
      }
      for (let x = 0; x < w; x++) {
        tmp[y * w + x] = sum / (r * 2 + 1);
        const leave = Math.min(w - 1, Math.max(0, x - r));
        const enter = Math.min(w - 1, Math.max(0, x + r + 1));
        sum += soft[y * w + enter] - soft[y * w + leave];
      }
    }
    // vertical
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let y = -r; y <= r; y++) {
        const yy = Math.min(h - 1, Math.max(0, y));
        sum += tmp[yy * w + x];
      }
      for (let y = 0; y < h; y++) {
        soft[y * w + x] = sum / (r * 2 + 1);
        const leave = Math.min(h - 1, Math.max(0, y - r));
        const enter = Math.min(h - 1, Math.max(0, y + r + 1));
        sum += tmp[enter * w + x] - tmp[leave * w + x];
      }
    }
  }
  return soft;
}

export async function whitenBackground(
  file: File,
  options: WhiteBgOptions = {}
): Promise<WhiteBgResult> {
  const tolerance = options.tolerance ?? 28;
  const feather = options.feather ?? 2;
  const quality = options.quality ?? 0.92;

  const img = await loadImage(file);
  // Cap very large images for performance
  const maxSide = 2400;
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const bg = sampleBackground(data, w, h);
  // tolerance 0–100 maps to color distance ~0–175
  const maxDist = (tolerance / 100) * 175;
  const mask = floodMask(data, w, h, bg, maxDist);
  const soft = dilateMask(mask, w, h, feather);

  for (let i = 0; i < w * h; i++) {
    const a = soft[i];
    if (a <= 0.01) continue;
    const p = i * 4;
    data[p] = Math.round(data[p] * (1 - a) + 255 * a);
    data[p + 1] = Math.round(data[p + 1] * (1 - a) + 255 * a);
    data[p + 2] = Math.round(data[p + 2] * (1 - a) + 255 * a);
  }

  ctx.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      "image/jpeg",
      quality
    );
  });

  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h,
    filename: `${base}-white-bg.jpg`,
  };
}
