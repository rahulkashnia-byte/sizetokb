import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Word to PDF Online Free — Then Reduce PDF Size to KB",
  description: "Convert Word (.docx) to PDF online free, then reduce PDF size to KB for exam portals — SizeToKB.in",
  path: "/word-to-pdf/",
  keywords: ["Word to PDF online free","DOCX to PDF converter","convert Word to PDF India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
