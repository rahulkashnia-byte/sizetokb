import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Compress Image to 50KB Online Free — Reduce Photo Size to 50KB',
  description: 'Compress image to 50KB online free. Reduce photo size to 50KB for SSC, UPSC, IBPS, Railway form uploads — private browser tool. SizeToKB.in',
  path: "/compress-to-50kb/",
  keywords: ['compress image to 50kb', 'reduce photo size to 50kb', 'compress photo to 50KB', 'image compressor 50KB', 'photo size 50KB online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
