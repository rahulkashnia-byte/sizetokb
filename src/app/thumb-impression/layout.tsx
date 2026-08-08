import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Reduce Thumb Impression Size Online Free to KB',
  description: 'Reduce thumb impression size online free to 10–40 KB for police, bank and exam forms — SizeToKB.in',
  path: '/thumb-impression/',
  keywords: ['reduce thumb impression size', 'thumb impression size KB', 'police form thumb impression', 'compress thumb impression online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
