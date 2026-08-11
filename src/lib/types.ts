export type DimUnit = "cm" | "px";

export interface DocSpec {
  id: string;
  label: string;
  minKb: number;
  maxKb: number;
  /** Width in the given unit (optional = keep aspect, size-only) */
  width?: number;
  /** Height in the given unit */
  height?: number;
  unit: DimUnit;
  format: "jpg" | "png" | "jpeg" | "pdf";
  /** Apply high-contrast scan enhancement (signatures) */
  scanEffect?: boolean;
}

export interface Exam {
  slug: string;
  name: string;
  /** Application forms currently open */
  formsOut?: boolean;
  upcoming?: boolean;
  year?: number;
  documents: DocSpec[];
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  sizeKb: number;
  inRange: boolean;
  filename: string;
}
