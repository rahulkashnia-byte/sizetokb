/**
 * Tool usage stats (uses + time + daily) for /admin.
 * All-time + per-day counters via CountAPI; mirrored in localStorage.
 */

import { TOOLS, TOOL_CATEGORIES } from "@/lib/toolsCatalog";

export type ToolStat = {
  id: string;
  path: string;
  label: string;
  category: string;
  uses: number;
  seconds: number;
};

export type DayStat = {
  date: string; // YYYY-MM-DD (IST)
  uses: number;
  seconds: number;
};

export type UsageSnapshot = {
  tools: ToolStat[];
  days: DayStat[];
  /** Per-day tool breakdown when available (local + fetched network days) */
  dailyTools: Record<string, Record<string, { uses: number; seconds: number }>>;
  totalUses: number;
  totalSeconds: number;
  totalMinutes: number;
  fetchedAt: string;
  source: "network" | "local";
};

const PREFIX = "sizetokb_in_v1_";
const LOCAL_KEY = "stk_tool_stats_v2";
const COUNT_API = "https://countapi.mileshilliard.com/api/v1";
const DAY_HISTORY = 45;

/** SHA-256 of the admin password (plaintext never shipped). */
export const ADMIN_PASS_SHA256 =
  "1bb6e2376793aa6c033fea9fbcffd38932440095dc58dde8de83bff600d218af";

export const CATEGORY_OPTIONS = [
  { id: "all", label: "All categories" },
  ...TOOL_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
  { id: "other", label: "Other / exam pages" },
];

type ToolCounters = { uses: number; seconds: number };
type LocalStore = {
  version: 2;
  tools: Record<string, ToolCounters>;
  daily: Record<string, { uses: number; seconds: number; tools: Record<string, ToolCounters> }>;
};

function emptyLocal(): LocalStore {
  return { version: 2, tools: {}, daily: {} };
}

/** Calendar date in Asia/Kolkata as YYYY-MM-DD */
export function istDateKey(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function listDateKeys(daysBack: number): string[] {
  const today = istDateKey();
  const [y, m, d] = today.split("-").map(Number);
  const keys: string[] = [];
  const base = Date.UTC(y, m - 1, d);
  for (let i = daysBack - 1; i >= 0; i--) {
    const x = new Date(base - i * 86400000);
    keys.push(
      `${x.getUTCFullYear()}-${String(x.getUTCMonth() + 1).padStart(2, "0")}-${String(x.getUTCDate()).padStart(2, "0")}`
    );
  }
  return keys;
}

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
    return href === path || href === `${path.replace(/\/$/, "")}/`;
  });
  return hit?.label ?? path;
}

function categoryForPath(path: string): string {
  const hit = TOOLS.find((t) => {
    const href = t.href.startsWith("/#") ? "/" : t.href;
    return href === path || href === `${path.replace(/\/$/, "")}/`;
  });
  return hit?.category ?? "other";
}

function readLocal(): LocalStore {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) {
      // migrate v1 if present
      const v1 = localStorage.getItem("stk_tool_stats_v1");
      if (v1) {
        const old = JSON.parse(v1) as Record<string, ToolCounters>;
        const store = emptyLocal();
        store.tools = old;
        const day = istDateKey();
        store.daily[day] = { uses: 0, seconds: 0, tools: {} };
        for (const [id, val] of Object.entries(old)) {
          store.daily[day].tools[id] = { ...val };
          store.daily[day].uses += val.uses;
          store.daily[day].seconds += val.seconds;
        }
        writeLocal(store);
        return store;
      }
      return emptyLocal();
    }
    const parsed = JSON.parse(raw) as LocalStore;
    if (!parsed.tools) parsed.tools = {};
    if (!parsed.daily) parsed.daily = {};
    return parsed;
  } catch {
    return emptyLocal();
  }
}

