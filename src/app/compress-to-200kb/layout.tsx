import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress Image to 200KB Online Free — Reduce Photo Size to 200KB",
  description:
    "Compress image to 200KB online free. Reduce photo size to 200KB for documents and form uploads — private browser tool. Size to KB",
  path: "/compress-to-200kb/",
  keywords: [
    "compress image to 200kb",
    "reduce photo size to 200kb",
    "compress photo to 200KB",
    "image compressor 200KB",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
