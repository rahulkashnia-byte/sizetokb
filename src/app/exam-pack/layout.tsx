import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Exam Photo + Signature ZIP Pack Online Free",
  description: "Process photo and signature to exam KB specs and download as one ZIP — SizeToKB.in",
  path: "/exam-pack/",
  keywords: ["exam photo signature zip","bulk photo signature download","SSC photo pack"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
