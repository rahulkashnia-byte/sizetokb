"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { EXAMS, getExam } from "@/lib/exams";
import { buildExamPackZip } from "@/lib/examPack";
import { downloadBlob } from "@/lib/image";
import type { Exam } from "@/lib/types";

const POPULAR: { slug: string; label: string }[] = [
  { slug: "ssc-cgl", label: "SSC CGL" },
  { slug: "upsc-cse-pre", label: "UPSC" },
  { slug: "neet-ug", label: "NEET" },
  { slug: "railway-ntpc", label: "Railway" },
  { slug: "ibps-po", label: "IBPS" },
  { slug: "bpsc", label: "BPSC" },
];

function photoDoc(exam: Exam) {
  return exam.documents.find((d) => d.id === "photo" || /photo/i.test(d.label));
}
function signDoc(exam: Exam) {
  return exam.documents.find((d) => d.id === "sign" || /sign/i.test(d.label));
}

function kbLine(exam: Exam) {
  const photo = photoDoc(exam);
  const sign = signDoc(exam);
  const parts: string[] = [];
  if (photo) parts.push(`Photo ${photo.minKb}–${photo.maxKb} KB`);
  if (sign) parts.push(`Sign ${sign.minKb}–${sign.maxKb} KB`);
  return parts.join(" · ");
}

export function HomeFormReady() {
  const [slug, setSlug] = useState(POPULAR[0].slug);
  const [photo, setPhoto] = useState<File | null>(null);
  const [sign, setSign] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  const exam = useMemo(() => getExam(slug) ?? EXAMS[0], [slug]);
  const hasPhoto = !!photoDoc(exam);
  const hasSign = !!signDoc(exam);
  const sorted = useMemo(
    () => [...EXAMS].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const run = async () => {
    setError(null);
    setInfo(null);
    if (!photo && !sign) {
      setError("Upload a photo and/or signature first");
      return;
    }
    setBusy(true);
    try {
      const p = photoDoc(exam);
      const s = signDoc(exam);
      const { blob, files } = await buildExamPackZip({
        photo,
        signature: sign,
        photoSpec: p,
        signSpec: s
          ? { ...s, id: "signature", scanEffect: s.scanEffect ?? true }
          : undefined,
        onProgress: setProgress,
      });
      setInfo(files.join(" · "));
      downloadBlob(blob, `sizetokb-${exam.slug}-ready.zip`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not process files");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <section id="form-ready" className="relative w-full overflow-hidden scroll-mt-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -30%, rgba(61, 155, 120, 0.22), transparent 55%), linear-gradient(180deg, #f7fcfa 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
        <div className="animate-rise text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--ink)] sm:text-3xl">
            SizeTo<span className="text-[var(--accent)]">KB</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[1.85rem] font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl">
            Make your photo / form ready
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Pick the exam, upload photo and signature, get files that match the KB limits.
          </p>
        </div>

        <div className="animate-rise-delay mt-8 space-y-4">
          <label className="block text-left">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              Which form are you filling?
            </span>
            <select
              value={exam.slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setError(null);
                setInfo(null);
              }}
              className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-3 text-sm font-semibold text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
            >
              <optgroup label="Popular">
                {POPULAR.map((p) => {
                  const ex = getExam(p.slug);
                  if (!ex) return null;
                  return (
                    <option key={p.slug} value={p.slug}>
                      {p.label} — {ex.name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="All exams">
                {sorted.map((ex) => (
                  <option key={ex.slug} value={ex.slug}>
                    {ex.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <p className="mt-1.5 text-xs text-[var(--muted)]">{kbLine(exam)}</p>
          </label>

          {hasPhoto ? (
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Upload your photo
              </p>
              <input
                ref={photoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => photoRef.current?.click()}
                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-dashed border-[var(--line)] bg-white px-4 py-3.5 text-left text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                <span>{photo ? photo.name : "Upload"}</span>
                <span className="text-[var(--accent-ink)]">{photo ? "Change" : "Choose"}</span>
              </button>
            </div>
          ) : null}

          {hasSign ? (
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Upload signature
              </p>
              <input
                ref={signRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSign(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => signRef.current?.click()}
                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-dashed border-[var(--line)] bg-white px-4 py-3.5 text-left text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
              >
                <span>{sign ? sign.name : "Upload"}</span>
                <span className="text-[var(--accent-ink)]">{sign ? "Change" : "Choose"}</span>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            disabled={busy}
            onClick={() => void run()}
            className="w-full rounded-xl bg-[var(--ink)] py-3.5 text-sm font-bold text-white hover:bg-[var(--accent)] disabled:opacity-50"
          >
            {busy ? progress || "Working…" : "Check & Fix My Files"}
          </button>

          {error ? <p className="text-center text-sm text-rose-600">{error}</p> : null}
          {info ? (
            <p className="text-center text-sm text-[var(--accent-ink)]">
              Ready — downloaded ZIP ({info}). Private: files stay on your device.
            </p>
          ) : null}

          <p className="text-center text-xs text-[var(--muted)]">
            Need crop / fine control?{" "}
            <Link href={`/${exam.slug}/`} className="font-bold text-[var(--accent-ink)]">
              Open {exam.name} page
            </Link>
            {" · "}
            <a href="#custom-tool" className="font-bold text-[var(--accent-ink)]">
              Custom KB
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">Popular</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
            {POPULAR.map((p, i) => (
              <span key={p.slug} className="inline-flex items-center gap-2">
                {i > 0 ? <span className="text-[var(--line)]">·</span> : null}
                <button
                  type="button"
                  onClick={() => {
                    setSlug(p.slug);
                    setError(null);
                    setInfo(null);
                  }}
                  className={`font-semibold hover:text-[var(--accent-ink)] ${
                    slug === p.slug ? "text-[var(--accent-ink)]" : "text-[var(--ink)]"
                  }`}
                >
                  {p.label}
                </button>
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-bold">
            <Link href="/hindi/" className="text-[var(--accent-ink)] hover:underline">
              हिंदी
            </Link>
            <Link href="/telugu/" className="text-[var(--accent-ink)] hover:underline">
              తెలుగు
            </Link>
            <a href="#tools" className="text-[var(--muted)] hover:text-[var(--ink)]">
              All tools ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
