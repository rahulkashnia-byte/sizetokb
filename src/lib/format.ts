import type { DocSpec } from "./types";

export function formatSpecSummary(spec: DocSpec): { size: string; dim: string; fmt: string } {
  const size =
    spec.minKb > 0 ? `${spec.minKb} KB–${spec.maxKb} KB` : `max ${spec.maxKb} KB`;
  let dim = "—";
  if (spec.format === "pdf") {
    dim = "PDF document";
  } else if (spec.width != null && spec.height != null) {
    dim = `${spec.width}${spec.unit === "cm" ? "cm" : "px"} × ${spec.height}${
      spec.unit === "cm" ? "cm" : "px"
    }`;
  }
  return { size, dim, fmt: spec.format.toUpperCase() };
}
