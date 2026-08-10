import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce Color Photo to Black & White Online Free",
  description: "Convert photo or signature to grayscale or pure B&W for forms that require it — Size to KB",
  path: "/color-bw/",
  keywords: ["color to black and white online","grayscale photo converter","B&W signature"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
