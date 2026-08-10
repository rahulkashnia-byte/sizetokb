import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF to Word Online Free — Convert PDF to DOCX",
  description:
    "PDF to Word converter online free. Convert PDF to DOCX / editable Word in your browser. Best for text PDFs — Size to KB",
  path: "/pdf-to-word/",
  keywords: [
    "pdf to word",
    "PDF to Word online free",
    "PDF to DOCX converter",
    "convert PDF to Word India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
