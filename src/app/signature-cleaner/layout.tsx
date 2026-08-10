import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce Signature Size Online Free — Compress Signature to 10KB–20KB",
  description: "Reduce signature size online free. Clean, crop and compress signature to 10–20 KB for SSC, Bank, Railway forms — Size to KB",
  path: "/signature-cleaner/",
  keywords: ["reduce signature size online","compress signature to 20KB","reduce signature size to 10KB","signature resize SSC"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
