"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { buildExamPackZip } from "@/lib/examPack";
import { FORM_PRESETS } from "@/lib/formPresets";

export default function FormWizardPage() {
  const [presetId, setPresetId] = useState(FORM_PRESETS[0].id);
  const [photo, setPhoto] = useState<File | null>(null);
  const [sign, setSign] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);
  const preset = FORM_PRESETS.find((p) => p.id === presetId)!;

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const { blob, files } = await buildExamPackZip({
        photo,
        signature: preset.signature ? sign : null,
        photoSpec: preset.photo,
        signSpec: preset.signature,
        onProgress: setProgress,
      });
      setInfo(files.join(" · "));
      downloadBlob(blob, `sizetokb-${preset.id}-pack.zip`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Form Photo Pack <span className="text-[var(--accent)]">Wizard</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Pick SSC / PAN / Aadhaar / passport style → reduce photo & signature to KB → download ZIP.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Choose preset</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {FORM_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPresetId(p.id)}
              className={`rounded-2xl border px-3 py-3 text-left ${
                presetId === p.id ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--line)]"
              }`}
            >
              <span className="block text-sm font-bold">{p.name}</span>
              <span className="text-xs text-[var(--muted)]">{p.blurb}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => photoRef.current?.click()} className="rounded-xl border border-dashed border-[var(--line)] py-8 text-xs font-semibold">
            {photo ? photo.name : "Add photo"}
          </button>
          <button
            type="button"
            disabled={!preset.signature}
            onClick={() => signRef.current?.click()}
            className="rounded-xl border border-dashed border-[var(--line)] py-8 text-xs font-semibold disabled:opacity-40"
          >
            {preset.signature ? (sign ? sign.name : "Add signature") : "No signature needed"}
          </button>
        </div>
        <input ref={photoRef} type="file" accept="image/*,.heic" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
        <input ref={signRef} type="file" accept="image/*" className="hidden" onChange={(e) => setSign(e.target.files?.[0] ?? null)} />
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {info && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Building…" : "Reduce & Download ZIP"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Form photo pack wizard — Size to KB" text="Reduce exam photo & signature to KB pack on Size to KB" path="/form-wizard/" />
      <SeoKeywordBlock
        heading="Reduce photo and signature size for form fill"
        paragraphs={["One wizard for SSC photo size, IBPS signature size, PAN photo size and passport KB targets."]}
        links={[
          { href: "/bulk-reduce/", label: "Bulk reduce" },
          { href: "/pan-photo/", label: "PAN photo" },
          { href: "/aadhaar-photo/", label: "Aadhaar photo" },
        ]}
      />
    </div>
  );
}
