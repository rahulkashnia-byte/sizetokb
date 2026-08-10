import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Bulk Reduce Image Size to KB Online Free — Compress Many Photos at Once',
  description: 'Bulk reduce photo size to exact KB online free. Compress many images to 20KB/50KB for SSC, Bank & exam forms — ZIP download. Size to KB',
  path: '/bulk-reduce/',
  keywords: ['bulk reduce image size to KB', 'compress multiple photos to 50kb', 'batch photo compressor online free', 'reduce many images size KB'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
