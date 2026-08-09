"use client";

import { useCallback, useRef, useState } from "react";
import { RotateControls } from "@/components/RotateControls";
import type { DocSpec, ProcessedImage } from "@/lib/types";
import { formatSpecSummary } from "@/lib/format";
import { downloadBlob, processToSpec, type RotateDeg } from "@/lib/image";

export function DocUploader({
  spec,
  examSlug,
}: {
  spec: DocSpec;
  examSlug: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scanOn, setScanOn] = useState(!!spec.scanEffect);
  const [rotate, setRotate] = useState<RotateDeg>(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const summary = formatSpecSummary(spec);
  const isSign = spec.scanEffect || spec.id === "sign";

  const run = useCallback(
    async (nextFile: File, nextRotate: RotateDeg = rotate) => {
      setError(null);
      setBusy(true);
      setResult(null);
      try {
        const out = await processToSpec(nextFile, spec, {
          forceScan: isSign ? scanOn : false,
          filename: `${examSlug}-${spec.id}`,
          rotate: nextRotate,
        });
        setResult(out);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Processing failed");
      } finally {
        setBusy(false);
      }
    },
    [examSlug, isSign, rotate, scanOn, spec]
  );

  const onFiles = (files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setRotate(0);
    setResult(null);
    void run(next, 0);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-4 py-3">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
          {spec.label}
        </h3>
        <div className="flex items-center gap-2">
          {isSign && (
            <label className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
              <span>Scan</span>
              <button
                type="button"
                role="switch"
                aria-checked={scanOn}
                onClick={() => setScanOn((v) => !v)}
                className={`relative h-5 w-9 rounded-full transition ${
                  scanOn ? "bg-[var(--accent)]" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition ${
                    scanOn ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </label>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {isSign && scanOn && (
          <p className="mb-2 text-center text-xs font-medium text-[var(--muted)]">
            High-contrast pass enabled for ink signatures
          </p>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            onFiles(e.dataTransfer.files);
          }}
          className={`relative flex min-h-[180px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 transition ${
            dragging
              ? "border-[var(--accent)] bg-[var(--accent-soft)]"
              : "border-[var(--line)] bg-[var(--wash)] hover:border-[var(--accent)]"
          }`}
        >
          {(preview || result?.url) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={result?.url || preview || ""}
              alt="Preview"
              className="mb-3 max-h-36 rounded-lg object-contain shadow-sm transition-transform"
              style={result ? undefined : { transform: `rotate(${rotate}deg)` }}
            />
          )}
          <p className="text-sm font-medium text-[var(--ink)]">
            {busy ? "Compressing to KB…" : "Drop image or tap to choose"}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">JPG, PNG, HEIC · Max 10 MB</p>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />

        {file && (
          <RotateControls
            className="mt-3"
            value={rotate}
            onChange={(deg) => {
              setRotate(deg);
              setResult(null);
            }}
          />
        )}

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
          <SpecChip label="Size" value={summary.size} />
          <SpecChip label="Dim" value={summary.dim} />
          <SpecChip label="Fmt" value={summary.fmt} />
        </div>

        {error && <p className="mt-3 text-center text-xs text-rose-600">{error}</p>}

        {result && (
          <div className="mt-3 rounded-xl bg-[var(--wash)] px-3 py-2 text-center text-xs">
            <span className={result.inRange ? "text-[var(--accent-ink)]" : "text-amber-700"}>
              Output: {result.sizeKb} KB · {result.width}×{result.height}px
              {result.inRange ? " · Within limit" : " · Outside limit — try a larger source"}
            </span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            disabled={busy || !file}
            onClick={() => {
              if (file) void run(file, rotate);
            }}
            className={`flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60 ${
              isSign ? "bg-[var(--sign)]" : "bg-[var(--accent)]"
            }`}
          >
            {isSign && scanOn ? "Clean & compress" : "Compress to KB"}
          </button>
          {result && (
            <button
              type="button"
              onClick={() => downloadBlob(result.blob, result.filename)}
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[var(--wash)] px-2 py-2">
      <div className="font-bold uppercase tracking-wide text-[var(--muted)]">{label}</div>
      <div className="mt-0.5 font-semibold text-[var(--ink)]">{value}</div>
    </div>
  );
}
