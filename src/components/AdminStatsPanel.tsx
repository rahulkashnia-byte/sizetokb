"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATEGORY_OPTIONS,
  datesForPreset,
  formatDayLabel,
  formatHourLabel,
  formatIstDateTime,
  formatMinutes,
  istDateKey,
  loadLocalUsageSnapshot,
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

  const [preset, setPreset] = useState<DatePreset>("7d");
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
    // Instant paint from this browser, then refresh from network in background
    setSnap(loadLocalUsageSnapshot());
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
    const conversionPct = opens > 0 ? Math.round((uses / opens) * 1000) / 10 : 0;
    const avgSecondsPerOpen = opens > 0 ? Math.round(seconds / opens) : 0;
    return { used, openedOnly, notUsed, opens, uses, seconds, conversionPct, avgSecondsPerOpen };
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
    { id: "all", label: "All tools" },
    { id: "used", label: "Got downloads" },
    { id: "opened", label: "Opened, no download" },
    { id: "not_used", label: "Never opened" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            How people use Size to KB
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {snap
              ? `${busy ? "Updating…" : "Ready"} · ${snap.source === "network" ? "site-wide" : "this browser only"} · ${new Date(snap.fetchedAt).toLocaleString("en-IN")} · IST`
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
        <p className="font-bold">Simple meaning</p>
        <ul className="mt-2 space-y-1.5 text-[var(--muted)]">
          <li>
            <strong className="text-[var(--ink)]">Visits</strong> — someone opened a tool page
          </li>
          <li>
            <strong className="text-[var(--ink)]">Downloads</strong> — they finished and tapped Free
            Download (or another save action)
          </li>
          <li>
            <strong className="text-[var(--ink)]">Download rate</strong> — downloads ÷ visits (higher
            is better)
          </li>
        </ul>
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
          Show tools that
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
              <option value="opens">Most visits</option>
              <option value="uses">Most downloads</option>
              <option value="time">Most time</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </section>

      {/* Story summary */}
      <section className="mt-6 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
          At a glance
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
          {summary.opens} visits → {summary.uses} downloads
          <span className="text-[var(--accent)]"> ({summary.conversionPct}% download rate)</span>
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          People spent {formatMinutes(summary.seconds)} looking at tools
          {summary.opens > 0
            ? ` · about ${formatMinutes(summary.avgSecondsPerOpen)} per visit`
            : ""}
          {snap?.peakHour != null
            ? ` · busiest around ${formatHourLabel(snap.peakHour)} IST`
            : ""}
          .
        </p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Kpi
          label="Visits"
          value={String(summary.opens)}
          hint="Times a tool page was opened"
        />
        <Kpi
          label="Downloads"
          value={String(summary.uses)}
          hint="Free Download / save actions"
        />
        <Kpi
          label="Download rate"
          value={`${summary.conversionPct}%`}
          hint="Downloads ÷ visits"
        />
        <Kpi
          label="Time spent"
          value={formatMinutes(summary.seconds)}
          hint="Total time on tool pages"
        />
        <Kpi
          label="Avg visit"
          value={formatMinutes(summary.avgSecondsPerOpen)}
          hint="Time per page open"
        />
        <Kpi
          label="Busiest hour"
          value={snap?.peakHour != null ? formatHourLabel(snap.peakHour) : "—"}
          hint="India time (IST)"
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Kpi
          label="Tools with downloads"
          value={String(summary.used)}
          hint="Opened and someone downloaded"
        />
        <Kpi
          label="Opened, no download"
          value={String(summary.openedOnly)}
          hint="Visited but left without saving"
        />
        <Kpi
          label="Never opened"
          value={String(summary.notUsed)}
          hint="No visits in this period"
        />
      </div>

      {/* Recent activity with clock time */}
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          Recent activity (with time)
        </h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Latest opens & uses with exact IST timestamp (from this browser’s event log + live
          tracking).
        </p>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          {!snap?.recent?.length ? (
            <p className="px-4 py-6 text-sm text-[var(--muted)]">
              No timed events yet. Open a tool page or download something, then Refresh.
            </p>
          ) : (
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">When (IST)</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Page</th>
                </tr>
              </thead>
              <tbody>
                {snap.recent.slice(0, 40).map((e, i) => (
                  <tr key={`${e.t}-${e.path}-${i}`} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 font-semibold text-[var(--ink)]">
                      {formatIstDateTime(e.t)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          e.type === "use"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-sky-100 text-sky-900"
                        }`}
                      >
                        {e.type === "use" ? "Downloaded" : "Visited"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{e.label}</div>
                      <div className="text-xs text-[var(--muted)]">{e.path}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Hour of day */}
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          Activity by hour (IST)
        </h2>
        <div className="mt-3 rounded-2xl border border-[var(--line)] bg-white p-4">
          {snap && Math.max(...snap.hourly) > 0 ? (
            <div className="flex h-36 items-end gap-1">
              {snap.hourly.map((v, h) => {
                const max = Math.max(...snap.hourly, 1);
                const pct = Math.round((v / max) * 100);
                return (
                  <div key={h} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-[var(--accent)]"
                      style={{ height: `${Math.max(v ? 8 : 2, pct)}%` }}
                      title={`${formatHourLabel(h)}: ${v} events`}
                    />
                    {(h % 3 === 0 || h === 23) && (
                      <span className="text-[9px] text-[var(--muted)]">{h}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">No hourly data yet.</p>
          )}
          <p className="mt-2 text-[11px] text-[var(--muted)]">
            Bars = opens + uses per clock hour (0–23 IST). Hover a bar for detail.
          </p>
        </div>
      </section>

      {/* Weekday */}
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          By weekday (IST)
        </h2>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((name, i) => {
            const v = snap?.weekday?.[i] ?? 0;
            const max = Math.max(1, ...(snap?.weekday ?? [1]));
            return (
              <div
                key={name}
                className="rounded-xl border border-[var(--line)] bg-white px-2 py-3 text-center"
              >
                <p className="text-[10px] font-bold uppercase text-[var(--muted)]">{name}</p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
                  {v}
                </p>
                <div className="mx-auto mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--wash)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${Math.round((v / max) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pages opened — clearest list */}
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
          Tools people opened
        </h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          {pagesOpened.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[var(--muted)]">
              No pages opened in this period yet. After you deploy, visits will show here.
            </p>
          ) : (
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">Visits</th>
                  <th className="px-4 py-3">Downloads</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Avg / visit</th>
                  <th className="px-4 py-3">Last active</th>
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
                    <td className="px-4 py-3">
                      {t.opens ? formatMinutes(Math.round(t.seconds / t.opens)) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {t.lastAt
                        ? formatIstDateTime(Math.floor(new Date(t.lastAt).getTime() / 1000))
                        : "—"}
                    </td>
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
                  <th className="px-4 py-3">Visits</th>
                  <th className="px-4 py-3">Downloads</th>
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
          All tools ({filteredTools.length})
        </h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-[var(--line)] bg-[var(--wash)] text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tool</th>
                <th className="px-4 py-3">Visits</th>
                <th className="px-4 py-3">Downloads</th>
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
      <p className="text-[11px] font-bold text-[var(--muted)]">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
