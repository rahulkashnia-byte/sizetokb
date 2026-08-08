import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Reorder Delete PDF Pages Online Free — Then Reduce PDF Size to KB',
  description: 'Reorder and delete PDF pages online free, then compress toward target KB for exam and government uploads — SizeToKB.in',
  path: '/pdf-organize/',
  keywords: ['reorder PDF pages online free', 'delete PDF pages online', 'organize PDF pages', 'reduce PDF size after reorder'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
