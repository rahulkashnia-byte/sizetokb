"use client";

import { useState } from "react";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { ageAsOn, inAgeBand, todayYmd } from "@/lib/ageAsOn";

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [asOn, setAsOn] = useState(todayYmd());
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    eligible: boolean | null;
  } | null>(null);

  const calc = () => {
    setError(null);
    try {
      const age = ageAsOn(dob, asOn);
      const eligible = inAgeBand(
        age.years,
        minAge ? Number(minAge) : undefined,
        maxAge ? Number(maxAge) : undefined
      );
      setResult({ ...age, eligible });
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Invalid dates");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
          Age Calculator <span className="text-[var(--accent)]">As On Date</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Calculate age as on exam cut-off date for SSC, Bank, Railway and government forms.
        </p>
        <TrustPills />
      </div>
      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Date of birth
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            As on date
            <input
              type="date"
              value={asOn}
              onChange={(e) => setAsOn(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Min age (optional)
            <input
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              placeholder="e.g. 18"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Max age (optional)
            <input
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              placeholder="e.g. 32"
              className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-2 text-sm"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={calc}
          className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-bold text-white"
        >
          Calculate age
        </button>
        {error && <p className="mt-3 text-center text-sm text-amber-700">{error}</p>}
        {result && (
          <div className="mt-5 rounded-2xl bg-[var(--wash)] p-4 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--ink)]">
              {result.years} years, {result.months} months, {result.days} days
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Total {result.totalDays.toLocaleString("en-IN")} days as on {asOn}
            </p>
            {result.eligible != null && (
              <p
                className={`mt-3 text-sm font-bold ${
                  result.eligible ? "text-[var(--accent-ink)]" : "text-rose-700"
                }`}
              >
                {result.eligible
                  ? "Within entered age band (check official notification)"
                  : "Outside entered age band — verify official notification"}
              </p>
            )}
          </div>
        )}
      </div>
      <ShareButtons
        className="mt-6"
        title="Age calculator as on date — Size to KB"
        text="Calculate age as on exam cut-off date free on Size to KB"
        path="/age-calculator/"
      />
      <SeoKeywordBlock
        heading="Age calculator as on date for exam forms"
        paragraphs={[
          "Notifications often say age as on a fixed date. Enter DOB and cut-off date to get years, months and days. Always confirm with the official PDF.",
        ]}
        links={[
          { href: "/form-wizard/", label: "Form wizard" },
          { href: "/biodata/", label: "Biodata maker" },
          { href: "/compress-to-50kb/", label: "Photo 50KB" },
        ]}
      />
    </div>
  );
}
