import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Compress Image to 50KB Online Free — Photo Size 50KB for Forms",
  description:
    "Compress image to 50KB online free for SSC, Bank, Railway forms. Crop, hit 50KB, Free Download on phone. Private — we don’t save your photo. Size to KB",
  path: "/compress-to-50kb/",
  keywords: [
    "compress image to 50kb",
    "reduce photo size to 50kb",
    "photo size 50KB online",
    "compress photo to 50KB",
    "image compressor 50KB",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
