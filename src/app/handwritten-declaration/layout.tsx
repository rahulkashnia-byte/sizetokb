import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "IBPS Handwritten Declaration Size in KB (50–100) Free 2026",
  description:
    "Resize IBPS / SBI handwritten declaration to 800×400 px and 50–100 KB JPG online free. Crop, clean & Free Download — private browser tool. Size to KB",
  path: "/handwritten-declaration/",
  keywords: [
    "handwritten declaration size KB",
    "IBPS handwritten declaration 50KB to 100KB",
    "SBI handwritten declaration resize",
    "handwritten declaration 800x400",
    "IBPS declaration compressor online free",
    "bank exam handwritten declaration size",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
