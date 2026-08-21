import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "ಫೋಟೋ 50KBಗೆ Compress — Photo Size Reduce Kannada Free",
  description:
    "ಫೋಟೋವನ್ನು 50KBಗೆ compress ಮಾಡಿ ಆನ್‌ಲೈನ್ ಉಚಿತ. SSC / Bank / KPSC ಫಾರಂಗಳಿಗೆ — Size to KB ಕನ್ನಡ.",
  path: "/kannada/compress-to-50kb/",
  keywords: [
    "photo 50kb kannada",
    "compress image to 50kb kannada",
    "ಫೋಟೋ 50kb",
    "photo size reduce kannada 50kb",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
