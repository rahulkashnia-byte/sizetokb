import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: 'Watermark Photo & PDF Online Free — FOR UPLOAD ONLY Stamp',
  description: 'Add FOR UPLOAD ONLY watermark on photos or PDFs before sharing. Private browser watermark tool — SizeToKB.in',
  path: '/watermark/',
  keywords: ['watermark photo online free', 'FOR UPLOAD ONLY watermark', 'watermark PDF online', 'stamp image for upload'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
