import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Aadhaar ID Masker Online Free — Blur Numbers Before Share",
  description: "Blur Aadhaar or ID numbers on photos before sharing. Private browser tool — Size to KB",
  path: "/id-masker/",
  keywords: ["Aadhaar masker online","blur ID number photo","mask Aadhaar card"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
