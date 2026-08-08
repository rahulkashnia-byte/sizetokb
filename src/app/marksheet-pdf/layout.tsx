import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Reduce Marksheet PDF Size Online Free to 200KB 500KB',
  description: 'Reduce marksheet / certificate PDF size online free toward 200KB, 500KB or 1MB for scholarship and job portals — SizeToKB.in',
  path: '/marksheet-pdf/',
  keywords: ['reduce marksheet PDF size', 'compress certificate PDF 200KB', 'marksheet PDF compressor', 'reduce PDF to 500KB online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
