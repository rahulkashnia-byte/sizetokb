import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Merge Images Online Free — Combine Photos Before Reduce to KB",
  description: "Merge multiple images into one JPG online free. Horizontal, vertical or grid — SizeToKB.in",
  path: "/image-merger/",
  keywords: ["image merger online free","combine photos online","join images side by side"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