function writeLocal(store: LocalStore) {
  try {
    // Keep ~90 days locally
    const dates = Object.keys(store.daily).sort();
    if (dates.length > 90) {
      for (const d of dates.slice(0, dates.length - 90)) delete store.daily[d];
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

function bumpLocal(id: string, field: "uses" | "seconds", by: number) {
  const store = readLocal();
  const day = istDateKey();
  if (!store.tools[id]) store.tools[id] = { uses: 0, seconds: 0 };
  store.tools[id][field] += by;
  if (!store.daily[day]) store.daily[day] = { uses: 0, seconds: 0, tools: {} };
  if (!store.daily[day].tools[id]) store.daily[day].tools[id] = { uses: 0, seconds: 0 };
  store.daily[day].tools[id][field] += by;
  store.daily[day][field] += by;
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
  const day = istDateKey();
  bumpLocal(id, "uses", 1);
  void countHit(`${PREFIX}tool_${id}_uses`).catch(() => {});
  void countHit(`${PREFIX}total_uses`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_uses`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_tool_${id}_uses`).catch(() => {});
  gtagTool("tool_use", { tool_id: id, tool_path: p });
}

/** Add dwell time for a tool page (seconds). */
export function trackToolTime(seconds: number, path?: string) {
  if (typeof window === "undefined") return;
  const secs = Math.min(Math.max(0, Math.floor(seconds)), 30 * 60);
  if (secs < 1) return;
  const p = path ?? currentPath();
  if (p.startsWith("/admin")) return;
  const id = toolIdFromPath(p);
  const day = istDateKey();
  bumpLocal(id, "seconds", secs);
  void countAdd(`${PREFIX}tool_${id}_secs`, secs).catch(() => {});
  void countAdd(`${PREFIX}total_secs`, secs).catch(() => {});
  void countAdd(`${PREFIX}day_${day}_secs`, secs).catch(() => {});
  void countAdd(`${PREFIX}day_${day}_tool_${id}_secs`, secs).catch(() => {});
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

export function catalogPaths(): { id: string; path: string; label: string; category: string }[] {
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

function metaForId(id: string) {
  const path = pathFromToolId(id);
  const cat = catalogPaths().find((c) => c.id === id);
  return {
    id,
    path,
    label: cat?.label ?? labelForPath(path),
    category: cat?.category ?? categoryForPath(path),
  };
}

function snapshotFromLocal(): UsageSnapshot {
  const store = readLocal();
  const catalog = catalogPaths();
  const byId = new Map<string, ToolStat>();
  for (const c of catalog) {
    byId.set(c.id, {
      ...c,
      uses: store.tools[c.id]?.uses ?? 0,
      seconds: store.tools[c.id]?.seconds ?? 0,
    });
  }
  for (const [id, val] of Object.entries(store.tools)) {
    if (byId.has(id)) continue;
    byId.set(id, { ...metaForId(id), uses: val.uses, seconds: val.seconds });
  }
  const tools = [...byId.values()].sort((a, b) => b.uses - a.uses || b.seconds - a.seconds);
  const days: DayStat[] = Object.entries(store.daily)
    .map(([date, v]) => ({ date, uses: v.uses, seconds: v.seconds }))
    .sort((a, b) => b.date.localeCompare(a.date));
  const dailyTools: UsageSnapshot["dailyTools"] = {};
  for (const [date, v] of Object.entries(store.daily)) {
    dailyTools[date] = v.tools;
  }
  const totalUses = tools.reduce((s, t) => s + t.uses, 0);
  const totalSeconds = tools.reduce((s, t) => s + t.seconds, 0);
  return {
    tools,
    days,
    dailyTools,
    totalUses,
    totalSeconds,
    totalMinutes: Math.round((totalSeconds / 60) * 10) / 10,
    fetchedAt: new Date().toISOString(),
    source: "local",
  };
}

async function mapPool<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return out;
}

/** Load stats for admin: all-time tools + recent daily totals. */
export async function loadUsageSnapshot(): Promise<UsageSnapshot> {
  const catalog = catalogPaths();
  const local = snapshotFromLocal();
  const dateKeys = listDateKeys(DAY_HISTORY);

  try {
    const toolResults = await mapPool(catalog, 6, async (c) => {
      const [uses, seconds] = await Promise.all([
        countGet(`${PREFIX}tool_${c.id}_uses`),
        countGet(`${PREFIX}tool_${c.id}_secs`),
      ]);
      return { ...c, uses, seconds };
    });

    const dayResults = await mapPool(dateKeys, 6, async (date) => {
      const [uses, seconds] = await Promise.all([
        countGet(`${PREFIX}day_${date}_uses`),
        countGet(`${PREFIX}day_${date}_secs`),
      ]);
      return { date, uses, seconds } satisfies DayStat;
    });

    const byId = new Map<string, ToolStat>();
    for (const row of toolResults) {
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

    const dayMap = new Map<string, DayStat>();
    for (const d of dayResults) {
      const loc = local.days.find((x) => x.date === d.date);
      dayMap.set(d.date, {
        date: d.date,
        uses: Math.max(d.uses, loc?.uses ?? 0),
        seconds: Math.max(d.seconds, loc?.seconds ?? 0),
      });
    }
    for (const loc of local.days) {
      if (!dayMap.has(loc.date)) dayMap.set(loc.date, loc);
    }

    const tools = [...byId.values()].sort((a, b) => b.uses - a.uses || b.seconds - a.seconds);
    const days = [...dayMap.values()].sort((a, b) => b.date.localeCompare(a.date));
    const totalUses = tools.reduce((s, t) => s + t.uses, 0);
    const totalSeconds = tools.reduce((s, t) => s + t.seconds, 0);
    const anyNetwork = toolResults.some((r) => r.uses > 0 || r.seconds > 0);

    return {
      tools,
      days,
      dailyTools: local.dailyTools,
      totalUses,
      totalSeconds,
      totalMinutes: Math.round((totalSeconds / 60) * 10) / 10,
      fetchedAt: new Date().toISOString(),
      source: anyNetwork || toolResults.length ? "network" : "local",
    };
  } catch {
    return local;
  }
}

/**
 * Fetch per-tool stats for a set of IST dates (network + local merge).
 * Used when admin filters to a date range (not all-time).
 */
export async function loadToolsForDates(
  dates: string[],
  toolIds: string[]
): Promise<ToolStat[]> {
  const local = snapshotFromLocal();
  const ids = toolIds.length ? toolIds : catalogPaths().map((c) => c.id);
  const agg = new Map<string, ToolCounters>();

  for (const id of ids) agg.set(id, { uses: 0, seconds: 0 });

  for (const date of dates) {
    const localDay = local.dailyTools[date];
    if (localDay) {
      for (const id of ids) {
        const cur = agg.get(id)!;
        cur.uses += localDay[id]?.uses ?? 0;
        cur.seconds += localDay[id]?.seconds ?? 0;
      }
    }
  }

  // Network fill for active / catalog tools (capped)
  const fetchIds = ids.slice(0, 50);
  try {
    await mapPool(
      dates.flatMap((date) => fetchIds.map((id) => ({ date, id }))),
      6,
      async ({ date, id }) => {
        const [uses, seconds] = await Promise.all([
          countGet(`${PREFIX}day_${date}_tool_${id}_uses`),
          countGet(`${PREFIX}day_${date}_tool_${id}_secs`),
        ]);
        const cur = agg.get(id)!;
        // Prefer max of local-sum-so-far vs network for this day alone is hard;
        // add network day values, then we'll reconcile with local below by taking max per field overall.
        // Simpler: if local already counted this day, skip adding network for that day/tool.
        const hadLocal = !!local.dailyTools[date]?.[id];
        if (!hadLocal) {
          cur.uses += uses;
          cur.seconds += seconds;
        } else {
          // local already included; bump if network higher for that day
          const lu = local.dailyTools[date][id]?.uses ?? 0;
          const ls = local.dailyTools[date][id]?.seconds ?? 0;
          if (uses > lu) cur.uses += uses - lu;
          if (seconds > ls) cur.seconds += seconds - ls;
        }
      }
    );
  } catch {
    /* keep local aggregate */
  }

  return [...agg.entries()]
    .map(([id, v]) => ({ ...metaForId(id), uses: v.uses, seconds: v.seconds }))
    .sort((a, b) => b.uses - a.uses || b.seconds - a.seconds);
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

export function formatDayLabel(date: string): string {
  try {
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export type DatePreset = "today" | "yesterday" | "7d" | "30d" | "all" | "custom";

export function datesForPreset(preset: DatePreset, from?: string, to?: string): string[] | null {
  // null => all-time (no day filter)
  const today = istDateKey();
  if (preset === "all") return null;
  if (preset === "today") return [today];
  if (preset === "yesterday") {
    const keys = listDateKeys(2);
    return keys.length >= 2 ? [keys[0]] : keys;
  }
  if (preset === "7d") return listDateKeys(7);
  if (preset === "30d") return listDateKeys(30);
  if (preset === "custom") {
    if (!from || !to) return [];
    const a = from <= to ? from : to;
    const b = from <= to ? to : from;
    const [ay, am, ad] = a.split("-").map(Number);
    const [by, bm, bd] = b.split("-").map(Number);
    const start = Date.UTC(ay, am - 1, ad);
    const end = Date.UTC(by, bm - 1, bd);
    const out: string[] = [];
    for (let t = start; t <= end; t += 86400000) {
      const x = new Date(t);
      out.push(
        `${x.getUTCFullYear()}-${String(x.getUTCMonth() + 1).padStart(2, "0")}-${String(x.getUTCDate()).padStart(2, "0")}`
      );
    }
    return out;
  }
  return null;
}
