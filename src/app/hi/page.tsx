import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Redirecting to Hindi…",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://sizetokb.in/hindi/" },
};

/** Old short slug → full /hindi/ */
export default function HiRedirectPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <script dangerouslySetInnerHTML={{ __html: "location.replace('/hindi/')" }} />
      <p className="text-[var(--muted)]">Redirecting to Hindi…</p>
      <Link href="/hindi/" className="mt-4 inline-block font-bold text-[var(--accent-ink)]">
        हिंदी में जारी रखें →
      </Link>
    </main>
  );
}
