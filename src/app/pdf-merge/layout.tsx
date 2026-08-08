import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Merge PDF Online Free — Combine Files Then Reduce PDF Size",
  description: "Merge multiple PDFs into one for exam certificate uploads, then reduce PDF size if needed — SizeToKB.in",
  path: "/pdf-merge/",
  keywords: ["merge PDF online free","combine PDF files","join PDF India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
