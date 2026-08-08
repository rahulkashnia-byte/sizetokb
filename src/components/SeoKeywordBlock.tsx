"use client";

import Link from "next/link";

/** Keyword-rich SEO section for India exam / KB resize intent. */
export function SeoKeywordBlock({
  heading,
  paragraphs,
  links,
}: {
  heading: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          {heading}
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        {links && links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
