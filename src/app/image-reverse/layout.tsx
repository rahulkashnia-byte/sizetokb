import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flip & Rotate Photo Online Free — Fix Image Before Reduce to KB",
  description: "Flip image horizontally/vertically or rotate 90° online free, then reduce size to KB for forms — Size to KB",
  path: "/image-reverse/",
  keywords: ["flip image online free","rotate photo online","mirror image reverse"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
