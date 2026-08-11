import type { Metadata } from "next";
import { NewsletterPageClient } from "@/components/NewsletterPageClient";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Exam photo & form tips — Size to KB newsletter",
  description:
    "Short guides for SSC, banking and railway forms: photo 20–50 KB, signature size, rejected uploads, and free Size to KB tools.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
