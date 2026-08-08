import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Aadhaar ID Number Masker Online Free",
  description: "Blur Aadhaar or ID numbers on photos before sharing — private browser tool — SizeToKB.in",
  path: "/id-masker/",
  keywords: ["Aadhaar masker online","blur ID number photo","mask Aadhaar card"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
