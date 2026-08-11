"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildApplicationPackZip,
  checkPackFile,
  downloadBlob,
  packSlotsForExam,
  packZipFilename,
  statusIcon,
  type PackSlot,
} from "@/lib/applicationPack";
import type { Exam } from "@/lib/types";

export function ApplicationPack({ exam }: { exam: Exam }) {
  const slots = useMemo(() => packSlotsForExam(exam), [exam]);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    setFiles(Object.fromEntries(slots.map((s) => [s.id, null])));
    setError(null);
    setInfo(null);
  }, [exam.slug, slots]);

  const checks = useMemo(
    () =>
      slots.map((slot) => ({
        slot,
        check: checkPackFile(files[slot.id], slot),
      })),
    [slots, files]
  );

  const setFile = (slot: PackSlot, file: File | null) => {
    setFiles((prev) => ({ ...prev, [slot.id]: file }));
    setError(null);
    setInfo(null);
  };

  const requiredMissing = checks.some(
    (c) => c.slot.required && c.check.status === "empty"
  );
  const hasAnyUpload = checks.some((c) => c.check.status !== "empty");
  const needsFix = checks.some(
    (c) => c.check.status === "fail" || c.check.status === "warn"
  );

  const runFixAll = async () => {
    setError(null);
    setInfo(null);
    if (requiredMissing) {
      setError("Upload all required files for this exam (marked Required).");
      return;
    }
    if (!hasAnyUpload) {
      setError("Upload at least one file");
      return;
    }
    setBusy(true);
    try {
      const { blob, report } = await buildApplicationPackZip({
        exam,
        slots,
        files,
        onProgress: setProgress,
      });
      downloadBlob(blob, packZipFilename(exam));
      setInfo(`Downloaded ${packZipFilename(exam)} · ${report.join(" · ")}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not build pack");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--card-shadow)]">
      <div className="border-b border-[var(--line)] bg-[var(--wash)] px-5 py-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
          Application Pack
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
          {exam.name} — check &amp; fix your upload set
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Required slots use this exam’s official photo/signature KB rules. Optional slots (thumb,
          certificate, ID) only if your form asks — always re-check the notification PDF.
        </p>
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        {slots.map((slot) => {
          const check = checkPackFile(files[slot.id], slot);
          const file = files[slot.id];
          return (
            <div
              key={slot.id}
              className="flex flex-col gap-2 rounded-2xl border border-[var(--line)] bg-[var(--wash)]/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base" aria-hidden>
                    {statusIcon(check.status)}
                  </span>
                  <p className="font-semibold text-[var(--ink)]">
                    {slot.label}
                    {slot.required ? (
                      <span className="ml-2 text-[10px] font-bold uppercase text-rose-600">
                        Required
                      </span>
                    ) : (
                      <span className="ml-2 text-[10px] font-bold uppercase text-[var(--muted)]">
                        Optional
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{slot.hint}</p>
                <p
                  className={`mt-1 text-sm ${
                    check.status === "ok"
                      ? "text-[var(--accent-ink)]"
                      : check.status === "fail"
                        ? "text-rose-600"
                        : check.status === "warn"
                          ? "text-amber-700"
                          : "text-[var(--muted)]"
                  }`}
                >
                  {check.message}
                  {file ? ` · ${file.name}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <input
                  ref={(el) => {
                    inputRefs.current[slot.id] = el;
                  }}
                  type="file"
                  accept={slot.accept}
                  className="hidden"
                  onChange={(e) => setFile(slot, e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => inputRefs.current[slot.id]?.click()}
                  className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {file ? "Change" : "Upload"}
                </button>
                {file ? (
                  <button
                    type="button"
                    onClick={() => setFile(slot, null)}
                    className="rounded-lg px-3 py-2 text-xs font-bold text-[var(--muted)] hover:text-rose-600"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[var(--line)] px-4 py-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
          Application readiness
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {checks.map(({ slot, check }) => (
            <li key={slot.id} className="flex gap-2 text-[var(--ink)]">
              <span aria-hidden>{statusIcon(check.status)}</span>
              <span>
                <strong>{slot.label}:</strong>{" "}
                <span className="text-[var(--muted)]">{check.message}</span>
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={busy}
          onClick={() => void runFixAll()}
          className="mt-5 w-full rounded-xl bg-[var(--ink)] py-3.5 text-sm font-bold text-white hover:bg-[var(--accent)] disabled:opacity-50 sm:w-auto sm:px-8"
        >
          {busy
            ? progress || "Working…"
            : needsFix
              ? "Fix all & download pack"
              : "Download application pack"}
        </button>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Saves as <code className="text-[var(--ink)]">{packZipFilename(exam)}</code> · private —
          files stay on your device
        </p>
        {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
        {info ? <p className="mt-2 text-sm text-[var(--accent-ink)]">{info}</p> : null}
      </div>
    </section>
  );
}
