"use client";

import { useEffect, useMemo, useState } from "react";
import { SITE } from "@/lib/site";

type ShareButtonsProps = {
  title?: string;
  text?: string;
  /** Path only, e.g. /ssc-gd/ — defaults to current page */
  path?: string;
  className?: string;
};

export function ShareButtons({
  title = SITE.seoName,
  text = "Free tool to reduce photo & signature size to exact KB for exam forms — Size to KB",
  path,
  className = "",
}: ShareButtonsProps) {
  const [url, setUrl] = useState(`${SITE.url}${path || "/"}`);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    const href = path ? `${SITE.url}${path.startsWith("/") ? path : `/${path}`}` : window.location.href;
    setUrl(href.split("#")[0]);
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [path]);

  const encoded = useMemo(() => {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const full = encodeURIComponent(`${text}\n${url}`);
    return { u, t, full, title: encodeURIComponent(title) };
  }, [url, text, title]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url });
    } catch {
      /* user cancelled */
    }
  };

  const buttons: {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
    color: string;
  }[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encoded.full}`,
      color: "bg-[#25D366] text-white hover:brightness-95",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded.u}&quote=${encoded.t}`,
      color: "bg-[#1877F2] text-white hover:brightness-95",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/share/url?url=${encoded.u}&text=${encoded.t}`,
      color: "bg-[#229ED9] text-white hover:brightness-95",
    },
    {
      id: "twitter",
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encoded.u}&text=${encoded.t}`,
      color: "bg-[#0f1419] text-white hover:brightness-95",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.u}`,
      color: "bg-[#0A66C2] text-white hover:brightness-95",
    },
    {
      id: "reddit",
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encoded.u}&title=${encoded.title}`,
      color: "bg-[#FF4500] text-white hover:brightness-95",
    },
    {
      id: "email",
      label: "Email",
      href: `mailto:?subject=${encoded.title}&body=${encoded.full}`,
      color: "bg-[var(--ink)] text-white hover:bg-[var(--accent)]",
    },
    {
      id: "copy",
      label: copied ? "Copied!" : "Copy link",
      onClick: () => void copyLink(),
      color: "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--accent)]",
    },
  ];

  return (
    <div className={`rounded-2xl border border-[var(--line)] bg-white p-4 sm:p-5 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Share with friends
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[var(--ink)]">
            Help others reduce photo & signature size for exam forms
          </p>
        </div>
        {canNativeShare && (
          <button
            type="button"
            onClick={() => void nativeShare()}
            className="rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-bold text-white hover:brightness-95"
          >
            Share… (WhatsApp / Instagram / more)
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {buttons.map((b) =>
          b.href ? (
            <a
              key={b.id}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center rounded-lg px-3 py-2 text-xs font-bold ${b.color}`}
            >
              {b.label}
            </a>
          ) : (
            <button
              key={b.id}
              type="button"
              onClick={b.onClick}
              className={`inline-flex items-center rounded-lg px-3 py-2 text-xs font-bold ${b.color}`}
            >
              {b.label}
            </button>
          )
        )}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
        Instagram has no direct web share link — on phone tap{" "}
        <strong>Share…</strong> and pick Instagram, or use <strong>Copy link</strong> and paste in
        your story / bio / DM.
      </p>
    </div>
  );
}
