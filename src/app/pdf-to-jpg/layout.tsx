import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF to JPG 50KB Online Free — Convert PDF to Image",
  description:
    "PDF to JPG 50KB online free — convert PDF pages to JPG/PNG and optionally cap each image at 50KB, 100KB or 200KB. Private browser tool — Size to KB",
  path: "/pdf-to-jpg/",
  keywords: [
    "pdf to jpg 50kb",
    "pdf to jpg",
    "PDF to JPG online free",
    "pdf to jpg 90 kb",
    "pdf convert to jpg 50 kb",
    "pdf to jpg 50 to 100 kb",
    "convert pdf to jpg less than 100kb",
    "pdf to image",
    "convert PDF to JPG",
    "PDF to PNG converter",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
