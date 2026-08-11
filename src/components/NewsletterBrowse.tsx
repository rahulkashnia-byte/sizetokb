"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildToolNewsletterStore } from "@/content/toolNewsletterPosts";
import {
  NEWSLETTER_CATEGORIES,
  categoryLabel,
  fetchNewsletterStore,
  findPost,
  publishedPosts,
  renderBodyBlocks,
  type NewsletterCategoryId,
  type NewsletterPost,
  type NewsletterStore,
} from "@/lib/newsletter";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function PostBody({ body }: { body: string }) {
  const blocks = renderBodyBlocks(body);
  return (
    <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--ink)]">
      {blocks.map((b, i) =>
        b.type === "ul" ? (
          <ul key={i} className="list-disc space-y-1.5 pl-5 text-[var(--ink)]">
            {(b.items ?? []).map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="text-[var(--muted)]">
            {b.text}
          </p>
        )
      )}
    </div>
  );
}

function PostDetail({
  post,
  onBack,
}: {
  post: NewsletterPost;
  onBack: () => void;
}) {
  return (
    <article>
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-[var(--accent-ink)] hover:underline"
      >
        ← All tips
      </button>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
        {categoryLabel(post.category)} · {formatDate(post.updatedAt)}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">
        {post.title}
      </h1>
      {post.excerpt ? (
        <p className="mt-3 text-base text-[var(--muted)]">{post.excerpt}</p>
      ) : null}
      <PostBody body={post.body} />
      {post.ctaHref ? (
        <p className="mt-8">
          <Link
            href={post.ctaHref}
            className="inline-flex rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--accent)]"
          >
            {post.ctaLabel || "Open tool"}
          </Link>
        </p>
      ) : null}
    </article>
  );
}

export function NewsletterBrowse({
  initialSlug,
}: {
  initialSlug?: string | null;
}) {
  const [store, setStore] = useState<NewsletterStore | null>(null);
  const [category, setCategory] = useState<NewsletterCategoryId | "all">("all");
  const [slug, setSlug] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    let cancelled = false;
    void fetchNewsletterStore().then((s) => {
      if (cancelled) return;
      setStore(s.posts.length > 0 ? s : buildToolNewsletterStore());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set("p", slug);
    } else {
      url.searchParams.delete("p");
    }
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }, [slug]);

  const posts = useMemo(
    () => (store ? publishedPosts(store, category) : []),
    [store, category]
  );

  const active = store && slug ? findPost(store, slug) : undefined;
  const showDetail = active && active.published;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
          Newsletter
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          Real form questions, short answers
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Practical tips when a portal rejects your photo, signature or PDF — one clear problem per
          tip, with a free Size to KB tool when you need it.
        </p>
      </header>

      {showDetail ? (
        <div className="mt-10 border-t border-[var(--line)] pt-8">
          <PostDetail post={active} onBack={() => setSlug(null)} />
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                category === "all"
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-white text-[var(--ink)]"
              }`}
            >
              All
            </button>
            {NEWSLETTER_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  category === c.id
                    ? "bg-[var(--ink)] text-white"
                    : "border border-[var(--line)] bg-white text-[var(--ink)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-0 border-t border-[var(--line)]">
            {!store ? (
              <p className="py-10 text-sm text-[var(--muted)]">Loading tips…</p>
            ) : posts.length === 0 ? (
              <p className="py-10 text-sm text-[var(--muted)]">
                No published tips in this category yet.
              </p>
            ) : (
              posts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSlug(p.slug)}
                  className="block w-full border-b border-[var(--line)] py-5 text-left hover:bg-white/60"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                    {categoryLabel(p.category)} · {formatDate(p.updatedAt)}
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--ink)] sm:text-xl">
                    {p.title}
                  </h2>
                  {p.excerpt ? (
                    <p className="mt-1.5 text-sm text-[var(--muted)]">{p.excerpt}</p>
                  ) : null}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
