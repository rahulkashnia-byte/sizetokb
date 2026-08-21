import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "फोटो 50KB मध्ये Compress करा — Photo Size Kami Kara Free",
  description:
    "फोटो 50KB मध्ये compress करा ऑनलाइन मोफत. SSC / Bank / MPSC फॉर्मसाठी — Size to KB मराठी.",
  path: "/marathi/compress-to-50kb/",
  keywords: [
    "photo 50kb marathi",
    "compress image to 50kb marathi",
    "फोटो 50kb",
    "photo size kami kara 50kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
