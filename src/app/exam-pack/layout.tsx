import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce Exam Photo & Signature Size to KB — Download ZIP Pack",
  description: "Reduce photo size and signature size to exam KB specs, then download both in one ZIP — Size to KB",
  path: "/exam-pack/",
  keywords: ["exam photo signature zip","reduce photo and signature size","SSC photo pack"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
