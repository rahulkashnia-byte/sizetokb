import { jsPDF } from "jspdf";

export type Point = { x: number; y: number };

export type PdfTool =
  | "select"
  | "text"
  | "edit-text"
  | "form"
  | "image"
  | "pen"
  | "highlight"
  | "rect"
  | "ellipse"
  | "line"
  | "arrow"
  | "erase";

export type AnnoBase = {
  id: string;
  page: number; // 0-based
};

export type TextAnno = AnnoBase & {
  kind: "text";
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  fontSize: number;
  color: string;
  bold?: boolean;
};

/** Cover original PDF text and rewrite (live edit of existing text) */
export type TextReplaceAnno = AnnoBase & {
  kind: "textReplace";
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  fontSize: number;
  color: string;
  original: string;
};

export type ImageAnno = AnnoBase & {
  kind: "image";
  x: number;
  y: number;
  w: number;
  h: number;
  dataUrl: string;
};

export type PathAnno = AnnoBase & {
  kind: "path";
  points: Point[];
  color: string;
  width: number;
};

export type ShapeAnno = AnnoBase & {
  kind: "rect" | "ellipse" | "highlight";
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  fill?: boolean;
  strokeWidth: number;
};

export type LineAnno = AnnoBase & {
  kind: "line" | "arrow";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
};

export type Annotation =
  | TextAnno
  | TextReplaceAnno
  | ImageAnno
  | PathAnno
  | ShapeAnno
  | LineAnno;

export type PageTextItem = {
  id: string;
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  fontSize: number;
};

