import type { Exam } from "@/lib/types";
import { formatSpecSummary } from "@/lib/format";

export type ExamSeoPack = {
  title: string;
  description: string;
  h1: string;
  lead: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
};

type Override = Partial<ExamSeoPack> & { queryHints?: string[]; shortName?: string };

/**
 * CTR / India search-intent overrides for high-volume exams.
 * Prefer short names people type (SSC CGL, IBPS PO) over long official titles.
 */
const OVERRIDES: Record<string, Override> = {
  itat: {
    shortName: "ITAT",
    title: "ITAT Photo & Signature Size in KB Online Free 2026",
    description:
      "ITAT photo size & signature size in KB — crop, compress and Free Download on phone. Exact KB for form upload. Private · Size to KB",
    h1: "ITAT photo & signature size in KB",
    lead: "Hit ITAT photo and signature KB limits, then Free Download and upload to the portal.",
    queryHints: ["itat photo size", "itat signature size", "itat photo and signature size"],
  },
  "apssb-constable": {
    shortName: "APSSB Constable",
    title: "APSSB Photo and Signature Size in KB (20–50) Free 2026",
    description:
      "APSSB photo and signature size in KB — photo 20–50 KB, signature 10–20 KB. Free crop + compress, Free Download for Constable form. Private — Size to KB",
    h1: "APSSB photo and signature size in KB",
    lead: "Searched “APSSB photo and signature size”? Hit 20–50 KB photo / 10–20 KB signature, then Free Download.",
    queryHints: [
      "apssb photo and signature size",
      "apssb photo size",
      "apssb signature size",
      "apssb constable photo size",
      "apssb photo size in kb",
    ],
  },
  "upsssc-pet": {
    shortName: "UPSSSC PET",
    title: "UPSSSC PET Image Size in KB · Photo & Signature Free",
    description:
      "UPSSSC PET image size in KB — photo 20–50 KB, signature 10–20 KB. Free online compress for PET form. Crop, Free Download on phone — Size to KB",
    h1: "UPSSSC PET photo & signature size in KB",
    lead: "UPSSSC PET image / photo / signature KB limits — compress on phone, Free Download, upload to the form.",
    queryHints: [
      "upsssc pet image",
      "upsssc pet image size",
      "upsssc pet signature",
      "upsssc pet photo size",
      "upsssc pet signature size",
      "upsssc pet photo and signature size",
    ],
  },
  "rrb-section-controller": {
    shortName: "RRB Section Controller",
    title: "Section Controller Signature Size in KB · Photo Free",
    description:
      "RRB Section Controller signature size in KB (10–40) & photo size (20–50 KB). Free compress + Free Download for Railway form upload — Size to KB",
    h1: "RRB Section Controller signature & photo size in KB",
    lead: "Match Section Controller signature (10–40 KB) and photo (20–50 KB), then Free Download for the RRB form.",
    queryHints: [
      "section controller signature size",
      "rrb section controller photo size",
      "rrb section controller signature size",
      "section controller photo size",
      "section controller signature size in kb",
    ],
  },
  afcat: {
    shortName: "AFCAT",
    title: "AFCAT Photo Size in KB (10–100) Free · Signature Too",
    description:
      "AFCAT photo size & signature size in KB — both typically 10–100 KB. Free crop, compress, Free Download for Air Force form — Size to KB",
    h1: "AFCAT photo & signature size in KB",
    lead: "Hit AFCAT photo and signature KB limits (10–100 KB), then Free Download for upload.",
    queryHints: [
      "afcat photo size",
      "afcat signature size",
      "afcat photo and signature size",
      "afcat photo size in kb",
    ],
  },
  cuet: {
    shortName: "CUET",
    title: "CUET Photo & Signature Size in KB Online Free 2026",
    description:
      "CUET photo size & signature size in KB — free online resizer. Crop, compress, Free Download for NTA form — Size to KB",
    queryHints: ["cuet photo size", "cuet signature size", "cuet photo and signature size"],
  },
  nda: {
    shortName: "NDA",
    title: "NDA Photo Size in KB Free 2026 · Signature Compress",
    description:
      "NDA / UPSC NDA photo size & signature size in KB (often 20–300 KB). Free compress, Free Download for form upload — Size to KB",
    h1: "NDA photo & signature size in KB",
    lead: "NDA photo and signature KB limits — compress on phone, Free Download, upload to UPSC form.",
    queryHints: [
      "nda photo size",
      "nda signature size",
      "nda photo size in kb",
      "upsc nda photo size",
    ],
  },
  gate: {
    shortName: "GATE",
    title: "GATE Photo Size in KB Free · Signature 4–30 KB 2026",
    description:
      "GATE photo size in KB (10–200) & signature size (4–30 KB). Free online resizer for IIT GATE form. Crop, Free Download — Size to KB",
    h1: "GATE photo & signature size in KB",
    lead: "Match GATE photo (10–200 KB) and signature (4–30 KB), then Free Download for the form.",
    queryHints: [
      "gate photo size",
      "gate signature size",
      "gate photo size in kb",
      "gate photo and signature size",
    ],
  },
  "railway-nfr-apprentice": {
    shortName: "Railway NFR Apprentice",
    title: "Railway NFR Apprentice Photo & Signature Size KB Free",
    description:
      "Railway NFR Apprentice photo & signature size in KB — free compress. Crop, hit KB, Free Download — Size to KB",
    queryHints: ["nfr apprentice photo size", "railway nfr apprentice signature size"],
  },
  nbems: {
    shortName: "NBEMS",
    title: "NBEMS Photo Size in KB (20–50) Free · Signature Too",
    description:
      "NBEMS photo size in KB (20–50) & signature size (10–20 KB). Free crop + compress, Free Download for NBEMS form — Size to KB",
    h1: "NBEMS photo & signature size in KB",
    lead: "Hit NBEMS photo and signature KB limits, then Free Download for upload.",
    queryHints: [
      "nbems photo size",
      "nbems signature size",
      "nbems photo size in kb",
      "nbems photo and signature size",
    ],
  },

  // —— High-volume India exams ——
  "ssc-cgl": {
    shortName: "SSC CGL",
    title: "SSC CGL Photo & Signature Size in KB Online Free 2026",
    description:
      "SSC CGL photo size & signature size in KB — free crop + compress for SSC form. Exact KB, Free Download on phone — Size to KB",
    h1: "SSC CGL photo & signature size in KB",
    queryHints: [
      "ssc cgl photo size",
      "ssc cgl signature size",
      "ssc cgl photo and signature size",
      "ssc cgl photo size in kb",
    ],
  },
  "ssc-chsl": {
    shortName: "SSC CHSL",
    title: "SSC CHSL Photo & Signature Size in KB Online Free 2026",
    description:
      "SSC CHSL photo size & signature size in KB — free online resizer. Crop, compress to form KB, Free Download — Size to KB",
    h1: "SSC CHSL photo & signature size in KB",
    queryHints: [
      "ssc chsl photo size",
      "ssc chsl signature size",
      "ssc chsl photo and signature size",
    ],
  },
  "ssc-gd": {
    shortName: "SSC GD",
    title: "SSC GD Photo & Signature Size in KB Online Free 2026",
    description:
      "SSC GD Constable photo size & signature size in KB — free compress for SSC GD form. Crop, exact KB, Free Download — Size to KB",
    h1: "SSC GD photo & signature size in KB",
    queryHints: ["ssc gd photo size", "ssc gd signature size", "ssc gd photo size in kb"],
  },
  "ssc-mts": {
    shortName: "SSC MTS",
    title: "SSC MTS Photo & Signature Size in KB Online Free 2026",
    description:
      "SSC MTS photo size & signature size in KB — free online tool. Crop, compress, Free Download for SSC form — Size to KB",
    queryHints: ["ssc mts photo size", "ssc mts signature size"],
  },
  "ssc-stenographer-grade-c-and-d": {
    shortName: "SSC Stenographer",
    title: "SSC Stenographer Photo & Signature Size in KB Online Free",
    description:
      "SSC Stenographer Grade C/D photo size & signature size in KB — free compress. Crop, hit KB, Free Download — Size to KB",
    queryHints: [
      "ssc stenographer photo size",
      "ssc stenographer signature size",
      "ssc steno photo size",
    ],
  },
  "ssc-phase-14": {
    shortName: "SSC Phase",
    title: "SSC Phase Photo & Signature Size in KB Online Free 2026",
    description:
      "SSC Phase selection photo size & signature size in KB — free resizer. Crop, compress, Free Download — Size to KB",
    queryHints: ["ssc phase photo size", "ssc phase signature size"],
  },
  "ibps-po": {
    shortName: "IBPS PO",
    title: "IBPS PO Photo & Signature Size in KB Online Free 2026",
    description:
      "IBPS PO photo size & signature size in KB — free bank form resizer. Crop, compress to exact KB, Free Download — Size to KB",
    h1: "IBPS PO photo & signature size in KB",
    queryHints: [
      "ibps po photo size",
      "ibps po signature size",
      "ibps po photo and signature size",
    ],
  },
  "ibps-clerk": {
    shortName: "IBPS Clerk",
    title: "IBPS Clerk Photo & Signature Size in KB Online Free 2026",
    description:
      "IBPS Clerk photo size & signature size in KB — free online compress for CRP Clerk form — Size to KB",
    queryHints: ["ibps clerk photo size", "ibps clerk signature size"],
  },
  "ibps-so-it-officer": {
    shortName: "IBPS SO",
    title: "IBPS SO Photo & Signature Size in KB Online Free 2026",
    description:
      "IBPS SO photo size & signature size in KB — free compress for specialist officer form — Size to KB",
    queryHints: ["ibps so photo size", "ibps so signature size"],
  },
  "sbi-po": {
    shortName: "SBI PO",
    title: "SBI PO Photo & Signature Size in KB Online Free 2026",
    description:
      "SBI PO photo size & signature size in KB — free crop + compress for SBI form. Free Download — Size to KB",
    queryHints: ["sbi po photo size", "sbi po signature size", "sbi po photo size in kb"],
  },
  "sbi-clerk": {
    shortName: "SBI Clerk",
    title: "SBI Clerk Photo & Signature Size in KB Online Free 2026",
    description:
      "SBI Clerk / Junior Associate photo size & signature size in KB — free online resizer — Size to KB",
    queryHints: ["sbi clerk photo size", "sbi clerk signature size", "sbi ja photo size"],
  },
  "rrb-alp": {
    shortName: "RRB ALP",
    title: "RRB ALP Photo & Signature Size in KB Online Free 2026",
    description:
      "RRB ALP photo size & signature size in KB — free Railway form compress. Crop, exact KB, Free Download — Size to KB",
    queryHints: ["rrb alp photo size", "rrb alp signature size", "alp photo size"],
  },
  "rrb-group-d": {
    shortName: "RRB Group D",
    title: "RRB Group D Photo & Signature Size in KB Online Free 2026",
    description:
      "RRB Group D / RRC Level-1 photo size & signature size in KB — free compress for Railway form — Size to KB",
    queryHints: ["rrb group d photo size", "rrc group d signature size", "group d photo size"],
  },
  "railway-ntpc": {
    shortName: "RRB NTPC",
    title: "RRB NTPC Photo & Signature Size in KB Online Free 2026",
    description:
      "RRB NTPC photo size & signature size in KB — free online resizer for Railway recruitment form — Size to KB",
    queryHints: ["rrb ntpc photo size", "ntpc photo size", "rrb ntpc signature size"],
  },
  "rrb-technician": {
    shortName: "RRB Technician",
    title: "RRB Technician Photo & Signature Size in KB Online Free",
    description:
      "RRB Technician photo size & signature size in KB — free compress. Crop, Free Download — Size to KB",
    queryHints: ["rrb technician photo size", "rrb technician signature size"],
  },
  cds: {
    shortName: "CDS",
    title: "CDS Photo Size in KB Free 2026 · Signature Compress",
    description:
      "UPSC CDS photo size & signature size in KB (often 20–300 KB). Free compress, Free Download for Combined Defence Services form — Size to KB",
    h1: "CDS photo & signature size in KB",
    lead: "Match CDS photo and signature KB limits, then Free Download for the UPSC form.",
    queryHints: [
      "cds photo size",
      "cds signature size",
      "upsc cds photo size",
      "cds photo size in kb",
    ],
  },
  ctet: {
    shortName: "CTET",
    title: "CTET Photo & Signature Size in KB Online Free 2026",
    description:
      "CTET photo size & signature size in KB — free NTA form resizer. Crop, compress, Free Download — Size to KB",
    queryHints: ["ctet photo size", "ctet signature size", "ctet photo size in kb"],
  },
  "neet-ug": {
    shortName: "NEET UG",
    title: "NEET UG Photo & Signature Size in KB Online Free 2026",
    description:
      "NEET UG photo size & signature size in KB — free compress for NTA NEET form. Crop, exact KB, Free Download — Size to KB",
    queryHints: ["neet photo size", "neet ug photo size", "neet signature size", "neet photo size in kb"],
  },
  "neet-pg": {
    shortName: "NEET PG",
    title: "NEET PG Photo & Signature Size in KB Online Free 2026",
    description:
      "NEET PG photo size & signature size in KB — free online resizer for medical PG form — Size to KB",
    queryHints: ["neet pg photo size", "neet pg signature size"],
  },
  "jee-mains": {
    shortName: "JEE Main",
    title: "JEE Main Photo & Signature Size in KB Online Free 2026",
    description:
      "JEE Main photo size & signature size in KB — free NTA form compress. Crop, Free Download — Size to KB",
    queryHints: ["jee main photo size", "jee mains photo size", "jee main signature size"],
  },
  "jee-advanced": {
    shortName: "JEE Advanced",
    title: "JEE Advanced Photo & Signature Size in KB Online Free 2026",
    description:
      "JEE Advanced photo size & signature size in KB — free compress for IIT form upload — Size to KB",
    queryHints: ["jee advanced photo size", "jee advanced signature size"],
  },
  "upsc-cse-pre": {
    shortName: "UPSC CSE",
    title: "UPSC CSE Photo & Signature Size in KB Online Free 2026",
    description:
      "UPSC Civil Services photo size & signature size in KB — free compress for UPSC form. Crop, Free Download — Size to KB",
    queryHints: [
      "upsc photo size",
      "upsc cse photo size",
      "upsc signature size",
      "upsc photo size in kb",
    ],
  },
  cat: {
    shortName: "CAT",
    title: "CAT Photo & Signature Size in KB Online Free 2026",
    description:
      "CAT exam photo size & signature size in KB — free online resizer for IIM CAT form — Size to KB",
    queryHints: ["cat photo size", "cat signature size", "cat exam photo size"],
  },
  "up-police-constable": {
    shortName: "UP Police Constable",
    title: "UP Police Constable Photo & Signature Size in KB Free",
    description:
      "UP Police Constable photo size & signature size in KB — free compress for UPPRPB form — Size to KB",
    queryHints: [
      "up police constable photo size",
      "up police photo size",
      "up police signature size",
    ],
  },
  "up-police-si-asi-clerk-and-acc": {
    shortName: "UP Police SI",
    title: "UP Police SI Photo & Signature Size in KB Online Free",
    description:
      "UP Police SI / ASI photo size & signature size in KB — free form resizer. Crop, Free Download — Size to KB",
    queryHints: ["up police si photo size", "up police si signature size"],
  },
  "bihar-police-constable": {
    shortName: "Bihar Police Constable",
    title: "Bihar Police Constable Photo & Signature Size in KB Free",
    description:
      "Bihar Police Constable photo size & signature size in KB — free compress for CSBC form — Size to KB",
    queryHints: ["bihar police constable photo size", "bihar police photo size"],
  },
  "bihar-police-bpssc-si-daroga": {
    shortName: "Bihar Police SI",
    title: "Bihar Police SI (Daroga) Photo & Signature Size in KB Free",
    description:
      "Bihar Police BPSSC SI Daroga photo size & signature size in KB — free crop + compress — Size to KB",
    queryHints: ["bihar police si photo size", "bpssc si photo size", "daroga photo size"],
  },
  "dsssb-tgt": {
    shortName: "DSSSB TGT",
    title: "DSSSB TGT Photo & Signature Size in KB Online Free 2026",
    description:
      "DSSSB TGT photo size & signature size in KB — free Delhi teacher form resizer — Size to KB",
    queryHints: ["dsssb tgt photo size", "dsssb photo size", "dsssb signature size"],
  },
  "dsssb-mts": {
    shortName: "DSSSB MTS",
    title: "DSSSB MTS Photo & Signature Size in KB Online Free 2026",
    description:
      "DSSSB MTS photo size & signature size in KB — free compress for Delhi form — Size to KB",
    queryHints: ["dsssb mts photo size", "dsssb mts signature size"],
  },
  "dsssb-aso": {
    shortName: "DSSSB ASO",
    title: "DSSSB ASO Photo & Signature Size in KB Online Free 2026",
    description:
      "DSSSB ASO photo size & signature size in KB — free online resizer — Size to KB",
    queryHints: ["dsssb aso photo size", "dsssb aso signature size"],
  },
  bpsc: {
    shortName: "BPSC",
    title: "BPSC Photo & Signature Size in KB Online Free 2026",
    description:
      "BPSC photo size & signature size in KB — free Bihar PSC form compress. Crop, Free Download — Size to KB",
    queryHints: ["bpsc photo size", "bpsc signature size", "bpsc photo size in kb"],
  },
  "uppsc-uttar-pradesh-psc": {
    shortName: "UPPSC",
    title: "UPPSC Photo & Signature Size in KB Online Free 2026",
    description:
      "UPPSC photo size & signature size in KB — free Uttar Pradesh PSC form resizer — Size to KB",
    queryHints: ["uppsc photo size", "uppsc signature size", "up pcs photo size"],
  },
  "rpsc-ras-pre": {
    shortName: "RPSC RAS",
    title: "RPSC RAS Photo & Signature Size in KB Online Free 2026",
    description:
      "RPSC RAS Pre photo size & signature size in KB — free Rajasthan PSC form compress — Size to KB",
    queryHints: ["ras photo size", "rpsc ras photo size", "rpsc signature size"],
  },
  "mppsc-adpo": {
    shortName: "MPPSC",
    title: "MPPSC Photo & Signature Size in KB Online Free 2026",
    description:
      "MPPSC photo size & signature size in KB — free Madhya Pradesh PSC form resizer — Size to KB",
    queryHints: ["mppsc photo size", "mppsc signature size"],
  },
  "haryana-cet-group-d": {
    shortName: "Haryana CET",
    title: "Haryana CET Photo & Signature Size in KB Online Free",
    description:
      "Haryana CET Group D photo size & signature size in KB — free compress for HSSC form — Size to KB",
    queryHints: ["haryana cet photo size", "hssc cet photo size"],
  },
  "indian-airforce-agniveer-vayu": {
    shortName: "Agniveer Vayu",
    title: "Agniveer Vayu Photo & Signature Size in KB Online Free",
    description:
      "Indian Air Force Agniveer Vayu photo size & signature size in KB — free form compress — Size to KB",
    queryHints: ["agniveer vayu photo size", "air force agniveer photo size"],
  },
  "indian-navy-agniveer-inet": {
    shortName: "Navy Agniveer",
    title: "Indian Navy Agniveer Photo & Signature Size in KB Free",
    description:
      "Indian Navy Agniveer INET photo size & signature size in KB — free online resizer — Size to KB",
    queryHints: ["navy agniveer photo size", "inet photo size"],
  },
  "aiims-norcet-10th-nursing-officer": {
    shortName: "AIIMS NORCET",
    title: "AIIMS NORCET Photo Size in KB (20–50) Free 2026",
    description:
      "AIIMS NORCET photo size in KB (20–50) & signature size (10–20 KB). Free compress for nursing officer form. Free Download — Size to KB",
    h1: "AIIMS NORCET photo & signature size in KB",
    lead: "NORCET photo 20–50 KB and signature 10–20 KB — Free Download, then upload to the AIIMS form.",
    queryHints: [
      "norcet photo size",
      "aiims norcet photo size",
      "aiims photo size",
      "norcet signature size",
      "aiims norcet signature size",
      "norcet photo size in kb",
    ],
  },
  "aiims-ini-cet": {
    shortName: "INI CET",
    title: "INI CET Photo & Signature Size in KB Online Free 2026",
    description:
      "AIIMS INI CET photo size & signature size in KB — free form resizer — Size to KB",
    queryHints: ["ini cet photo size", "aiims ini cet signature size"],
  },
  "bank-of-india-po": {
    shortName: "Bank of India PO",
    title: "Bank of India PO Photo & Signature Size in KB Free",
    description:
      "Bank of India PO photo size & signature size in KB — free compress for bank form — Size to KB",
    queryHints: ["bank of india po photo size", "boi po photo size"],
  },
  "canara-bank-apprentice": {
    shortName: "Canara Bank Apprentice",
    title: "Canara Bank Apprentice Photo & Signature Size in KB Free",
    description:
      "Canara Bank Apprentice photo size & signature size in KB — free online resizer — Size to KB",
    queryHints: ["canara bank apprentice photo size", "canara bank photo size"],
  },
  "hp-police-constable": {
    shortName: "HP Police Constable",
    title: "HP Police Constable Photo & Signature Size in KB Free",
    description:
      "Himachal Pradesh Police Constable photo size & signature size in KB — free compress — Size to KB",
    queryHints: ["hp police constable photo size", "hp police photo size"],
  },
  jtet: {
    shortName: "JTET",
    title: "JTET Photo & Signature Size in KB Online Free 2026",
    description:
      "JTET photo size & signature size in KB — free Jharkhand teacher form resizer — Size to KB",
    queryHints: ["jtet photo size", "jtet signature size"],
  },
  "nielit-ccc": {
    shortName: "NIELIT CCC",
    title: "NIELIT CCC Photo & Signature Size in KB Online Free",
    description:
      "NIELIT CCC photo size & signature size in KB — free compress for CCC form — Size to KB",
    queryHints: ["nielit ccc photo size", "ccc photo size", "ccc signature size"],
  },
  "application-of-voter-id-card": {
    shortName: "Voter ID",
    title: "Voter ID Photo Size in KB Online Free — Form Upload",
    description:
      "Voter ID / EPIC application photo size in KB — free compress for election form upload — Size to KB",
    queryHints: ["voter id photo size", "epic photo size", "voter card photo size kb"],
  },
};

