export type UploadRule = {
  id: string;
  label: string;
  /** Short SEO / UI hint */
  blurb: string;
  minKb: number;
  maxKb: number;
  width?: number;
  height?: number;
  /** Allowed percent tolerance on pixels (default 5) */
  dimTolerancePct?: number;
  preferJpg?: boolean;
  fixHref: string;
  fixLabel: string;
};

export const UPLOAD_RULES: UploadRule[] = [
  {
    id: "ssc-ibps-photo",
    label: "SSC / IBPS / Bank photo",
    blurb: "Usually 200×230 px · 20–50 KB JPG",
    minKb: 20,
    maxKb: 50,
    width: 200,
    height: 230,
    preferJpg: true,
    fixHref: "/compress-to-50kb/",
    fixLabel: "Compress to 50KB",
  },
  {
    id: "signature",
    label: "Signature (10–20 KB)",
    blurb: "Often 140×60 px · 10–20 KB JPG",
    minKb: 10,
    maxKb: 20,
    width: 140,
    height: 60,
    preferJpg: true,
    fixHref: "/signature-cleaner/",
    fixLabel: "Signature cleaner",
  },
  {
    id: "declaration",
    label: "Handwritten declaration",
    blurb: "IBPS/SBI style 800×400 · 50–100 KB",
    minKb: 50,
    maxKb: 100,
    width: 800,
    height: 400,
    preferJpg: true,
    fixHref: "/handwritten-declaration/",
    fixLabel: "Declaration tool",
  },
  {
    id: "thumb",
    label: "Thumb impression",
    blurb: "Typically 10–40 KB JPG",
    minKb: 10,
    maxKb: 40,
    preferJpg: true,
    fixHref: "/thumb-impression/",
    fixLabel: "Thumb tool",
  },
  {
    id: "upsc-photo",
    label: "UPSC-style photo (up to 300 KB)",
    blurb: "Often 20–300 KB JPG",
    minKb: 20,
    maxKb: 300,
    preferJpg: true,
    fixHref: "/compress-to-200kb/",
    fixLabel: "Compress to 200KB",
  },
  {
    id: "custom",
    label: "Custom min–max KB",
    blurb: "Type limits from your notification",
    minKb: 20,
    maxKb: 50,
    preferJpg: true,
    fixHref: "/custom/",
    fixLabel: "Custom reduce",
  },
];

export type CheckIssue = {
  level: "pass" | "warn" | "fail";
  message: string;
};

export type UploadCheckResult = {
  sizeKb: number;
  width: number;
  height: number;
  mime: string;
  issues: CheckIssue[];
  ok: boolean;
};

export function getUploadRule(id: string) {
  return UPLOAD_RULES.find((r) => r.id === id);
}

export async function checkUploadAgainstRule(
  file: File,
  rule: UploadRule,
  overrides?: { minKb?: number; maxKb?: number; width?: number; height?: number }
): Promise<UploadCheckResult> {
  const minKb = overrides?.minKb ?? rule.minKb;
  const maxKb = overrides?.maxKb ?? rule.maxKb;
  const widthNeed = overrides?.width ?? rule.width;
  const heightNeed = overrides?.height ?? rule.height;
  const tol = (rule.dimTolerancePct ?? 5) / 100;

  const sizeKb = Math.round((file.size / 1024) * 10) / 10;
  const mime = file.type || "unknown";
  const dims = await readImageSize(file);
  const issues: CheckIssue[] = [];

  if (rule.preferJpg !== false) {
    const isJpg = /jpe?g/i.test(mime) || /\.jpe?g$/i.test(file.name);
    if (!isJpg) {
      issues.push({
        level: "fail",
        message: `Format looks like “${mime || file.name}” — most portals want JPG/JPEG.`,
      });
    } else {
      issues.push({ level: "pass", message: "Format looks like JPG/JPEG." });
    }
  }

  if (sizeKb > maxKb) {
    issues.push({
      level: "fail",
      message: `File is ${sizeKb} KB — over the ${maxKb} KB max.`,
    });
  } else if (sizeKb < minKb) {
    issues.push({
      level: "fail",
      message: `File is ${sizeKb} KB — under the ${minKb} KB minimum (portal may reject “too small”).`,
    });
  } else {
    issues.push({
      level: "pass",
      message: `Size ${sizeKb} KB is inside ${minKb}–${maxKb} KB.`,
    });
  }

  if (widthNeed && heightNeed) {
    const wOk =
      Math.abs(dims.width - widthNeed) <= Math.max(2, widthNeed * tol);
    const hOk =
      Math.abs(dims.height - heightNeed) <= Math.max(2, heightNeed * tol);
    if (!wOk || !hOk) {
      issues.push({
        level: "warn",
        message: `Pixels are ${dims.width}×${dims.height}; many forms expect about ${widthNeed}×${heightNeed}.`,
      });
    } else {
      issues.push({
        level: "pass",
        message: `Pixels ${dims.width}×${dims.height} match the expected box.`,
      });
    }
  } else {
    issues.push({
      level: "pass",
      message: `Pixels ${dims.width}×${dims.height} (no fixed size in this rule).`,
    });
  }

  const ok = !issues.some((i) => i.level === "fail");
  return {
    sizeKb,
    width: dims.width,
    height: dims.height,
    mime,
    issues,
    ok,
  };
}

function readImageSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image pixels"));
    };
    img.src = url;
  });
}
