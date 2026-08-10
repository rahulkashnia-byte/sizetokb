import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Add Name and Date on Photo Online Free — Exam Form Photo Stamp",
  description:
    "Add candidate name and date on photo online free for SSC, Bank, Railway and form uploads. Private browser stamp tool — Size to KB",
  path: "/photo-name-date/",
  keywords: [
    "name and date on photo",
    "write name on photo online",
    "exam photo name date",
    "stamp name on photograph",
    "photo name date stamp",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
