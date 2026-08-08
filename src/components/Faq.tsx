"use client";

import { useState } from "react";

const DEFAULT_FAQS = [
  {
    q: "Is this photo and signature resizer free?",
    a: "Yes — completely free. No registration, no watermarks, no upload to our servers.",
  },
  {
    q: "Can I resize photos and signatures on mobile?",
    a: "Yes. SizeToKB works in mobile browsers with touch-friendly drag-and-drop and file pickers.",
  },
  {
    q: "Why does the output show 'Out of range'?",
    a: "Very tiny source images may stay under the minimum KB even at high quality. Use a higher-resolution original. Oversized noisy scans may need a cleaner crop.",
  },
  {
    q: "What image formats are accepted?",
    a: "JPG, PNG, WebP, and HEIC/HEIF. Output matches the exam profile (usually JPG).",
  },
  {
    q: "Does resizing reduce image quality?",
    a: "We use the highest quality that still fits the KB window, and only downscale when needed to meet the max size.",
  },
];

export function Faq({ items = DEFAULT_FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h2 className="text-center font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-[var(--ink)]"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {item.q}
                <span className="text-[var(--muted)]">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