export type FormFieldInfo = {
  name: string;
  type: "text" | "checkbox" | "dropdown" | "radio" | "unknown";
  value: string;
  checked?: boolean;
  options?: string[];
  pageIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** All coords are in CSS pixels of the rendered page viewport */
export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function loadPdfDocument(file: File) {
  const bytes = await file.arrayBuffer();
  const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const pdf = await getDocument({ data: new Uint8Array(bytes) }).promise;
  return { pdf, bytes };
}

export async function extractPageTextItems(
  pdf: Awaited<ReturnType<typeof loadPdfDocument>>["pdf"],
  pageIndex: number,
  scale: number
): Promise<PageTextItem[]> {
  const page = await pdf.getPage(pageIndex + 1);
  const viewport = page.getViewport({ scale });
  const content = await page.getTextContent();
  const { Util } = await import("pdfjs-dist");
  const items: PageTextItem[] = [];

  content.items.forEach((raw, idx) => {
    if (!("str" in raw) || !raw.str || !String(raw.str).trim()) return;
    const item = raw as {
      str: string;
      transform: number[];
      width: number;
      height: number;
    };
    const tx = Util.transform(viewport.transform, item.transform);
    const fontSize = Math.hypot(tx[2], tx[3]) || Math.max(10, item.height * scale);
    const x = tx[4];
    // PDF text baseline → top-ish box for HTML overlay
    const y = tx[5] - fontSize * 0.85;
    const w = Math.max(item.width * scale, fontSize * item.str.length * 0.45);
    const h = fontSize * 1.25;
    items.push({
      id: `t-${pageIndex}-${idx}`,
      page: pageIndex,
      x,
      y,
      w,
      h,
      text: item.str,
      fontSize,
    });
  });
  return items;
}

export async function extractFormFields(
  bytes: ArrayBuffer,
  scale: number
): Promise<FormFieldInfo[]> {
  const { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } =
    await import("pdf-lib");
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = doc.getForm();
  const fields = form.getFields();
  const out: FormFieldInfo[] = [];

  // Need page sizes for coord convert — use pdf-lib page
  const pages = doc.getPages();

  for (const field of fields) {
    const name = field.getName();
    let type: FormFieldInfo["type"] = "unknown";
    let value = "";
    let checked: boolean | undefined;
    let options: string[] | undefined;

    if (field instanceof PDFTextField) {
      type = "text";
      value = field.getText() ?? "";
    } else if (field instanceof PDFCheckBox) {
      type = "checkbox";
      checked = field.isChecked();
      value = checked ? "Yes" : "No";
    } else if (field instanceof PDFDropdown) {
      type = "dropdown";
      options = field.getOptions();
      const sel = field.getSelected();
      value = Array.isArray(sel) ? sel[0] ?? "" : sel ?? "";
    } else if (field instanceof PDFRadioGroup) {
      type = "radio";
      options = field.getOptions();
      value = field.getSelected() ?? "";
    }

    const widgets = field.acroField.getWidgets();
    widgets.forEach((widget, wi) => {
      try {
        const rect = widget.getRectangle();
        // Find page index
        let pageIndex = 0;
        const pageRef = widget.P();
        if (pageRef) {
          const idx = pages.findIndex((p) => p.ref === pageRef);
          if (idx >= 0) pageIndex = idx;
        }
        const page = pages[pageIndex];
        const { height: pageH } = page.getSize();
        const x = rect.x * scale;
        const y = (pageH - rect.y - rect.height) * scale;
        const w = rect.width * scale;
        const h = rect.height * scale;
        out.push({
          name: widgets.length > 1 ? `${name}#${wi}` : name,
          type,
          value,
          checked,
          options,
          pageIndex,
          x,
          y,
          w: Math.max(w, 24),
          h: Math.max(h, 18),
        });
      } catch {
        out.push({
          name,
          type,
          value,
          checked,
          options,
          pageIndex: 0,
          x: 40,
          y: 40 + out.length * 28,
          w: 200,
          h: 24,
        });
      }
    });
  }

  // De-dupe weird empties — keep unique names preferring first widget
  return out;
}

export async function exportFilledFormPdf(
  bytes: ArrayBuffer,
  values: Record<string, string | boolean>,
  flatten = false
): Promise<Blob> {
  const { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } =
    await import("pdf-lib");
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = doc.getForm();

  for (const [rawName, rawVal] of Object.entries(values)) {
    const name = rawName.replace(/#\d+$/, "");
    try {
      const field = form.getFieldMaybe(name);
      if (!field) continue;
      if (field instanceof PDFTextField) {
        field.setText(String(rawVal ?? ""));
      } else if (field instanceof PDFCheckBox) {
        if (rawVal === true || rawVal === "Yes" || rawVal === "true" || rawVal === "on") {
          field.check();
        } else {
          field.uncheck();
        }
      } else if (field instanceof PDFDropdown) {
        field.select(String(rawVal));
      } else if (field instanceof PDFRadioGroup) {
        field.select(String(rawVal));
      }
    } catch {
      /* skip incompatible field */
    }
  }

  try {
    form.updateFieldAppearances();
  } catch {
    /* some fonts missing — still save values */
  }
  if (flatten) {
    try {
      form.flatten();
    } catch {
      /* ignore */
    }
  }

  const saved = await doc.save({ useObjectStreams: true });
  return new Blob([Uint8Array.from(saved)], { type: "application/pdf" });
}

export async function renderPdfPage(
  pdf: Awaited<ReturnType<typeof loadPdfDocument>>["pdf"],
  pageIndex: number,
  scale: number
): Promise<{ canvas: HTMLCanvasElement; width: number; height: number }> {
  const page = await pdf.getPage(pageIndex + 1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext("2d", { alpha: false })!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  return { canvas, width: canvas.width, height: canvas.height };
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const len = 10 + width * 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - len * Math.cos(angle - 0.4), y2 - len * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - len * Math.cos(angle + 0.4), y2 - len * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
}

export function paintAnnotations(
  ctx: CanvasRenderingContext2D,
  annos: Annotation[],
  scaleFactor = 1
) {
  for (const a of annos) {
    if (a.kind === "text" || a.kind === "textReplace") {
      if (a.kind === "textReplace") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(a.x * scaleFactor, a.y * scaleFactor, a.w * scaleFactor, a.h * scaleFactor);
      }
      ctx.save();
      ctx.fillStyle = a.color;
      ctx.font = `${"bold" in a && a.bold ? "bold " : ""}${a.fontSize * scaleFactor}px Lato, Arial, sans-serif`;
      ctx.textBaseline = "top";
      const lines = a.text.split("\n");
      const lh = a.fontSize * scaleFactor * 1.25;
      lines.forEach((line, i) => {
        ctx.fillText(line, a.x * scaleFactor, a.y * scaleFactor + i * lh);
      });
      ctx.restore();
    } else if (a.kind === "image") {
      // image drawn async — caller should preload; sync drawImage needs HTMLImageElement
    } else if (a.kind === "path") {
      if (a.points.length < 2) continue;
      ctx.save();
      ctx.strokeStyle = a.color;
      ctx.lineWidth = a.width * scaleFactor;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(a.points[0].x * scaleFactor, a.points[0].y * scaleFactor);
      for (let i = 1; i < a.points.length; i++) {
        ctx.lineTo(a.points[i].x * scaleFactor, a.points[i].y * scaleFactor);
      }
      ctx.stroke();
      ctx.restore();
    } else if (a.kind === "highlight") {
      ctx.save();
      ctx.fillStyle = a.color;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(a.x * scaleFactor, a.y * scaleFactor, a.w * scaleFactor, a.h * scaleFactor);
      ctx.restore();
    } else if (a.kind === "rect") {
      ctx.save();
      ctx.strokeStyle = a.color;
      ctx.lineWidth = a.strokeWidth * scaleFactor;
      if (a.fill) {
        ctx.fillStyle = a.color;
        ctx.globalAlpha = 0.2;
        ctx.fillRect(a.x * scaleFactor, a.y * scaleFactor, a.w * scaleFactor, a.h * scaleFactor);
        ctx.globalAlpha = 1;
      }
      ctx.strokeRect(a.x * scaleFactor, a.y * scaleFactor, a.w * scaleFactor, a.h * scaleFactor);
      ctx.restore();
    } else if (a.kind === "ellipse") {
      ctx.save();
      const cx = (a.x + a.w / 2) * scaleFactor;
      const cy = (a.y + a.h / 2) * scaleFactor;
      const rx = (Math.abs(a.w) / 2) * scaleFactor;
      const ry = (Math.abs(a.h) / 2) * scaleFactor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
      if (a.fill) {
        ctx.fillStyle = a.color;
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = a.color;
      ctx.lineWidth = a.strokeWidth * scaleFactor;
      ctx.stroke();
      ctx.restore();
    } else if (a.kind === "line" || a.kind === "arrow") {
      ctx.save();
      ctx.strokeStyle = a.color;
      ctx.lineWidth = a.width * scaleFactor;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x1 * scaleFactor, a.y1 * scaleFactor);
      ctx.lineTo(a.x2 * scaleFactor, a.y2 * scaleFactor);
      ctx.stroke();
      if (a.kind === "arrow") {
        drawArrowHead(
          ctx,
          a.x1 * scaleFactor,
          a.y1 * scaleFactor,
          a.x2 * scaleFactor,
          a.y2 * scaleFactor,
          a.color,
          a.width * scaleFactor
        );
      }
      ctx.restore();
    }
  }
}

async function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Flatten each page (PDF render + annotations) into a new PDF.
 * ScaleFactor = exportScale / displayScale so annotations map correctly.
 */
export async function exportEditedPdf(options: {
  pdf: Awaited<ReturnType<typeof loadPdfDocument>>["pdf"];
  annotations: Annotation[];
  displayScale: number;
  exportScale?: number;
  onProgress?: (msg: string) => void;
}): Promise<Blob> {
  const { pdf, annotations, displayScale } = options;
  const exportScale = options.exportScale ?? Math.max(2, displayScale * 1.5);
  const scaleFactor = exportScale / displayScale;
  const pageCount = pdf.numPages;

  let doc: jsPDF | null = null;

  for (let i = 0; i < pageCount; i++) {
    options.onProgress?.(`Exporting page ${i + 1}/${pageCount}…`);
    const { canvas } = await renderPdfPage(pdf, i, exportScale);
    const ctx = canvas.getContext("2d")!;
    const pageAnnos = annotations.filter((a) => a.page === i);

    // Draw images first under vector-like annos
    for (const a of pageAnnos) {
      if (a.kind === "image") {
        try {
          const img = await loadImage(a.dataUrl);
          ctx.drawImage(
            img,
            a.x * scaleFactor,
            a.y * scaleFactor,
            a.w * scaleFactor,
            a.h * scaleFactor
          );
        } catch {
          /* skip broken image */
        }
      }
    }
    paintAnnotations(
      ctx,
      pageAnnos.filter((a) => a.kind !== "image"),
      scaleFactor
    );

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const wPt = canvas.width * 0.75; // px @96dpi-ish → pt approximation; keep aspect via page size
    const hPt = canvas.height * 0.75;

    if (!doc) {
      doc = new jsPDF({
        unit: "pt",
        format: [wPt, hPt],
        compress: true,
      });
      doc.addImage(dataUrl, "JPEG", 0, 0, wPt, hPt);
    } else {
      doc.addPage([wPt, hPt]);
      doc.addImage(dataUrl, "JPEG", 0, 0, wPt, hPt);
    }

    canvas.width = 0;
    canvas.height = 0;
  }

  if (!doc) throw new Error("No pages to export");
  return doc.output("blob");
}

export function hitTest(anno: Annotation, x: number, y: number): boolean {
  if (
    anno.kind === "text" ||
    anno.kind === "textReplace" ||
    anno.kind === "image" ||
    anno.kind === "rect" ||
    anno.kind === "ellipse" ||
    anno.kind === "highlight"
  ) {
    const left = Math.min(anno.x, anno.x + anno.w);
    const right = Math.max(anno.x, anno.x + anno.w);
    const top = Math.min(anno.y, anno.y + anno.h);
    const bottom = Math.max(anno.y, anno.y + anno.h);
    return x >= left && x <= right && y >= top && y <= bottom;
  }
  if (anno.kind === "line" || anno.kind === "arrow") {
    const dist =
      Math.abs(
        (anno.y2 - anno.y1) * x - (anno.x2 - anno.x1) * y + anno.x2 * anno.y1 - anno.y2 * anno.x1
      ) / Math.hypot(anno.y2 - anno.y1, anno.x2 - anno.x1 || 1);
    return dist < 8;
  }
  if (anno.kind === "path") {
    return anno.points.some((p) => Math.hypot(p.x - x, p.y - y) < 10);
  }
  return false;
}
