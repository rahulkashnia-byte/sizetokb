import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Check Photo Size Online Free — Pixels, KB & DPI Before Upload",
  description: "Check photo width, height, KB size and estimated print size before you reduce or upload — SizeToKB.in",
  path: "/image-checker/",
  keywords: ["image DPI checker","check photo pixels KB","photo size checker online"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
