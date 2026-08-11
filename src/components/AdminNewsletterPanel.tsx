"use client";

import { useEffect, useMemo, useState } from "react";
import { buildToolNewsletterStore, toolTipCount } from "@/content/toolNewsletterPosts";
import {
  NEWSLETTER_CATEGORIES,
  categoryLabel,
  fetchNewsletterStore,
  newPostId,
  normalizeStore,
  publishNewsletterStore,
  saveDraftLocally,
  slugify,
  type NewsletterCategoryId,
  type NewsletterStore,
} from "@/lib/newsletter";

type Props = {
  publishPassword: string;
};

/** Post-only admin (no edit/delete for now) — tips are Q&A style, one per tool. */
export function AdminNewsletterPanel({ publishPassword }: Props) {
  const [store, setStore] = useState<NewsletterStore | null>(null);
  const [filter, setFilter] = useState<NewsletterCategoryId | "all">("all");
  const [showComposer, setShowComposer] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<NewsletterCategoryId>("exam-tips");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaHref, setCtaHref] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchNewsletterStore().then((remote) => {
      if (cancelled) return;
      // Prefer live data; if empty, load the tool-tip pack.
      if (remote.posts.length === 0) {
        const seed = buildToolNewsletterStore();
        setStore(seed);
        saveDraftLocally(seed);
      } else {
        setStore(remote);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    if (!store) return [];
    const list =
      filter === "all" ? store.posts : store.posts.filter((p) => p.category === filter);
    return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [store, filter]);

  const loadToolPack = () => {
    if (
      store &&
      store.posts.length > 0 &&
      !confirm(
        `Replace current ${store.posts.length} posts with the ${toolTipCount()} tool Q&A tips?`
      )
    ) {
      return;
    }
    const seed = buildToolNewsletterStore();
    setStore(seed);
    saveDraftLocally(seed);
    setMsg(`Loaded ${seed.posts.length} tool tips. Click Publish to site when ready.`);
    setErr(null);
    setShowComposer(false);
  };

  const addPost = () => {
    if (!store) return;
    const t = title.trim();
    if (!t) {
      setErr("Add a question-style title first");
      return;
    }
    if (!body.trim()) {
      setErr("Write a short helpful answer");
      return;
    }
    const now = new Date().toISOString();
    const slug = slugify(t);
    if (store.posts.some((p) => p.slug === slug)) {
      setErr("A tip with a similar title/slug already exists");
      return;
    }
    const next = normalizeStore({
      ...store,
      updatedAt: now,
      posts: [
        {
          id: newPostId(),
          slug,
          title: t,
          excerpt: excerpt.trim(),
          body: body.trim(),
          category,
          published: true,
          ctaLabel: ctaLabel.trim() || undefined,
          ctaHref: ctaHref.trim() || undefined,
          createdAt: now,
          updatedAt: now,
        },
        ...store.posts,
      ],
    });
    setStore(next);
    saveDraftLocally(next);
    setTitle("");
    setExcerpt("");
    setBody("");
    setCtaLabel("");
    setCtaHref("");
    setShowComposer(false);
    setErr(null);
    setMsg("Tip added. Publish to site so visitors see it.");
  };

  const publish = async () => {
    if (!store) return;
    if (!publishPassword) {
      setErr("Lock and log in again so Publish can authenticate.");
      return;
    }
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      const result = await publishNewsletterStore(store, publishPassword);
      if (!result.ok) {
        setErr(result.error);
        return;
      }
      if (result.mode === "api") {
        setMsg("Published. Check /newsletter/");
        setStore(await fetchNewsletterStore());
      } else {
        setMsg(result.message);
      }
    } finally {
      setBusy(false);
    }
  };

  if (!store) {
    return <p className="mt-8 text-sm text-[var(--muted)]">Loading newsletter…</p>;
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)]">
            Newsletter tips
          </h2>
          <p className="mt-1 max-w-xl text-xs text-[var(--muted)]">
            Q&A-style tips (one per tool) — written to help aspirants, not to spam Google. Edit is
            off for now; you can post a new tip or reload the tool pack, then Publish.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadToolPack}
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
          >
            Load tool tips ({toolTipCount()})
          </button>
          <button
            type="button"
            onClick={() => {
              setShowComposer((v) => !v);
              setErr(null);
            }}
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold"
          >
            {showComposer ? "Close" : "Post a tip"}
          </button>
          <button
            type="button"
            onClick={() => void publish()}
            disabled={busy}
            className="rounded-lg bg-[var(--ink)] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
          >
            {busy ? "Publishing…" : "Publish to site"}
          </button>
        </div>
      </div>

      {msg ? <p className="mt-3 text-sm text-[var(--accent-ink)]">{msg}</p> : null}
      {err ? <p className="mt-3 text-sm text-rose-600">{err}</p> : null}

      {showComposer ? (
        <section className="mt-6 space-y-3 rounded-2xl border border-[var(--line)] bg-white p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
            New tip (question style)
          </p>
          <p className="text-xs text-[var(--muted)]">
            Example title: “My SSC form says photo must be 20–50 KB. How do I make my photo that
            size?” Keep the answer specific to one problem — don’t stuff keywords.
          </p>
          <label className="block text-xs font-bold text-[var(--muted)]">
            Question / title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="block text-xs font-bold text-[var(--muted)]">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NewsletterCategoryId)}
              className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              {NEWSLETTER_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold text-[var(--muted)]">
            Short excerpt
            <input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="block text-xs font-bold text-[var(--muted)]">
            Answer (blank line = new paragraph; “- ” = bullets)
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[var(--muted)]">
              Tool button label
              <input
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="Compress to 50 KB"
                className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
            <label className="block text-xs font-bold text-[var(--muted)]">
              Tool link
              <input
                value={ctaHref}
                onChange={(e) => setCtaHref(e.target.value)}
                placeholder="/compress-to-50kb/"
                className="mt-1 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={addPost}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white"
          >
            Add tip
          </button>
        </section>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
            filter === "all" ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-white"
          }`}
        >
          All ({store.posts.length})
        </button>
        {NEWSLETTER_CATEGORIES.map((c) => {
          const n = store.posts.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                filter === c.id
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-white"
              }`}
            >
              {c.label} ({n})
            </button>
          );
        })}
      </div>

      <ul className="mt-4 divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
        {rows.length === 0 ? (
          <li className="px-4 py-8 text-sm text-[var(--muted)]">
            No tips yet. Click “Load tool tips”.
          </li>
        ) : (
          rows.map((p) => (
            <li key={p.id} className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                {categoryLabel(p.category)}
                {p.ctaHref ? ` · ${p.ctaHref}` : ""}
              </p>
              <p className="mt-0.5 font-semibold text-[var(--ink)]">{p.title}</p>
              {p.excerpt ? <p className="mt-0.5 text-xs text-[var(--muted)]">{p.excerpt}</p> : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
