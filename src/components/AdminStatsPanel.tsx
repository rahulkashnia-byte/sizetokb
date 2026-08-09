"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATEGORY_OPTIONS,
  datesForPreset,
  formatDayLabel,
  formatMinutes,
  istDateKey,
  loadToolsForDates,
  loadUsageSnapshot,
  verifyAdminPassword,
  type DatePreset,
  type DayStat,
  type ToolStat,
  type UsageSnapshot,
} from "@/lib/usage";

const SESSION_KEY = "stk_admin_ok";

type SortKey = "uses" | "time" | "name";

export function AdminStatsPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [snap, setSnap] = useState<UsageSnapshot | null>(null);

  const [preset, setPreset] = useState<DatePreset>("all");
  const [customFrom, setCustomFrom] = useState(istDateKey());
  const [customTo, setCustomTo] = useState(istDateKey());
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("uses");
  const [hideZero, setHideZero] = useState(true);

  const [rangeTools, setRangeTools] = useState<ToolStat[] | null>(null);
  const [rangeBusy, setRangeBusy] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    setBusy(true);
    void loadUsageSnapshot()
      .then((s) => {
        if (!cancelled) setSnap(s);
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authed]);

  const selectedDates = useMemo(
    () => datesForPreset(preset, customFrom, customTo),
    [preset, customFrom, customTo]
  );

  // Load per-tool breakdown when a date range is selected
  useEffect(() => {
    if (!authed || !snap) return;
    if (selectedDates === null) {
      setRangeTools(null);
      return;
    }
    if (selectedDates.length === 0) {
      setRangeTools([]);
      return;
    }
    let cancelled = false;
    setRangeBusy(true);
    const ids = snap.tools.filter((t) => t.uses > 0 || t.seconds > 0).map((t) => t.id);
    const fetchIds = ids.length ? ids : snap.tools.slice(0, 40).map((t) => t.id);
    void loadToolsForDates(selectedDates, fetchIds)
      .then((rows) => {
        if (!cancelled) setRangeTools(rows);
      })
      .finally(() => {
        if (!cancelled) setRangeBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authed, snap, selectedDates]);

  const filteredDays: DayStat[] = useMemo(() => {
    if (!snap) return [];
    if (selectedDates === null) return snap.days;
    const set = new Set(selectedDates);
    return snap.days.filter((d) => set.has(d.date));
  }, [snap, selectedDates]);

  const baseTools: ToolStat[] = useMemo(() => {
    if (!snap) return [];
    if (selectedDates === null) return snap.tools;
    return rangeTools ?? [];
  }, [snap, selectedDates, rangeTools]);

  const filteredTools = useMemo(() => {
    let rows = [...baseTools];
    if (category !== "all") {
      rows = rows.filter((t) => t.category === category);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (t) =>
          t.label.toLowerCase().includes(q) ||
          t.path.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }
    if (hideZero) {
      rows = rows.filter((t) => t.uses > 0 || t.seconds > 0);
    }
    rows.sort((a, b) => {
      if (sort === "name") return a.label.localeCompare(b.label);
      if (sort === "time") return b.seconds - a.seconds || b.uses - a.uses;
      return b.uses - a.uses || b.seconds - a.seconds;
    });
    return rows;
  }, [baseTools, category, query, hideZero, sort]);

  const kpis = useMemo(() => {
    if (!snap) return { uses: 0, seconds: 0, tools: 0, minutes: 0 };
    if (selectedDates === null) {
      return {
        uses: snap.totalUses,
        seconds: snap.totalSeconds,
        tools: snap.tools.filter((t) => t.uses > 0 || t.seconds > 0).length,
        minutes: snap.totalMinutes,
      };
    }
    const uses = filteredDays.reduce((s, d) => s + d.uses, 0);
    const seconds = filteredDays.reduce((s, d) => s + d.seconds, 0);
    const tools = filteredTools.filter((t) => t.uses > 0 || t.seconds > 0).length;
    return {
      uses,
      seconds,
      tools,
      minutes: Math.round((seconds / 60) * 10) / 10,
    };
  }, [snap, selectedDates, filteredDays, filteredTools]);

  const byCategory = useMemo(() => {
    const map = new Map<string, { uses: number; seconds: number; tools: number }>();
    for (const t of filteredTools) {
      if (t.uses === 0 && t.seconds === 0) continue;
      const cur = map.get(t.category) ?? { uses: 0, seconds: 0, tools: 0 };
      cur.uses += t.uses;
      cur.seconds += t.seconds;
      cur.tools += 1;
      map.set(t.category, cur);
    }
    return [...map.entries()]
      .map(([cat, v]) => ({ category: cat, ...v }))
      .sort((a, b) => b.uses - a.uses);
  }, [filteredTools]);

  const maxDayUses = useMemo(
    () => Math.max(1, ...filteredDays.map((d) => d.uses)),
    [filteredDays]
  );

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const ok = await verifyAdminPassword(password);
      if (!ok) {
        setError("Wrong password");
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setPassword("");
    } finally {
      setBusy(false);
    }
  };

  const refresh = async () => {
    setBusy(true);
    try {
      setSnap(await loadUsageSnapshot());
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setSnap(null);
    setRangeTools(null);
  };

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
        <h1 className="text-center font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Admin
        </h1>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">Stats only</p>
        <form onSubmit={(e) => void login(e)} className="mt-8 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
          />
          {error && <p className="text-center text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password}
            className="w-full rounded-xl bg-[var(--ink)] py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {busy ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  const presets: { id: DatePreset; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "7d", label: "7 days" },
    { id: "30d", label: "30 days" },
    { id: "all", label: "All time" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            Tool stats
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {snap
              ? `Updated ${new Date(snap.fetchedAt).toLocaleString("en-IN")} · ${snap.source} · dates IST`
              : "Loading…"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={busy}
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold disabled:opacity-50"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
          >
            Lock
          </button>
        </div>
      </div>

      {/* Filters */}
      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">Filters</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                preset === p.id
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        {preset === "custom" && (
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="text-xs font-semibold text-[var(--muted)]">
              From
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="mt-1 block rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
            <label className="text-xs font-semibold text-[var(--muted)]">
              To
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="mt-1 block rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
          </div>
        )}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold text-[var(--muted)]">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-[var(--muted)]">
            Search tool
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name or path…"
              className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="text-xs font-semibold text-[var(--muted)]">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              <option value="uses">Most uses</option>
              <option value="time">Most time</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
          <label className="flex items-center gap-2 pt-6 text-sm font-semibold text-[var(--ink)]">
            <input
              type="checkbox"
              checked={hideZero}
              onChange={(e) => setHideZero(e.target.checked)}
              className="size-4 accent-[var(--accent)]"
            />
            Hide unused tools
          </label>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Uses" value={String(kpis.uses)} />
        <Kpi label="Time" value={formatMinutes(kpis.seconds)} />
        <Kpi label="Minutes" value={String(kpis.minutes)} />
        <Kpi label="Tools used" value={String(kpis.tools)} />
      </div>

      {/* Date-wise */}
      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
            Date-wise
          </h2>
          <p className="text-xs text-[var(--muted)]">
            {filteredDays.length} day{filteredDays.length === 1 ? "" : "s"}
            {rangeBusy ? " · loading tools…" : ""}
          </p>
        </div>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          {filteredDays.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[var(--muted)]">
              No daily data in this range yet.
            </p>
          ) : (
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Uses</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredDays.map((d) => (
                  <tr key={d.date} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{formatDayLabel(d.date)}</div>
                      <div className="text-xs text-[var(--muted)]">{d.date}</div>
                    </td>
                    <td className="px-4 py-3 font-bold">{d.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(d.seconds)}</td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-[var(--wash)] sm:w-40">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${Math.round((d.uses / maxDayUses) * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {byCategory.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
            By category
          </h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Tools</th>
                  <th className="px-4 py-3">Uses</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {byCategory.map((c) => (
                  <tr key={c.category} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 font-semibold capitalize">{c.category}</td>
                    <td className="px-4 py-3">{c.tools}</td>
                    <td className="px-4 py-3">{c.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(c.seconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mt-8 mb-10">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          Each tool
        </h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">Uses</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Avg / use</th>
                <th className="px-4 py-3">Share</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((t, i) => {
                const share =
                  kpis.uses > 0 ? Math.round((t.uses / kpis.uses) * 1000) / 10 : 0;
                const avg = t.uses > 0 ? Math.round(t.seconds / t.uses) : 0;
                return (
                  <tr key={t.id} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 text-[var(--muted)]">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{t.label}</div>
                      <div className="text-xs text-[var(--muted)]">
                        {t.path} · {t.category}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">{t.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(t.seconds)}</td>
                    <td className="px-4 py-3">{t.uses ? formatMinutes(avg) : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--wash)]">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${Math.min(100, share)}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--muted)]">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredTools.length === 0 && (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {rangeBusy
              ? "Loading tool stats for this date range…"
              : "No matching usage for these filters."}
          </p>
        )}
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
        {value}
      </p>
    </div>
  );
}
