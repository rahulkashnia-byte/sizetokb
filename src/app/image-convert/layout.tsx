import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Convert JPG PNG WebP Online Free — Reduce File Size for Forms",
  description: "Convert between JPG, PNG and WebP online free to reduce file size for exam form uploads — SizeToKB.in",
  path: "/image-convert/",
  keywords: ["JPG to PNG converter","PNG to JPG online","WebP converter free"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
