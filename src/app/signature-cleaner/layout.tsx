import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Signature Cleaner Online Free — Compress to KB",
  description: "Clean signature scan, auto-crop, and compress to 10–20 KB for SSC Bank Railway forms — SizeToKB.in",
  path: "/signature-cleaner/",
  keywords: ["signature cleaner online","compress signature to 20KB","signature resize SSC"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
