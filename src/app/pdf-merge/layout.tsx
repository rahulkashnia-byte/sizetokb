import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Merge PDF Online Free — Combine PDF Files",
  description:
    "Merge PDF online free. Combine multiple PDFs into one for exam certificate uploads, then reduce PDF size if needed — SizeToKB.in",
  path: "/pdf-merge/",
  keywords: [
    "merge pdf",
    "merge PDF online free",
    "combine PDF files",
    "join PDF India",
    "merge PDF files",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
