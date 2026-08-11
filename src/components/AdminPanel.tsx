"use client";

import { useEffect, useState } from "react";
import { AdminNewsletterPanel } from "@/components/AdminNewsletterPanel";
import { AdminStatsPanel } from "@/components/AdminStatsPanel";
import { verifyAdminPassword } from "@/lib/usage";

const SESSION_KEY = "stk_admin_ok";

type Tab = "stats" | "newsletter";

export function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [sessionPass, setSessionPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("stats");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    } catch {
      /* ignore */
    }
  }, []);

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
      setSessionPass(password);
      setAuthed(true);
      setPassword("");
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setSessionPass("");
    setTab("stats");
  };

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
        <h1 className="text-center font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          Admin
        </h1>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">Stats &amp; newsletter</p>
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
    <div>
      <div className="border-b border-[var(--line)] bg-white/70">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex gap-1">
            {(
              [
                { id: "stats", label: "Stats" },
                { id: "newsletter", label: "Newsletter" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-lg px-3 py-2 text-xs font-bold sm:text-sm ${
                  tab === t.id
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--wash)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
          >
            Lock
          </button>
        </div>
      </div>

      {tab === "stats" ? (
        <AdminStatsPanel embedded onLogout={logout} />
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          {!sessionPass ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              You restored an old session. Lock and log in again so Publish can authenticate to the
              server.
            </p>
          ) : null}
          <AdminNewsletterPanel publishPassword={sessionPass} />
        </div>
      )}
    </div>
  );
}
