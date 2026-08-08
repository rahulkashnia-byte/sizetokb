import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce PDF Size Online Free — Compress PDF to KB",
  description: "Reduce PDF size online free toward a target KB for exam and government uploads. Browser PDF compressor — SizeToKB.in",
  path: "/pdf-compressor/",
  keywords: ["reduce PDF size online","compress PDF to KB","PDF compressor online free","PDF size reducer India"],
});

export default function PdfCompressorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
