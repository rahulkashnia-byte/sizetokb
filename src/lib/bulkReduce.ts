import JSZip from "jszip";
import { processToSpec } from "@/lib/image";
import type { DocSpec } from "@/lib/types";

export async function bulkReduceToZip(options: {
  files: File[];
  minKb: number;
  maxKb: number;
  width?: number;
  height?: number;
  unit?: "cm" | "px";
  scanEffect?: boolean;
  onProgress?: (msg: string) => void;
}): Promise<{ blob: Blob; results: { name: string; sizeKb: number; inRange: boolean }[] }> {
  if (!options.files.length) throw new Error("Add at least one image");
  const zip = new JSZip();
  const results: { name: string; sizeKb: number; inRange: boolean }[] = [];
  const spec: DocSpec = {
    id: "bulk",
    label: "Bulk",
    minKb: options.minKb,
    maxKb: options.maxKb,
    width: options.width,
    height: options.height,
    unit: options.unit ?? "px",
    format: "jpg",
    scanEffect: options.scanEffect,
  };

  for (let i = 0; i < options.files.length; i++) {
    const file = options.files[i];
    options.onProgress?.(`Reducing ${i + 1}/${options.files.length}: ${file.name}`);
    const base = file.name.replace(/\.[^.]+$/, "") || `file-${i + 1}`;
    const out = await processToSpec(file, spec, {
      filename: base,
      forceScan: options.scanEffect,
    });
    zip.file(out.filename, out.blob);
    results.push({ name: out.filename, sizeKb: out.sizeKb, inRange: out.inRange });
  }

  options.onProgress?.("Building ZIP…");
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, results };
}
