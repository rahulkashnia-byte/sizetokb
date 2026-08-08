import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Word to PDF Online Free — Convert DOCX to PDF",
  description:
    "Convert Word (.docx) to PDF online free in your browser for exam uploads — SizeToKB.in",
  path: "/word-to-pdf/",
  keywords: [
    "Word to PDF online free",
    "DOCX to PDF converter",
    "convert Word to PDF India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
