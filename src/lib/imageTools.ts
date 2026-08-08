/** Client-side image merge / crop / flip helpers */

export type MergeLayout = "horizontal" | "vertical" | "grid";

async function loadFileImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
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

function canvasToBlob(canvas: HTMLCanvasElement, type = "image/jpeg", quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), type, quality);
  });
}

export async function mergeImages(
  files: File[],
  layout: MergeLayout = "horizontal"
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  if (files.length < 2) throw new Error("Add at least 2 images to merge");
  const imgs = await Promise.all(files.map(loadFileImage));

  let width = 0;
  let height = 0;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  if (layout === "horizontal") {
    height = Math.max(...imgs.map((i) => i.naturalHeight));
    width = imgs.reduce((s, i) => s + Math.round((i.naturalWidth / i.naturalHeight) * height), 0);
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    let x = 0;
    for (const img of imgs) {
      const w = Math.round((img.naturalWidth / img.naturalHeight) * height);
      ctx.drawImage(img, x, 0, w, height);
      x += w;
    }
  } else if (layout === "vertical") {
    width = Math.max(...imgs.map((i) => i.naturalWidth));
    height = imgs.reduce((s, i) => s + Math.round((i.naturalHeight / i.naturalWidth) * width), 0);
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    let y = 0;
    for (const img of imgs) {
      const h = Math.round((img.naturalHeight / img.naturalWidth) * width);
      ctx.drawImage(img, 0, y, width, h);
      y += h;
    }
  } else {
    const cols = Math.ceil(Math.sqrt(imgs.length));
    const rows = Math.ceil(imgs.length / cols);
    const cellW = Math.max(...imgs.map((i) => i.naturalWidth));
    const cellH = Math.max(...imgs.map((i) => i.naturalHeight));
    // normalize cell to max side 1200 for memory
    const maxCell = 1200;
    const scale = Math.min(1, maxCell / Math.max(cellW, cellH));
    const cw = Math.round(cellW * scale);
    const ch = Math.round(cellH * scale);
    canvas.width = cw * cols;
    canvas.height = ch * rows;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    imgs.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const fit = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * fit;
      const h = img.naturalHeight * fit;
      const x = col * cw + (cw - w) / 2;
      const y = row * ch + (ch - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    });
  }

  const blob = await canvasToBlob(canvas);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
  };
}

export async function cropImage(
  file: File,
  crop: { x: number; y: number; width: number; height: number }
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const img = await loadFileImage(file);
  const x = Math.max(0, Math.floor(crop.x));
  const y = Math.max(0, Math.floor(crop.y));
  const w = Math.max(1, Math.floor(crop.width));
  const h = Math.max(1, Math.floor(crop.height));
  if (x + w > img.naturalWidth || y + h > img.naturalHeight) {
    throw new Error("Crop area is outside the image");
  }
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  const blob = await canvasToBlob(canvas);
  return { blob, url: URL.createObjectURL(blob), width: w, height: h };
}

export type ReverseMode = "flip-h" | "flip-v" | "rotate-180" | "rotate-90" | "rotate-270";

export async function reverseImage(
  file: File,
  mode: ReverseMode
): Promise<{ blob: Blob; url: string; width: number; height: number }> {
  const img = await loadFileImage(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  if (mode === "rotate-90" || mode === "rotate-270") {
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
  } else {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }

  ctx.save();
  switch (mode) {
    case "flip-h":
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      break;
    case "flip-v":
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0);
      break;
    case "rotate-180":
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);
      ctx.drawImage(img, 0, 0);
      break;
    case "rotate-90":
      ctx.translate(canvas.width, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, 0, 0);
      break;
    case "rotate-270":
      ctx.translate(0, canvas.height);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(img, 0, 0);
      break;
  }
  ctx.restore();

  const blob = await canvasToBlob(canvas);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
  };
}

export { loadFileImage };
