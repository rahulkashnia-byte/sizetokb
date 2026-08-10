import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress Image to 500KB Online Free — Reduce Photo Size to 500KB",
  description:
    "Compress image to 500KB online free. Reduce photo or scan size to 500KB for form and document uploads — private browser tool. Size to KB",
  path: "/compress-to-500kb/",
  keywords: [
    "compress image to 500kb",
    "reduce photo size to 500kb",
    "compress photo to 500KB",
    "image compressor 500KB",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
