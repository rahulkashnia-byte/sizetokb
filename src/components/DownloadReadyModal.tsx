"use client";

/**
 * Success modal with a large Free Download CTA — used after image/PDF processing.
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
        className="w-full max-w-md overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
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
            className="mx-auto max-h-48 w-full object-contain bg-white p-4"
          />
        )}

        <div className="space-y-3 p-5">
          <button
            type="button"
            onClick={() => {
              onDownload();
              onClose();
            }}
            className="w-full rounded-2xl bg-[var(--accent)] py-4 text-base font-extrabold tracking-wide text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:brightness-95 active:scale-[0.99]"
          >
            Free Download
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-[var(--line)] bg-[var(--wash)] py-3 text-sm font-semibold text-[var(--muted)] hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
