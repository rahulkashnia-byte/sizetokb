"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatMinutes,
  loadUsageSnapshot,
  verifyAdminPassword,
  type UsageSnapshot,
} from "@/lib/usage";

const SESSION_KEY = "stk_admin_ok";

export function AdminStatsPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [snap, setSnap] = useState<UsageSnapshot | null>(null);

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

  const byCategory = useMemo(() => {
    if (!snap) return [];
    const map = new Map<string, { uses: number; seconds: number; tools: number }>();
    for (const t of snap.tools) {
      if (t.uses === 0 && t.seconds === 0) continue;
      const cur = map.get(t.category) ?? { uses: 0, seconds: 0, tools: 0 };
      cur.uses += t.uses;
      cur.seconds += t.seconds;
      cur.tools += 1;
      map.set(t.category, cur);
    }
    return [...map.entries()]
      .map(([category, v]) => ({ category, ...v }))
      .sort((a, b) => b.uses - a.uses);
  }, [snap]);

  const activeTools = useMemo(
    () => (snap ? snap.tools.filter((t) => t.uses > 0 || t.seconds > 0) : []),
    [snap]
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            Tool stats
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {snap
              ? `Updated ${new Date(snap.fetchedAt).toLocaleString("en-IN")} · source: ${snap.source}`
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

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Total uses" value={String(snap?.totalUses ?? "—")} />
        <Kpi label="Total time" value={snap ? formatMinutes(snap.totalSeconds) : "—"} />
        <Kpi label="Minutes" value={snap ? String(snap.totalMinutes) : "—"} />
        <Kpi label="Tools used" value={String(activeTools.length)} />
      </div>

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

      <section className="mt-8">
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
              {(activeTools.length ? activeTools : snap?.tools.slice(0, 15) ?? []).map(
                (t, i) => {
                  const share =
                    snap && snap.totalUses > 0
                      ? Math.round((t.uses / snap.totalUses) * 1000) / 10
                      : 0;
                  const avg = t.uses > 0 ? Math.round(t.seconds / t.uses) : 0;
                  return (
                    <tr key={t.id} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 text-[var(--muted)]">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[var(--ink)]">{t.label}</div>
                        <div className="text-xs text-[var(--muted)]">{t.path}</div>
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
                }
              )}
            </tbody>
          </table>
        </div>
        {activeTools.length === 0 && (
          <p className="mt-3 text-sm text-[var(--muted)]">
            No usage yet. Open tools on the live site — uses and time will show up here.
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
