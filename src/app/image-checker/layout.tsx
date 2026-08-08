import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image DPI & Pixel Checker Online Free",
  description: "Check photo width, height, KB size and estimated print size before form upload — SizeToKB.in",
  path: "/image-checker/",
  keywords: ["image DPI checker","check photo pixels KB","photo size checker online"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
