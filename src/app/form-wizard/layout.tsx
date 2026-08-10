import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Form Photo Pack Wizard — Reduce Photo & Signature Size to KB',
  description: 'Admit card / form photo pack wizard. Reduce photo and signature size to portal KB limits for SSC, IBPS, PAN, Aadhaar — Size to KB',
  path: '/form-wizard/',
  keywords: ['form photo size wizard', 'admit card photo size', 'reduce photo signature pack KB', 'SSC form photo pack'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
