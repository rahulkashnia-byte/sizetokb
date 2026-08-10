import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Unlock PDF Online Free — Remove PDF Password",
  description:
    "Unlock PDF online free. Remove PDF password and download an unlocked copy in your browser. PDF password remover — private, no upload. Size to KB",
  path: "/pdf-unlock/",
  keywords: [
    "unlock PDF",
    "unlock PDF online free",
    "remove PDF password",
    "PDF password remover",
    "decrypt PDF online",
    "unlock password protected PDF",
    "remove password from PDF free",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
