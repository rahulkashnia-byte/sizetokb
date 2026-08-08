import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce Image Size Online Free — Compress Photo to 20KB, 50KB, 100KB",
  description:
    "Reduce image size online free in KB. Compress photo to 20KB, 50KB or 100KB for SSC, UPSC, NEET & form fill. JPG compressor with optional cm/px — SizeToKB.in",
  path: "/image-resizer/",
  keywords: [
    "reduce image size online free",
    "reduce photo size online",
    "reduce image size in kb",
    "compress image to 50kb",
    "compress image to 20kb",
    "photo size kam kaise kare",
    "JPG compressor online free",
    "decrease image size online",
  ],
});

export default function ImageResizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
