import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "PDF to JPG Online Free — Convert PDF to Image / PNG",
  description:
    "PDF to JPG converter online free. Convert PDF pages to JPG or PNG images, download ZIP. Private browser tool — also unlock PDF then convert. Size to KB",
  path: "/pdf-to-jpg/",
  keywords: [
    "pdf to jpg",
    "PDF to JPG online free",
    "pdf to image",
    "convert PDF to JPG",
    "PDF to PNG converter",
    "PDF pages to JPEG",
    "pdf to jpg converter",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
