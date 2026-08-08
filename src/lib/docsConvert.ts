import { Document, Packer, Paragraph, TextRun } from "docx";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * Best-effort PDF → Word (.docx): extracts text per page.
 * Scanned/image-only PDFs will have little or no text.
 */
export async function pdfToDocx(
  file: File,
  onProgress?: (msg: string) => void
): Promise<{ blob: Blob; filename: string; pages: number; chars: number }> {
  onProgress?.("Loading PDF…");
  const bytes = await file.arrayBuffer();
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const pdf = await getDocument({ data: new Uint8Array(bytes) }).promise;
  const children: Paragraph[] = [];
  let chars = 0;

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress?.(`Extracting text… page ${i}/${pdf.numPages}`);
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item ? String(item.str) : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (i > 1) children.push(new Paragraph({ text: "" }));
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `— Page ${i} —`, bold: true, size: 20, color: "666666" }),
        ],
      })
    );
    if (line) {
      chars += line.length;
      // split long lines into paragraphs ~800 chars
      for (let s = 0; s < line.length; s += 800) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: line.slice(s, s + 800), size: 22 })],
            spacing: { after: 120 },
          })
        );
      }
    } else {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "[No selectable text on this page — likely a scanned image. Use Image tools / OCR elsewhere.]",
              italics: true,
              size: 20,
              color: "999999",
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });
  const blob = await Packer.toBlob(doc);
  const base = file.name.replace(/\.pdf$/i, "") || "document";
  return { blob, filename: `${base}.docx`, pages: pdf.numPages, chars };
}

/**
 * Word (.docx) → PDF: mammoth HTML → canvas snapshot pages → jsPDF.
 * Complex Word layouts may not match Microsoft Word 1:1.
 */
export async function docxToPdf(
  file: File,
  onProgress?: (msg: string) => void
): Promise<{ blob: Blob; filename: string }> {
  onProgress?.("Reading Word file…");
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value || "<p>(Empty document)</p>";

  onProgress?.("Rendering to PDF…");
  const host = document.createElement("div");
  host.style.cssText =
    "position:fixed;left:-10000px;top:0;width:794px;padding:40px;background:#fff;color:#111;font-family:Lato,Arial,sans-serif;font-size:14px;line-height:1.5;";
  host.innerHTML = html;
  document.body.appendChild(host);

  try {
    const canvas = await html2canvas(host, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pageW = 595.28; // A4 pt
    const pageH = 841.89;
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;
    const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });

    let heightLeft = imgH;
    let position = 0;
    const pageData = canvas.toDataURL("image/jpeg", 0.85);

    doc.addImage(pageData, "JPEG", 0, position, imgW, imgH);
    heightLeft -= pageH;

    while (heightLeft > 8) {
      position = heightLeft - imgH;
      doc.addPage();
      doc.addImage(pageData, "JPEG", 0, position, imgW, imgH);
      heightLeft -= pageH;
    }

    const blob = doc.output("blob");
    const base = file.name.replace(/\.docx$/i, "") || "document";
    return { blob, filename: `${base}.pdf` };
  } finally {
    document.body.removeChild(host);
  }
}
