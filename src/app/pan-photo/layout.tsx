import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Reduce PAN Card Photo Size Online Free to KB',
  description: 'Reduce PAN card photo size online free to typical 10–50 KB portal limits. Private browser compressor — SizeToKB.in',
  path: '/pan-photo/',
  keywords: ['reduce PAN photo size', 'PAN card photo size KB', 'UTIITSL photo size', 'compress PAN application photo'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
