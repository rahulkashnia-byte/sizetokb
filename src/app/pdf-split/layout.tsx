import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Split PDF Online Free — Extract PDF Pages",
  description:
    "Split PDF online free. Extract pages or a page range to reduce upload size — SizeToKB.in",
  path: "/pdf-split/",
  keywords: ["split pdf", "split PDF online free", "extract PDF pages", "PDF page splitter"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
