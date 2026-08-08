import Link from "next/link";
import { TOOL_CATEGORIES, TOOLS, type ToolCategory } from "@/lib/toolsCatalog";

const ACCENT: Record<ToolCategory, string> = {
  size: "border-[var(--accent)]/40 bg-[var(--accent-soft)]/40",
  photo: "border-[var(--line)] bg-white",
  pdf: "border-[var(--line)] bg-white",
  convert: "border-[var(--line)] bg-white",
  extra: "border-[var(--line)] bg-white",
};

export function ToolsGrid({
  id = "tools",
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className={compact ? "" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              All tools
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
              Reduce size to KB & more — pick a tool
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
              Everything stays in your browser. Start with reduce-to-KB, or open photo, PDF and
              convert helpers below.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {TOOL_CATEGORIES.map((cat) => {
            const items = TOOLS.filter(
              (t) => t.category === cat.id && t.href !== "/#custom-tool"
            );
            if (!items.length) return null;
            return (
              <div key={cat.id}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">
                  {cat.title}
                </h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className={`block h-full rounded-2xl border p-4 transition hover:border-[var(--accent)] hover:shadow-sm ${ACCENT[tool.category]}`}
                      >
                        <span className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
                          {tool.label}
                        </span>
                        <span className="mt-1 block text-sm text-[var(--muted)]">{tool.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
