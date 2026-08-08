import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF to Word Online Free — Convert PDF to DOCX",
  description: "Convert PDF to Word (.docx) online free in your browser. Best for text PDFs — SizeToKB.in",
  path: "/pdf-to-word/",
  keywords: ["PDF to Word online free","PDF to DOCX converter","convert PDF to Word India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
