import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "HEIC to JPG Online Free — Then Reduce Image Size to KB",
  description: "Convert iPhone HEIC/HEIF to JPG online free, then reduce image size to the KB your form needs — SizeToKB.in",
  path: "/heic-to-jpg/",
  keywords: ["HEIC to JPG online free","convert HEIC to JPEG","iPhone photo to JPG"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
