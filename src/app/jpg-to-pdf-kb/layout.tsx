import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "JPG to PDF KB Online Free — 50–100KB, 200KB, 500KB",
  description:
    "Convert JPG / photos to PDF at exact KB bands: 50–100 KB, under 200 KB, under 500 KB. Free certificate & ID upload tool — Size to KB",
  path: "/jpg-to-pdf-kb/",
  keywords: [
    "jpg to pdf 50kb to 100kb online free",
    "jpg to pdf 70 kb",
    "convert image to pdf 500kb",
    "photo to pdf resize KB",
    "certificate pdf size KB",
    "jpg to pdf under 200kb",
    "image to pdf exact KB",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
