import JSZip from "jszip";
import { processToSpec } from "@/lib/image";
import type { DocSpec } from "@/lib/types";

const DEFAULT_PHOTO: DocSpec = {
  id: "photo",
  label: "Photo",
  minKb: 20,
  maxKb: 50,
  width: 3.5,
  height: 4.5,
  unit: "cm",
  format: "jpg",
};

const DEFAULT_SIGN: DocSpec = {
  id: "signature",
  label: "Signature",
  minKb: 10,
  maxKb: 20,
  unit: "px",
  format: "jpg",
  scanEffect: true,
};

export async function buildExamPackZip(options: {
  photo?: File | null;
  signature?: File | null;
  photoSpec?: Partial<DocSpec>;
  signSpec?: Partial<DocSpec>;
  onProgress?: (msg: string) => void;
}): Promise<{ blob: Blob; files: string[] }> {
  const zip = new JSZip();
  const names: string[] = [];
  const photoSpec: DocSpec = { ...DEFAULT_PHOTO, ...options.photoSpec, id: "photo", label: "Photo" };
  const signSpec: DocSpec = {
    ...DEFAULT_SIGN,
    ...options.signSpec,
    id: "signature",
    label: "Signature",
    scanEffect: true,
  };

  if (!options.photo && !options.signature) {
    throw new Error("Add a photo and/or signature");
  }

  if (options.photo) {
    options.onProgress?.("Processing photo…");
    const result = await processToSpec(options.photo, photoSpec, { filename: "photo" });
    zip.file(result.filename, result.blob);
    names.push(`${result.filename} (${result.sizeKb} KB)`);
  }
  if (options.signature) {
    options.onProgress?.("Processing signature…");
    const result = await processToSpec(options.signature, signSpec, {
      filename: "signature",
      forceScan: true,
    });
    zip.file(result.filename, result.blob);
    names.push(`${result.filename} (${result.sizeKb} KB)`);
  }

  options.onProgress?.("Building ZIP…");
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, files: names };
}