/** Acronyms to keep uppercase when building a short label from the slug. */
const SLUG_ACRONYMS = new Set([
  "ssc",
  "ibps",
  "sbi",
  "rrb",
  "rrc",
  "upsc",
  "nda",
  "cds",
  "ctet",
  "neet",
  "jee",
  "gate",
  "cat",
  "cuet",
  "afcat",
  "dsssb",
  "bpsc",
  "upsssc",
  "uppsc",
  "rpsc",
  "mppsc",
  "aiims",
  "itat",
  "apssb",
  "nbems",
  "ntpc",
  "alp",
  "mts",
  "chsl",
  "cgl",
  "gd",
  "po",
  "so",
  "si",
  "asi",
  "tgt",
  "aso",
  "cet",
  "ras",
  "ug",
  "pg",
  "ini",
  "cre",
  "ccc",
  "ongc",
  "bsnl",
  "crpf",
  "cisf",
  "ssb",
  "capf",
  "cms",
  "ies",
  "iss",
  "hssc",
  "bpssc",
  "csbc",
  "nfr",
  "ncr",
  "inet",
]);

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => {
      if (SLUG_ACRONYMS.has(part)) return part.toUpperCase();
      if (/^\d/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

/** Short name people type in Google — prefer override, else compact slug label, else exam.name. */
function searchName(exam: Exam, o: Override): string {
  if (o.shortName) return o.shortName;
  const fromSlug = labelFromSlug(exam.slug);
  if (exam.name.length > 42) return fromSlug;
  return exam.name;
}

function photoAndSign(exam: Exam) {
  const photo = exam.documents.find((d) => d.id === "photo" || /photo/i.test(d.label));
  const sign = exam.documents.find((d) => d.id === "sign" || /sign/i.test(d.label));
  return { photo, sign };
}

function photoKbLine(exam: Exam): string {
  const { photo, sign } = photoAndSign(exam);
  const parts: string[] = [];
  if (photo) parts.push(`photo ${photo.minKb}–${photo.maxKb} KB`);
  if (sign) parts.push(`signature ${sign.minKb}–${sign.maxKb} KB`);
  return parts.join(" · ") || "exact KB from the notification";
}

function uniqueKeywords(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const k = raw.trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(raw.trim());
  }
  return out;
}

export function examSeo(exam: Exam): ExamSeoPack {
  const year = exam.year ?? 2026;
  const o = OVERRIDES[exam.slug] ?? {};
  const label = searchName(exam, o);
  const kb = photoKbLine(exam);
  const { photo, sign } = photoAndSign(exam);
  const photoSpec = photo ? formatSpecSummary(photo) : null;
  const signSpec = sign ? formatSpecSummary(sign) : null;
  const photoBand = photo ? `${photo.minKb}–${photo.maxKb} KB` : null;
  const signBand = sign ? `${sign.minKb}–${sign.maxKb} KB` : null;

  const title =
    o.title ??
    (photoBand
      ? `${label} Photo & Signature Size in KB (${photoBand}) Free ${year}`
      : `${label} Photo and Signature Size in KB Online Free ${year}`);

  const description =
    o.description ??
    `${label} photo size & signature size in KB (${kb}). Free crop, compress to exact KB, Free Download on phone for form upload. Private — Size to KB`;

  const h1 = o.h1 ?? `${label} photo & signature size in KB`;

  const lead =
    o.lead ??
    `Match ${label} ${kb}, then Free Download and upload to the official form. Always re-check the latest notification PDF.`;

  const keywords = uniqueKeywords([
    ...(o.queryHints ?? []),
    `${label} photo size`,
    `${label} signature size`,
    `${label} photo and signature size`,
    `${label} photo size in KB`,
    `${label} signature size in KB`,
    `reduce ${label} photo size`,
    `reduce ${label} signature size`,
    `${exam.name} photo size`,
    `${exam.name} signature size`,
    photoBand ? `photo ${photoBand}` : "",
    signBand ? `signature ${signBand}` : "",
    "photo size in KB",
    "signature size in KB",
    "photo and signature size",
    "compress image to 50kb",
    "compress signature to 20kb",
    "photo size kam kaise kare",
    "signature size kam kaise kare",
  ]);

  const faqs = o.faqs ?? [
    {
      q: `What is the ${label} photo size in KB?`,
      a: photoSpec
        ? `For ${label} on this page (verify the official notification): photo typically ${photoSpec.size}${
            photoSpec.dim !== "—" ? ` · ${photoSpec.dim}` : ""
          } · ${photoSpec.fmt}. Always confirm the latest PDF before upload.`
        : `See the size table on this page for ${label} ${year}, and confirm against the official notification.`,
    },
    {
      q: `What is the ${label} signature size in KB?`,
      a: signSpec
        ? `For ${label}: signature typically ${signSpec.size}${
            signSpec.dim !== "—" ? ` · ${signSpec.dim}` : ""
          } · ${signSpec.fmt}. Use the Signature tool below, then Free Download.`
        : `Check the signature row in the ${label} table on this page and the official form instructions.`,
    },
    {
      q: `How do I resize ${label} photo size online free?`,
      a: "Use the Photo tool on this page: crop → compress into the KB range → Free Download. Files stay in your browser; Size to KB does not save your photo.",
    },
    {
      q: `How do I reduce ${label} signature size?`,
      a: "Use the Signature tool: crop tight, optional clean, compress into the KB band, Free Download, then upload to the portal.",
    },
    {
      q: `${label} photo and signature size — can I do this on mobile?`,
      a: "Yes. Open this page in Chrome or Safari, upload from gallery, Free Download the JPG, then attach it in the form.",
    },
    {
      q: "Is this free? Do you store my photo?",
      a: "Yes, free. Processing runs on your device — we do not upload or store your photos or signatures.",
    },
  ];

  return { title, description, h1, lead, keywords, faqs };
}

/** Clearer uploader labels on exam pages */
export function examDocLabel(doc: { id: string; label: string; minKb: number; maxKb: number }): string {
  if (doc.id === "sign" || /sign/i.test(doc.label)) {
    return `Signature (${doc.minKb}–${doc.maxKb} KB)`;
  }
  if (doc.id === "photo" || /photo/i.test(doc.label)) {
    return `Photo (${doc.minKb}–${doc.maxKb} KB)`;
  }
  return `${doc.label} (${doc.minKb}–${doc.maxKb} KB)`;
}
