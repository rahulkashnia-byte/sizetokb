import { PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";

export async function imagesToPdf(
  files: { blob: Blob; name: string }[],
  options?: { maxKb?: number }
): Promise<{ blob: Blob; sizeKb: number }> {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 24;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) doc.addPage();
    const dataUrl = await blobToDataUrl(files[i].blob);
    const img = await loadHtmlImage(dataUrl);
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (pageW - w) / 2;
    const y = (pageH - h) / 2;
    const fmt = files[i].blob.type.includes("png") ? "PNG" : "JPEG";
    doc.addImage(dataUrl, fmt, x, y, w, h);
  }

  let blob = doc.output("blob");
  let sizeKb = blob.size / 1024;

  // If over max, re-encode pages with lower quality via canvas
  if (options?.maxKb && sizeKb > options.maxKb) {
    blob = await compressPdfImages(files, options.maxKb);
    sizeKb = blob.size / 1024;
  }

  return { blob, sizeKb: Math.round(sizeKb * 10) / 10 };
}

async function compressPdfImages(
  files: { blob: Blob; name: string }[],
  maxKb: number
): Promise<Blob> {
  let quality = 0.85;
  for (let attempt = 0; attempt < 8; attempt++) {
    const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 24;

    for (let i = 0; i < files.length; i++) {
      if (i > 0) doc.addPage();
      const dataUrl = await blobToJpegDataUrl(files[i].blob, quality);
      const img = await loadHtmlImage(dataUrl);
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;
      const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      doc.addImage(dataUrl, "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h);
    }

    const blob = doc.output("blob");
    if (blob.size / 1024 <= maxKb || quality < 0.2) return blob;
    quality *= 0.72;
  }
  return new Blob();
}

export async function compressPdfFile(
  file: File,
  maxKb: number
): Promise<{ blob: Blob; sizeKb: number }> {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  // pdf-lib can't re-encode embedded images easily; save with object streams
  const saved = await pdf.save({ useObjectStreams: true });
  let blob = new Blob([Uint8Array.from(saved)], { type: "application/pdf" });

  // If still too large and pages are few, rasterize via canvas approach:
  // Extract isn't available client-side without pdf.js; return best-effort save.
  // For stronger compression, convert first page preview path isn't enough —
  // we use a simple note that image-heavy PDFs should use Image→PDF tool.
  if (blob.size / 1024 > maxKb) {
    // try stripping metadata by rebuild
    const rebuilt = await PDFDocument.create();
    const pages = await rebuilt.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((p) => rebuilt.addPage(p));
    const out = await rebuilt.save({ useObjectStreams: true });
    blob = new Blob([Uint8Array.from(out)], { type: "application/pdf" });
  }

  return { blob, sizeKb: Math.round((blob.size / 1024) * 10) / 10 };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

async function blobToJpegDataUrl(blob: Blob, quality: number): Promise<string> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadHtmlImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
