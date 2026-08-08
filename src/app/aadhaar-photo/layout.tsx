import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Reduce Aadhaar Photo Size Online Free to KB',
  description: 'Reduce Aadhaar / UIDAI photo size online free toward common KB limits for update forms — SizeToKB.in',
  path: '/aadhaar-photo/',
  keywords: ['reduce Aadhaar photo size', 'Aadhaar photo size KB', 'UIDAI photo compress', 'Aadhaar photo resize online'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
