/** Single source of truth for tool nav + SEO */

export type ToolCategory = "size" | "photo" | "pdf" | "convert" | "extra";

export type ToolDef = {
  href: string;
  /** Short label for grids / nav */
  label: string;
  /** One-line benefit */
  blurb: string;
  category: ToolCategory;
  /** Full <title> — lead with reduce / size-to-KB intent where it fits */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Highlight on home / header */
  featured?: boolean;
};

export const TOOL_CATEGORIES: { id: ToolCategory; title: string }[] = [
  { id: "size", title: "Reduce size to KB" },
  { id: "photo", title: "Photo & signature" },
  { id: "pdf", title: "PDF tools" },
  { id: "convert", title: "Convert & edit" },
  { id: "extra", title: "More helpers" },
];

export const TOOLS: ToolDef[] = [
  {
    href: "/#custom-tool",
    label: "Reduce size to KB",
    blurb: "Set any min–max KB on this page",
    category: "size",
    seoTitle: "Reduce Image & Signature Size to Exact KB Online Free",
    seoDescription:
      "Reduce photo and signature size to the exact KB your form needs. Free browser tool for SSC, UPSC, Bank & more — SizeToKB.in",
    keywords: [
      "reduce image size to KB",
      "reduce signature size online",
      "reduce photo size for form",
    ],
    featured: true,
  },
  {
    href: "/custom/",
    label: "Custom reduce to KB",
    blurb: "Dedicated custom min–max KB page",
    category: "size",
    seoTitle: "Reduce Photo & Signature Size to Any Custom KB Online Free",
    seoDescription:
      "Reduce image size and reduce signature size to any min–max KB with optional cm/px. Free for exam form fill — SizeToKB.in",
    keywords: [
      "reduce signature size to 20KB",
      "reduce photo size to 50KB",
      "custom reduce image size KB",
      "signature size kam kaise kare",
    ],
    featured: true,
  },
  {
    href: "/image-resizer/",
    label: "Reduce image size",
    blurb: "Compress photo to 20 / 50 / 100 KB",
    category: "size",
    seoTitle: "Reduce Image Size Online Free — Compress Photo to 20KB, 50KB, 100KB",
    seoDescription:
      "Reduce image size online free in KB. Compress photo to 20KB, 50KB or 100KB for SSC, UPSC, NEET & form fill — SizeToKB.in",
    keywords: [
      "reduce image size online free",
      "reduce photo size online",
      "compress image to 50kb",
      "photo size kam kaise kare",
    ],
    featured: true,
  },
  {
    href: "/signature-cleaner/",
    label: "Reduce signature size",
    blurb: "Clean ink and hit 10–20 KB",
    category: "size",
    seoTitle: "Reduce Signature Size Online Free — Compress Signature to 10KB–20KB",
    seoDescription:
      "Reduce signature size online free. Clean, crop and compress signature to 10–20 KB for SSC, Bank, Railway forms — SizeToKB.in",
    keywords: [
      "reduce signature size online",
      "compress signature to 20KB",
      "reduce signature size to 10KB",
      "signature resize SSC",
    ],
    featured: true,
  },
  {
    href: "/exam-pack/",
    label: "Exam photo + sign pack",
    blurb: "Reduce both to KB, one ZIP",
    category: "size",
    seoTitle: "Reduce Exam Photo & Signature Size to KB — Download ZIP Pack",
    seoDescription:
      "Reduce photo size and signature size to exam KB specs, then download both in one ZIP — SizeToKB.in",
    keywords: [
      "exam photo signature zip",
      "reduce photo and signature size",
      "SSC photo pack",
    ],
  },
  {
    href: "/bulk-reduce/",
    label: "Bulk reduce to KB",
    blurb: "Many photos → one ZIP",
    category: "size",
    seoTitle: "Bulk Reduce Image Size to KB Online Free — Compress Many Photos at Once",
    seoDescription:
      "Bulk reduce photo size to exact KB online free. Compress many images to 20KB/50KB for SSC, Bank & exam forms — ZIP download. SizeToKB.in",
    keywords: [
      "bulk reduce image size to KB",
      "compress multiple photos to 50kb",
      "batch photo compressor online free",
      "reduce many images size KB",
    ],
    featured: true,
  },
  {
    href: "/form-wizard/",
    label: "Form photo wizard",
    blurb: "Preset packs for portals",
    category: "size",
    seoTitle: "Form Photo Pack Wizard — Reduce Photo & Signature Size to KB",
    seoDescription:
      "Admit card / form photo pack wizard. Reduce photo and signature size to portal KB limits for SSC, IBPS, PAN, Aadhaar — SizeToKB.in",
    keywords: [
      "form photo size wizard",
      "admit card photo size",
      "reduce photo signature pack KB",
      "SSC form photo pack",
    ],
    featured: true,
  },
  {
    href: "/upload-fixer/",
    label: "Upload error fixer",
    blurb: "Paste error → exact KB fix",
    category: "size",
    seoTitle: "Portal Upload Error Fixer — Reduce File Size to Match KB Limit",
    seoDescription:
      "Paste portal upload error text and get exact fix: reduce photo/signature/PDF size to the KB limit your form needs — SizeToKB.in",
    keywords: [
      "file size exceeds maximum limit fix",
      "photo upload error fix",
      "reduce size to match portal limit",
      "signature size too large fix",
    ],
    featured: true,
  },
  {
    href: "/pan-photo/",
    label: "Reduce PAN photo",
    blurb: "PAN card photo to KB",
    category: "size",
    seoTitle: "Reduce PAN Card Photo Size Online Free to KB",
    seoDescription:
      "Reduce PAN card photo size online free to typical 10–50 KB portal limits. Private browser compressor — SizeToKB.in",
    keywords: [
      "reduce PAN photo size",
      "PAN card photo size KB",
      "UTIITSL photo size",
      "compress PAN application photo",
    ],
  },
  {
    href: "/aadhaar-photo/",
    label: "Reduce Aadhaar photo",
    blurb: "UIDAI-style photo to KB",
    category: "size",
    seoTitle: "Reduce Aadhaar Photo Size Online Free to KB",
    seoDescription:
      "Reduce Aadhaar / UIDAI photo size online free toward common KB limits for update forms — SizeToKB.in",
    keywords: [
      "reduce Aadhaar photo size",
      "Aadhaar photo size KB",
      "UIDAI photo compress",
      "Aadhaar photo resize online",
    ],
  },
  {
    href: "/thumb-impression/",
    label: "Thumb impression",
    blurb: "Clean & reduce to 10–40 KB",
    category: "size",
    seoTitle: "Reduce Thumb Impression Size Online Free to KB",
    seoDescription:
      "Reduce thumb impression size online free to 10–40 KB for police, bank and exam forms — SizeToKB.in",
    keywords: [
      "reduce thumb impression size",
      "thumb impression size KB",
      "police form thumb impression",
      "compress thumb impression online",
    ],
  },
  {
    href: "/pdf-compressor/",
    label: "Reduce PDF size",
    blurb: "Shrink PDF toward target KB",
    category: "pdf",
    seoTitle: "Reduce PDF Size Online Free — Compress PDF to KB",
    seoDescription:
      "Reduce PDF size online free toward a target KB for exam and government uploads. Browser PDF compressor — SizeToKB.in",
    keywords: [
      "reduce PDF size online",
      "compress PDF to KB",
      "PDF compressor online free",
      "PDF size reducer India",
    ],
    featured: true,
  },
  {
    href: "/marksheet-pdf/",
    label: "Marksheet PDF shrink",
    blurb: "200 / 500 KB presets",
    category: "pdf",
    seoTitle: "Reduce Marksheet PDF Size Online Free to 200KB 500KB",
    seoDescription:
      "Reduce marksheet / certificate PDF size online free toward 200KB, 500KB or 1MB for scholarship and job portals — SizeToKB.in",
    keywords: [
      "reduce marksheet PDF size",
      "compress certificate PDF 200KB",
      "marksheet PDF compressor",
      "reduce PDF to 500KB online",
    ],
    featured: true,
  },
  {
    href: "/pdf-organize/",
    label: "Reorder PDF pages",
    blurb: "Delete / reorder then shrink",
    category: "pdf",
    seoTitle: "Reorder Delete PDF Pages Online Free — Then Reduce PDF Size to KB",
    seoDescription:
      "Reorder and delete PDF pages online free, then compress toward target KB for exam and government uploads — SizeToKB.in",
    keywords: [
      "reorder PDF pages online free",
      "delete PDF pages online",
      "organize PDF pages",
      "reduce PDF size after reorder",
    ],
  },
  {
    href: "/watermark/",
    label: "Watermark FOR UPLOAD",
    blurb: "Stamp photo or PDF safely",
    category: "extra",
    seoTitle: "Watermark Photo & PDF Online Free — FOR UPLOAD ONLY Stamp",
    seoDescription:
      "Add FOR UPLOAD ONLY watermark on photos or PDFs before sharing. Private browser watermark tool — SizeToKB.in",
    keywords: [
      "watermark photo online free",
      "FOR UPLOAD ONLY watermark",
      "watermark PDF online",
      "stamp image for upload",
    ],
  },
  {
    href: "/photo-guide/",
    label: "Photo guidelines check",
    blurb: "Brightness, blur, framing tips",
    category: "extra",
    seoTitle: "Photo Guidelines Checker Online Free — Before Reduce Size to KB",
    seoDescription:
      "Check photo guidelines: face framing, brightness, blur and background tips before you reduce size to KB for forms — SizeToKB.in",
    keywords: [
      "photo guidelines checker",
      "passport photo quality check",
      "exam photo requirements check",
      "photo brightness blur check",
    ],
  },
  {
    href: "/size-kam-kaise-kare/",
    label: "Size kam kaise kare",
    blurb: "Hindi SEO guide + tools",
    category: "extra",
    seoTitle: "Photo Size Kam Kaise Kare — Reduce Image & Signature Size to KB Free",
    seoDescription:
      "Photo size kam kaise kare aur signature size kam kaise kare — free tools to reduce to 20KB/50KB and signature 10–20KB — SizeToKB.in",
    keywords: [
      "photo size kam kaise kare",
      "signature size kam kaise kare",
      "image size reduce kaise kare",
      "20kb 50kb photo kaise banaye",
    ],
  },
  {
    href: "/pdf-editor/",
    label: "Edit PDF",
    blurb: "Text, highlight, draw, images",
    category: "pdf",
    seoTitle: "Edit PDF Online Free — Add Text, Images, Highlight & Draw",
    seoDescription:
      "Advanced PDF editor online free: add text, images, highlights, shapes and drawings, then download. Private browser tool — SizeToKB.in",
    keywords: [
      "edit PDF online free",
      "PDF editor online",
      "annotate PDF free",
      "add text to PDF",
      "highlight PDF online",
    ],
    featured: true,
  },
  {
    href: "/passport-photo/",
    label: "Passport photo maker",
    blurb: "3.5×4.5 cm, crop, background, print",
    category: "photo",
    seoTitle: "Passport Size Photo Maker Online Free — Reduce Photo to Form Size",
    seoDescription:
      "Make India 3.5×4.5 cm or 2×2 inch passport photos. Crop, change background, download JPG or A4 sheet — SizeToKB.in",
    keywords: [
      "passport size photo maker",
      "reduce photo to passport size",
      "3.5x4.5 photo online",
      "2x2 photo maker India",
    ],
    featured: true,
  },
  {
    href: "/white-background/",
    label: "White background",
    blurb: "Plain wall → white for forms",
    category: "photo",
    seoTitle: "White Background Photo Maker — Reduce BG Noise for Passport Photos",
    seoDescription:
      "Replace plain photo backgrounds with white for passport and exam form photos — SizeToKB.in",
    keywords: [
      "white background photo maker",
      "passport white background",
      "remove background white online",
    ],
  },
  {
    href: "/image-cropper/",
    label: "Crop photo",
    blurb: "Crop then reduce to KB",
    category: "photo",
    seoTitle: "Crop Photo Online Free — Then Reduce Image Size to KB",
    seoDescription:
      "Crop images online free for passport and exam forms, then reduce size to the required KB — SizeToKB.in",
    keywords: ["image cropper online free", "crop photo online", "exam photo crop India"],
  },
  {
    href: "/image-merger/",
    label: "Merge images",
    blurb: "Join photos side by side",
    category: "photo",
    seoTitle: "Merge Images Online Free — Combine Photos Before Reduce to KB",
    seoDescription:
      "Merge multiple images into one JPG online free. Horizontal, vertical or grid — SizeToKB.in",
    keywords: ["image merger online free", "combine photos online", "join images side by side"],
  },
  {
    href: "/image-reverse/",
    label: "Flip / rotate",
    blurb: "Mirror or turn before upload",
    category: "photo",
    seoTitle: "Flip & Rotate Photo Online Free — Fix Image Before Reduce to KB",
    seoDescription:
      "Flip image horizontally/vertically or rotate 90° online free, then reduce size to KB for forms — SizeToKB.in",
    keywords: ["flip image online free", "rotate photo online", "mirror image reverse"],
  },
  {
    href: "/color-bw/",
    label: "Color to B&W",
    blurb: "Grayscale or pure black & white",
    category: "photo",
    seoTitle: "Reduce Color Photo to Black & White Online Free",
    seoDescription:
      "Convert photo or signature to grayscale or pure B&W for forms that require it — SizeToKB.in",
    keywords: ["color to black and white online", "grayscale photo converter", "B&W signature"],
  },
  {
    href: "/pdf-merge/",
    label: "Merge PDF",
    blurb: "Combine certificates into one",
    category: "pdf",
    seoTitle: "Merge PDF Online Free — Combine Files Then Reduce PDF Size",
    seoDescription:
      "Merge multiple PDFs into one for exam certificate uploads, then reduce PDF size if needed — SizeToKB.in",
    keywords: ["merge PDF online free", "combine PDF files", "join PDF India"],
  },
  {
    href: "/pdf-split/",
    label: "Split PDF",
    blurb: "Extract pages from a PDF",
    category: "pdf",
    seoTitle: "Split PDF Online Free — Extract Pages to Reduce Upload Size",
    seoDescription:
      "Split a PDF into separate pages or extract a range online free to reduce upload size — SizeToKB.in",
    keywords: ["split PDF online free", "extract PDF pages", "PDF page splitter"],
  },
  {
    href: "/image-to-pdf/",
    label: "Image to PDF",
    blurb: "Photos → PDF with KB target",
    category: "pdf",
    seoTitle: "Image to PDF Converter Free — Reduce Photos to PDF KB Limit",
    seoDescription:
      "Convert images to PDF online free, reorder pages, and reduce toward a target KB for exam uploads — SizeToKB.in",
    keywords: ["image to PDF converter", "JPG to PDF online free", "photos to PDF"],
  },
  {
    href: "/pdf-to-word/",
    label: "PDF to Word",
    blurb: "Extract text to .docx",
    category: "convert",
    seoTitle: "PDF to Word Online Free — Convert PDF to DOCX",
    seoDescription:
      "Convert PDF to Word (.docx) online free in your browser. Best for text PDFs — SizeToKB.in",
    keywords: ["PDF to Word online free", "PDF to DOCX converter", "convert PDF to Word India"],
  },
  {
    href: "/word-to-pdf/",
    label: "Word to PDF",
    blurb: "DOCX for portal uploads",
    category: "convert",
    seoTitle: "Word to PDF Online Free — Then Reduce PDF Size to KB",
    seoDescription:
      "Convert Word (.docx) to PDF online free, then reduce PDF size to KB for exam portals — SizeToKB.in",
    keywords: ["Word to PDF online free", "DOCX to PDF converter", "convert Word to PDF India"],
  },
  {
    href: "/heic-to-jpg/",
    label: "HEIC to JPG",
    blurb: "iPhone photos for portals",
    category: "convert",
    seoTitle: "HEIC to JPG Online Free — Then Reduce Image Size to KB",
    seoDescription:
      "Convert iPhone HEIC/HEIF to JPG online free, then reduce image size to the KB your form needs — SizeToKB.in",
    keywords: ["HEIC to JPG online free", "convert HEIC to JPEG", "iPhone photo to JPG"],
  },
  {
    href: "/image-convert/",
    label: "JPG / PNG / WebP",
    blurb: "Change format for uploads",
    category: "convert",
    seoTitle: "Convert JPG PNG WebP Online Free — Reduce File Size for Forms",
    seoDescription:
      "Convert between JPG, PNG and WebP online free to reduce file size for exam form uploads — SizeToKB.in",
    keywords: ["JPG to PNG converter", "PNG to JPG online", "WebP converter free"],
  },
  {
    href: "/image-checker/",
    label: "Check photo size",
    blurb: "Pixels, KB, print estimate",
    category: "extra",
    seoTitle: "Check Photo Size Online Free — Pixels, KB & DPI Before Upload",
    seoDescription:
      "Check photo width, height, KB size and estimated print size before you reduce or upload — SizeToKB.in",
    keywords: ["image DPI checker", "check photo pixels KB", "photo size checker online"],
  },
  {
    href: "/id-masker/",
    label: "Mask ID numbers",
    blurb: "Blur Aadhaar before sharing",
    category: "extra",
    seoTitle: "Aadhaar ID Masker Online Free — Blur Numbers Before Share",
    seoDescription:
      "Blur Aadhaar or ID numbers on photos before sharing. Private browser tool — SizeToKB.in",
    keywords: ["Aadhaar masker online", "blur ID number photo", "mask Aadhaar card"],
  },
];

export function toolsForNav() {
  return TOOLS.filter((t) => t.href !== "/#custom-tool");
}

export function featuredTools() {
  return TOOLS.filter((t) => t.featured);
}

export function toolByPath(path: string) {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return TOOLS.find((t) => t.href === normalized);
}
