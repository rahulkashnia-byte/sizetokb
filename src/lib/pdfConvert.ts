import JSZip from "jszip";

export type PdfImageFormat = "jpg" | "png";

export type PdfPageImage = {
  blob: Blob;
  filename: string;
  page: number;
  width: number;
  height: number;
  sizeKb: number;
};

async function loadPdfJs(
  file: File,
  password?: string
): Promise<{ pdf: import("pdfjs-dist").PDFDocumentProxy; pages: number }> {
  const bytes = await file.arrayBuffer();
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  try {
    const pdf = await getDocument({
      data: new Uint8Array(bytes),
      password: password || undefined,
    }).promise;
    return { pdf, pages: pdf.numPages };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const name = e && typeof e === "object" && "name" in e ? String((e as { name: string }).name) : "";
    if (
      name === "PasswordException" ||
      /password/i.test(msg) ||
      /encrypted/i.test(msg)
    ) {
      throw new Error(
        password
          ? "Wrong password — try again"
          : "This PDF is password protected. Enter the open password."
      );
    }
    throw e instanceof Error ? e : new Error("Could not open PDF");
  }
}

async function renderPageToCanvas(
  pdf: import("pdfjs-dist").PDFDocumentProxy,
  pageNum: number,
  scale: number
): Promise<HTMLCanvasElement> {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d", { alpha: false })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  return canvas;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: PdfImageFormat,
  quality: number
): Promise<Blob> {
  const mime = format === "png" ? "image/png" : "image/jpeg";
  const q = format === "png" ? undefined : quality;
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode image"))),
      mime,
      q
    );
  });
}

/** Convert each PDF page to JPG or PNG. Optional password + max KB per image. */
export async function pdfToImages(
  file: File,
  options?: {
    format?: PdfImageFormat;
    scale?: number;
    quality?: number;
    /** Cap each page image at this many KB (JPG quality/scale loop). */
    maxKb?: number;
    password?: string;
    onProgress?: (msg: string) => void;
  }
): Promise<{ images: PdfPageImage[]; pages: number }> {
  const format = options?.format ?? "jpg";
  let scale = options?.scale ?? 2;
  let quality = options?.quality ?? 0.92;
  const maxKb = options?.maxKb;
  const base = file.name.replace(/\.pdf$/i, "") || "page";

  options?.onProgress?.("Opening PDF…");
  const { pdf, pages } = await loadPdfJs(file, options?.password);
  const images: PdfPageImage[] = [];

  for (let i = 1; i <= pages; i++) {
    options?.onProgress?.(`Rendering page ${i}/${pages}…`);
    let canvas = await renderPageToCanvas(pdf, i, scale);
    let blob = await canvasToBlob(canvas, format, quality);
    let width = canvas.width;
    let height = canvas.height;

    if (maxKb != null && format === "jpg" && blob.size / 1024 > maxKb) {
      let q = quality;
      let s = scale;
      for (let attempt = 0; attempt < 12 && blob.size / 1024 > maxKb; attempt++) {
        if (q > 0.35) q *= 0.78;
        else s = Math.max(0.55, s * 0.85);
        canvas.width = 0;
        canvas.height = 0;
        canvas = await renderPageToCanvas(pdf, i, s);
        blob = await canvasToBlob(canvas, format, q);
        width = canvas.width;
        height = canvas.height;
        if (q < 0.28 && s <= 0.55) break;
      }
      quality = q;
      scale = s;
    }

    const ext = format === "png" ? "png" : "jpg";
    images.push({
      blob,
      filename: `${base}-page-${i}.${ext}`,
      page: i,
      width,
      height,
      sizeKb: Math.round((blob.size / 1024) * 10) / 10,
    });
    canvas.width = 0;
    canvas.height = 0;
  }

  return { images, pages };
}

export async function pdfToImagesZip(
  file: File,
  options?: Parameters<typeof pdfToImages>[1]
): Promise<{ blob: Blob; images: PdfPageImage[]; pages: number }> {
  const { images, pages } = await pdfToImages(file, options);
  const zip = new JSZip();
  for (const img of images) zip.file(img.filename, img.blob);
  options?.onProgress?.("Building ZIP…");
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, images, pages };
}

/**
 * Remove open/owner password by rebuilding an unlocked PDF (pages rendered).
 * Owner-only restrictions often unlock with an empty password.
 */
export async function unlockPdf(
  file: File,
  password: string,
  onProgress?: (msg: string) => void
): Promise<{ blob: Blob; pages: number; sizeKb: number }> {
  onProgress?.("Opening PDF…");
  const { pdf, pages } = await loadPdfJs(file, password || undefined);
  const { jsPDF } = await import("jspdf");
  let doc: InstanceType<typeof jsPDF> | null = null;

  for (let i = 1; i <= pages; i++) {
    onProgress?.(`Unlocking page ${i}/${pages}…`);
    const canvas = await renderPageToCanvas(pdf, i, 2);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
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

  if (!doc) throw new Error("PDF has no pages");
  const blob = doc.output("blob");
  return {
    blob,
    pages,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
  };
}

/** Quick check: does this PDF need an open password? */
export async function pdfNeedsPassword(file: File): Promise<boolean> {
  try {
    await loadPdfJs(file);
    return false;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    return /password/i.test(msg);
  }
}
