"use client";

import Link from "next/link";
import { useState } from "react";

const TOOLS = [
  {
    href: "/",
    title: "Exam KB presets",
    desc: "Pick SSC, UPSC, Bank…",
    badge: "Start",
  },
  {
    href: "/custom/",
    title: "Custom size to KB",
    desc: "Your own min–max KB",
  },
  {
    href: "/image-resizer/",
    title: "Image compressor",
    desc: "Hit any KB target",
  },
  {
    href: "/pdf-compressor/",
    title: "PDF slim",
    desc: "Shrink PDF uploads",
  },
  {
    href: "/image-to-pdf/",
    title: "Photos → PDF",
    desc: "Merge pages fast",
  },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-0.5 leading-none">
          <span className="font-[family-name:var(--font-display)] text-xl font-800 tracking-tight text-[var(--ink)] sm:text-2xl">
            SizeTo<span className="text-[var(--accent)]">KB</span>
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] sm:inline">
            .in
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/custom/"
            className="inline-flex items-center rounded-lg bg-[var(--ink)] px-3 py-2 text-xs font-bold text-white hover:bg-[var(--accent)] sm:text-sm"
          >
            Custom KB
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink)] sm:text-sm"
              aria-expanded={open}
            >
              Tools
              <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>▾</span>
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-xl">
                {TOOLS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-start justify-between gap-2 border-b border-[var(--line)] px-3.5 py-2.5 last:border-0 hover:bg-[var(--wash)]"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                        {t.title}
                        {"badge" in t && t.badge ? (
                          <span className="rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[var(--accent-ink)]">
                            {t.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-[var(--muted)]">{t.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
