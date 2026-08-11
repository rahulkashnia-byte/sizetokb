/**
 * Tool / page usage stats for /admin.
 * Tracks: page opens, tool uses (downloads), time on page.
 */

import { TOOLS, TOOL_CATEGORIES } from "@/lib/toolsCatalog";

export type ToolStat = {
  id: string;
  path: string;
  label: string;
  category: string;
  /** Times the page was opened */
  opens: number;
  /** Times someone completed a download / tool action */
  uses: number;
  seconds: number;
  /** Last activity ISO timestamp (when known) */
  lastAt?: string | null;
};

export type ToolStatus = "used" | "opened" | "not_used";

export type DayStat = {
  date: string; // YYYY-MM-DD (IST)
  opens: number;
  uses: number;
  seconds: number;
};

export type RecentEvent = {
  t: number; // unix seconds
  type: "open" | "use" | "time";
  path: string;
  label: string;
  seconds?: number;
};

export type UsageSnapshot = {
  tools: ToolStat[];
  days: DayStat[];
  dailyTools: Record<string, Record<string, ToolCounters>>;
  hourly: number[]; // 24 IST hours — opens+uses activity
  hourlyOpens: number[];
  hourlyUses: number[];
  weekday: number[]; // 0=Sun..6=Sat
  recent: RecentEvent[];
  totalOpens: number;
  totalUses: number;
  totalSeconds: number;
  totalMinutes: number;
  conversionPct: number;
  avgSecondsPerOpen: number;
  peakHour: number | null;
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

export type ToolCounters = { opens: number; uses: number; seconds: number; lastAt?: string };

type LocalStore = {
  version: 2;
  tools: Record<string, ToolCounters>;
  daily: Record<
    string,
    { opens: number; uses: number; seconds: number; tools: Record<string, ToolCounters> }
  >;
  hourlyOpens: number[];
  hourlyUses: number[];
  weekday: number[];
  recent: RecentEvent[];
};

function emptyCounters(): ToolCounters {
  return { opens: 0, uses: 0, seconds: 0 };
}

function normalizeCounters(raw?: Partial<ToolCounters> | null): ToolCounters {
  return {
    opens: Number(raw?.opens) || 0,
    uses: Number(raw?.uses) || 0,
    seconds: Number(raw?.seconds) || 0,
    lastAt: raw?.lastAt || undefined,
  };
}

function emptyLocal(): LocalStore {
  return {
    version: 2,
    tools: {},
    daily: {},
    hourlyOpens: Array.from({ length: 24 }, () => 0),
    hourlyUses: Array.from({ length: 24 }, () => 0),
    weekday: Array.from({ length: 7 }, () => 0),
    recent: [],
  };
}

export function toolStatus(t: Pick<ToolStat, "opens" | "uses">): ToolStatus {
  if (t.uses > 0) return "used";
  if (t.opens > 0) return "opened";
  return "not_used";
}

export function statusLabel(s: ToolStatus): string {
  if (s === "used") return "Got download";
  if (s === "opened") return "No download yet";
  return "Never opened";
}

/** Hour 0–23 in Asia/Kolkata */
export function istHour(d = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(d);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  return h === 24 ? 0 : h;
}

/** Weekday 0=Sun … 6=Sat in Asia/Kolkata */
export function istWeekday(d = new Date()): number {
  // en-US weekday short in IST
  const w = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(d);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[w] ?? 0;
}

export function formatIstDateTime(unixSec: number): string {
  try {
    return new Date(unixSec * 1000).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return String(unixSec);
  }
}

export function formatHourLabel(h: number): string {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${ampm}`;
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
      const v1 = localStorage.getItem("stk_tool_stats_v1");
      if (v1) {
        const old = JSON.parse(v1) as Record<string, Partial<ToolCounters>>;
        const store = emptyLocal();
        const day = istDateKey();
        store.daily[day] = { opens: 0, uses: 0, seconds: 0, tools: {} };
        for (const [id, val] of Object.entries(old)) {
          const c = normalizeCounters(val);
          store.tools[id] = c;
          store.daily[day].tools[id] = { ...c };
          store.daily[day].opens += c.opens;
          store.daily[day].uses += c.uses;
          store.daily[day].seconds += c.seconds;
        }
        writeLocal(store);
        return store;
      }
      return emptyLocal();
    }
    const parsed = JSON.parse(raw) as LocalStore;
    const base = emptyLocal();
    parsed.tools = parsed.tools || {};
    parsed.daily = parsed.daily || {};
    parsed.hourlyOpens = Array.isArray(parsed.hourlyOpens)
      ? [...parsed.hourlyOpens, ...Array(24).fill(0)].slice(0, 24).map(Number)
      : base.hourlyOpens;
    parsed.hourlyUses = Array.isArray(parsed.hourlyUses)
      ? [...parsed.hourlyUses, ...Array(24).fill(0)].slice(0, 24).map(Number)
      : base.hourlyUses;
    parsed.weekday = Array.isArray(parsed.weekday)
      ? [...parsed.weekday, ...Array(7).fill(0)].slice(0, 7).map(Number)
      : base.weekday;
    parsed.recent = Array.isArray(parsed.recent) ? parsed.recent.slice(-100) : [];
    for (const id of Object.keys(parsed.tools)) {
      parsed.tools[id] = normalizeCounters(parsed.tools[id]);
    }
    for (const day of Object.keys(parsed.daily)) {
      const d = parsed.daily[day];
      d.opens = Number(d.opens) || 0;
      d.uses = Number(d.uses) || 0;
      d.seconds = Number(d.seconds) || 0;
      if (!d.tools) d.tools = {};
      for (const id of Object.keys(d.tools)) {
        d.tools[id] = normalizeCounters(d.tools[id]);
      }
    }
    return parsed;
  } catch {
    return emptyLocal();
  }
}

function writeLocal(store: LocalStore) {
  try {
    const dates = Object.keys(store.daily).sort();
    if (dates.length > 90) {
      for (const d of dates.slice(0, dates.length - 90)) delete store.daily[d];
    }
    if (store.recent?.length > 100) store.recent = store.recent.slice(-100);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

function pushRecent(
  store: LocalStore,
  type: RecentEvent["type"],
  path: string,
  label: string,
  seconds?: number
) {
  store.recent.push({
    t: Math.floor(Date.now() / 1000),
    type,
    path,
    label,
    seconds,
  });
  if (store.recent.length > 100) store.recent = store.recent.slice(-100);
}

function bumpLocal(
  id: string,
  field: "opens" | "uses" | "seconds",
  by: number,
  meta?: { path?: string; type?: RecentEvent["type"]; seconds?: number }
) {
  const store = readLocal();
  const day = istDateKey();
  const hour = istHour();
  const weekday = istWeekday();
  const nowIso = new Date().toISOString();
  if (!store.tools[id]) store.tools[id] = emptyCounters();
  store.tools[id][field] += by;
  store.tools[id].lastAt = nowIso;
  if (!store.daily[day]) store.daily[day] = { opens: 0, uses: 0, seconds: 0, tools: {} };
  if (!store.daily[day].tools[id]) store.daily[day].tools[id] = emptyCounters();
  store.daily[day].tools[id][field] += by;
  store.daily[day].tools[id].lastAt = nowIso;
  store.daily[day][field] += by;

  if (field === "opens") {
    store.hourlyOpens[hour] = (store.hourlyOpens[hour] || 0) + by;
    store.weekday[weekday] = (store.weekday[weekday] || 0) + by;
  } else if (field === "uses") {
    store.hourlyUses[hour] = (store.hourlyUses[hour] || 0) + by;
    store.weekday[weekday] = (store.weekday[weekday] || 0) + by;
  }

  if (meta?.type) {
    const path = meta.path || pathFromToolId(id);
    pushRecent(store, meta.type, path, labelForPath(path), meta.seconds);
  }
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

/** Record a page open / visit. */
export function trackPageOpen(path?: string) {
  if (typeof window === "undefined") return;
  const p = path ?? currentPath();
  if (p.startsWith("/admin")) return;
  const id = toolIdFromPath(p);
  const day = istDateKey();
  const hour = istHour();
  bumpLocal(id, "opens", 1, { path: p, type: "open" });
  void countHit(`${PREFIX}tool_${id}_opens`).catch(() => {});
  void countHit(`${PREFIX}total_opens`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_opens`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_tool_${id}_opens`).catch(() => {});
  void countHit(`${PREFIX}hour_${hour}_opens`).catch(() => {});
  gtagTool("page_open", { tool_id: id, tool_path: p, hour });
}

/** Record one successful tool run / download. */
export function trackToolUse(path?: string) {
  if (typeof window === "undefined") return;
  const p = path ?? currentPath();
  if (p.startsWith("/admin")) return;
  const id = toolIdFromPath(p);
  const day = istDateKey();
  const hour = istHour();
  bumpLocal(id, "uses", 1, { path: p, type: "use" });
  void countHit(`${PREFIX}tool_${id}_uses`).catch(() => {});
  void countHit(`${PREFIX}total_uses`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_uses`).catch(() => {});
  void countHit(`${PREFIX}day_${day}_tool_${id}_uses`).catch(() => {});
  void countHit(`${PREFIX}hour_${hour}_uses`).catch(() => {});
  gtagTool("tool_use", { tool_id: id, tool_path: p, hour });
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

function sortTools(a: ToolStat, b: ToolStat) {
  return b.uses - a.uses || b.opens - a.opens || b.seconds - a.seconds;
}

function enrichSnapshot(base: {
  tools: ToolStat[];
  days: DayStat[];
  dailyTools: UsageSnapshot["dailyTools"];
  hourlyOpens: number[];
  hourlyUses: number[];
  weekday: number[];
  recent: RecentEvent[];
  source: "network" | "local";
}): UsageSnapshot {
  const totalOpens = base.tools.reduce((s, t) => s + t.opens, 0);
  const totalUses = base.tools.reduce((s, t) => s + t.uses, 0);
  const totalSeconds = base.tools.reduce((s, t) => s + t.seconds, 0);
  const hourly = base.hourlyOpens.map((o, i) => o + (base.hourlyUses[i] || 0));
  let peakHour: number | null = null;
  let peakVal = 0;
  hourly.forEach((v, i) => {
    if (v > peakVal) {
      peakVal = v;
      peakHour = i;
    }
  });
  return {
    ...base,
    hourly,
    totalOpens,
    totalUses,
    totalSeconds,
    totalMinutes: Math.round((totalSeconds / 60) * 10) / 10,
    conversionPct: totalOpens > 0 ? Math.round((totalUses / totalOpens) * 1000) / 10 : 0,
    avgSecondsPerOpen: totalOpens > 0 ? Math.round(totalSeconds / totalOpens) : 0,
    peakHour: peakVal > 0 ? peakHour : null,
    fetchedAt: new Date().toISOString(),
  };
}

function snapshotFromLocal(): UsageSnapshot {
  const store = readLocal();
  const catalog = catalogPaths();
  const byId = new Map<string, ToolStat>();
  for (const c of catalog) {
    const v = normalizeCounters(store.tools[c.id]);
    byId.set(c.id, { ...c, ...v, lastAt: v.lastAt ?? null });
  }
  for (const [id, val] of Object.entries(store.tools)) {
    if (byId.has(id)) continue;
    const v = normalizeCounters(val);
    byId.set(id, { ...metaForId(id), ...v, lastAt: v.lastAt ?? null });
  }
  const tools = [...byId.values()].sort(sortTools);
  const days: DayStat[] = Object.entries(store.daily)
    .map(([date, v]) => ({
      date,
      opens: Number(v.opens) || 0,
      uses: Number(v.uses) || 0,
      seconds: Number(v.seconds) || 0,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
  const dailyTools: UsageSnapshot["dailyTools"] = {};
  for (const [date, v] of Object.entries(store.daily)) {
    dailyTools[date] = v.tools;
  }
  return enrichSnapshot({
    tools,
    days,
    dailyTools,
    hourlyOpens: store.hourlyOpens,
    hourlyUses: store.hourlyUses,
    weekday: store.weekday,
    recent: [...store.recent].reverse(),
    source: "local",
  });
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

/** Instant local snapshot for admin (no network). */
export function loadLocalUsageSnapshot(): UsageSnapshot {
  return snapshotFromLocal();
}

/** Load stats for admin: local-first merge + lean network fetch (active tools only). */
export async function loadUsageSnapshot(): Promise<UsageSnapshot> {
  const catalog = catalogPaths();
  const local = snapshotFromLocal();
  const dateKeys = listDateKeys(DAY_HISTORY);

  const activeIds = new Set<string>();
  for (const t of local.tools) {
    if (t.opens > 0 || t.uses > 0 || t.seconds > 0) activeIds.add(t.id);
  }
  for (const e of local.recent) {
    activeIds.add(toolIdFromPath(e.path));
  }
  // Cap network fan-out — CountAPI is slow if we hit every catalog tool
  const toolsToFetch = catalog.filter((c) => activeIds.has(c.id)).slice(0, 40);

  try {
    const [toolResults, dayResults, hourResults] = await Promise.all([
      mapPool(toolsToFetch, 10, async (c) => {
        const [opens, uses, seconds] = await Promise.all([
          countGet(`${PREFIX}tool_${c.id}_opens`),
          countGet(`${PREFIX}tool_${c.id}_uses`),
          countGet(`${PREFIX}tool_${c.id}_secs`),
        ]);
        return { ...c, opens, uses, seconds };
      }),
      mapPool(dateKeys, 10, async (date) => {
        const [opens, uses, seconds] = await Promise.all([
          countGet(`${PREFIX}day_${date}_opens`),
          countGet(`${PREFIX}day_${date}_uses`),
          countGet(`${PREFIX}day_${date}_secs`),
        ]);
        return { date, opens, uses, seconds } satisfies DayStat;
      }),
      mapPool(
        Array.from({ length: 24 }, (_, h) => h),
        10,
        async (h) => {
          const [opens, uses] = await Promise.all([
            countGet(`${PREFIX}hour_${h}_opens`),
            countGet(`${PREFIX}hour_${h}_uses`),
          ]);
          return { h, opens, uses };
        }
      ),
    ]);

    const byId = new Map<string, ToolStat>();
    for (const c of catalog) {
      const loc = local.tools.find((t) => t.id === c.id);
      byId.set(c.id, {
        ...c,
        opens: loc?.opens ?? 0,
        uses: loc?.uses ?? 0,
        seconds: loc?.seconds ?? 0,
        lastAt: loc?.lastAt ?? null,
      });
    }
    for (const loc of local.tools) {
      if (!byId.has(loc.id)) byId.set(loc.id, loc);
    }
    for (const row of toolResults) {
      const prev = byId.get(row.id);
      byId.set(row.id, {
        ...row,
        opens: Math.max(row.opens, prev?.opens ?? 0),
        uses: Math.max(row.uses, prev?.uses ?? 0),
        seconds: Math.max(row.seconds, prev?.seconds ?? 0),
        lastAt: prev?.lastAt ?? null,
      });
    }

    const dayMap = new Map<string, DayStat>();
    for (const d of dayResults) {
      const loc = local.days.find((x) => x.date === d.date);
      dayMap.set(d.date, {
        date: d.date,
        opens: Math.max(d.opens, loc?.opens ?? 0),
        uses: Math.max(d.uses, loc?.uses ?? 0),
        seconds: Math.max(d.seconds, loc?.seconds ?? 0),
      });
    }
    for (const loc of local.days) {
      if (!dayMap.has(loc.date)) dayMap.set(loc.date, loc);
    }

    const hourlyOpens = Array.from({ length: 24 }, (_, h) => {
      const net = hourResults.find((x) => x.h === h)?.opens ?? 0;
      return Math.max(net, local.hourlyOpens[h] || 0);
    });
    const hourlyUses = Array.from({ length: 24 }, (_, h) => {
      const net = hourResults.find((x) => x.h === h)?.uses ?? 0;
      return Math.max(net, local.hourlyUses[h] || 0);
    });

    const tools = [...byId.values()].sort(sortTools);
    const days = [...dayMap.values()].sort((a, b) => b.date.localeCompare(a.date));
    const anyNetwork = toolResults.some((r) => r.opens > 0 || r.uses > 0 || r.seconds > 0);

    return enrichSnapshot({
      tools,
      days,
      dailyTools: local.dailyTools,
      hourlyOpens,
      hourlyUses,
      weekday: local.weekday,
      recent: local.recent,
      source: anyNetwork || dayResults.some((d) => d.opens || d.uses) ? "network" : "local",
    });
  } catch {
    return local;
  }
}

/** Fetch per-tool stats for a set of IST dates (local-first; skip CountAPI when local has the days). */
export async function loadToolsForDates(
  dates: string[],
  toolIds: string[]
): Promise<ToolStat[]> {
  const local = snapshotFromLocal();
  const ids = toolIds.length ? toolIds : catalogPaths().map((c) => c.id);
  const agg = new Map<string, ToolCounters>();

  for (const id of ids) agg.set(id, emptyCounters());

  for (const date of dates) {
    const localDay = local.dailyTools[date];
    if (localDay) {
      for (const id of ids) {
        const cur = agg.get(id)!;
        const loc = normalizeCounters(localDay[id]);
        cur.opens += loc.opens;
        cur.uses += loc.uses;
        cur.seconds += loc.seconds;
      }
    }
  }

  const missingDates = dates.filter((date) => !local.dailyTools[date]);
  const finish = () =>
    [...agg.entries()]
      .map(([id, v]) => ({ ...metaForId(id), ...v }))
      .sort(sortTools);

  if (missingDates.length === 0) return finish();

  const fetchIds = ids
    .filter((id) => {
      const c = agg.get(id)!;
      return c.opens > 0 || c.uses > 0;
    })
    .slice(0, 25);

  if (fetchIds.length === 0) return finish();

  try {
    await mapPool(
      missingDates.flatMap((date) => fetchIds.map((id) => ({ date, id }))),
      10,
      async ({ date, id }) => {
        const [opens, uses, seconds] = await Promise.all([
          countGet(`${PREFIX}day_${date}_tool_${id}_opens`),
          countGet(`${PREFIX}day_${date}_tool_${id}_uses`),
          countGet(`${PREFIX}day_${date}_tool_${id}_secs`),
        ]);
        const cur = agg.get(id)!;
        cur.opens += opens;
        cur.uses += uses;
        cur.seconds += seconds;
      }
    );
  } catch {
    /* keep local */
  }

  return finish();
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
