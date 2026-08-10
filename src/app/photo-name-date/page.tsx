"use client";

import { useRef, useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { downloadBlob } from "@/lib/image";
import { stampNameDateOnPhoto } from "@/lib/photoStamp";

export default function PhotoNameDatePage() {
  const [name, setName] = useState("");
  const [dateText, setDateText] = useState("");
  const [position, setPosition] = useState<"bottom" | "top" | "bottom-left" | "bottom-right">(
    "bottom"
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = async () => {
    if (!file) {
      setError("Choose a photo first");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (preview) URL.revokeObjectURL(preview);
      const r = await stampNameDateOnPhoto(file, {
        name,
        dateText,
        position,
        filename: "photo-name-date",
      });
      setPreview(r.url);
      setMeta(`${r.width}×${r.height} · ${r.sizeKb} KB`);
      downloadBlob(r.blob, r.filename);
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
          Name & Date on <span className="text-[var(--accent)]">Photo</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Add candidate name and date on exam / form photos, then download JPG.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="As on form"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Date
            <input
              type="text"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
              placeholder="e.g. 10-08-2026"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="mt-3 block text-sm font-semibold">
          Position
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as typeof position)}
            className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
          >
            <option value="bottom">Bottom left</option>
            <option value="bottom-right">Bottom right</option>
            <option value="top">Top left</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 w-full rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--wash)] py-10 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {file ? file.name : "Select photo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setPreview(null);
            setMeta(null);
          }}
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="mx-auto mt-4 max-h-56 object-contain" />
        )}
        {meta && <p className="mt-2 text-center text-sm text-[var(--accent-ink)]">{meta}</p>}
        {error && <p className="mt-2 text-center text-sm text-amber-700">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Stamping…" : "Stamp & Download"}
        </button>
      </div>
      <ShareButtons
        className="mt-6"
        title="Name and date on photo — Size to KB"
        text="Add name and date on exam photo free on Size to KB"
        path="/photo-name-date/"
      />
      <SeoKeywordBlock
        heading="Add name and date on photo for exam forms"
        paragraphs={[
          "Many Indian forms ask for name and date written on the photograph. Stamp text on the image in your browser, then compress to KB if needed.",
        ]}
        links={[
          { href: "/compress-to-50kb/", label: "Compress to 50KB" },
          { href: "/passport-photo/", label: "Passport photo" },
          { href: "/custom/", label: "Custom KB" },
        ]}
      />
    </div>
  );
}
