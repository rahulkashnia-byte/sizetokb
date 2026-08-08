import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Color to Black & White Photo Online Free",
  description: "Convert photo or signature to grayscale or pure B&W for forms that require it — SizeToKB.in",
  path: "/color-bw/",
  keywords: ["color to black and white online","grayscale photo converter","B&W signature"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
