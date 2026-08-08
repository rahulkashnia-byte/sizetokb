import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Portal Upload Error Fixer — Reduce File Size to Match KB Limit',
  description: 'Paste portal upload error text and get exact fix: reduce photo/signature/PDF size to the KB limit your form needs — SizeToKB.in',
  path: '/upload-fixer/',
  keywords: ['file size exceeds maximum limit fix', 'photo upload error fix', 'reduce size to match portal limit', 'signature size too large fix'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
