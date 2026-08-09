import type { Metadata } from "next";
import { AdminStatsPanel } from "@/components/AdminStatsPanel";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminStatsPanel />;
}
