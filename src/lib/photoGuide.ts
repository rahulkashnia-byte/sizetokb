import { loadImageFile } from "@/lib/extraImageTools";

export type PhotoGuideResult = {
  width: number;
  height: number;
  sizeKb: number;
  brightness: number; // 0-255
  contrast: number;
  whiteBgScore: number; // 0-100
  blurScore: number; // higher = sharper
  aspect: string;
  checks: { ok: boolean; label: string; detail: string }[];
  score: number; // 0-100 overall
};

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

export async function analyzePhotoGuide(file: File): Promise<PhotoGuideResult> {
  const img = await loadImageFile(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement("canvas");
  const maxSide = 640;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let sum = 0;
  let sumSq = 0;
  let n = 0;
  let edgeWhite = 0;
  let edgeN = 0;
  let lap = 0;

  const gray = new Float32Array(canvas.width * canvas.height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const g = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    gray[p] = g;
    sum += g;
    sumSq += g * g;
    n++;
  }
  const mean = sum / n;
  const variance = sumSq / n - mean * mean;
  const contrast = Math.sqrt(Math.max(0, variance));

  // edge samples for white background
  const sample = (x: number, y: number) => gray[y * canvas.width + x];
  for (let x = 0; x < canvas.width; x += 4) {
    for (const y of [1, canvas.height - 2]) {
      edgeWhite += sample(x, y);
      edgeN++;
    }
  }
  for (let y = 0; y < canvas.height; y += 4) {
    for (const x of [1, canvas.width - 2]) {
      edgeWhite += sample(x, y);
      edgeN++;
    }
  }
  const edgeMean = edgeWhite / Math.max(1, edgeN);
  const whiteBgScore = Math.round(Math.max(0, Math.min(100, ((edgeMean - 180) / 75) * 100)));

  // Laplacian variance ≈ sharpness
  for (let y = 1; y < canvas.height - 1; y++) {
    for (let x = 1; x < canvas.width - 1; x++) {
      const i = y * canvas.width + x;
      const v =
        -4 * gray[i] +
        gray[i - 1] +
        gray[i + 1] +
        gray[i - canvas.width] +
        gray[i + canvas.width];
      lap += v * v;
    }
  }
  const blurScore = lap / (canvas.width * canvas.height);

  const g = gcd(w, h) || 1;
  const checks: PhotoGuideResult["checks"] = [];

  checks.push({
    ok: w >= 200 && h >= 200,
    label: "Resolution",
    detail: `${w}×${h} px ${w >= 200 && h >= 200 ? "(ok for most forms)" : "(too low — retake closer)"}`,
  });
  checks.push({
    ok: mean > 70 && mean < 210,
    label: "Brightness",
    detail:
      mean < 70 ? "Too dark — face a window or add light" : mean > 210 ? "Too bright / washed out" : "Exposure looks usable",
  });
  checks.push({
    ok: contrast > 25,
    label: "Contrast",
    detail: contrast > 25 ? "Contrast is acceptable" : "Flat lighting — improve contrast",
  });
  checks.push({
    ok: whiteBgScore >= 55,
    label: "Background",
    detail:
      whiteBgScore >= 55
        ? "Edges look light/white (good for passport-style)"
        : "Background may not be plain white — try White Background tool",
  });
  checks.push({
    ok: blurScore > 40,
    label: "Sharpness",
    detail: blurScore > 40 ? "Sharp enough" : "Possibly blurry — hold steady and retake",
  });
  checks.push({
    ok: file.size / 1024 <= 500,
    label: "File size",
    detail: `${(file.size / 1024).toFixed(1)} KB — ${file.size / 1024 > 500 ? "reduce to KB before upload" : "ok before final KB target"}`,
  });

  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);

  return {
    width: w,
    height: h,
    sizeKb: Math.round((file.size / 1024) * 10) / 10,
    brightness: Math.round(mean),
    contrast: Math.round(contrast),
    whiteBgScore,
    blurScore: Math.round(blurScore),
    aspect: `${w / g}:${h / g}`,
    checks,
    score,
  };
}
