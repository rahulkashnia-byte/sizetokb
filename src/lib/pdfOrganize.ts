import { PDFDocument } from "pdf-lib";

export async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

/** order = 0-based indices in desired order; omit deleted pages */
export async function organizePdf(
  file: File,
  order: number[]
): Promise<{ blob: Blob; pages: number }> {
  if (!order.length) throw new Error("Keep at least one page");
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  for (const i of order) {
    if (i < 0 || i >= total) throw new Error(`Invalid page index ${i + 1}`);
  }
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, order);
  copied.forEach((p) => out.addPage(p));
  const saved = await out.save({ useObjectStreams: true });
  return {
    blob: new Blob([Uint8Array.from(saved)], { type: "application/pdf" }),
    pages: out.getPageCount(),
  };
}
