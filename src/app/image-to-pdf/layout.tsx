import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image to PDF Converter Free — Reduce Photos to PDF KB Limit",
  description: "Convert images to PDF online free, reorder pages, and reduce toward a target KB for exam uploads — SizeToKB.in",
  path: "/image-to-pdf/",
  keywords: ["image to PDF converter","JPG to PDF online free","photos to PDF"],
});

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return children;
}
