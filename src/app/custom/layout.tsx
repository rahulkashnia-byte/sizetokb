import type { Metadata } from "next";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reduce Photo & Signature Size to Any Custom KB Online Free",
  description: "Reduce image size and reduce signature size to any min–max KB with optional cm/px. Free for exam form fill — Size to KB",
  path: "/custom/",
  keywords: ["reduce signature size to 20KB","reduce photo size to 50KB","custom reduce image size KB","signature size kam kaise kare"],
});

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SevaDeskPartnerStrip />
    </>
  );
}
