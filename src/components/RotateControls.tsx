"use client";

import type { RotateDeg } from "@/lib/image";

function stepRotate(current: RotateDeg, dir: 1 | -1): RotateDeg {
  const next = (((current + dir * 90) % 360) + 360) % 360;
  return next as RotateDeg;
}

const OPTIONS: { deg: RotateDeg; label: string }[] = [
  { deg: 0, label: "0°" },
  { deg: 90, label: "90°" },
  { deg: 180, label: "180°" },
  { deg: 270, label: "270°" },
];

export function RotateControls({
  value,
  onChange,
  className = "",
}: {
  value: RotateDeg;
  onChange: (deg: RotateDeg) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-sm font-semibold text-[var(--ink)]">Rotate</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(stepRotate(value, -1))}
          className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--accent)]"
          aria-label="Rotate left 90 degrees"
        >
          ↺ Left
        </button>
        <button
          type="button"
          onClick={() => onChange(stepRotate(value, 1))}
          className="rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-bold hover:border-[var(--accent)]"
          aria-label="Rotate right 90 degrees"
        >
          ↻ Right
        </button>
        {OPTIONS.map((o) => (
          <button
            key={o.deg}
            type="button"
            onClick={() => onChange(o.deg)}
            className={`rounded-lg px-3 py-2 text-xs font-bold ${
              value === o.deg
                ? "bg-[var(--ink)] text-white"
                : "border border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
