"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import {
  UPLOAD_RULES,
  checkUploadAgainstRule,
  getUploadRule,
  type UploadCheckResult,
} from "@/lib/uploadChecker";

const FAQS = [
  {
    q: "What does this upload checker do?",
    a: "It reads your file’s KB, pixels and format, then compares them to common SSC / IBPS / declaration / thumb rules so you know before the portal rejects you.",
  },
  {
    q: "Is a green pass a guarantee?",
    a: "No. Specs vary by notification and some portals also check face crop or background. Always re-check the official PDF.",
  },
  {
    q: "What if it fails?",
    a: "Use the linked fix tool (compress, signature cleaner, declaration, custom KB) then check again.",
  },
];

export default function UploadCheckerPage() {
  const [ruleId, setRuleId] = useState("ssc-ibps-photo");
  const [minKb, setMinKb] = useState(20);
  const [maxKb, setMaxKb] = useState(50);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [result, setResult] = useState<UploadCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rule = getUploadRule(ruleId)!;

  const onRuleChange = (id: string) => {
    setRuleId(id);
    const next = getUploadRule(id)!;
    setMinKb(next.minKb);
    setMaxKb(next.maxKb);
    setWidth(next.width ? String(next.width) : "");
    setHeight(next.height ? String(next.height) : "");
    setResult(null);
  };

  const run = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setName(file.name);
    try {
      const checked = await checkUploadAgainstRule(file, rule, {
        minKb,
        maxKb,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
      });
      setResult(checked);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Could not check file");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Form Upload <span className="text-[var(--accent)]">Checker</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Will this photo / signature / declaration pass? Check KB, pixels and
          JPG format before you hit Upload.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <label className="block text-sm font-semibold">
          Document type
          <select
            value={ruleId}
            onChange={(e) => onRuleChange(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2.5 text-sm"
          >
            {UPLOAD_RULES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-1 text-xs text-[var(--muted)]">{rule.blurb}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
          <label className="text-sm font-semibold">
            Width px
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="optional"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Height px
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="optional"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {busy ? "Checking…" : name ? name : "Select file to check"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => void run(e.target.files?.[0] ?? null)}
        />

        {error && (
          <p className="mt-3 text-center text-sm text-amber-700">{error}</p>
        )}

        {result && (
          <div className="mt-5 space-y-3">
            <div
              className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                result.ok
                  ? "bg-emerald-50 text-emerald-900"
                  : "bg-amber-50 text-amber-950"
              }`}
            >
              {result.ok
                ? "Looks ready for typical portal rules — still verify the notification."
                : "Likely to be rejected — fix the fail items below."}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[var(--wash)] p-3">
                <dt className="text-xs text-[var(--muted)]">Size</dt>
                <dd className="font-semibold">{result.sizeKb} KB</dd>
              </div>
              <div className="rounded-xl bg-[var(--wash)] p-3">
                <dt className="text-xs text-[var(--muted)]">Pixels</dt>
                <dd className="font-semibold">
                  {result.width} × {result.height}
                </dd>
              </div>
            </dl>
            <ul className="space-y-2 text-sm">
              {result.issues.map((issue) => (
                <li
                  key={issue.message}
                  className={`rounded-xl border px-3 py-2 ${
                    issue.level === "pass"
                      ? "border-emerald-200 bg-emerald-50/60"
                      : issue.level === "warn"
                        ? "border-amber-200 bg-amber-50/70"
                        : "border-red-200 bg-red-50/70"
                  }`}
                >
                  <span className="font-semibold uppercase tracking-wide text-[10px]">
                    {issue.level}
                  </span>
                  <p className="mt-0.5">{issue.message}</p>
                </li>
              ))}
            </ul>
            {!result.ok && (
              <Link
                href={rule.fixHref}
                className="inline-flex rounded-xl bg-[var(--ink)] px-4 py-2.5 text-xs font-bold text-white"
              >
                {rule.fixLabel} →
              </Link>
            )}
          </div>
        )}
      </div>

      <ShareButtons
        className="mt-6"
        title="Form upload checker — Size to KB"
        text="Check photo KB and pixels before exam form upload on Size to KB"
        path="/upload-checker/"
      />
      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Check photo size KB and pixels before upload"
        paragraphs={[
          "Preflight checker for exam form files: SSC photo 20–50 KB, signature 10–20 KB, IBPS handwritten declaration 50–100 KB, thumb impression size, and custom notification limits. Pair with the upload error fixer if the portal already rejected you.",
        ]}
        links={[
          { href: "/upload-fixer/", label: "Upload error fixer" },
          { href: "/image-checker/", label: "Image DPI checker" },
          { href: "/handwritten-declaration/", label: "Declaration tool" },
          { href: "/#custom-tool", label: "Reduce to KB" },
        ]}
      />
    </div>
  );
}
