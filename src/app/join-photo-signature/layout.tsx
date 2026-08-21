import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Join Photo and Signature Online Free — One JPG for Forms",
  description:
    "Combine photo and signature into one JPG for bank / sarkari forms. Side-by-side or stacked, then compress to exact KB. Free · private — Size to KB",
  path: "/join-photo-signature/",
  keywords: [
    "join photo and signature online",
    "combine photo and signature for form",
    "photo signature merge JPG",
    "IBPS photo signature join",
    "merge passport photo and signature",
    "photo and signature in one image",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
