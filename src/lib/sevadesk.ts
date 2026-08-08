/** Cross-links from SizeToKB → SevaDesk (govt jobs / results). */

export const SEVADESK = {
  name: "SevaDesk",
  /** Set NEXT_PUBLIC_SEVADESK_URL when SevaDesk is live (e.g. https://sevadesk.in). */
  url: (process.env.NEXT_PUBLIC_SEVADESK_URL || "").replace(/\/$/, ""),
} as const;

export function sevadeskEnabled(): boolean {
  return Boolean(SEVADESK.url);
}

export function sevadeskPath(path = "/"): string {
  const base = SEVADESK.url;
  if (!base) return "#";
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sevadeskSearchUrl(query: string): string {
  return sevadeskPath(`/search?q=${encodeURIComponent(query)}`);
}

export function sevadeskJobsUrl(): string {
  return sevadeskPath("/jobs");
}

export function sevadeskResultsUrl(): string {
  return sevadeskPath("/results");
}

export function sevadeskAdmitCardsUrl(): string {
  return sevadeskPath("/admit-cards");
}

/** Map SizeToKB exam slug → SevaDesk search query. */
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

export function sevadeskForExam(slug: string, examName: string): { href: string; label: string } | null {
  if (!sevadeskEnabled()) return null;
  const q = EXAM_TO_SEARCH[slug] || examName;
  return {
    href: sevadeskSearchUrl(q),
    label: `${q} jobs & updates on SevaDesk`,
  };
}

export const SEVADESK_NAV = [
  { path: "/jobs", label: "Latest government jobs" },
  { path: "/results", label: "Sarkari results" },
  { path: "/admit-cards", label: "Admit cards" },
  { path: "/search", label: "Search all notices" },
] as const;
