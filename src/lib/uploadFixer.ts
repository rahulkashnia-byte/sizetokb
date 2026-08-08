export type FixSuggestion = {
  title: string;
  reason: string;
  href: string;
  cta: string;
};

const RULES: { match: RegExp; suggestion: FixSuggestion }[] = [
  {
    match: /heic|heif|not a valid jpeg|invalid image format|unsupported format/i,
    suggestion: {
      title: "Convert HEIC to JPG",
      reason: "Many portals reject iPhone HEIC photos.",
      href: "/heic-to-jpg/",
      cta: "HEIC → JPG",
    },
  },
  {
    match: /file size|too large|maximum size|exceed|kb|mb|size limit|less than|upto|up to/i,
    suggestion: {
      title: "Reduce size to KB",
      reason: "Portal is rejecting the file for being over the KB/MB limit.",
      href: "/#custom-tool",
      cta: "Reduce to KB",
    },
  },
  {
    match: /signature/i,
    suggestion: {
      title: "Reduce signature size",
      reason: "Signature uploads often need 10–20 KB with clean white background.",
      href: "/signature-cleaner/",
      cta: "Clean signature",
    },
  },
  {
    match: /dimension|width|height|pixel|200\s*[x×]\s*230|resolution|cm/i,
    suggestion: {
      title: "Passport / form photo size",
      reason: "Wrong width×height — use passport maker or custom dimensions.",
      href: "/passport-photo/",
      cta: "Passport photo",
    },
  },
  {
    match: /background|white bg|plain background/i,
    suggestion: {
      title: "White background",
      reason: "Background is not plain white enough.",
      href: "/white-background/",
      cta: "Fix background",
    },
  },
  {
    match: /pdf|document.*size|certificate/i,
    suggestion: {
      title: "Reduce PDF size",
      reason: "PDF upload is over the portal limit.",
      href: "/pdf-compressor/",
      cta: "Shrink PDF",
    },
  },
  {
    match: /blur|unclear|not clear|quality/i,
    suggestion: {
      title: "Photo quality check",
      reason: "Image may be blurry or dark — check guidelines then retake.",
      href: "/photo-guide/",
      cta: "Check photo",
    },
  },
  {
    match: /png|webp|format not allowed|only jpg|only jpeg/i,
    suggestion: {
      title: "Convert to JPG",
      reason: "Portal wants JPG only.",
      href: "/image-convert/",
      cta: "Convert format",
    },
  },
];

export function suggestFixes(errorText: string): FixSuggestion[] {
  const text = errorText.trim();
  if (!text) return [];
  const hits: FixSuggestion[] = [];
  const seen = new Set<string>();
  for (const rule of RULES) {
    if (rule.match.test(text) && !seen.has(rule.suggestion.href)) {
      hits.push(rule.suggestion);
      seen.add(rule.suggestion.href);
    }
  }
  if (!hits.length) {
    hits.push({
      title: "Reduce size to KB",
      reason: "Most upload errors are size or format — start by hitting the exact KB range.",
      href: "/#custom-tool",
      cta: "Reduce to KB",
    });
    hits.push({
      title: "Check photo guidelines",
      reason: "Verify brightness, blur and background before re-uploading.",
      href: "/photo-guide/",
      cta: "Photo guide",
    });
  }
  return hits.slice(0, 5);
}
