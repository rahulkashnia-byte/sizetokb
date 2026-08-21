import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Form Upload Checker — Will My Photo Pass KB & Pixels?",
  description:
    "Check photo, signature, thumb or handwritten declaration against exam KB and pixel rules before upload. Free preflight for SSC, IBPS, UPSC — Size to KB",
  path: "/upload-checker/",
  keywords: [
    "photo upload checker online",
    "will my photo upload pass",
    "check photo size KB before upload",
    "signature size checker",
    "exam form file size checker",
    "IBPS photo dimension checker",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
