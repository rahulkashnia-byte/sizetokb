"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { buildExamPackZip } from "@/lib/examPack";

export default function ExamPackPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [sign, setSign] = useState<File | null>(null);
  const [photoMin, setPhotoMin] = useState(20);
  const [photoMax, setPhotoMax] = useState(50);
  const [signMin, setSignMin] = useState(10);
  const [signMax, setSignMax] = useState(20);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      const { blob, files } = await buildExamPackZip({
        photo,
        signature: sign,
        photoSpec: { minKb: photoMin, maxKb: photoMax, unit: "cm", width: 3.5, height: 4.5, format: "jpg" },
        signSpec: { minKb: signMin, maxKb: signMax, unit: "px", format: "jpg", scanEffect: true },
        onProgress: setProgress,
      });
      setInfo(files.join(" · "));
      downloadBlob(blob, "sizetokb-exam-pack.zip");
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
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Exam <span className="text-[var(--accent)]">Pack</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">Process photo + signature to KB specs and download one ZIP.</p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">Photo (20–50 KB default)</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="number" value={photoMin} onChange={(e) => setPhotoMin(Number(e.target.value))} className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm" placeholder="Min" />
              <input type="number" value={photoMax} onChange={(e) => setPhotoMax(Number(e.target.value))} className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm" placeholder="Max" />
            </div>
            <button type="button" onClick={() => photoRef.current?.click()} className="mt-2 w-full rounded-xl border border-dashed border-[var(--line)] py-6 text-xs font-semibold">
              {photo ? photo.name : "Add photo"}
            </button>
            <input ref={photoRef} type="file" accept="image/*,.heic" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
          </div>
          <div>
            <p className="text-sm font-semibold">Signature (10–20 KB default)</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="number" value={signMin} onChange={(e) => setSignMin(Number(e.target.value))} className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm" />
              <input type="number" value={signMax} onChange={(e) => setSignMax(Number(e.target.value))} className="rounded-lg border border-[var(--line)] bg-[var(--wash)] px-2 py-2 text-sm" />
            </div>
            <button type="button" onClick={() => signRef.current?.click()} className="mt-2 w-full rounded-xl border border-dashed border-[var(--line)] py-6 text-xs font-semibold">
              {sign ? sign.name : "Add signature"}
            </button>
            <input ref={signRef} type="file" accept="image/*" className="hidden" onChange={(e) => setSign(e.target.files?.[0] ?? null)} />
          </div>
        </div>
        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {info && <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">{info}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Building…" : "Download ZIP"}
        </button>
      </div>
      <ShareButtons className="mt-6" title="Exam photo signature ZIP — Size to KB" text="Download exam photo pack on Size to KB" path="/exam-pack/" />
      <SeoKeywordBlock
        heading="Bulk photo + signature for form fill"
        paragraphs={["One ZIP with resized photo and cleaned signature — useful when portals ask for both files."]}
        links={[
          { href: "/signature-cleaner/", label: "Signature cleaner" },
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
