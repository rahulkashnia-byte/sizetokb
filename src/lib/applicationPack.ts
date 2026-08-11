import type { DimUnit, DocSpec, Exam } from "@/lib/types";
import { compressPdfFile, imagesToPdf } from "@/lib/pdf";
import { downloadBlob, processToSpec } from "@/lib/image";
import JSZip from "jszip";

/** Extended slot for Application Pack (exam-required + optional extras). */
export type PackSlot = DocSpec & {
  required: boolean;
  kind: "image" | "pdf";
  accept: string;
  hint: string;
};

export type PackStatus = "ok" | "fail" | "warn" | "empty";

export type PackCheck = {
  status: PackStatus;
  message: string;
  sizeKb?: number;
};

export function packZipFilename(exam: Exam): string {
  const base = exam.slug
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return `${base}_APPLICATION_PACK.zip`;
}

function isPdfFormat(format: DocSpec["format"]): boolean {
  return format === "pdf";
}

/** Build pack slots: exact exam form docs first, then optional extras if the form often needs them. */
export function packSlotsForExam(exam: Exam): PackSlot[] {
  const slots: PackSlot[] = exam.documents.map((d) => {
    const pdf = isPdfFormat(d.format);
    return {
      ...d,
      required: true,
      kind: pdf ? ("pdf" as const) : ("image" as const),
      accept: pdf ? "application/pdf,.pdf" : "image/*",
      hint: pdf
        ? `PDF ${d.minKb > 0 ? `${d.minKb}–` : "max "}${d.maxKb} KB`
        : `${d.minKb}–${d.maxKb} KB${d.width && d.height ? ` · ${d.width}×${d.height}${d.unit}` : ""} · ${d.format.toUpperCase()}`,
    };
  });

  const blob = slots.map((s) => `${s.id} ${s.label}`.toLowerCase()).join(" ");

  if (!/thumb/.test(blob)) {
    const sign = exam.documents.find((d) => d.id === "sign" || /sign/i.test(d.label));
    slots.push({
      id: "thumb",
      label: "Thumb impression",
      minKb: 10,
      maxKb: sign ? Math.max(20, sign.maxKb) : 40,
      unit: "px" as DimUnit,
      format: "jpg",
      scanEffect: true,
      required: false,
      kind: "image",
      accept: "image/*",
      hint: "Optional — if your form asks (often 10–40 KB JPG)",
    });
  }

  if (!/cert|marksheet|degree|document/.test(blob)) {
    slots.push({
      id: "certificate",
      label: "Certificate / marksheet",
      minKb: 0,
      maxKb: 500,
      unit: "px",
      format: "pdf",
      required: false,
      kind: "pdf",
      accept: "application/pdf,.pdf",
      hint: "Optional — if your form asks (PDF, often max 200–500 KB)",
    });
  }

  if (!/\bid\b|aadhaar|pan|proof|voter/.test(blob)) {
    slots.push({
      id: "id-proof",
      label: "ID proof",
      minKb: 0,
      maxKb: 300,
      unit: "px",
      format: "pdf",
      required: false,
      kind: "pdf",
      accept: "application/pdf,.pdf,image/*",
      hint: "Optional — if your form asks (PDF/JPG, often max ~300 KB)",
    });
  }

  return slots;
}

function fileExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  return /^(jpe?g|png|webp|gif|heic|heif|bmp)$/i.test(fileExt(file.name));
}

function isPdfFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  return fileExt(file.name) === "pdf";
}

export function checkPackFile(file: File | null | undefined, slot: PackSlot): PackCheck {
  if (!file) {
    return {
      status: "empty",
      message: slot.required ? "Required — upload this file" : "Not uploaded (optional)",
    };
  }

  const sizeKb = Math.round((file.size / 1024) * 10) / 10;

  if (slot.kind === "pdf") {
    if (isImageFile(file) && !isPdfFile(file)) {
      return {
        status: "warn",
        message: `Wrong format (image) — need PDF ≤ ${slot.maxKb} KB`,
        sizeKb,
      };
    }
    if (!isPdfFile(file)) {
      return {
        status: "fail",
        message: `Wrong format — upload PDF (max ${slot.maxKb} KB)`,
        sizeKb,
      };
    }
    if (sizeKb > slot.maxKb) {
      return {
        status: "fail",
        message: `Too large (${sizeKb} KB) — max ${slot.maxKb} KB`,
        sizeKb,
      };
    }
    if (slot.minKb > 0 && sizeKb < slot.minKb) {
      return {
        status: "warn",
        message: `Below minimum (${sizeKb} KB < ${slot.minKb} KB)`,
        sizeKb,
      };
    }
    return { status: "ok", message: `OK · ${sizeKb} KB PDF`, sizeKb };
  }

  if (isPdfFile(file)) {
    return {
      status: "warn",
      message: `Wrong format (PDF) — need ${slot.format.toUpperCase()} image ${slot.minKb}–${slot.maxKb} KB`,
      sizeKb,
    };
  }
  if (!isImageFile(file)) {
    return {
      status: "fail",
      message: `Wrong format — upload ${slot.format.toUpperCase()} / image`,
      sizeKb,
    };
  }

  const ext = fileExt(file.name);
  const wantsJpeg = slot.format === "jpg" || slot.format === "jpeg";
  if (wantsJpeg && ext === "png") {
    return {
      status: "warn",
      message: `PNG uploaded — form wants ${slot.format.toUpperCase()}; size ${sizeKb} KB`,
      sizeKb,
    };
  }
  if (wantsJpeg && (ext === "heic" || ext === "heif" || file.type.includes("heic"))) {
    return {
      status: "warn",
      message: `HEIC not accepted — convert to JPG ${slot.minKb}–${slot.maxKb} KB`,
      sizeKb,
    };
  }

  if (sizeKb > slot.maxKb) {
    return {
      status: "fail",
      message: `Too large (${sizeKb} KB) — need ${slot.minKb}–${slot.maxKb} KB`,
      sizeKb,
    };
  }
  if (sizeKb < slot.minKb) {
    return {
      status: "warn",
      message: `Too small (${sizeKb} KB) — need at least ${slot.minKb} KB`,
      sizeKb,
    };
  }

  return {
    status: "ok",
    message: `OK · ${sizeKb} KB`,
    sizeKb,
  };
}

