import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Age Calculator As On Date Online Free — Exam Form Cut-off Age",
  description:
    "Calculate age as on date for SSC, Bank, Railway and government exam forms. Years, months, days + optional age band check — Size to KB",
  path: "/age-calculator/",
  keywords: [
    "age calculator as on date",
    "age as on date calculator",
    "exam age calculator",
    "SSC age calculator",
    "calculate age as on",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
