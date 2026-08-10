import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Edit PDF Online Free — Add Text, Images, Highlight & Draw",
  description:
    "Advanced PDF editor online free: add text, images, highlights, shapes and drawings, then download. Private browser tool — Size to KB",
  path: "/pdf-editor/",
  keywords: [
    "edit PDF online free",
    "PDF editor online",
    "annotate PDF free",
    "add text to PDF",
    "highlight PDF online",
    "draw on PDF",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
