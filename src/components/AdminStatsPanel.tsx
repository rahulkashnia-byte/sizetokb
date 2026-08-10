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
  statusLabel,
  toolStatus,
  verifyAdminPassword,
  type DatePreset,
  type DayStat,
  type ToolStat,
  type ToolStatus,
  type UsageSnapshot,
} from "@/lib/usage";

const SESSION_KEY = "stk_admin_ok";

type SortKey = "opens" | "uses" | "time" | "name";
type StatusFilter = "all" | ToolStatus;

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
  const [sort, setSort] = useState<SortKey>("opens");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

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
    const ids = snap.tools
      .filter((t) => t.opens > 0 || t.uses > 0 || t.seconds > 0)
      .map((t) => t.id);
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
    if (category !== "all") rows = rows.filter((t) => t.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (t) =>
          t.label.toLowerCase().includes(q) ||
          t.path.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      rows = rows.filter((t) => toolStatus(t) === statusFilter);
    }
    rows.sort((a, b) => {
      if (sort === "name") return a.label.localeCompare(b.label);
      if (sort === "time") return b.seconds - a.seconds || b.opens - a.opens || b.uses - a.uses;
      if (sort === "uses") return b.uses - a.uses || b.opens - a.opens || b.seconds - a.seconds;
      return b.opens - a.opens || b.uses - a.uses || b.seconds - a.seconds;
    });
    return rows;
  }, [baseTools, category, query, statusFilter, sort]);

  const summary = useMemo(() => {
    const pool = baseTools;
    const used = pool.filter((t) => t.uses > 0).length;
    const openedOnly = pool.filter((t) => t.opens > 0 && t.uses === 0).length;
    const notUsed = pool.filter((t) => t.opens === 0 && t.uses === 0).length;
    const opens =
      selectedDates === null
        ? snap?.totalOpens ?? 0
        : filteredDays.reduce((s, d) => s + d.opens, 0);
    const uses =
      selectedDates === null
        ? snap?.totalUses ?? 0
        : filteredDays.reduce((s, d) => s + d.uses, 0);
    const seconds =
      selectedDates === null
        ? snap?.totalSeconds ?? 0
        : filteredDays.reduce((s, d) => s + d.seconds, 0);
    return { used, openedOnly, notUsed, opens, uses, seconds };
  }, [baseTools, snap, selectedDates, filteredDays]);

  const pagesOpened = useMemo(
    () =>
      [...baseTools]
        .filter((t) => t.opens > 0)
        .sort((a, b) => b.opens - a.opens || b.uses - a.uses),
    [baseTools]
  );

  const maxDayOpens = useMemo(
    () => Math.max(1, ...filteredDays.map((d) => d.opens || d.uses)),
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

  const statusFilters: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "All pages" },
    { id: "used", label: "Used" },
    { id: "opened", label: "Opened only" },
    { id: "not_used", label: "Not used" },
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
              ? `Updated ${new Date(snap.fetchedAt).toLocaleString("en-IN")} · ${snap.source} · IST`
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

      {/* Plain-language guide */}
      <section className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--wash)] p-4 text-sm text-[var(--ink)]">
        <p className="font-bold">How to read this</p>
        <ul className="mt-2 space-y-1 text-[var(--muted)]">
          <li>
            <StatusPill status="used" /> <strong className="text-[var(--ink)]">Used</strong> —
            someone opened the page and completed the tool (download / action).
          </li>
          <li>
            <StatusPill status="opened" /> <strong className="text-[var(--ink)]">Opened only</strong> —
            page was visited, but no download yet.
          </li>
          <li>
            <StatusPill status="not_used" /> <strong className="text-[var(--ink)]">Not used</strong> —
            page was never opened in this period.
          </li>
        </ul>
        <p className="mt-2 text-xs text-[var(--muted)]">
          <strong>Opens</strong> = times the page was opened · <strong>Uses</strong> = times the
          tool was actually used · <strong>Time</strong> = time spent on that page.
        </p>
      </section>

      {/* Filters */}
      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">Date</p>
        <div className="mt-2 flex flex-wrap gap-2">
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

        <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
          Status
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStatusFilter(s.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                statusFilter === s.id
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
            Search page
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
              <option value="opens">Most opens</option>
              <option value="uses">Most uses</option>
              <option value="time">Most time</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Pages opened" value={String(summary.opens)} hint="Total opens" />
        <Kpi label="Tool uses" value={String(summary.uses)} hint="Downloads / actions" />
        <Kpi label="Time" value={formatMinutes(summary.seconds)} hint="On pages" />
        <Kpi label="Used" value={String(summary.used)} hint="Opened + downloaded" />
        <Kpi label="Opened only" value={String(summary.openedOnly)} hint="No download yet" />
        <Kpi label="Not used" value={String(summary.notUsed)} hint="Never opened" />
      </div>

      {/* Pages opened — clearest list */}
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          Which pages were opened
        </h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          {pagesOpened.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[var(--muted)]">
              No pages opened in this period yet. After you deploy, visits will show here.
            </p>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">Opens</th>
                  <th className="px-4 py-3">Uses</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {pagesOpened.map((t, i) => (
                  <tr key={t.id} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 text-[var(--muted)]">{i + 1}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={toolStatus(t)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{t.label}</div>
                      <div className="text-xs text-[var(--muted)]">{t.path}</div>
                    </td>
                    <td className="px-4 py-3 font-bold">{t.opens}</td>
                    <td className="px-4 py-3 font-bold">{t.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(t.seconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Date-wise */}
      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
            Date-wise
          </h2>
          <p className="text-xs text-[var(--muted)]">
            {filteredDays.length} day{filteredDays.length === 1 ? "" : "s"}
            {rangeBusy ? " · loading…" : ""}
          </p>
        </div>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          {filteredDays.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[var(--muted)]">No daily data in this range yet.</p>
          ) : (
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Opens</th>
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
                    <td className="px-4 py-3 font-bold">{d.opens}</td>
                    <td className="px-4 py-3 font-bold">{d.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(d.seconds)}</td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-[var(--wash)] sm:w-40">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{
                            width: `${Math.round(((d.opens || d.uses) / maxDayOpens) * 100)}%`,
                          }}
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

      {/* Full list with filters applied */}
      <section className="mt-8 mb-10">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          All pages ({filteredTools.length})
        </h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Opens</th>
                <th className="px-4 py-3">Uses</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((t, i) => {
                const status = toolStatus(t);
                return (
                  <tr
                    key={t.id}
                    className={`border-b border-[var(--line)] last:border-0 ${
                      status === "not_used" ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-[var(--muted)]">{i + 1}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{t.label}</div>
                      <div className="text-xs text-[var(--muted)]">
                        {t.path} · {t.category}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">{t.opens}</td>
                    <td className="px-4 py-3 font-bold">{t.uses}</td>
                    <td className="px-4 py-3">{formatMinutes(t.seconds)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredTools.length === 0 && (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {rangeBusy ? "Loading…" : "No pages match these filters."}
          </p>
        )}
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: ToolStatus }) {
  const styles =
    status === "used"
      ? "bg-emerald-100 text-emerald-800"
      : status === "opened"
        ? "bg-amber-100 text-amber-900"
        : "bg-zinc-100 text-zinc-600";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${styles}`}>
      {statusLabel(status)}
    </span>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white px-3 py-3 shadow-sm sm:px-4 sm:py-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] sm:text-[11px]">
        {label}
      </p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--ink)] sm:text-2xl">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-[10px] text-[var(--muted)]">{hint}</p>}
    </div>
  );
}
