import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "புகைப்படம் 50KBக்கு Compress — Photo Size Reduce Tamil Free",
  description:
    "புகைப்படத்தை 50KBக்கு compress செய்யுங்கள் — ஆன்லைன் இலவசம். SSC / Bank / TNPSC படிவங்களுக்கு — Size to KB தமிழ்.",
  path: "/tamil/compress-to-50kb/",
  keywords: [
    "photo 50kb tamil",
    "compress image to 50kb tamil",
    "புகைப்படம் 50kb",
    "photo size reduce tamil 50kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
