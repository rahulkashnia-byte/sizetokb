/** Cross-links from SizeToKB → SarkariSuchi (govt jobs / results). */

export const SARKARISUCHI = {
  name: "SarkariSuchi",
  /**
   * Prefer NEXT_PUBLIC_SARKARISUCHI_URL.
   * Falls back to NEXT_PUBLIC_SEVADESK_URL for older builds, then the live domain.
   */
  url: (
    process.env.NEXT_PUBLIC_SARKARISUCHI_URL ||
    process.env.NEXT_PUBLIC_SEVADESK_URL ||
    "https://sarkarisuchi.com"
  ).replace(/\/$/, ""),
} as const;

/** @deprecated use SARKARISUCHI */
export const SEVADESK = SARKARISUCHI;

export function sarkarisuchiEnabled(): boolean {
  return Boolean(SARKARISUCHI.url);
}

/** @deprecated use sarkarisuchiEnabled */
export function sevadeskEnabled(): boolean {
  return sarkarisuchiEnabled();
}

export function sarkarisuchiPath(path = "/"): string {
  const base = SARKARISUCHI.url;
  if (!base) return "#";
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** @deprecated use sarkarisuchiPath */
export function sevadeskPath(path = "/"): string {
  return sarkarisuchiPath(path);
}

export function sarkarisuchiSearchUrl(query: string): string {
  return sarkarisuchiPath(`/search?q=${encodeURIComponent(query)}`);
}

/** @deprecated */
export function sevadeskSearchUrl(query: string): string {
  return sarkarisuchiSearchUrl(query);
}

export function sarkarisuchiJobsUrl(): string {
  return sarkarisuchiPath("/jobs");
}

/** @deprecated */
export function sevadeskJobsUrl(): string {
  return sarkarisuchiJobsUrl();
}

export function sarkarisuchiResultsUrl(): string {
  return sarkarisuchiPath("/results");
}

/** @deprecated */
export function sevadeskResultsUrl(): string {
  return sarkarisuchiResultsUrl();
}

export function sarkarisuchiAdmitCardsUrl(): string {
  return sarkarisuchiPath("/admit-cards");
}

/** @deprecated */
export function sevadeskAdmitCardsUrl(): string {
  return sarkarisuchiAdmitCardsUrl();
}

/** Map SizeToKB exam slug → SarkariSuchi search query. */
const EXAM_TO_SEARCH: Record<string, string> = {
  "ibps-clerk": "IBPS Clerk",
  "ibps-po": "IBPS PO",
  "ibps-so": "IBPS SO",
  "ibps-rrb": "IBPS RRB",
  "ibps-so-it-officer": "IBPS SO",
  "sbi-clerk": "SBI Clerk",
  "sbi-po": "SBI PO",
  "sbi-cbo": "SBI CBO",
  "ssc-cgl": "SSC CGL",
  "ssc-chsl": "SSC CHSL",
  "ssc-gd": "SSC GD",
  "ssc-mts": "SSC MTS",
  "ssc-all-exams": "SSC",
  "ssc-phase-14": "SSC",
  "ssc-stenographer-grade-c-and-d": "SSC Stenographer",
  "rrb-group-d": "RRB Group D",
  "railway-ntpc": "RRB NTPC",
  "rrb-alp": "RRB ALP",
  "rrb-technician": "RRB Technician",
  afcat: "AFCAT",
  "neet-ug": "NEET",
  "neet-pg": "NEET PG",
  "jee-mains": "JEE Main",
  "jee-advanced": "JEE Advanced",
  "upsc-cse-pre": "UPSC",
  "upsc-capf-ac-assistant-commandant": "UPSC CAPF",
  "upsc-combined-medical-services-cms": "UPSC CMS",
  "upsssc-pet": "UPSSSC PET",
  "jssc-jtglcce": "JSSC",
  "delhi-high-court-jja": "Delhi High Court",
  cds: "CDS",
  nda: "NDA",
  ctet: "CTET",
  cuet: "CUET",
  gate: "GATE",
};

export function sarkarisuchiForExam(
  slug: string,
  examName: string
): { href: string; label: string } | null {
  if (!sarkarisuchiEnabled()) return null;
  const q = EXAM_TO_SEARCH[slug] || examName;
  return {
    href: sarkarisuchiSearchUrl(q),
    label: `${q} jobs & updates on SarkariSuchi`,
  };
}

/** @deprecated */
export function sevadeskForExam(slug: string, examName: string) {
  return sarkarisuchiForExam(slug, examName);
}

export const SARKARISUCHI_NAV = [
  { path: "/jobs", label: "Latest government jobs" },
  { path: "/results", label: "Sarkari results" },
  { path: "/admit-cards", label: "Admit cards" },
  { path: "/search", label: "Search all notices" },
] as const;

/** @deprecated */
export const SEVADESK_NAV = SARKARISUCHI_NAV;
