"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { analyzeImage, type ImageStats } from "@/lib/extraImageTools";

export default function ImageCheckerPage() {
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<ImageStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setName(file.name);
    try {
      setStats(await analyzeImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read image");
      setStats(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Image <span className="text-[var(--accent)]">Checker</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Pixels, KB, aspect ratio, and estimated print size at 300 DPI.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]">
          {busy ? "Reading…" : name ? name : "Select image to check"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic,.heif" className="hidden" onChange={(e) => void run(e.target.files?.[0] ?? null)} />
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        {stats && (
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[var(--wash)] p-3">
              <dt className="text-xs text-[var(--muted)]">Pixels</dt>
              <dd className="font-semibold">{stats.width} × {stats.height}</dd>
            </div>
            <div className="rounded-xl bg-[var(--wash)] p-3">
              <dt className="text-xs text-[var(--muted)]">File size</dt>
              <dd className="font-semibold">{stats.sizeKb} KB</dd>
            </div>
            <div className="rounded-xl bg-[var(--wash)] p-3">
              <dt className="text-xs text-[var(--muted)]">Aspect</dt>
              <dd className="font-semibold">{stats.aspect}</dd>
            </div>
            <div className="rounded-xl bg-[var(--wash)] p-3">
              <dt className="text-xs text-[var(--muted)]">Type</dt>
              <dd className="font-semibold">{stats.mime || "—"}</dd>
            </div>
            <div className="col-span-2 rounded-xl bg-[var(--wash)] p-3">
              <dt className="text-xs text-[var(--muted)]">If printed at 300 DPI</dt>
              <dd className="font-semibold">
                {stats.dpiEstimate300.wCm} × {stats.dpiEstimate300.hCm} cm (
                {stats.dpiEstimate300.wInch} × {stats.dpiEstimate300.hInch} in)
              </dd>
            </div>
          </dl>
        )}
        {stats?.notes.length ? (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {stats.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <ShareButtons className="mt-6" title="Image DPI pixel checker — Size to KB" text="Check photo size before upload on Size to KB" path="/image-checker/" />
      <SeoKeywordBlock
        heading="Check photo pixels and KB before upload"
        paragraphs={["JPG files do not store true DPI reliably — we estimate print size from pixel count at 300 DPI."]}
        links={[
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
