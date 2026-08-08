import {
  SARKARISUCHI,
  SARKARISUCHI_NAV,
  sarkarisuchiEnabled,
  sarkarisuchiForExam,
  sarkarisuchiPath,
} from "@/lib/sevadesk";

export function SevaDeskPartnerStrip({
  examSlug,
  examName,
}: {
  examSlug?: string;
  examName?: string;
}) {
  if (!sarkarisuchiEnabled()) return null;

  const examLink =
    examSlug && examName ? sarkarisuchiForExam(examSlug, examName) : null;

  return (
    <aside className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--wash)] px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Partner · {SARKARISUCHI.name}
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] sm:text-xl">
          Looking for the vacancy, dates or admit card?
        </p>
        <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
          SarkariSuchi summarises government job and exam notices with official links — then come
          back here to hit the photo / signature KB limit.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {examLink ? (
            <a
              href={examLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-[var(--accent)] px-3.5 py-2 text-xs font-bold text-white hover:opacity-95 sm:text-sm"
            >
              {examLink.label}
            </a>
          ) : null}
          <a
            href={sarkarisuchiPath("/jobs")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-[var(--line)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)] sm:text-sm"
          >
            Browse jobs on SarkariSuchi
          </a>
        </div>
      </div>
    </aside>
  );
}

export function SevaDeskFooterBlock() {
  if (!sarkarisuchiEnabled()) return null;

  return (
    <div className="mt-10 border-t border-white/10 pt-8">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white/45">
        Government jobs &amp; results · {SARKARISUCHI.name}
      </h4>
      <p className="mt-2 max-w-2xl text-sm text-white/65">
        After you resize your photo, check vacancies, last dates, results and admit cards on
        SarkariSuchi.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SARKARISUCHI_NAV.map((item) => (
          <a
            key={item.path}
            href={sarkarisuchiPath(item.path)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
