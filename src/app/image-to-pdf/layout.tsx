import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image to PDF Converter Free — JPG to PDF Online India",
  description:
    "Free image to PDF converter: combine photos into one PDF, reorder pages, set target KB. Ideal for exam document uploads. SizeToKB.in",
  path: "/image-to-pdf/",
  keywords: [
    "image to PDF converter",
    "JPG to PDF online free",
    "photos to PDF",
    "exam document PDF",
    "image to PDF India",
  ],
});

export default function ImageToPdfLayout({ children }: { children: React.ReactNode }) {
  return children;
}
