import { PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";

export async function imagesToPdf(
  files: { blob: Blob; name: string }[],
  options?: { minKb?: number; maxKb?: number }
): Promise<{ blob: Blob; sizeKb: number; inRange: boolean }> {
  let quality = 0.92;
  let scale = 1;
  let blob = await buildImagesPdf(files, quality, scale);
  let sizeKb = blob.size / 1024;
  const minKb = options?.minKb;
  const maxKb = options?.maxKb;

  if (maxKb != null) {
    for (let i = 0; i < 12 && sizeKb > maxKb; i++) {
      if (quality > 0.35) quality *= 0.75;
      else scale *= 0.85;
      blob = await buildImagesPdf(files, quality, scale);
      sizeKb = blob.size / 1024;
      if (quality < 0.25 && scale < 0.45) break;
    }
  }

  // If under a required minimum, raise quality/scale toward the band (best-effort).
  if (minKb != null && sizeKb < minKb) {
    let best = { blob, sizeKb, dist: Math.abs(sizeKb - (minKb + (maxKb ?? minKb)) / 2) };
    for (let i = 0; i < 10; i++) {
      quality = Math.min(0.95, quality + 0.06);
      scale = Math.min(1.35, scale * 1.08);
      blob = await buildImagesPdf(files, quality, scale);
      sizeKb = blob.size / 1024;
      if (maxKb != null && sizeKb > maxKb) {
        quality *= 0.85;
        blob = await buildImagesPdf(files, quality, scale);
        sizeKb = blob.size / 1024;
      }
      const mid = (minKb + (maxKb ?? minKb * 1.4)) / 2;
      const dist = Math.abs(sizeKb - mid);
      if (dist < best.dist) best = { blob, sizeKb, dist };
      if (sizeKb >= minKb && (maxKb == null || sizeKb <= maxKb)) {
        best = { blob, sizeKb, dist: 0 };
        break;
      }
    }
    blob = best.blob;
    sizeKb = best.sizeKb;
  }

  const rounded = Math.round(sizeKb * 10) / 10;
  const inRange =
    (minKb == null || rounded >= minKb) && (maxKb == null || rounded <= maxKb);
  return { blob, sizeKb: rounded, inRange };
}

async function buildImagesPdf(
  files: { blob: Blob; name: string }[],
  quality: number,
  scale: number
): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 24;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) doc.addPage();
    const dataUrl = await blobToJpegDataUrl(files[i].blob, quality, scale);
    const img = await loadHtmlImage(dataUrl);
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const fit = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
    const w = img.naturalWidth * fit;
    const h = img.naturalHeight * fit;
    doc.addImage(dataUrl, "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h);
  }
  return doc.output("blob");
}

/**
 * Real PDF shrink: render each page with PDF.js → JPEG → rebuild PDF.
 * pdf-lib alone cannot recompress embedded images, which is why shrink failed before.
 */
export async function compressPdfFile(
  file: File,
  maxKb: number,
  onProgress?: (msg: string) => void
): Promise<{ blob: Blob; sizeKb: number; pages: number }> {
  onProgress?.("Reading PDF…");
  const bytes = await file.arrayBuffer();

  // Fast path: if already under target, still lightly rewrite
  const origKb = bytes.byteLength / 1024;
  if (origKb <= maxKb) {
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const saved = await pdf.save({ useObjectStreams: true });
    const blob = new Blob([Uint8Array.from(saved)], { type: "application/pdf" });
    return {
      blob,
      sizeKb: Math.round((blob.size / 1024) * 10) / 10,
      pages: pdf.getPageCount(),
    };
  }

  onProgress?.("Loading pages…");
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const loadingTask = getDocument({ data: new Uint8Array(bytes) });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;

  let quality = 0.72;
  let renderScale = pickInitialScale(origKb, maxKb, pageCount);

  for (let attempt = 0; attempt < 12; attempt++) {
    onProgress?.(
      `Compressing… pass ${attempt + 1} (quality ${Math.round(quality * 100)}%, scale ${renderScale.toFixed(2)})`
    );
    const pageDataUrls: string[] = [];

    for (let p = 1; p <= pageCount; p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: renderScale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext("2d", { alpha: false })!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
      pageDataUrls.push(canvas.toDataURL("image/jpeg", quality));
      // free memory hints
      canvas.width = 0;
      canvas.height = 0;
    }

    const blob = pagesToPdfBlob(pageDataUrls);
    const sizeKb = blob.size / 1024;
    if (sizeKb <= maxKb || (quality <= 0.28 && renderScale <= 0.55)) {
      return { blob, sizeKb: Math.round(sizeKb * 10) / 10, pages: pageCount };
    }

    // Prefer lowering JPEG quality, then resolution
    if (quality > 0.35) quality *= 0.78;
    else renderScale = Math.max(0.5, renderScale * 0.82);
  }

  // last attempt already returned in loop; fallback
  const fallback = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const saved = await fallback.save({ useObjectStreams: true });
  const blob = new Blob([Uint8Array.from(saved)], { type: "application/pdf" });
  return {
    blob,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
    pages: pageCount,
  };
}

function pickInitialScale(origKb: number, maxKb: number, pages: number): number {
  const ratio = maxKb / Math.max(origKb, 1);
  if (pages > 20) return 1.0;
  if (ratio > 0.7) return 1.5;
  if (ratio > 0.4) return 1.25;
  if (ratio > 0.2) return 1.0;
  return 0.85;
}

function pagesToPdfBlob(dataUrls: string[]): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  dataUrls.forEach((dataUrl, i) => {
    if (i > 0) doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageW, pageH, "F");
    const props = doc.getImageProperties(dataUrl);
    const ratio = Math.min(pageW / props.width, pageH / props.height);
    const w = props.width * ratio;
    const h = props.height * ratio;
    doc.addImage(dataUrl, "JPEG", (pageW - w) / 2, (pageH - h) / 2, w, h);
  });
  return doc.output("blob");
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

async function blobToJpegDataUrl(
  blob: Blob,
  quality: number,
  scale = 1
): Promise<string> {
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadHtmlImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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

export { blobToDataUrl, loadHtmlImage };
