import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Passport Size Photo Maker Online Free — Reduce Photo to Form Size",
  description: "Make India 3.5×4.5 cm or 2×2 inch passport photos. Crop, change background, download JPG or A4 sheet — Size to KB",
  path: "/passport-photo/",
  keywords: ["passport size photo maker","reduce photo to passport size","3.5x4.5 photo online","2x2 photo maker India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
