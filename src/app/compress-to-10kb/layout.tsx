import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress Image to 10KB Online Free — Reduce Photo Size to 10KB",
  description:
    "Compress image to 10KB online free. Reduce photo or signature size to 10KB for strict form uploads — private browser tool. Size to KB",
  path: "/compress-to-10kb/",
  keywords: [
    "compress image to 10kb",
    "reduce photo size to 10kb",
    "compress photo to 10KB",
    "image compressor 10KB",
    "signature 10KB online",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
