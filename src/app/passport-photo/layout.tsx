import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Passport Size Photo Maker Online Free",
  description: "Make India 3.5×4.5 cm or 2×2 inch passport photos with white background — SizeToKB.in",
  path: "/passport-photo/",
  keywords: ["passport size photo maker","3.5x4.5 photo online","2x2 photo maker India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
