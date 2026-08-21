import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress Image to 200KB Online Free — Image Compressor 200KB",
  description:
    "Compress image to 200KB online free. Image compressor to 200KB for marksheets, certificates & form uploads. Crop, Free Download — private · Size to KB",
  path: "/compress-to-200kb/",
  keywords: [
    "compress image to 200kb",
    "image compressor to 200kb",
    "compress 200kb",
    "reduce photo size to 200kb",
    "compress photo to 200KB",
    "image compressor 200KB",
    "resize image to 200kb",
    "reduce image file size to 200kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
