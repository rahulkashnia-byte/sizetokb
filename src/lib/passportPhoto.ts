/** Passport photo presets + export helpers (300 DPI where applicable) */

export type PassportPreset = {
  id: string;
  label: string;
  hint: string;
  widthPx: number;
  heightPx: number;
  /** Physical width in mm (for print sheets); optional */
  widthMm?: number;
  heightMm?: number;
};

export const PASSPORT_PRESETS: PassportPreset[] = [
  {
    id: "india-passport",
    label: "India Passport",
    hint: "3.5 × 4.5 cm · 35 × 45 mm",
    widthPx: 413,
    heightPx: 531,
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "india-visa",
    label: "India Visa",
    hint: "3.5 × 4.5 cm",
    widthPx: 413,
    heightPx: 531,
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "exam",
    label: "Exam Standard",
    hint: "SSC · IBPS · UPSC · RRB · 200×230 px",
    widthPx: 200,
    heightPx: 230,
    widthMm: 35,
    heightMm: 40,
  },
  {
    id: "usa",
    label: "USA Passport",
    hint: "2 × 2 inch · 51 × 51 mm",
    widthPx: 600,
    heightPx: 600,
    widthMm: 51,
    heightMm: 51,
  },
  {
    id: "uk",
    label: "UK Passport",
    hint: "35 × 45 mm",
    widthPx: 413,
    heightPx: 531,
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "schengen",
    label: "Schengen Visa",
    hint: "35 × 45 mm",
    widthPx: 413,
    heightPx: 531,
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "inch-2x2",
    label: "2 × 2 inch",
    hint: "Most US applications",
    widthPx: 600,
    heightPx: 600,
    widthMm: 51,
    heightMm: 51,
  },
  {
    id: "mm-35x45",
    label: "35 × 45 mm",
    hint: "Universal standard",
    widthPx: 413,
    heightPx: 531,
    widthMm: 35,
    heightMm: 45,
  },
];

export type CropRect = { x: number; y: number; width: number; height: number };

export type PassportAdjust = {
  brightness: number; // -100..100
  contrast: number; // -100..100
  saturation: number; // -100..100
  rotate: 0 | 90 | 180 | 270;
  flipH: boolean;
};

export const DEFAULT_ADJUST: PassportAdjust = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  rotate: 0,
  flipH: false,
};

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: "image/jpeg" | "image/png",
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), type, quality);
  });
}

/** Draw source image onto canvas with rotate/flip applied (natural size of transformed image) */
export function drawTransformed(
  img: HTMLImageElement,
  adjust: Pick<PassportAdjust, "rotate" | "flipH">
): HTMLCanvasElement {
  const rot = adjust.rotate;
  const swap = rot === 90 || rot === 270;
  const canvas = document.createElement("canvas");
  canvas.width = swap ? img.naturalHeight : img.naturalWidth;
  canvas.height = swap ? img.naturalWidth : img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.save();
  if (rot === 90) {
    ctx.translate(canvas.width, 0);
    ctx.rotate(Math.PI / 2);
  } else if (rot === 180) {
    ctx.translate(canvas.width, canvas.height);
    ctx.rotate(Math.PI);
  } else if (rot === 270) {
    ctx.translate(0, canvas.height);
    ctx.rotate(-Math.PI / 2);
  }
  if (adjust.flipH) {
    ctx.translate(img.naturalWidth, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, 0, 0);
  ctx.restore();
  return canvas;
}

function applyAdjustments(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  adjust: PassportAdjust
) {
  if (!adjust.brightness && !adjust.contrast && !adjust.saturation) return;
  const data = ctx.getImageData(0, 0, w, h);
  const d = data.data;
  const b = adjust.brightness / 100;
  const c = (adjust.contrast + 100) / 100;
  const s = (adjust.saturation + 100) / 100;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let bl = d[i + 2];
    // contrast around mid-gray
    r = (r - 128) * c + 128;
    g = (g - 128) * c + 128;
    bl = (bl - 128) * c + 128;
    // brightness
    r += b * 255;
    g += b * 255;
    bl += b * 255;
    // saturation
    const gray = 0.299 * r + 0.587 * g + 0.114 * bl;
    r = gray + (r - gray) * s;
    g = gray + (g - gray) * s;
    bl = gray + (bl - gray) * s;
    d[i] = Math.max(0, Math.min(255, r));
    d[i + 1] = Math.max(0, Math.min(255, g));
    d[i + 2] = Math.max(0, Math.min(255, bl));
  }
  ctx.putImageData(data, 0, 0);
}

