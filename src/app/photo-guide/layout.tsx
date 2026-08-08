import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Photo Guidelines Checker Online Free — Before Reduce Size to KB',
  description: 'Check photo guidelines: face framing, brightness, blur and background tips before you reduce size to KB for forms — SizeToKB.in',
  path: '/photo-guide/',
  keywords: ['photo guidelines checker', 'passport photo quality check', 'exam photo requirements check', 'photo brightness blur check'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
