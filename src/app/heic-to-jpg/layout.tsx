import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "HEIC to JPG Converter Online Free",
  description: "Convert iPhone HEIC/HEIF photos to JPG for exam form uploads — SizeToKB.in",
  path: "/heic-to-jpg/",
  keywords: ["HEIC to JPG online free","convert HEIC to JPEG","iPhone photo to JPG"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
