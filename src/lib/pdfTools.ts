import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files: File[]): Promise<{ blob: Blob; pages: number }> {
  if (files.length < 2) throw new Error("Add at least 2 PDFs to merge");
  const out = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await out.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const saved = await out.save({ useObjectStreams: true });
  return {
    blob: new Blob([Uint8Array.from(saved)], { type: "application/pdf" }),
    pages: out.getPageCount(),
  };
}

/**
 * Split PDF into one PDF per page, or extract a page range (1-based inclusive).
 */
export async function splitPdf(
  file: File,
  options?: { from?: number; to?: number; mode?: "each" | "range" }
): Promise<{ blobs: { blob: Blob; filename: string }[]; pages: number }> {
  const bytes = await file.arrayBuffer();
  const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const total = src.getPageCount();
  const base = file.name.replace(/\.pdf$/i, "") || "document";
  const mode = options?.mode ?? "each";

  if (mode === "range") {
    const from = Math.max(1, options?.from ?? 1);
    const to = Math.min(total, options?.to ?? total);
    if (from > to) throw new Error("Invalid page range");
    const out = await PDFDocument.create();
    const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
    const pages = await out.copyPages(src, indices);
    pages.forEach((p) => out.addPage(p));
    const saved = await out.save({ useObjectStreams: true });
    return {
      blobs: [
        {
          blob: new Blob([Uint8Array.from(saved)], { type: "application/pdf" }),
          filename: `${base}-p${from}-${to}.pdf`,
        },
      ],
      pages: total,
    };
  }

  const blobs: { blob: Blob; filename: string }[] = [];
  for (let i = 0; i < total; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    const saved = await out.save({ useObjectStreams: true });
    blobs.push({
      blob: new Blob([Uint8Array.from(saved)], { type: "application/pdf" }),
      filename: `${base}-page-${i + 1}.pdf`,
    });
  }
  return { blobs, pages: total };
}
