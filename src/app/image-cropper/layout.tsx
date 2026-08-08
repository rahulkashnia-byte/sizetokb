import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Image Cropper Online Free — Crop Photo for Forms",
  description:
    "Crop images online free for passport photos and exam forms. Select area and download JPG — SizeToKB.in",
  path: "/image-cropper/",
  keywords: [
    "image cropper online free",
    "crop photo online",
    "passport photo crop",
    "exam photo crop India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
