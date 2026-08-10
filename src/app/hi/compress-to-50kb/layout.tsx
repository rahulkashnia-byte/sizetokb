import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "फोटो 50KB में Compress करें — Photo Size Kam Kaise Kare Free",
  description:
    "फोटो को 50KB में compress करें ऑनलाइन फ्री। SSC / Bank फॉर्म के लिए photo size kam kaise kare — Size to KB हिंदी।",
  path: "/hi/compress-to-50kb/",
  keywords: [
    "photo 50kb",
    "compress image to 50kb",
    "photo size kam kaise kare 50kb",
    "फोटो 50kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
