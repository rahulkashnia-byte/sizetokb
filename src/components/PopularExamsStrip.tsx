import Link from "next/link";

/** GSC winners / high-impression exam pages (Aug 2026 Search Console). */
export const POPULAR_EXAMS = [
  {
    href: "/railway-nfr-apprentice/",
    label: "Railway NFR Apprentice",
    blurb: "Top CTR · photo & sign KB",
  },
  {
    href: "/isro-icrb/",
    label: "ISRO ICRB",
    blurb: "Strong clicks · form KB",
  },
  {
    href: "/itat/",
    label: "ITAT",
    blurb: "High CTR exam page",
  },
  {
    href: "/rrb-section-controller/",
    label: "RRB Section Controller",
    blurb: "Signature & photo size",
  },
  {
    href: "/upsssc-pet/",
    label: "UPSSSC PET",
    blurb: "PET signature & photo",
  },
  {
    href: "/apssb-constable/",
    label: "APSSB Constable",
    blurb: "Photo and signature size",
  },
  {
    href: "/ibps-clerk/",
    label: "IBPS Clerk",
    blurb: "Bank form uploads",
  },
  {
    href: "/aiims-norcet-10th-nursing-officer/",
    label: "AIIMS NORCET",
    blurb: "Photo size in KB",
  },
] as const;

export function PopularExamsStrip() {
  return (
    <div className="mt-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Popular exams
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--ink)] sm:text-xl">
            Photo & signature size tools people open most
          </h2>
        </div>
        <Link
          href="/#presets"
          className="text-xs font-bold text-[var(--accent-ink)] hover:underline"
        >
          Browse all exams →
        </Link>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_EXAMS.map((exam) => (
          <Link
            key={exam.href}
            href={exam.href}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 shadow-sm transition hover:border-[var(--accent)] hover:shadow-md"
          >
            <span className="block text-sm font-bold text-[var(--ink)]">{exam.label}</span>
            <span className="mt-0.5 block text-xs text-[var(--muted)]">{exam.blurb}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
