import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Crop Photo Online Free — Then Reduce Image Size to KB",
  description: "Crop images online free for passport and exam forms, then reduce size to the required KB — SizeToKB.in",
  path: "/image-cropper/",
  keywords: ["image cropper online free","crop photo online","exam photo crop India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
