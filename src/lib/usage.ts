/**
 * Lightweight tool usage stats (uses + time) for /admin.
 * Site-wide counters via CountAPI; also mirrored in localStorage for local preview.
 */

import { TOOLS } from "@/lib/toolsCatalog";

export type ToolStat = {
  id: string;
  path: string;
  label: string;
  category: string;
  uses: number;
  seconds: number;
};

export type UsageSnapshot = {
  tools: ToolStat[];
  totalUses: number;
  totalSeconds: number;
  totalMinutes: number;
  fetchedAt: string;
  source: "network" | "local";
};

const PREFIX = "sizetokb_in_v1_";
const LOCAL_KEY = "stk_tool_stats_v1";
const COUNT_API = "https://countapi.mileshilliard.com/api/v1";

/** SHA-256 of the admin password (plaintext never shipped). */
export const ADMIN_PASS_SHA256 =
  "1bb6e2376793aa6c033fea9fbcffd38932440095dc58dde8de83bff600d218af";

type LocalStore = Record<string, { uses: number; seconds: number }>;

function toolIdFromPath(path: string): string {
  let p = path.split("?")[0].split("#")[0] || "/";
  if (!p.startsWith("/")) p = `/${p}`;
  if (p !== "/" && !p.endsWith("/")) p += "/";
  if (p === "/") return "home";
  return p.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "home";
}

function pathFromToolId(id: string): string {
  if (id === "home") return "/";
  return `/${id.replace(/__/g, "/")}/`;
}

function labelForPath(path: string): string {
  if (path === "/" || path === "") return "Home / Reduce to KB";
  const hit = TOOLS.find((t) => {
    const href = t.href.startsWith("/#") ? "/" : t.href;
    return href === path || href === path.replace(/\/$/, "") + "/";
  });
  return hit?.label ?? path;
}

function categoryForPath(path: string): string {
  const hit = TOOLS.find((t) => {
    const href = t.href.startsWith("/#") ? "/" : t.href;
    return href === path || href === path.replace(/\/$/, "") + "/";
  });
  return hit?.category ?? "other";
}

function readLocal(): LocalStore {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LocalStore) : {};
  } catch {
    return {};
  }
}

function writeLocal(store: LocalStore) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

function bumpLocal(id: string, field: "uses" | "seconds", by: number) {
  const store = readLocal();
  if (!store[id]) store[id] = { uses: 0, seconds: 0 };
  store[id][field] += by;
  writeLocal(store);
}

