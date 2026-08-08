"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EXAMS, searchExams } from "@/lib/exams";
import type { Exam } from "@/lib/types";

type Filter = "all" | "open" | "soon";

export function ExamPicker() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);

  const openCount = EXAMS.filter((e) => e.formsOut).length;
  const soonCount = EXAMS.filter((e) => e.upcoming).length;

  const list = useMemo(() => {
    let base: Exam[] = searchExams(q);
    if (filter === "open") base = base.filter((e) => e.formsOut);
    if (filter === "soon") base = base.filter((e) => e.upcoming);
    return base;
  }, [q, filter]);

  const visible = showAll ? list : list.slice(0, 40);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[var(--card-shadow)]">
      {/* Custom — always visible, pinned */}
      <Link
        href="/custom/"
        className="flex flex-col gap-1 border-b-2 border-[var(--accent)] bg-[var(--ink)] px-4 py-4 text-white transition hover:bg-[#151d2e] sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Always available
          </p>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold sm:text-xl">
            Custom — set your own min / max KB
          </p>
          <p className="mt-0.5 text-sm text-white/65">
            No exam match? Enter exact size rules from your notification.
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white sm:mt-0">
          Open Custom →
        </span>
      </Link>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              Or pick an exam preset
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {EXAMS.length} profiles with photo / signature KB targets
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            All {EXAMS.length}
          </Chip>
          <Chip active={filter === "open"} onClick={() => setFilter("open")}>
            Applications open · {openCount}
          </Chip>
          <Chip active={filter === "soon"} onClick={() => setFilter("soon")}>
            Coming soon · {soonCount}
          </Chip>
        </div>

        <div className="relative mt-4">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            ⌕
          </span>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShowAll(false);
            }}
            placeholder="Type exam name (SSC, NEET, IBPS…)"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] py-3 pl-9 pr-4 text-sm outline-none focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/25"
          />
        </div>

        <ul className="mt-4 divide-y divide-[var(--line)] overflow-hidden rounded-xl border border-[var(--line)]">
          {/* Custom also first in list — always */}
          <li>
            <Link
              href="/custom/"
              className="flex items-center justify-between gap-3 bg-[var(--accent-soft)] px-4 py-3 transition hover:brightness-95"
            >
              <span className="text-sm font-bold text-[var(--accent-ink)]">Custom size to KB</span>
              <span className="text-xs font-semibold text-[var(--accent-ink)]">Open</span>
            </Link>
          </li>
          {visible.map((exam) => (
            <li key={exam.slug}>
              <Link
                href={`/${exam.slug}/`}
                className="flex items-center justify-between gap-3 bg-white px-4 py-3 transition hover:bg-[var(--wash)]"
              >
                <span className="text-sm font-medium text-[var(--ink)]">{exam.name}</span>
                <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  {exam.formsOut && (
                    <span className="rounded bg-rose-100 px-1.5 py-0.5 font-semibold text-rose-700">
                      Open
                    </span>
                  )}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {list.length === 0 && (
          <p className="mt-4 text-center text-sm text-[var(--muted)]">
            No preset found — use{" "}
            <Link href="/custom/" className="font-bold text-[var(--accent-ink)]">
              Custom
            </Link>{" "}
            above (always available).
          </p>
        )}

        {list.length > 40 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-semibold hover:border-[var(--accent)]"
            >
              {showAll ? "Show fewer" : `Show all ${list.length} presets`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
        active
          ? "bg-[var(--ink)] text-white"
          : "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)]"
      }`}
    >
      {children}
    </button>
  );
}
