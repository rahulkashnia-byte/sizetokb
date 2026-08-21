import type { DocSpec } from "@/lib/types";

export type FormPreset = {
  id: string;
  name: string;
  blurb: string;
  photo: DocSpec;
  signature?: DocSpec;
  seoKeywords: string[];
};

export const FORM_PRESETS: FormPreset[] = [
  {
    id: "ssc-style",
    name: "SSC / IBPS / RRB style",
    blurb: "Photo 20–50 KB · Signature 10–20 KB",
    photo: {
      id: "photo",
      label: "Photo",
      minKb: 20,
      maxKb: 50,
      width: 200,
      height: 230,
      unit: "px",
      format: "jpg",
    },
    signature: {
      id: "signature",
      label: "Signature",
      minKb: 10,
      maxKb: 20,
      unit: "px",
      format: "jpg",
      scanEffect: true,
    },
    seoKeywords: ["SSC photo size", "IBPS photo signature size", "RRB photo size KB"],
  },
  {
    id: "pan",
    name: "PAN card photo",
    blurb: "Typical portal photo under ~20–50 KB",
    photo: {
      id: "photo",
      label: "PAN Photo",
      minKb: 10,
      maxKb: 50,
      width: 213,
      height: 213,
      unit: "px",
      format: "jpg",
    },
    seoKeywords: ["PAN card photo size", "reduce PAN photo size KB", "UTI PAN photo"],
  },
  {
    id: "aadhaar",
    name: "Aadhaar / UIDAI style",
    blurb: "Square-ish ID photo, reduce to KB",
    photo: {
      id: "photo",
      label: "Aadhaar Photo",
      minKb: 10,
      maxKb: 50,
      width: 300,
      height: 300,
      unit: "px",
      format: "jpg",
    },
    seoKeywords: ["Aadhaar photo size", "reduce Aadhaar photo KB", "UIDAI photo size"],
  },
  {
    id: "passport",
    name: "India passport 3.5×4.5 cm",
    blurb: "413×531 @ ~300 DPI look, under 100 KB",
    photo: {
      id: "photo",
      label: "Passport Photo",
      minKb: 20,
      maxKb: 100,
      width: 413,
      height: 531,
      unit: "px",
      format: "jpg",
    },
    seoKeywords: ["passport size photo KB", "3.5x4.5 photo size", "passport photo online"],
  },
  {
    id: "thumb",
    name: "Thumb impression",
    blurb: "High-contrast thumb 10–40 KB",
    photo: {
      id: "thumb",
      label: "Thumb",
      minKb: 10,
      maxKb: 40,
      unit: "px",
      format: "jpg",
      scanEffect: true,
    },
    seoKeywords: [
      "thumb impression size KB",
      "reduce thumb impression online",
      "police form thumb impression",
    ],
  },
  {
    id: "handwritten-declaration",
    name: "IBPS / SBI handwritten declaration",
    blurb: "800×400 px · 50–100 KB JPG",
    photo: {
      id: "declaration",
      label: "Handwritten declaration",
      minKb: 50,
      maxKb: 100,
      width: 800,
      height: 400,
      unit: "px",
      format: "jpg",
      scanEffect: true,
    },
    seoKeywords: [
      "handwritten declaration size KB",
      "IBPS handwritten declaration 50KB 100KB",
      "SBI declaration resize online",
      "handwritten declaration 800x400",
    ],
  },
];

export function getFormPreset(id: string) {
  return FORM_PRESETS.find((p) => p.id === id);
}
