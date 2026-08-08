import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "White Background Photo Maker — Reduce BG Noise for Passport Photos",
  description: "Replace plain photo backgrounds with white for passport and exam form photos — SizeToKB.in",
  path: "/white-background/",
  keywords: ["white background photo maker","passport white background","remove background white online"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
