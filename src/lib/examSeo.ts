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

/** CTR-focused overrides for pages already getting Search impressions. */
const OVERRIDES: Record<string, Partial<ExamSeoPack> & { queryHints?: string[] }> = {
  itat: {
    title: "ITAT Photo & Signature Size in KB Online Free 2026",
    description:
      "ITAT photo size & signature size in KB — crop, compress and Free Download on phone. Exact KB for form upload. Private · Size to KB",
    h1: "ITAT photo & signature size in KB",
    lead: "Hit ITAT photo and signature KB limits, then Free Download and upload to the portal.",
    queryHints: ["itat photo size", "itat signature size", "itat photo and signature size"],
  },
  "apssb-constable": {
    title: "APSSB Photo and Signature Size in KB Online Free 2026",
    description:
      "APSSB photo and signature size in KB — free resizer for Constable forms. Crop, compress to exact KB, Free Download. Private browser tool — Size to KB",
    h1: "APSSB photo and signature size in KB",
    lead: "Searched “APSSB photo and signature size”? Use the tools below for exact KB, then Free Download.",
    queryHints: [
      "apssb photo and signature size",
      "apssb photo size",
      "apssb signature size",
      "apssb constable photo size",
    ],
  },
  "upsssc-pet": {
    title: "UPSSSC PET Signature & Photo Size in KB Online Free 2026",
    description:
      "UPSSSC PET signature size & photo size in KB — free online compress for form upload. Crop, hit KB limit, Free Download — Size to KB",
    h1: "UPSSSC PET photo & signature size in KB",
    lead: "UPSSSC PET photo and signature KB limits — compress on phone, Free Download, upload to the form.",
    queryHints: [
      "upsssc pet signature",
      "upsssc pet photo size",
      "upsssc pet signature size",
      "upsssc pet photo and signature size",
    ],
  },
  "rrb-section-controller": {
    title: "RRB Section Controller Photo & Signature Size KB Online Free",
    description:
      "RRB Section Controller photo size & signature size in KB — free resizer. Crop, compress to exact KB, Free Download for Railway form — Size to KB",
    h1: "RRB Section Controller photo & signature size",
    lead: "Match RRB Section Controller photo and signature KB limits, then Free Download for upload.",
    queryHints: [
      "rrb section controller photo size",
      "section controller signature size",
      "rrb section controller signature size",
    ],
  },
  afcat: {
    title: "AFCAT Photo & Signature Size in KB Online Free 2026",
    description:
      "AFCAT photo size & signature size in KB — free compress for Air Force form. Crop, exact KB, Free Download — Size to KB",
    queryHints: ["afcat photo size", "afcat signature size"],
  },
  cuet: {
    title: "CUET Photo & Signature Size in KB Online Free 2026",
    description:
      "CUET photo size & signature size in KB — free online resizer. Crop, compress, Free Download for NTA form — Size to KB",
    queryHints: ["cuet photo size", "cuet signature size"],
  },
  nda: {
    title: "NDA Photo & Signature Size in KB Online Free 2026",
    description:
      "NDA photo size & signature size in KB — free compress for UPSC NDA form. Crop, exact KB, Free Download — Size to KB",
    queryHints: ["nda photo size", "nda signature size"],
  },
  gate: {
    title: "GATE Photo & Signature Size in KB Online Free 2026",
    description:
      "GATE photo size & signature size in KB — free online resizer for IIT form upload. Crop, compress, Free Download — Size to KB",
    queryHints: ["gate photo size", "gate signature size"],
  },
  "railway-nfr-apprentice": {
    title: "Railway NFR Apprentice Photo & Signature Size KB Free",
    description:
      "Railway NFR Apprentice photo & signature size in KB — free compress. Crop, hit KB, Free Download — Size to KB",
  },
  nbems: {
    title: "NBEMS Photo & Signature Size in KB Online Free 2026",
    description:
      "NBEMS photo size & signature size in KB — free online tool. Crop, compress, Free Download — Size to KB",
  },
};

function photoKbLine(exam: Exam): string {
  const photo = exam.documents.find((d) => d.id === "photo" || /photo/i.test(d.label));
  const sign = exam.documents.find((d) => d.id === "sign" || /sign/i.test(d.label));
  const parts: string[] = [];
  if (photo) parts.push(`photo ${photo.minKb}–${photo.maxKb} KB`);
  if (sign) parts.push(`signature ${sign.minKb}–${sign.maxKb} KB`);
  return parts.join(" · ") || "exact KB from the notification";
}

export function examSeo(exam: Exam): ExamSeoPack {
  const year = exam.year ?? 2026;
  const o = OVERRIDES[exam.slug] ?? {};
  const kb = photoKbLine(exam);
  const title =
    o.title ?? `${exam.name} Photo and Signature Size in KB Online Free ${year}`;
  const description =
    o.description ??
    `${exam.name} photo & signature size in KB (${kb}). Free crop + compress + Free Download on phone. Private browser tool — Size to KB`;
  const h1 = o.h1 ?? `${exam.name} photo & signature size in KB`;
  const lead =
    o.lead ??
    `Compress ${exam.name} photo and signature to ${kb}, then Free Download and upload to the official form.`;

  const keywords = [
    ...(o.queryHints ?? []),
    `${exam.name} photo size`,
    `${exam.name} signature size`,
    `${exam.name} photo and signature size`,
    `reduce ${exam.name} photo size`,
    `reduce ${exam.name} signature size`,
    "photo size in KB",
    "signature size in KB",
    "compress image to 50kb",
    "compress signature to 20kb",
    "photo size kam kaise kare",
    "signature size kam kaise kare",
  ];

  const photo = exam.documents.find((d) => d.id === "photo" || /photo/i.test(d.label));
  const sign = exam.documents.find((d) => d.id === "sign" || /sign/i.test(d.label));
  const photoSpec = photo ? formatSpecSummary(photo) : null;
  const signSpec = sign ? formatSpecSummary(sign) : null;

  const faqs = o.faqs ?? [
    {
      q: `What is the ${exam.name} photo and signature size in KB?`,
      a: photoSpec && signSpec
        ? `On this page (verify official notification): photo typically ${photoSpec.size}${
            photoSpec.dim !== "—" ? ` · ${photoSpec.dim}` : ""
          }; signature typically ${signSpec.size}${
            signSpec.dim !== "—" ? ` · ${signSpec.dim}` : ""
          }. Always confirm the latest PDF.`
        : `See the quick reference table on this page for ${exam.name} ${year}. Always confirm against the official notification.`,
    },
    {
      q: `How do I resize ${exam.name} photo size online free?`,
      a: "Use the Photo tool below: crop → compress to KB → Free Download. Processing stays in your browser; we don’t save your file.",
    },
    {
      q: `How do I reduce ${exam.name} signature size?`,
      a: "Use the Signature tool: crop, optional clean, compress into the KB range, then Free Download and upload to the portal.",
    },
    {
      q: "Is this free? Do you store my photo?",
      a: "Yes, free. Files are processed on your device — Size to KB does not upload or save your photos/PDFs.",
    },
    {
      q: "Can I do this on mobile?",
      a: "Yes. Open this page in Chrome or Safari, upload from gallery, Free Download the JPG, then attach it in the form.",
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
