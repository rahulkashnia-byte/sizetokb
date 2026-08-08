import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Compress Image to 20KB Online Free — Reduce Photo Size to 20KB',
  description: 'Compress image to 20KB online free. Reduce photo size to 20KB for SSC, Railway, Bank signature/photo uploads — private browser tool. SizeToKB.in',
  path: "/compress-to-20kb/",
  keywords: ['compress image to 20kb', 'reduce photo size to 20kb', 'compress photo to 20KB', 'image compressor 20KB', 'photo size 20KB online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
