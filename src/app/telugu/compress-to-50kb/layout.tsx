import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ఫోటో 50KBకి Compress చేయండి — Photo Size Ela Taggali Free",
  description:
    "ఫోటోను 50KBకి compress చేయండి ఆన్‌లైన్ ఉచితం. SSC / Bank ఫారమ్‌లకు photo size ela taggali — Size to KB తెలుగు.",
  path: "/telugu/compress-to-50kb/",
  keywords: [
    "photo 50kb telugu",
    "compress image to 50kb",
    "photo size ela taggali 50kb",
    "ఫోటో 50kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
