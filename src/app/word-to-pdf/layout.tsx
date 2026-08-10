import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Word to PDF Online Free — Convert DOCX to PDF",
  description:
    "Word to PDF converter online free. Convert DOCX to PDF, then reduce PDF size to KB for exam portals — Size to KB",
  path: "/word-to-pdf/",
  keywords: [
    "word to pdf",
    "Word to PDF online free",
    "DOCX to PDF converter",
    "convert Word to PDF India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
