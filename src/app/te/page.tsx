import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Redirecting to Telugu…",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://sizetokb.in/telugu/" },
};

/** Old short slug → full /telugu/ */
export default function TeRedirectPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <script dangerouslySetInnerHTML={{ __html: "location.replace('/telugu/')" }} />
      <p className="text-[var(--muted)]">Redirecting to Telugu…</p>
      <Link href="/telugu/" className="mt-4 inline-block font-bold text-[var(--accent-ink)]">
        తెలుగులో కొనసాగించండి →
      </Link>
    </main>
  );
}
