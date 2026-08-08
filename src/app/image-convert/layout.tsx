import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "JPG PNG WebP Converter Online Free",
  description: "Convert images between JPG, PNG and WebP in your browser — SizeToKB.in",
  path: "/image-convert/",
  keywords: ["JPG to PNG converter","PNG to JPG online","WebP converter free"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
