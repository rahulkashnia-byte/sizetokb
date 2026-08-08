import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "White Background Photo Maker Online Free",
  description: "Replace plain photo backgrounds with white for passport and form photos — SizeToKB.in",
  path: "/white-background/",
  keywords: ["white background photo maker","remove background white","passport white background"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
