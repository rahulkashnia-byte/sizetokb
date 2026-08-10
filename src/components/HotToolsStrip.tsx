import Link from "next/link";

/** High-intent shortcuts for homepage — exact KB + mega PDF tools */
export const HOT_TOOLS = [
  {
    href: "/compress-to-50kb/",
    label: "Compress to 50KB",
    blurb: "Most searched form photo limit",
    badge: "Hot",
  },
  {
    href: "/compress-to-20kb/",
    label: "Compress to 20KB",
    blurb: "Strict portal photo / sign size",
    badge: "Hot",
  },
  {
    href: "/compress-to-100kb/",
    label: "Compress to 100KB",
    blurb: "UPSC / NEET style uploads",
    badge: null,
  },
  {
    href: "/compress-to-10kb/",
    label: "Compress to 10KB",
    blurb: "Tight signature / portal limit",
    badge: "New",
  },
  {
    href: "/min-kb-padder/",
    label: "Min KB padder",
    blurb: "Portal says file too small",
    badge: "New",
  },
  {
    href: "/age-calculator/",
    label: "Age as on date",
    blurb: "Exam cut-off age calculator",
    badge: "New",
  },
  {
    href: "/pdf-to-jpg/",
    label: "PDF to JPG",
    blurb: "Huge search demand — pages → images",
    badge: "New",
  },
  {
    href: "/pdf-unlock/",
    label: "Unlock PDF",
    blurb: "Remove PDF password online free",
    badge: "New",
  },
  {
    href: "/image-to-pdf/",
    label: "JPG to PDF",
    blurb: "Convert images to PDF free",
    badge: "Hot",
  },
  {
    href: "/size-kam-kaise-kare/",
    label: "Size kam kaise kare",
    blurb: "Hindi guide → exact KB tools",
    badge: null,
  },
  {
    href: "/biodata/",
    label: "Biodata maker",
    blurb: "Sarkari resume → print PDF",
    badge: "New",
  },
  {
    href: "/photo-name-date/",
    label: "Name & date on photo",
    blurb: "Stamp name + date for forms",
    badge: "New",
  },
  {
    href: "/signature-cleaner/",
    label: "Signature 10–20KB",
    blurb: "Clean & compress for SSC / Bank",
    badge: null,
  },
] as const;

export function HotToolsStrip({
  title = "Quick wins — high-intent tools",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Start here
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
            {title}
          </h2>
        </div>
        <Link href="/#tools" className="shrink-0 text-xs font-bold text-[var(--accent-ink)] hover:underline">
          All tools →
        </Link>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {HOT_TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white px-4 py-3 shadow-sm transition hover:border-[var(--accent)]"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--ink)]">{tool.label}</span>
                {tool.badge ? (
                  <span className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--accent-ink)]">
                    {tool.badge}
                  </span>
                ) : null}
              </span>
              <span className="mt-0.5 text-xs text-[var(--muted)]">{tool.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
