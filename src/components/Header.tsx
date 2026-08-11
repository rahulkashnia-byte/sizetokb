"use client";

import Link from "next/link";
import { useState } from "react";
import { featuredTools, toolsForNav } from "@/lib/toolsCatalog";
import { SARKARISUCHI, sarkarisuchiEnabled, sarkarisuchiJobsUrl } from "@/lib/sevadesk";

const QUICK = [
  { href: "/#custom-tool", label: "Reduce to KB" },
  { href: "/compress-to-50kb/", label: "50KB" },
  { href: "/pdf-to-jpg/", label: "PDF to JPG" },
  { href: "/pdf-unlock/", label: "Unlock PDF" },
  { href: "/newsletter/", label: "Tips" },
  { href: "/hindi/", label: "Hindi" },
  { href: "/telugu/", label: "Telugu" },
  { href: "/#tools", label: "All tools" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const jobsUrl = sarkarisuchiEnabled() ? sarkarisuchiJobsUrl() : null;
  const menuTools = [...featuredTools().filter((t) => t.href !== "/#custom-tool"), ...toolsForNav()]
    .filter((t, i, arr) => arr.findIndex((x) => x.href === t.href) === i)
    .slice(0, 12);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-baseline gap-0.5 leading-none">
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
            SizeTo<span className="text-[var(--accent)]">KB</span>
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] sm:inline">
            .in
          </span>
        </Link>

        {/* Desktop: tools always visible */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary tools">
          {QUICK.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--wash)] hover:text-[var(--accent-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#custom-tool"
            className="inline-flex items-center rounded-lg bg-[var(--ink)] px-3 py-2 text-xs font-bold text-white hover:bg-[var(--accent)] sm:text-sm"
          >
            Reduce to KB
          </Link>

          {/* Mobile / tablet: compact list */}
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink)] sm:text-sm"
              aria-expanded={open}
              aria-label="Open tools menu"
            >
              Tools
              <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open && (
              <div className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-72 overflow-y-auto rounded-xl border border-[var(--line)] bg-white shadow-xl">
                <Link
                  href="/#tools"
                  onClick={() => setOpen(false)}
                  className="block border-b border-[var(--line)] bg-[var(--accent-soft)] px-3.5 py-3 text-sm font-bold text-[var(--accent-ink)]"
                >
                  View all tools on home →
                </Link>
                <Link
                  href="/newsletter/"
                  onClick={() => setOpen(false)}
                  className="block border-b border-[var(--line)] px-3.5 py-2.5 hover:bg-[var(--wash)]"
                >
                  <span className="text-sm font-semibold text-[var(--ink)]">Tips / newsletter</span>
                </Link>
                <Link
                  href="/hindi/"
                  onClick={() => setOpen(false)}
                  className="block border-b border-[var(--line)] px-3.5 py-2.5 hover:bg-[var(--wash)]"
                >
                  <span className="text-sm font-semibold text-[var(--ink)]">Hindi · हिंदी</span>
                </Link>
                <Link
                  href="/telugu/"
                  onClick={() => setOpen(false)}
                  className="block border-b border-[var(--line)] px-3.5 py-2.5 hover:bg-[var(--wash)]"
                >
                  <span className="text-sm font-semibold text-[var(--ink)]">Telugu · తెలుగు</span>
                </Link>
                {menuTools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[var(--line)] px-3.5 py-2.5 last:border-0 hover:bg-[var(--wash)]"
                  >
                    <span className="text-sm font-semibold text-[var(--ink)]">{t.label}</span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">{t.blurb}</span>
                  </Link>
                ))}
                {jobsUrl ? (
                  <a
                    href={jobsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3.5 py-2.5 hover:bg-[var(--wash)]"
                  >
                    <span className="text-sm font-semibold">{SARKARISUCHI.name} jobs</span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">Partner</span>
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tablet strip: visible tool chips */}
      <div className="border-t border-[var(--line)] bg-white/70 lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {QUICK.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--wash)] px-3 py-1.5 text-xs font-bold text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
