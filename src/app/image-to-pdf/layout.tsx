import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "JPG to PDF Online Free — Image to PDF Converter",
  description:
    "JPG to PDF converter online free. Convert images to PDF, reorder pages, reduce toward a target KB for exam uploads — Size to KB",
  path: "/image-to-pdf/",
  keywords: [
    "jpg to pdf",
    "JPG to PDF online free",
    "image to PDF converter",
    "photos to PDF",
    "convert JPG to PDF",
  ],
});

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return children;
}
