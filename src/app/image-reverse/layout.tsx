import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image Flip & Rotate Online Free — Reverse Photo",
  description:
    "Flip image horizontally/vertically or rotate 90°/180° online free. Fix mirrored selfies for forms — SizeToKB.in",
  path: "/image-reverse/",
  keywords: [
    "flip image online free",
    "rotate photo online",
    "mirror image reverse",
    "rotate image 90 degrees",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
