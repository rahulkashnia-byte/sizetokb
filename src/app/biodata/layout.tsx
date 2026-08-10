import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Free Sarkari Biodata & Resume Maker Online — Print Ready PDF",
  description:
    "Free sarkari biodata / resume maker with photo upload, education, skills packs and print-ready PDF. Private browser tool for SSC, Bank, Railway, Police forms — Size to KB",
  path: "/biodata/",
  keywords: [
    "biodata maker",
    "sarkari biodata maker",
    "resume maker online free",
    "biodata format for government job",
    "bio data maker with photo",
    "SSC biodata format",
    "print biodata PDF",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
