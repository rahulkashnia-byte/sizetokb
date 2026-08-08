"use client";

import { useEffect, useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { loadImageFile, maskRegions } from "@/lib/extraImageTools";

type Box = { x: number; y: number; width: number; height: number };

export default function IdMaskerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [regions, setRegions] = useState<Box[]>([]);
  const [drag, setDrag] = useState<{ sx: number; sy: number } | null>(null);
  const [draft, setDraft] = useState<Box | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (srcUrl) URL.revokeObjectURL(srcUrl); }, [srcUrl]);

  const pick = async (f: File | null) => {
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    setFile(f);
    setRegions([]);
    setDraft(null);
    if (!f) {
      setSrcUrl(null);
      setNatural(null);
      return;
    }
    const img = await loadImageFile(f);
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setSrcUrl(URL.createObjectURL(f));
  };

  const toImg = (cx: number, cy: number) => {
    const el = frameRef.current;
    if (!el || !natural) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(natural.w, ((cx - rect.left) / rect.width) * natural.w)),
      y: Math.max(0, Math.min(natural.h, ((cy - rect.top) / rect.height) * natural.h)),
    };
  };

  const run = async () => {
    if (!file || !regions.length) {
      setError("Draw at least one box over the number to mask");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { blob } = await maskRegions(file, regions);
      downloadBlob(blob, "id-masked.jpg");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          ID <span className="text-[var(--accent)]">Masker</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Drag boxes over Aadhaar / ID numbers before sharing. Processing stays in your browser.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-8 text-sm font-semibold hover:border-[var(--accent)]">
          {file ? file.name : "Select ID / document photo"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => void pick(e.target.files?.[0] ?? null)} />
        {srcUrl && natural && (
          <div className="mt-5 flex justify-center rounded-2xl bg-[var(--wash)] p-3">
            <div
              ref={frameRef}
              className="relative max-h-[60vh] cursor-crosshair touch-none overflow-hidden"
              style={{ aspectRatio: `${natural.w}/${natural.h}`, width: "min(100%, 560px)" }}
              onPointerDown={(e) => {
                const p = toImg(e.clientX, e.clientY);
                if (!p) return;
                (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
                setDrag({ sx: p.x, sy: p.y });
                setDraft({ x: p.x, y: p.y, width: 1, height: 1 });
              }}
              onPointerMove={(e) => {
                if (!drag || !natural) return;
                const p = toImg(e.clientX, e.clientY);
                if (!p) return;
                const x = Math.min(drag.sx, p.x);
                const y = Math.min(drag.sy, p.y);
                setDraft({
                  x,
                  y,
                  width: Math.max(1, Math.abs(p.x - drag.sx)),
                  height: Math.max(1, Math.abs(p.y - drag.sy)),
                });
              }}
              onPointerUp={() => {
                if (draft && draft.width > 4 && draft.height > 4) setRegions((r) => [...r, draft]);
                setDrag(null);
                setDraft(null);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srcUrl} alt="" className="pointer-events-none absolute inset-0 h-full w-full" draggable={false} />
              {[...regions, ...(draft ? [draft] : [])].map((r, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute border-2 border-amber-500 bg-amber-500/30"
                  style={{
                    left: `${(r.x / natural.w) * 100}%`,
                    top: `${(r.y / natural.h) * 100}%`,
                    width: `${(r.width / natural.w) * 100}%`,
                    height: `${(r.height / natural.h) * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div className="mt-3 flex justify-center gap-3">
          <button type="button" className="text-xs font-bold text-[var(--muted)]" onClick={() => setRegions([])}>
            Clear boxes
          </button>
        </div>
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button type="button" disabled={busy} onClick={() => void run()} className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Masking…" : "Mask & Download"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">For sharing only — do not use to forge documents.</p>
      </div>
      <ShareButtons className="mt-6" title="Aadhaar ID masker — SizeToKB" text="Mask ID numbers privately on SizeToKB.in" path="/id-masker/" />
      <SeoKeywordBlock
        heading="Mask Aadhaar numbers before sharing"
        paragraphs={["Draw over sensitive digits; we blur and darken those regions locally."]}
        links={[{ href: "/image-cropper/", label: "Cropper" }, { href: "/image-checker/", label: "Image checker" }]}
      />
    </div>
  );
}
