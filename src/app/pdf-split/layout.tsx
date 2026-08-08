import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Split PDF Online Free — Extract Pages to Reduce Upload Size",
  description: "Split a PDF into separate pages or extract a range online free to reduce upload size — SizeToKB.in",
  path: "/pdf-split/",
  keywords: ["split PDF online free","extract PDF pages","PDF page splitter"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
