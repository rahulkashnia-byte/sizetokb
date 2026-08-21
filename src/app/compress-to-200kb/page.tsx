"use client";

import { Faq } from "@/components/Faq";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { TargetKbLander } from "@/components/TargetKbLander";

const FAQS = [
  {
    q: "How do I compress an image to 200KB online free?",
    a: "Upload your photo on this page, crop if needed, then Free Download when the file is at or under 200KB. Processing stays in your browser.",
  },
  {
    q: "What is an image compressor to 200KB used for?",
    a: "Many portals cap scans, marksheets, certificates or documents at 200KB. This tool targets that limit while keeping the photo as clear as possible.",
  },
  {
    q: "Can I compress 200KB photos on mobile?",
    a: "Yes. Open this page in Chrome or Safari, pick from gallery, Free Download the JPG, then upload to your form.",
  },
  {
    q: "File still above 200KB?",
    a: "Crop tighter, or lower the max slightly and run again. For a different limit use Compress to 100KB / 500KB or Custom KB.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <TargetKbLander
        targetKb={200}
        titleAccent="200KB"
        path="/compress-to-200kb/"
        subtitle="Image compressor to 200KB — reduce photo or scan size for marksheets, certificates and form uploads. Free · private."
        seoHeading="Compress image to 200KB · image compressor to 200KB"
        paragraphs={[
          "People search “compress image to 200kb”, “image compressor to 200kb”, and “compress 200kb” when a form rejects oversized scans. Use this free Size to KB tool to reduce photo size to 200KB, Free Download, then upload.",
          "Works for marksheet / certificate photos, UPSC-style larger uploads, and any portal with a 200KB max. Private — we don’t save your file.",
        ]}
      />
      <Faq items={FAQS} />
    </>
  );
}
