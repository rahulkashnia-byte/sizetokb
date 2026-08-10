"use client";

/**
 * Success modal with a large Free Download CTA — used after image/PDF processing.
 * Optional chai tip sits below download so Free Download stays primary.
 */
export function DownloadReadyModal({
  open,
  onClose,
  onDownload,
  previewUrl,
  meta,
  filename,
}: {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  previewUrl?: string | null;
  meta?: string | null;
  filename?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/45 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-ready-title"
      onClick={onClose}
    >
      <div
        className="max-h-[min(92vh,720px)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[var(--line)] bg-[var(--wash)] px-5 py-4 text-center">
          <p
            id="download-ready-title"
            className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--ink)]"
          >
            Ready to download
          </p>
          {meta && <p className="mt-1 text-sm font-semibold text-[var(--accent-ink)]">{meta}</p>}
          {filename && (
            <p className="mt-0.5 truncate text-xs text-[var(--muted)]" title={filename}>
              {filename}
            </p>
          )}
        </div>

        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto max-h-36 w-full object-contain bg-white px-4 pt-3"
          />
        )}

        <div className="space-y-3 p-5 pt-4">
          <button
            type="button"
            onClick={() => {
              onDownload();
              onClose();
            }}
            className="w-full rounded-2xl bg-[var(--download)] py-4 text-base font-extrabold tracking-wide text-white shadow-[0_10px_28px_rgba(45,138,104,0.32)] hover:brightness-105 active:scale-[0.99]"
          >
            Free Download
          </button>
          <p className="text-center text-xs text-[var(--muted)]">
            Processed in your browser. We don’t store this file.
          </p>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--wash)] px-4 py-4 text-center">
            <p className="text-sm font-bold text-[var(--ink)]">
              <span className="text-[var(--accent)]" aria-hidden>
                ♥
              </span>{" "}
              Buy me a chai
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              If you like this tool, buy me a chai. Thank you!
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/buy-me-a-chai-qr.png"
              alt="UPI QR code to buy me a chai"
              width={132}
              height={132}
              className="mx-auto mt-3 h-[132px] w-[132px] rounded-xl bg-white p-1.5 shadow-sm"
            />
            <p className="mt-2 text-[11px] text-[var(--muted)]">Scan UPI · optional</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-[var(--line)] bg-white py-3 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--wash)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
