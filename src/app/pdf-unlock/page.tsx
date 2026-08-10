"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { pdfNeedsPassword, unlockPdf } from "@/lib/pdfConvert";

export default function PdfUnlockPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [needsPass, setNeedsPass] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = async (f: File | null) => {
    setFile(f);
    setStats(null);
    setError(null);
    setNeedsPass(null);
    setPassword("");
    if (!f) return;
    try {
      const need = await pdfNeedsPassword(f);
      setNeedsPass(need);
    } catch {
      setNeedsPass(true);
    }
  };

  const run = async () => {
    if (!file) {
      setError("Choose a PDF first");
      return;
    }
    if (needsPass && !password.trim()) {
      setError("Enter the PDF open password");
      return;
    }
    setBusy(true);
    setError(null);
    setStats(null);
    try {
      const { blob, pages, sizeKb } = await unlockPdf(file, password, setProgress);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-unlocked.pdf");
      setStats(`${pages} page(s) unlocked · ${sizeKb} KB`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unlock failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Unlock PDF — <span className="text-[var(--accent)]">Remove Password</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Unlock password-protected PDFs online free. Remove open password and download an unlocked copy — private browser tool.
        </p>
        <TrustPills />
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select locked PDF"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => void onPick(e.target.files?.[0] ?? null)}
        />

        {needsPass === false && (
          <p className="mt-3 text-center text-sm text-[var(--accent-ink)]">
            No open password detected — we can still strip restrictions and save an unlocked copy.
          </p>
        )}
        {needsPass === true && (
          <label className="mt-4 block text-sm font-semibold">
            PDF password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter open password"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        )}

        {progress && <p className="mt-3 text-center text-sm text-[var(--muted)]">{progress}</p>}
        {stats && <p className="mt-3 text-center text-sm font-semibold text-[var(--accent-ink)]">{stats}</p>}
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}

        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60"
        >
          {busy ? "Unlocking…" : "Unlock PDF & Download"}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Creates a new unlocked PDF from page images. You must know the open password if the file asks for one. Do not use this on files you are not allowed to open.
        </p>
      </div>

      <ShareButtons
        className="mt-6"
        title="Unlock PDF remove password online free — Size to KB"
        text="Unlock PDF password free on Size to KB"
        path="/pdf-unlock/"
      />
      <SeoKeywordBlock
        heading="Unlock PDF online free — remove PDF password"
        paragraphs={[
          "Search: unlock PDF, remove PDF password, unlock PDF online free, PDF password remover, decrypt PDF. After unlock, compress PDF size or convert PDF to JPG if needed.",
        ]}
        links={[
          { href: "/pdf-to-jpg/", label: "PDF to JPG" },
          { href: "/pdf-compressor/", label: "Compress PDF" },
          { href: "/pdf-organize/", label: "Reorder PDF pages" },
          { href: "/pdf-editor/", label: "Edit PDF" },
        ]}
      />
    </div>
  );
}
