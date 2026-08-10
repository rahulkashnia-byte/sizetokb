"use client";

import { useEffect, useState } from "react";
import { SHARE_PROMPT_EVENT } from "@/lib/sharePrompt";
import { SITE } from "@/lib/site";

/**
 * Shown after a successful download — WhatsApp / copy share for free growth.
 */
export function ShareAfterDownload() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener(SHARE_PROMPT_EVENT, on);
    return () => window.removeEventListener(SHARE_PROMPT_EVENT, on);
  }, []);

  if (!open) return null;

  const text = `Photo & signature exact KB free on phone — ${SITE.url}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm sm:p-0">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-[var(--ink)]">Download ready</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Share this free tool with a friend filling forms.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-1 text-xs font-bold text-[var(--muted)] hover:bg-[var(--wash)]"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-[#25D366] px-3 py-2.5 text-center text-xs font-bold text-white hover:brightness-95"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => void copy()}
            className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-xs font-bold text-[var(--ink)]"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
