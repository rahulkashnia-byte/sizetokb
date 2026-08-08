import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Custom Reduce Photo & Signature Size — Any Min Max KB",
  description:
    "Reduce photo size and reduce signature size to any custom KB range. Set min–max KB and optional cm/px from your exam notification — free on SizeToKB.in",
  path: "/custom/",
  keywords: [
    "reduce signature size online",
    "reduce photo size for form",
    "custom photo size KB",
    "compress signature to 20kb",
    "resize signature to 10kb 20kb",
    "signature size kam kaise kare",
  ],
});

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