/** Soft edge flood: replace near-corner background with solid color */
function floodBackgroundToColor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  targetHex: string,
  tolerance = 38
) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  const hex = targetHex.replace("#", "");
  const tr = parseInt(hex.slice(0, 2), 16);
  const tg = parseInt(hex.slice(2, 4), 16);
  const tb = parseInt(hex.slice(4, 6), 16);

  const sample = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return [d[i], d[i + 1], d[i + 2]] as const;
  };
  const corners = [sample(2, 2), sample(w - 3, 2), sample(2, h - 3), sample(w - 3, h - 3)];
  const bg = corners
    .reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0])
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
    d[i] = tr;
    d[i + 1] = tg;
    d[i + 2] = tb;
    d[i + 3] = 255;
    const x = idx % w;
    const y = Math.floor(idx / w);
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  ctx.putImageData(imageData, 0, 0);
}

export async function exportPassportPhoto(options: {
  source: HTMLImageElement;
  crop: CropRect; // in transformed-image pixel space
  preset: PassportPreset;
  bgColor: string;
  replaceBg: boolean;
  adjust: PassportAdjust;
  format: "image/jpeg" | "image/png";
  maxKb?: number;
}): Promise<{ blob: Blob; url: string; width: number; height: number; sizeKb: number }> {
  const { source, crop, preset, bgColor, replaceBg, adjust, format } = options;
  const transformed = drawTransformed(source, adjust);

  const out = document.createElement("canvas");
  out.width = preset.widthPx;
  out.height = preset.heightPx;
  const ctx = out.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, out.width, out.height);

  const sx = Math.max(0, Math.floor(crop.x));
  const sy = Math.max(0, Math.floor(crop.y));
  const sw = Math.max(1, Math.min(Math.floor(crop.width), transformed.width - sx));
  const sh = Math.max(1, Math.min(Math.floor(crop.height), transformed.height - sy));
  ctx.drawImage(transformed, sx, sy, sw, sh, 0, 0, out.width, out.height);

  applyAdjustments(ctx, out.width, out.height, adjust);
  if (replaceBg) floodBackgroundToColor(ctx, out.width, out.height, bgColor);

  let quality = 0.92;
  let blob = await canvasToBlob(out, format, quality);
  const maxKb = options.maxKb;
  if (format === "image/jpeg" && maxKb) {
    for (let i = 0; i < 12 && blob.size / 1024 > maxKb && quality > 0.18; i++) {
      quality *= 0.78;
      blob = await canvasToBlob(out, format, quality);
    }
  }

  return {
    blob,
    url: URL.createObjectURL(blob),
    width: out.width,
    height: out.height,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

export type PrintLayout = 2 | 4 | 6 | 8 | 12;

/** Tile passport photos onto A4 with dashed cut guides */
export async function exportPrintSheet(options: {
  photoBlob: Blob;
  preset: PassportPreset;
  count: PrintLayout;
}): Promise<{ blob: Blob; url: string }> {
  const { photoBlob, preset, count } = options;
  const photoUrl = URL.createObjectURL(photoBlob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = photoUrl;
    });

    // A4 at 300 DPI
    const pageW = 2480;
    const pageH = 3508;
    const margin = 80;
    const gap = 24;
    const cols = count <= 2 ? 1 : count <= 6 ? 2 : 3;
    const rows = Math.ceil(count / cols);

    // physical size on page: prefer mm, else scale from px assuming 300dpi
    const mmToPx = (mm: number) => Math.round((mm / 25.4) * 300);
    const cellW = preset.widthMm ? mmToPx(preset.widthMm) : preset.widthPx;
    const cellH = preset.heightMm ? mmToPx(preset.heightMm) : preset.heightPx;

    const canvas = document.createElement("canvas");
    canvas.width = pageW;
    canvas.height = pageH;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageW, pageH);

    const gridW = cols * cellW + (cols - 1) * gap;
    const gridH = rows * cellH + (rows - 1) * gap;
    const startX = Math.max(margin, Math.round((pageW - gridW) / 2));
    const startY = Math.max(margin, Math.round((pageH - gridH) / 2));

    ctx.strokeStyle = "#999999";
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;

    let n = 0;
    for (let r = 0; r < rows && n < count; r++) {
      for (let c = 0; c < cols && n < count; c++) {
        const x = startX + c * (cellW + gap);
        const y = startY + r * (cellH + gap);
        ctx.drawImage(img, x, y, cellW, cellH);
        ctx.strokeRect(x, y, cellW, cellH);
        n++;
      }
    }

    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    return { blob, url: URL.createObjectURL(blob) };
  } finally {
    URL.revokeObjectURL(photoUrl);
  }
}

/** Initial crop centered with correct aspect for preset, on transformed canvas size */
export function initialCrop(
  imgW: number,
  imgH: number,
  preset: PassportPreset
): CropRect {
  const aspect = preset.widthPx / preset.heightPx;
  let width = imgW;
  let height = width / aspect;
  if (height > imgH) {
    height = imgH;
    width = height * aspect;
  }
  // use ~90% of max fit for some margin
  width *= 0.92;
  height *= 0.92;
  return {
    x: (imgW - width) / 2,
    y: (imgH - height) / 2,
    width,
    height,
  };
}