export function statusIcon(status: PackStatus): string {
  if (status === "ok") return "✅";
  if (status === "fail") return "❌";
  if (status === "warn") return "⚠️";
  return "—";
}

function safeName(slot: PackSlot, ext: string): string {
  const base = slot.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slot.id || base}.${ext}`;
}

/** Fix one file to match the slot (exam KB / format rules). */
export async function fixPackFile(
  file: File,
  slot: PackSlot,
  onProgress?: (msg: string) => void
): Promise<{ blob: Blob; filename: string; sizeKb: number }> {
  if (slot.kind === "pdf") {
    let pdfFile = file;
    if (isImageFile(file) && !isPdfFile(file)) {
      onProgress?.(`Converting ${slot.label} image → PDF…`);
      const { blob } = await imagesToPdf([{ blob: file, name: file.name }], {
        maxKb: slot.maxKb,
      });
      pdfFile = new File([blob], safeName(slot, "pdf"), { type: "application/pdf" });
    }
    if (!isPdfFile(pdfFile) && !isImageFile(file)) {
      throw new Error(`${slot.label}: upload a PDF or image`);
    }
    onProgress?.(`Compressing ${slot.label}…`);
    const { blob, sizeKb } = await compressPdfFile(pdfFile, slot.maxKb, onProgress);
    return { blob, filename: safeName(slot, "pdf"), sizeKb };
  }

  if (isPdfFile(file)) {
    throw new Error(`${slot.label}: upload an image (not PDF)`);
  }

  const imageSpec: DocSpec = {
    id: slot.id,
    label: slot.label,
    minKb: slot.minKb,
    maxKb: slot.maxKb,
    width: slot.width,
    height: slot.height,
    unit: slot.unit,
    format: slot.format === "pdf" ? "jpg" : slot.format,
    scanEffect: slot.scanEffect,
  };

  onProgress?.(`Fixing ${slot.label}…`);
  const out = await processToSpec(file, imageSpec, {
    filename: `${slot.id}`,
    forceScan: !!slot.scanEffect,
  });
  return {
    blob: out.blob,
    filename:
      out.filename.endsWith(".jpg") || out.filename.endsWith(".png")
        ? out.filename
        : safeName(slot, imageSpec.format === "png" ? "png" : "jpg"),
    sizeKb: out.sizeKb,
  };
}

export async function buildApplicationPackZip(options: {
  exam: Exam;
  slots: PackSlot[];
  files: Record<string, File | null>;
  onProgress?: (msg: string) => void;
}): Promise<{ blob: Blob; report: string[] }> {
  const zip = new JSZip();
  const report: string[] = [];

  for (const slot of options.slots) {
    const file = options.files[slot.id];
    if (!file) {
      if (slot.required) {
        throw new Error(`Missing required: ${slot.label}`);
      }
      continue;
    }
    const check = checkPackFile(file, slot);
    let blob: Blob;
    let filename: string;
    let sizeKb: number;

    if (check.status === "ok") {
      blob = file;
      filename = file.name || safeName(slot, slot.kind === "pdf" ? "pdf" : "jpg");
      sizeKb = check.sizeKb ?? Math.round(file.size / 1024);
      if (slot.kind === "pdf" && !filename.toLowerCase().endsWith(".pdf")) {
        filename = safeName(slot, "pdf");
      }
    } else {
      const fixed = await fixPackFile(file, slot, options.onProgress);
      blob = fixed.blob;
      filename = fixed.filename;
      sizeKb = fixed.sizeKb;
    }

    zip.file(filename, blob);
    report.push(`${slot.label}: ${sizeKb} KB → ${filename}`);
  }

  if (report.length === 0) {
    throw new Error("Upload at least one file");
  }

  options.onProgress?.("Building ZIP…");
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, report };
}

export { downloadBlob };