async function countGet(key: string): Promise<number> {
  const res = await fetch(`${COUNT_API}/get/${encodeURIComponent(key)}`, {
    cache: "no-store",
  });
  if (!res.ok) return 0;
  const data = (await res.json()) as { value?: string | number };
  const n = Number(data.value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

async function countHit(key: string): Promise<void> {
  await fetch(`${COUNT_API}/hit/${encodeURIComponent(key)}`, {
    cache: "no-store",
    keepalive: true,
  });
}

/** Add `by` to a counter (get → set). Best-effort; races are acceptable for stats. */
async function countAdd(key: string, by: number): Promise<void> {
  if (by <= 0) return;
  const current = await countGet(key);
  await fetch(
    `${COUNT_API}/set/${encodeURIComponent(key)}?value=${encodeURIComponent(String(current + by))}`,
    { cache: "no-store", keepalive: true }
  );
}

function gtagTool(name: string, params: Record<string, string | number>) {
  try {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", name, params);
  } catch {
    /* ignore */
  }
}

function currentPath(): string {
  if (typeof window === "undefined") return "/";
  let p = window.location.pathname || "/";
  if (p !== "/" && !p.endsWith("/")) p += "/";
  return p;
}

/** Record one successful tool run / action. */
export function trackToolUse(path?: string) {
  if (typeof window === "undefined") return;
  const p = path ?? currentPath();
  if (p.startsWith("/admin")) return;
  const id = toolIdFromPath(p);
  bumpLocal(id, "uses", 1);
  void countHit(`${PREFIX}tool_${id}_uses`).catch(() => {});
  void countHit(`${PREFIX}total_uses`).catch(() => {});
  gtagTool("tool_use", { tool_id: id, tool_path: p });
}

/** Add dwell time for a tool page (seconds). */
export function trackToolTime(seconds: number, path?: string) {
  if (typeof window === "undefined") return;
  const secs = Math.min(Math.max(0, Math.floor(seconds)), 30 * 60); // cap 30 min / visit
  if (secs < 1) return;
  const p = path ?? currentPath();
  if (p.startsWith("/admin")) return;
  const id = toolIdFromPath(p);
  bumpLocal(id, "seconds", secs);
  void countAdd(`${PREFIX}tool_${id}_secs`, secs).catch(() => {});
  void countAdd(`${PREFIX}total_secs`, secs).catch(() => {});
  gtagTool("tool_time", { tool_id: id, tool_path: p, seconds: secs });
}

export async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await sha256Hex(password);
  return hash === ADMIN_PASS_SHA256;
}

function catalogPaths(): { id: string; path: string; label: string; category: string }[] {
  const rows: { id: string; path: string; label: string; category: string }[] = [
    { id: "home", path: "/", label: "Home / Reduce to KB", category: "size" },
  ];
  const seen = new Set(["home"]);
  for (const t of TOOLS) {
    if (t.href.startsWith("/#")) continue;
    const path = t.href.endsWith("/") ? t.href : `${t.href}/`;
    const id = toolIdFromPath(path);
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push({ id, path, label: t.label, category: t.category });
  }
  return rows;
}

function snapshotFromLocal(): UsageSnapshot {
  const store = readLocal();
  const catalog = catalogPaths();
  const tools: ToolStat[] = catalog.map((c) => ({
    ...c,
    uses: store[c.id]?.uses ?? 0,
    seconds: store[c.id]?.seconds ?? 0,
  }));
  // include any extra local keys (exam pages etc.)
  for (const [id, val] of Object.entries(store)) {
    if (catalog.some((c) => c.id === id)) continue;
    const path = pathFromToolId(id);
    tools.push({
      id,
      path,
      label: labelForPath(path),
      category: categoryForPath(path),
      uses: val.uses,
      seconds: val.seconds,
    });
  }
  tools.sort((a, b) => b.uses - a.uses || b.seconds - a.seconds);
  const totalUses = tools.reduce((s, t) => s + t.uses, 0);
  const totalSeconds = tools.reduce((s, t) => s + t.seconds, 0);
  return {
    tools,
    totalUses,
    totalSeconds,
    totalMinutes: Math.round((totalSeconds / 60) * 10) / 10,
    fetchedAt: new Date().toISOString(),
    source: "local",
  };
}

/** Load stats for admin: prefer network counters, fall back to this browser. */
export async function loadUsageSnapshot(): Promise<UsageSnapshot> {
  const catalog = catalogPaths();
  const local = snapshotFromLocal();

  try {
    const results = await Promise.all(
      catalog.map(async (c) => {
        const [uses, seconds] = await Promise.all([
          countGet(`${PREFIX}tool_${c.id}_uses`),
          countGet(`${PREFIX}tool_${c.id}_secs`),
        ]);
        return { ...c, uses, seconds };
      })
    );

    // Merge: take max(network, local) so local preview isn't wiped, and network wins when higher
    const byId = new Map<string, ToolStat>();
    for (const row of results) {
      const loc = local.tools.find((t) => t.id === row.id);
      byId.set(row.id, {
        ...row,
        uses: Math.max(row.uses, loc?.uses ?? 0),
        seconds: Math.max(row.seconds, loc?.seconds ?? 0),
      });
    }
    for (const loc of local.tools) {
      if (!byId.has(loc.id)) byId.set(loc.id, loc);
    }

    const tools = [...byId.values()].sort(
      (a, b) => b.uses - a.uses || b.seconds - a.seconds
    );
    const totalUses = tools.reduce((s, t) => s + t.uses, 0);
    const totalSeconds = tools.reduce((s, t) => s + t.seconds, 0);
    const anyNetwork = results.some((r) => r.uses > 0 || r.seconds > 0);

    return {
      tools,
      totalUses,
      totalSeconds,
      totalMinutes: Math.round((totalSeconds / 60) * 10) / 10,
      fetchedAt: new Date().toISOString(),
      source: anyNetwork || results.length ? "network" : "local",
    };
  } catch {
    return local;
  }
}

export function formatMinutes(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm ? `${h}h ${rm}m` : `${h}h`;
}
