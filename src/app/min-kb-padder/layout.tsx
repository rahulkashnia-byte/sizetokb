import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Increase Photo Size to Minimum KB Online Free — Min KB Padder",
  description:
    "Portal says photo too small? Increase image or signature size to minimum KB (e.g. 20–50KB) online free. Private browser tool — Size to KB",
  path: "/min-kb-padder/",
  keywords: [
    "increase photo size to KB",
    "minimum photo size KB",
    "photo too small for upload",
    "increase image file size KB",
    "min KB padder",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
