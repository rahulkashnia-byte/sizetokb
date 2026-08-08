import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Merge PDF Online Free — Combine PDF Files",
  description: "Merge multiple PDFs into one file in your browser for exam certificate uploads — SizeToKB.in",
  path: "/pdf-merge/",
  keywords: ["merge PDF online free","combine PDF files","join PDF India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
