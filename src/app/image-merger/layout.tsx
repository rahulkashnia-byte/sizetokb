import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image Merger Online Free — Join Photos Side by Side",
  description:
    "Merge multiple images into one JPG online free. Horizontal, vertical, or grid layout — SizeToKB.in",
  path: "/image-merger/",
  keywords: [
    "image merger online free",
    "combine photos online",
    "join images side by side",
    "merge photos India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
