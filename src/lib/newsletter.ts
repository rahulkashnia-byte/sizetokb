import { ADMIN_PASS_SHA256, sha256Hex } from "@/lib/usage";

export type NewsletterCategoryId =
  | "exam-tips"
  | "size-guides"
  | "how-to"
  | "updates"
  | "form-help";

export type NewsletterPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsletterCategoryId;
  published: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterStore = {
  version: 1;
  updatedAt: string;
  posts: NewsletterPost[];
};

export const NEWSLETTER_CATEGORIES: {
  id: NewsletterCategoryId;
  label: string;
  blurb: string;
}[] = [
  { id: "exam-tips", label: "Exam tips", blurb: "SSC, banking, railway form advice" },
  { id: "size-guides", label: "Size guides", blurb: "20KB, 50KB, signature sizes" },
  { id: "how-to", label: "How-to", blurb: "Step-by-step resize & upload" },
  { id: "form-help", label: "Form help", blurb: "Rejected uploads & fixes" },
  { id: "updates", label: "Updates", blurb: "New tools and site news" },
];

const DATA_URL = "/data/newsletter.json";
const API_URL = "/api/newsletter.php";
const DRAFT_KEY = "stk_newsletter_draft_v1";

export function emptyNewsletterStore(): NewsletterStore {
  return { version: 1, updatedAt: new Date().toISOString(), posts: [] };
}

export function categoryLabel(id: NewsletterCategoryId | string): string {
  return NEWSLETTER_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function newPostId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function isCategory(v: unknown): v is NewsletterCategoryId {
  return NEWSLETTER_CATEGORIES.some((c) => c.id === v);
}

export function normalizeStore(raw: unknown): NewsletterStore {
  const base = emptyNewsletterStore();
  if (!raw || typeof raw !== "object") return base;
  const obj = raw as Record<string, unknown>;
  const postsIn = Array.isArray(obj.posts) ? obj.posts : [];
  const posts: NewsletterPost[] = [];
  for (const row of postsIn) {
    if (!row || typeof row !== "object") continue;
    const p = row as Record<string, unknown>;
    const title = String(p.title ?? "").trim();
    if (!title) continue;
    const slug = String(p.slug ?? slugify(title)).trim() || slugify(title);
    const category = isCategory(p.category) ? p.category : "updates";
    posts.push({
      id: String(p.id ?? newPostId()),
      slug,
      title,
      excerpt: String(p.excerpt ?? "").trim(),
      body: String(p.body ?? "").trim(),
      category,
      published: Boolean(p.published),
      ctaLabel: p.ctaLabel ? String(p.ctaLabel) : undefined,
      ctaHref: p.ctaHref ? String(p.ctaHref) : undefined,
      createdAt: String(p.createdAt ?? new Date().toISOString()),
      updatedAt: String(p.updatedAt ?? new Date().toISOString()),
    });
  }
  posts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return {
    version: 1,
    updatedAt: String(obj.updatedAt ?? new Date().toISOString()),
    posts,
  };
}

export async function fetchNewsletterStore(): Promise<NewsletterStore> {
  // Prefer PHP API when Hostinger has it (live edits without rebuild).
  try {
    const res = await fetch(`${API_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && Array.isArray((data as NewsletterStore).posts)) {
        const normalized = normalizeStore(data);
        if (normalized.posts.length > 0) return normalized;
      }
    }
  } catch {
    /* fall through */
  }
  try {
    const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) return normalizeStore(await res.json());
  } catch {
    /* ignore */
  }
  return emptyNewsletterStore();
}

export function publishedPosts(
  store: NewsletterStore,
  category?: NewsletterCategoryId | "all"
): NewsletterPost[] {
  return store.posts.filter(
    (p) => p.published && (category === undefined || category === "all" || p.category === category)
  );
}

export function findPost(store: NewsletterStore, slugOrId: string): NewsletterPost | undefined {
  return store.posts.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

/** Split body into paragraphs; lines starting with "- " become list items. */
export function renderBodyBlocks(body: string): { type: "p" | "ul"; text?: string; items?: string[] }[] {
  const blocks: { type: "p" | "ul"; text?: string; items?: string[] }[] = [];
  const chunks = body.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((l) => l.trimEnd());
    if (lines.every((l) => /^[-*•]\s+/.test(l.trim()) || l.trim() === "")) {
      const items = lines
        .map((l) => l.trim().replace(/^[-*•]\s+/, ""))
        .filter(Boolean);
      if (items.length) blocks.push({ type: "ul", items });
      continue;
    }
    blocks.push({ type: "p", text: lines.join(" ").trim() });
  }
  return blocks;
}

export function saveDraftLocally(store: NewsletterStore) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

export function loadDraftLocally(): NewsletterStore | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return normalizeStore(JSON.parse(raw));
  } catch {
    return null;
  }
}

function downloadJson(store: NewsletterStore) {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "newsletter.json";
  a.click();
  URL.revokeObjectURL(url);
}

export type SaveNewsletterResult =
  | { ok: true; mode: "api" }
  | { ok: true; mode: "download"; message: string }
  | { ok: false; error: string };

export async function publishNewsletterStore(
  store: NewsletterStore,
  password: string
): Promise<SaveNewsletterResult> {
  const hash = await sha256Hex(password);
  if (hash !== ADMIN_PASS_SHA256) {
    return { ok: false, error: "Wrong password" };
  }

  const payload: NewsletterStore = {
    ...normalizeStore(store),
    updatedAt: new Date().toISOString(),
  };
  saveDraftLocally(payload);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, data: payload }),
    });
    if (res.ok) {
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (out.ok !== false) return { ok: true, mode: "api" };
    }
  } catch {
    /* fallback */
  }

  downloadJson(payload);
  return {
    ok: true,
    mode: "download",
    message:
      "Server save unavailable. Downloaded newsletter.json — upload it to public_html/data/newsletter.json on Hostinger, then refresh the site.",
  };
}
