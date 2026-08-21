"use client";

import { useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import {
  joinPhotoAndSignature,
  type JoinPhotoSignLayout,
} from "@/lib/imageTools";

const FAQS = [
  {
    q: "When do I need to join photo and signature?",
    a: "Some older bank / sarkari portals ask for a single JPG that contains both photo and signature. Most modern forms want separate uploads — check your notification.",
  },
  {
    q: "What size should the joined image be?",
    a: "Defaults target a common bank-style box (photo ~200×230, signature ~140×60) and a 20–50 KB combined JPG. You can change min/max KB on this page.",
  },
  {
    q: "Side-by-side or stacked?",
    a: "Use side-by-side when the portal shows photo left / sign right. Use stacked when photo must sit above the signature.",
  },
];

export default function JoinPhotoSignaturePage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [layout, setLayout] = useState<JoinPhotoSignLayout>("side-by-side");
  const [minKb, setMinKb] = useState(20);
  const [maxKb, setMaxKb] = useState(50);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!photo || !signature) {
      setError("Select both photo and signature");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await joinPhotoAndSignature(photo, signature, {
        layout,
        minKb,
        maxKb,
      });
      if (preview) URL.revokeObjectURL(preview);
      setPreview(r.url);
      setMeta(`${r.width}×${r.height} · ${r.sizeKb} KB`);
      downloadBlob(r.blob, "photo-signature-joined.jpg");
      if (!r.inRange) {
        setError(`Best effort: ${r.sizeKb} KB (target ${minKb}–${maxKb} KB)`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Join failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Join Photo &amp; Signature{" "}
          <span className="text-[var(--accent)]">Online Free</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Merge passport photo and signature into one JPG for forms that need a
          combined upload — then hit exact KB.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["side-by-side", "Side by side"],
              ["stacked", "Photo above signature"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLayout(value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                layout === value
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-[var(--wash)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Min KB
            <input
              type="number"
              value={minKb}
              onChange={(e) => setMinKb(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Max KB
            <input
              type="number"
              value={maxKb}
              onChange={(e) => setMaxKb(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => photoRef.current?.click()}
            className="rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-8 text-sm font-semibold hover:border-[var(--accent)]"
          >
            {photo ? photo.name : "Select photo"}
          </button>
          <button
            type="button"
            onClick={() => signRef.current?.click()}
            className="rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-8 text-sm font-semibold hover:border-[var(--accent)]"
          >
            {signature ? signature.name : "Select signature"}
          </button>
        </div>
        <input
          ref={photoRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
        <input
          ref={signRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setSignature(e.target.files?.[0] ?? null)}
        />

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Joined photo and signature preview"
            className="mx-auto mt-4 max-h-56 bg-white object-contain"
          />
        )}
        {meta && (
          <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{meta}</p>
        )}
        {error && (
          <p className="mt-2 text-center text-sm text-amber-700">{error}</p>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Joining…" : "Join & Free Download"}
        </button>
      </div>

      <ShareButtons
        className="mt-6"
        title="Join photo and signature online free — Size to KB"
        text="Combine photo + signature into one JPG on Size to KB"
        path="/join-photo-signature/"
      />
      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Combine photo and signature for online form"
        paragraphs={[
          "Free tool to join photo and signature online for IBPS, SBI and other sarkari form uploads that need one merged JPG. Also see separate photo and signature compressors when the portal asks for two files.",
        ]}
        links={[
          { href: "/exam-pack/", label: "Exam photo + sign pack" },
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/handwritten-declaration/", label: "Handwritten declaration" },
          { href: "/image-merger/", label: "Generic image merger" },
        ]}
      />
    </div>
  );
}
