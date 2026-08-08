import { loadImageFile, canvasToBlob } from "@/lib/extraImageTools";

export type WatermarkOptions = {
  text: string;
  opacity: number; // 0-1
  color: string;
  fontSize: number;
  angle: number; // degrees
  tiled: boolean;
};

export async function watermarkImage(
  file: File,
  opts: WatermarkOptions
): Promise<{ blob: Blob; url: string; sizeKb: number }> {
  const img = await loadImageFile(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  paintWatermark(ctx, canvas.width, canvas.height, opts);
  const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
  return {
    blob,
    url: URL.createObjectURL(blob),
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

export function paintWatermark(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  opts: WatermarkOptions
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0.05, Math.min(0.9, opts.opacity));
  ctx.fillStyle = opts.color;
  ctx.font = `bold ${opts.fontSize}px Lato, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (!opts.tiled) {
    ctx.translate(w / 2, h / 2);
    ctx.rotate((opts.angle * Math.PI) / 180);
    ctx.fillText(opts.text, 0, 0);
  } else {
    const stepX = opts.fontSize * Math.max(4, opts.text.length * 0.7);
    const stepY = opts.fontSize * 4;
    for (let y = -h; y < h * 2; y += stepY) {
      for (let x = -w; x < w * 2; x += stepX) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((opts.angle * Math.PI) / 180);
        ctx.fillText(opts.text, 0, 0);
        ctx.restore();
      }
    }
  }
  ctx.restore();
}

/** Stamp each PDF page by flattening render + watermark → new PDF */
export async function watermarkPdf(
  file: File,
  opts: WatermarkOptions,
  onProgress?: (msg: string) => void
): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const bytes = await file.arrayBuffer();
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const pdf = await getDocument({ data: new Uint8Array(bytes) }).promise;
  let doc: InstanceType<typeof jsPDF> | null = null;

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress?.(`Watermarking page ${i}/${pdf.numPages}…`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    paintWatermark(ctx, canvas.width, canvas.height, {
      ...opts,
      fontSize: Math.max(18, Math.round(opts.fontSize * 1.2)),
    });
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    const wPt = canvas.width * 0.75;
    const hPt = canvas.height * 0.75;
    if (!doc) {
      doc = new jsPDF({ unit: "pt", format: [wPt, hPt], compress: true });
      doc.addImage(dataUrl, "JPEG", 0, 0, wPt, hPt);
    } else {
      doc.addPage([wPt, hPt]);
      doc.addImage(dataUrl, "JPEG", 0, 0, wPt, hPt);
    }
    canvas.width = 0;
    canvas.height = 0;
  }
  if (!doc) throw new Error("No pages");
  return doc.output("blob");
}
