import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF Compressor Online Free — Reduce PDF Size in KB",
  description:
    "Compress PDF online free toward a target KB for government exam uploads and form fill. Browser-based PDF compressor — SizeToKB.in",
  path: "/pdf-compressor/",
  keywords: [
    "PDF compressor online free",
    "compress PDF to KB",
    "reduce PDF size online",
    "PDF size reducer India",
    "exam PDF compressor",
  ],
});

export default function PdfCompressorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
