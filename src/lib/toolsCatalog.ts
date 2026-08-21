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
      "Reduce photo and signature size to the exact KB your form needs. Free browser tool for SSC, UPSC, Bank & more — Size to KB",
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
      "Reduce image size and reduce signature size to any min–max KB with optional cm/px. Free for exam form fill — Size to KB",
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
      "Reduce image size online free in KB. Compress photo to 20KB, 50KB or 100KB for SSC, UPSC, NEET & form fill — Size to KB",
    keywords: [
      "reduce image size online free",
      "reduce photo size online",
      "compress image to 50kb",
      "photo size kam kaise kare",
    ],
    featured: true,
  },
  {
    href: "/compress-to-50kb/",
    label: "Compress to 50KB",
    blurb: "Most searched form photo limit",
    category: "size",
    seoTitle: "Compress Image to 50KB Online Free — Reduce Photo Size to 50KB",
    seoDescription:
      "Compress image to 50KB online free. Reduce photo size to 50KB for SSC, UPSC, IBPS, Railway form uploads — Size to KB",
    keywords: [
      "compress image to 50kb",
      "reduce photo size to 50kb",
      "compress photo to 50KB",
      "image compressor 50KB",
    ],
    featured: true,
  },
  {
    href: "/compress-to-20kb/",
    label: "Compress to 20KB",
    blurb: "Strict portal photo / sign size",
    category: "size",
    seoTitle: "Compress Image to 20KB Online Free — Reduce Photo Size to 20KB",
    seoDescription:
      "Compress image to 20KB online free. Reduce photo size to 20KB for SSC, Railway, Bank uploads — Size to KB",
    keywords: [
      "compress image to 20kb",
      "reduce photo size to 20kb",
      "compress photo to 20KB",
      "image compressor 20KB",
    ],
    featured: true,
  },
  {
    href: "/compress-to-100kb/",
    label: "Compress to 100KB",
    blurb: "UPSC / NEET style uploads",
    category: "size",
    seoTitle: "Compress Image to 100KB Online Free — Reduce Photo Size to 100KB",
    seoDescription:
      "Compress image to 100KB online free. Reduce photo size to 100KB for UPSC, NEET, JEE uploads — Size to KB",
    keywords: [
      "compress image to 100kb",
      "reduce photo size to 100kb",
      "compress photo to 100KB",
      "image compressor 100KB",
    ],
    featured: true,
  },
  {
    href: "/compress-to-10kb/",
    label: "Compress to 10KB",
    blurb: "Tight signature / portal limit",
    category: "size",
    seoTitle: "Compress Image to 10KB Online Free — Reduce Photo Size to 10KB",
    seoDescription:
      "Compress image to 10KB online free. Reduce photo or signature size to 10KB for strict form uploads — Size to KB",
    keywords: [
      "compress image to 10kb",
      "reduce photo size to 10kb",
      "compress photo to 10KB",
      "image compressor 10KB",
    ],
    featured: true,
  },
  {
    href: "/compress-to-200kb/",
    label: "Compress to 200KB",
    blurb: "Image compressor to 200KB",
    category: "size",
    seoTitle: "Compress Image to 200KB Online Free — Image Compressor 200KB",
    seoDescription:
      "Compress image to 200KB online free. Image compressor to 200KB for marksheets, certificates & form uploads — Size to KB",
    keywords: [
      "compress image to 200kb",
      "image compressor to 200kb",
      "compress 200kb",
      "reduce photo size to 200kb",
      "compress photo to 200KB",
      "image compressor 200KB",
      "resize image to 200kb",
    ],
    featured: true,
  },
  {
    href: "/compress-to-500kb/",
    label: "Compress to 500KB",
    blurb: "Larger scan / certificate max",
    category: "size",
    seoTitle: "Compress Image to 500KB Online Free — Reduce Photo Size to 500KB",
    seoDescription:
      "Compress image to 500KB online free. Reduce photo or scan size to 500KB for form uploads — Size to KB",
    keywords: [
      "compress image to 500kb",
      "reduce photo size to 500kb",
      "compress photo to 500KB",
      "image compressor 500KB",
    ],
  },
  {
    href: "/min-kb-padder/",
    label: "Min KB padder",
    blurb: "File too small? Pad into min–max KB",
    category: "size",
    seoTitle: "Increase Image Size to Min KB Online Free — Pad Photo to Exact KB Band",
    seoDescription:
      "Portal says file too small? Increase photo or signature size into a min–max KB range online free — Size to KB",
    keywords: [
      "increase image size to KB",
      "file too small upload",
      "pad image to minimum KB",
      "increase photo size online",
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
      "Reduce signature size online free. Clean, crop and compress signature to 10–20 KB for SSC, Bank, Railway forms — Size to KB",
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
      "Reduce photo size and signature size to exam KB specs, then download both in one ZIP — Size to KB",
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
      "Bulk reduce photo size to exact KB online free. Compress many images to 20KB/50KB for SSC, Bank & exam forms — ZIP download. Size to KB",
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
      "Admit card / form photo pack wizard. Reduce photo and signature size to portal KB limits for SSC, IBPS, PAN, Aadhaar — Size to KB",
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
      "Paste portal upload error text and get exact fix: reduce photo/signature/PDF size to the KB limit your form needs — Size to KB",
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
      "Reduce PAN card photo size online free to typical 10–50 KB portal limits. Private browser compressor — Size to KB",
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
      "Reduce Aadhaar / UIDAI photo size online free toward common KB limits for update forms — Size to KB",
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
      "Reduce thumb impression size online free to 10–40 KB for police, bank and exam forms — Size to KB",
    keywords: [
      "reduce thumb impression size",
      "thumb impression size KB",
      "police form thumb impression",
      "compress thumb impression online",
    ],
  },
  {
    href: "/handwritten-declaration/",
    label: "Handwritten declaration",
    blurb: "IBPS/SBI 800×400 · 50–100 KB",
    category: "photo",
    seoTitle: "IBPS Handwritten Declaration Size in KB (50–100) Free 2026",
    seoDescription:
      "Resize IBPS / SBI handwritten declaration to 800×400 px and 50–100 KB JPG online free. Crop, clean & Free Download — Size to KB",
    keywords: [
      "handwritten declaration size KB",
      "IBPS handwritten declaration 50KB to 100KB",
      "SBI handwritten declaration resize",
      "handwritten declaration 800x400",
      "IBPS declaration compressor online free",
    ],
    featured: true,
  },
  {
    href: "/join-photo-signature/",
    label: "Join photo + signature",
    blurb: "One JPG for combined uploads",
    category: "photo",
    seoTitle: "Join Photo and Signature Online Free — One JPG for Forms",
    seoDescription:
      "Combine photo and signature into one JPG for bank / sarkari forms. Side-by-side or stacked, compress to exact KB — Size to KB",
    keywords: [
      "join photo and signature online",
      "combine photo and signature for form",
      "photo signature merge JPG",
      "IBPS photo signature join",
      "photo and signature in one image",
    ],
    featured: true,
  },
  {
    href: "/upload-checker/",
    label: "Upload checker",
    blurb: "KB + pixels preflight before submit",
    category: "photo",
    seoTitle: "Form Upload Checker — Will My Photo Pass KB & Pixels?",
    seoDescription:
      "Check photo, signature, thumb or handwritten declaration against exam KB and pixel rules before upload — Size to KB",
    keywords: [
      "photo upload checker online",
      "check photo size KB before upload",
      "signature size checker",
      "exam form file size checker",
      "will my photo upload pass",
    ],
    featured: true,
  },
  {
    href: "/pdf-compressor/",
    label: "Compress PDF",
    blurb: "Shrink PDF toward target KB",
    category: "pdf",
    seoTitle: "Compress PDF Online Free — Reduce PDF Size to KB",
    seoDescription:
      "Compress PDF online free. Reduce PDF size to 100KB, 200KB, 500KB for exam and government uploads — Size to KB",
    keywords: [
      "compress pdf",
      "compress PDF online free",
      "reduce PDF size online",
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
      "Reduce marksheet / certificate PDF size online free toward 200KB, 500KB or 1MB for scholarship and job portals — Size to KB",
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
      "Reorder and delete PDF pages online free, then compress toward target KB for exam and government uploads — Size to KB",
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
      "Add FOR UPLOAD ONLY watermark on photos or PDFs before sharing. Private browser watermark tool — Size to KB",
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
      "Check photo guidelines: face framing, brightness, blur and background tips before you reduce size to KB for forms — Size to KB",
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
    seoTitle: "Photo Size Kam Kaise Kare — 20KB 50KB Photo Online Free",
    seoDescription:
      "Photo size kam kaise kare — compress to 20KB/50KB/100KB free. Signature & PDF size kam kaise kare guides — Size to KB",
    keywords: [
      "photo size kam kaise kare",
      "signature size kam kaise kare",
      "image size reduce kaise kare",
      "20kb 50kb photo kaise banaye",
    ],
    featured: true,
  },
  {
    href: "/signature-size-kam-kaise-kare/",
    label: "Signature size kam kare",
    blurb: "Hindi guide → 10–20KB",
    category: "extra",
    seoTitle: "Signature Size Kam Kaise Kare — 10KB 20KB Online Free",
    seoDescription:
      "Signature size kam kaise kare — compress signature to 10–20KB for SSC, Bank, Railway — Size to KB",
    keywords: [
      "signature size kam kaise kare",
      "signature 10kb 20kb kaise banaye",
      "reduce signature size to 20KB",
    ],
  },
  {
    href: "/pdf-size-kam-kaise-kare/",
    label: "PDF size kam kare",
    blurb: "Hindi guide → compress PDF",
    category: "extra",
    seoTitle: "PDF Size Kam Kaise Kare — 100KB 200KB 500KB Online Free",
    seoDescription:
      "PDF size kam kaise kare — compress marksheet PDF to 100/200/500KB free — Size to KB",
    keywords: [
      "pdf size kam kaise kare",
      "PDF size 100KB kaise kare",
      "PDF size 200KB kaise kare",
      "marksheet PDF size kam kare",
    ],
  },
  {
    href: "/pdf-editor/",
    label: "Edit PDF",
    blurb: "Text, highlight, draw, images",
    category: "pdf",
    seoTitle: "Edit PDF Online Free — Add Text, Images, Highlight & Draw",
    seoDescription:
      "Advanced PDF editor online free: add text, images, highlights, shapes and drawings, then download. Private browser tool — Size to KB",
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
      "Make India 3.5×4.5 cm or 2×2 inch passport photos. Crop, change background, download JPG or A4 sheet — Size to KB",
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
      "Replace plain photo backgrounds with white for passport and exam form photos — Size to KB",
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
      "Crop images online free for passport and exam forms, then reduce size to the required KB — Size to KB",
    keywords: ["image cropper online free", "crop photo online", "exam photo crop India"],
  },
  {
    href: "/image-merger/",
    label: "Merge images",
    blurb: "Join photos side by side",
    category: "photo",
    seoTitle: "Merge Images Online Free — Combine Photos Before Reduce to KB",
    seoDescription:
      "Merge multiple images into one JPG online free. Horizontal, vertical or grid — Size to KB",
    keywords: ["image merger online free", "combine photos online", "join images side by side"],
  },
  {
    href: "/image-reverse/",
    label: "Flip / rotate",
    blurb: "Mirror or turn before upload",
    category: "photo",
    seoTitle: "Flip & Rotate Photo Online Free — Fix Image Before Reduce to KB",
    seoDescription:
      "Flip image horizontally/vertically or rotate 90° online free, then reduce size to KB for forms — Size to KB",
    keywords: ["flip image online free", "rotate photo online", "mirror image reverse"],
  },
  {
    href: "/color-bw/",
    label: "Color to B&W",
    blurb: "Grayscale or pure black & white",
    category: "photo",
    seoTitle: "Reduce Color Photo to Black & White Online Free",
    seoDescription:
      "Convert photo or signature to grayscale or pure B&W for forms that require it — Size to KB",
    keywords: ["color to black and white online", "grayscale photo converter", "B&W signature"],
  },
  {
    href: "/pdf-merge/",
    label: "Merge PDF",
    blurb: "Combine certificates into one",
    category: "pdf",
    seoTitle: "Merge PDF Online Free — Combine PDF Files",
    seoDescription:
      "Merge PDF online free. Combine multiple PDFs into one for exam certificate uploads, then reduce PDF size if needed — Size to KB",
    keywords: [
      "merge pdf",
      "merge PDF online free",
      "combine PDF files",
      "join PDF India",
      "merge PDF files",
    ],
    featured: true,
  },
  {
    href: "/pdf-split/",
    label: "Split PDF",
    blurb: "Extract pages from a PDF",
    category: "pdf",
    seoTitle: "Split PDF Online Free — Extract PDF Pages",
    seoDescription:
      "Split PDF online free. Extract pages or a page range to reduce upload size — Size to KB",
    keywords: ["split pdf", "split PDF online free", "extract PDF pages", "PDF page splitter"],
  },
  {
    href: "/image-to-pdf/",
    label: "JPG to PDF",
    blurb: "Images → PDF (huge search demand)",
    category: "pdf",
    seoTitle: "JPG to PDF Online Free — Image to PDF Converter",
    seoDescription:
      "JPG to PDF converter online free. Convert images to PDF, reorder pages, reduce toward a target KB for exam uploads — Size to KB",
    keywords: [
      "jpg to pdf",
      "JPG to PDF online free",
      "image to PDF converter",
      "photos to PDF",
      "convert JPG to PDF",
    ],
    featured: true,
  },
  {
    href: "/jpg-to-pdf-kb/",
    label: "JPG to PDF exact KB",
    blurb: "50–100 / 200 / 500 KB PDF bands",
    category: "pdf",
    seoTitle: "JPG to PDF KB Online Free — 50–100KB, 200KB, 500KB",
    seoDescription:
      "Convert JPG / photos to PDF at exact KB bands: 50–100 KB, under 200 KB, under 500 KB. Free certificate & ID upload tool — Size to KB",
    keywords: [
      "jpg to pdf 50kb to 100kb online free",
      "jpg to pdf 70 kb",
      "convert image to pdf 500kb",
      "photo to pdf resize KB",
      "certificate pdf size KB",
    ],
    featured: true,
  },
  {
    href: "/pdf-to-jpg/",
    label: "PDF to JPG",
    blurb: "PDF → JPG · optional 50KB cap",
    category: "pdf",
    seoTitle: "PDF to JPG 50KB Online Free — Convert PDF to Image",
    seoDescription:
      "PDF to JPG 50KB online free — convert PDF pages to JPG/PNG and optionally cap each image at 50KB, 100KB or 200KB — Size to KB",
    keywords: [
      "pdf to jpg 50kb",
      "pdf to jpg",
      "PDF to JPG online free",
      "pdf to jpg 90 kb",
      "convert pdf to jpg less than 100kb",
      "pdf to image",
      "convert PDF to JPG",
    ],
    featured: true,
  },
  {
    href: "/pdf-unlock/",
    label: "Unlock PDF",
    blurb: "Remove PDF password",
    category: "pdf",
    seoTitle: "Unlock PDF Online Free — Remove PDF Password",
    seoDescription:
      "Unlock PDF online free. Remove PDF password and download an unlocked copy in your browser — Size to KB",
    keywords: [
      "unlock PDF",
      "unlock PDF online free",
      "remove PDF password",
      "PDF password remover",
      "decrypt PDF online",
    ],
    featured: true,
  },
  {
    href: "/pdf-to-word/",
    label: "PDF to Word",
    blurb: "Extract text to .docx",
    category: "convert",
    seoTitle: "PDF to Word Online Free — Convert PDF to DOCX",
    seoDescription:
      "PDF to Word converter online free. Convert PDF to DOCX / editable Word in your browser. Best for text PDFs — Size to KB",
    keywords: [
      "pdf to word",
      "PDF to Word online free",
      "PDF to DOCX converter",
      "convert PDF to Word India",
    ],
    featured: true,
  },
  {
    href: "/word-to-pdf/",
    label: "Word to PDF",
    blurb: "DOCX for portal uploads",
    category: "convert",
    seoTitle: "Word to PDF Online Free — Convert DOCX to PDF",
    seoDescription:
      "Word to PDF converter online free. Convert DOCX to PDF, then reduce PDF size to KB for exam portals — Size to KB",
    keywords: [
      "word to pdf",
      "Word to PDF online free",
      "DOCX to PDF converter",
      "convert Word to PDF India",
    ],
    featured: true,
  },
  {
    href: "/heic-to-jpg/",
    label: "HEIC to JPG",
    blurb: "iPhone photos for portals",
    category: "convert",
    seoTitle: "HEIC to JPG Online Free — Then Reduce Image Size to KB",
    seoDescription:
      "Convert iPhone HEIC/HEIF to JPG online free, then reduce image size to the KB your form needs — Size to KB",
    keywords: ["HEIC to JPG online free", "convert HEIC to JPEG", "iPhone photo to JPG"],
  },
  {
    href: "/image-convert/",
    label: "JPG / PNG / WebP",
    blurb: "Change format for uploads",
    category: "convert",
    seoTitle: "Convert JPG PNG WebP Online Free — Reduce File Size for Forms",
    seoDescription:
      "Convert between JPG, PNG and WebP online free to reduce file size for exam form uploads — Size to KB",
    keywords: ["JPG to PNG converter", "PNG to JPG online", "WebP converter free"],
  },
  {
    href: "/image-checker/",
    label: "Check photo size",
    blurb: "Pixels, KB, print estimate",
    category: "extra",
    seoTitle: "Check Photo Size Online Free — Pixels, KB & DPI Before Upload",
    seoDescription:
      "Check photo width, height, KB size and estimated print size before you reduce or upload — Size to KB",
    keywords: ["image DPI checker", "check photo pixels KB", "photo size checker online"],
  },
  {
    href: "/id-masker/",
    label: "Mask ID numbers",
    blurb: "Blur Aadhaar before sharing",
    category: "extra",
    seoTitle: "Aadhaar ID Masker Online Free — Blur Numbers Before Share",
    seoDescription:
      "Blur Aadhaar or ID numbers on photos before sharing. Private browser tool — Size to KB",
    keywords: ["Aadhaar masker online", "blur ID number photo", "mask Aadhaar card"],
  },
  {
    href: "/biodata/",
    label: "Biodata / resume maker",
    blurb: "Sarkari biodata → print PDF",
    category: "extra",
    seoTitle: "Free Sarkari Biodata & Resume Maker Online — Print Ready PDF",
    seoDescription:
      "Free sarkari biodata / resume maker with photo upload, education, skills packs and print-ready PDF — Size to KB",
    keywords: [
      "biodata maker",
      "sarkari biodata maker",
      "resume maker online free",
      "biodata format for government job",
      "bio data maker with photo",
    ],
    featured: true,
  },
  {
    href: "/photo-name-date/",
    label: "Name & date on photo",
    blurb: "Stamp name + date on exam photo",
    category: "photo",
    seoTitle: "Add Name and Date on Photo Online Free — Exam Form Photo Stamp",
    seoDescription:
      "Add candidate name and date on photo online free for SSC, Bank, Railway form uploads — Size to KB",
    keywords: [
      "name and date on photo",
      "write name on photo online",
      "exam photo name date",
      "stamp name on photograph",
    ],
    featured: true,
  },
  {
    href: "/age-calculator/",
    label: "Age as on date",
    blurb: "Exam cut-off age calculator",
    category: "extra",
    seoTitle: "Age Calculator As On Date Online Free — Exam Form Cut-off Age",
    seoDescription:
      "Calculate age as on date for SSC, Bank, Railway and government exam forms — Size to KB",
    keywords: [
      "age calculator as on date",
      "age as on date calculator",
      "exam age calculator",
      "SSC age calculator",
    ],
    featured: true,
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
