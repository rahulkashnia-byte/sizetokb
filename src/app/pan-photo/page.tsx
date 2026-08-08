"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob, processToSpec } from "@/lib/image";
import type { DocSpec, ProcessedImage } from "@/lib/types";
import { getFormPreset } from "@/lib/formPresets";

function SpecTool({
  title,
  accentWord,
  subtitle,
  spec,
  path,
  seoHeading,
  seoParagraphs,
  links,
}: {
  title: string;
  accentWord: string;
  subtitle: string;
  spec: DocSpec;
  path: string;
  seoHeading: string;
  seoParagraphs: string[];
  links: { href: string; label: string }[];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [origKb, setOrigKb] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose an image");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setOrigKb(Math.round((file.size / 1024) * 10) / 10);
      if (result?.url) URL.revokeObjectURL(result.url);
      const out = await processToSpec(file, spec, {
        filename: spec.id,
        forceScan: !!spec.scanEffect,
      });
      setResult(out);
      downloadBlob(out.blob, out.filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          {title} <span className="text-[var(--accent)]">{accentWord}</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">{subtitle}</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-center text-sm text-[var(--accent-ink)]">
          Target {spec.minKb}–{spec.maxKb} KB
          {spec.width && spec.height ? ` · ${spec.width}×${spec.height} ${spec.unit}` : ""}
        </p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-4 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold">
          {file ? file.name : "Select image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*,.heic" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResult(null); }} />
        {origKb != null && result && (
          <div className="mt-4 rounded-xl bg-[var(--wash)] p-3 text-center text-sm">
            <p className="font-bold text-[var(--ink)]">
              {origKb} KB → {result.sizeKb} KB {result.inRange ? "✓ in range" : ""}
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${Math.min(100, (result.sizeKb / Math.max(origKb, 1)) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Reducing…" : "Reduce & Download"}
        </button>
      </div>
      <ShareButtons className="mt-6" title={seoHeading} text={`${seoHeading} free on SizeToKB.in`} path={path} />
      <SeoKeywordBlock heading={seoHeading} paragraphs={seoParagraphs} links={links} />
    </div>
  );
}

export default function PanPhotoPage() {
  const preset = getFormPreset("pan")!;
  return (
    <SpecTool
      title="Reduce PAN Card"
      accentWord="Photo Size to KB"
      subtitle="Compress PAN application photo to typical portal KB limits — private browser tool."
      spec={preset.photo}
      path="/pan-photo/"
      seoHeading="Reduce PAN card photo size online free to KB"
      seoParagraphs={[
        "Search intent: PAN photo size KB, reduce PAN photo size, UTIITSL photo size. Always match the live portal notice.",
      ]}
      links={[
        { href: "/aadhaar-photo/", label: "Aadhaar photo" },
        { href: "/form-wizard/", label: "Form wizard" },
        { href: "/#custom-tool", label: "Custom KB" },
      ]}
    />
  );
}
