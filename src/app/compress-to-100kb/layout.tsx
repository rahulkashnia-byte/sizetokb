import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Compress Image to 100KB Online Free — Reduce Photo Size to 100KB',
  description: 'Compress image to 100KB online free. Reduce photo size to 100KB for UPSC, NEET, JEE and portal uploads — private browser tool. SizeToKB.in',
  path: "/compress-to-100kb/",
  keywords: ['compress image to 100kb', 'reduce photo size to 100kb', 'compress photo to 100KB', 'image compressor 100KB', 'photo size 100KB online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
