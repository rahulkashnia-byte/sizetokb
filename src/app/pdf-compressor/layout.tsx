import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress PDF Online Free — Reduce PDF Size to KB",
  description:
    "Compress PDF online free. Reduce PDF size to 100KB, 200KB, 500KB for exam and government uploads — SizeToKB.in",
  path: "/pdf-compressor/",
  keywords: [
    "compress pdf",
    "compress PDF online free",
    "reduce PDF size online",
    "PDF compressor online free",
    "PDF size reducer India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
