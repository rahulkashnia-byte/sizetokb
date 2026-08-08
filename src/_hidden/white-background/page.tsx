"use client";

import { useEffect, useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { downloadBlob } from "@/lib/image";
import { whitenBackground, type WhiteBgResult } from "@/lib/whiteBackground";

export default function WhiteBackgroundPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(32);
  const [feather, setFeather] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WhiteBgResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (result?.url) URL.revokeObjectURL(result.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFile = (f: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setError(null);
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const run = async () => {
    if (!file) {
      setError("Select an image first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (result?.url) URL.revokeObjectURL(result.url);
      const out = await whitenBackground(file, { tolerance, feather });
      setResult(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to process image");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          White <span className="text-[var(--accent)]">Background</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          Turn any photo background white for exam forms. Works best with plain or near-plain
          backdrops — processing stays on your device.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold">
            Sensitivity ({tolerance})
            <input
              type="range"
              min={8}
              max={70}
              value={tolerance}
              onChange={(e) => setTolerance(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--accent)]"
            />
            <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
              Higher = more of the image becomes white
            </span>
          </label>
          <label className="block text-sm font-semibold">
            Edge soft ({feather}px)
            <input
              type="range"
              min={0}
              max={8}
              value={feather}
              onChange={(e) => setFeather(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--accent)]"
            />
            <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
              Softens the cut around hair and shoulders
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className="mt-6 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] px-4 py-10 text-sm hover:border-[var(--accent)]"
        >
          <span className="font-semibold text-[var(--ink)]">
            {file ? file.name : "Select or drop an image"}
          </span>
          <span className="mt-1 text-xs text-[var(--muted)]">JPG, PNG, HEIC · Max 10 MB</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />

        {(preview || result) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--wash)]">
              <figcaption className="border-b border-[var(--line)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                Original
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview || ""} alt="Original" className="mx-auto max-h-72 object-contain p-3" />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
              <figcaption className="border-b border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                White background
              </figcaption>
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.url}
                  alt="White background result"
                  className="mx-auto max-h-72 object-contain p-3"
                />
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-[var(--muted)]">
                  Result appears here
                </div>
              )}
            </figure>
          </div>
        )}

        {error && <p className="mt-4 text-center text-sm text-rose-600">{error}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !file}
            onClick={() => void run()}
            className="flex-1 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
          >
            {busy ? "Whitening…" : "Make background white"}
          </button>
          {result && (
            <button
              type="button"
              onClick={() => downloadBlob(result.blob, result.filename)}
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold"
            >
              Download
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--muted)]">
          Tip: if hair or clothes get whitened, lower sensitivity. If coloured walls remain, raise it.
        </p>
      </div>
    </div>
  );
}
