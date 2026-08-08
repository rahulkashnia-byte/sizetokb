import Link from "next/link";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
        {title}
      </h1>
      {updated && (
        <p className="mt-2 text-sm text-[var(--muted)]">Last updated: {updated}</p>
      )}
      <div className="prose-legal mt-8 space-y-4 text-sm leading-relaxed text-[var(--ink)]/90 [&_a]:font-semibold [&_a]:text-[var(--accent-ink)] [&_h2]:mt-8 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-xl [&_h2]:text-[var(--ink)] [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_ul]:space-y-1 [&_ol]:space-y-1">
        {children}
      </div>
      <p className="mt-10 text-sm text-[var(--muted)]">
        <Link href="/">← Back to SizeToKB home</Link>
      </p>
    </article>
  );
}
