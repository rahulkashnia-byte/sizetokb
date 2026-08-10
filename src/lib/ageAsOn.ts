/** Age as on a cut-off date (exam form style). */

export type AgeParts = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

function parseYmd(s: string): { y: number; m: number; d: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return { y, m: mo, d };
}

function daysInMonth(y: number, m: number): number {
  return new Date(y, m, 0).getDate();
}

/**
 * Difference from DOB to "as on" date in Y/M/D (calendar style).
 */
export function ageAsOn(dobStr: string, asOnStr: string): AgeParts {
  const dob = parseYmd(dobStr);
  const asOn = parseYmd(asOnStr);
  if (!dob || !asOn) throw new Error("Use valid dates (YYYY-MM-DD)");

  const dobDate = new Date(dob.y, dob.m - 1, dob.d);
  const asOnDate = new Date(asOn.y, asOn.m - 1, asOn.d);
  if (Number.isNaN(dobDate.getTime()) || Number.isNaN(asOnDate.getTime())) {
    throw new Error("Invalid date");
  }
  if (asOnDate < dobDate) throw new Error("As-on date must be on or after date of birth");

  let years = asOn.y - dob.y;
  let months = asOn.m - dob.m;
  let days = asOn.d - dob.d;

  if (days < 0) {
    months -= 1;
    const prevMonth = asOn.m === 1 ? 12 : asOn.m - 1;
    const prevYear = asOn.m === 1 ? asOn.y - 1 : asOn.y;
    days += daysInMonth(prevYear, prevMonth);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOnDate.getTime() - dobDate.getTime()) / 86400000);
  return { years, months, days, totalDays };
}

export function inAgeBand(ageYears: number, minAge?: number, maxAge?: number): boolean | null {
  if (minAge == null && maxAge == null) return null;
  if (minAge != null && ageYears < minAge) return false;
  if (maxAge != null && ageYears > maxAge) return false;
  return true;
}

export function todayYmd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
