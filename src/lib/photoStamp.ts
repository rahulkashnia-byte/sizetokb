import { loadImageFromFile } from "@/lib/image";

export type StampOptions = {
  name: string;
  dateText: string;
  position: "bottom" | "top" | "bottom-left" | "bottom-right";
  fontScale?: number; // 1 = default
  filename?: string;
};

export type StampResult = {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  sizeKb: number;
  filename: string;
};

/**
 * Burn name + date onto a photo (common exam / form requirement).
 */
export async function stampNameDateOnPhoto(file: File, opts: StampOptions): Promise<StampResult> {
  const name = opts.name.trim();
  const dateText = opts.dateText.trim();
  if (!name && !dateText) throw new Error("Enter name and/or date");

  const img = await loadImageFromFile(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const lines = [name, dateText].filter(Boolean);
  const base = Math.max(14, Math.round(Math.min(w, h) * 0.035 * (opts.fontScale ?? 1)));
  ctx.font = `bold ${base}px Lato, Arial, sans-serif`;
  ctx.textBaseline = "bottom";
  ctx.lineWidth = Math.max(2, Math.round(base / 8));
  ctx.strokeStyle = "rgba(0,0,0,0.75)";
  ctx.fillStyle = "#ffffff";

  const lineH = base * 1.25;
  const pad = Math.round(base * 0.6);
  let x = pad;
  let y = h - pad;

  if (opts.position === "top") {
    ctx.textBaseline = "top";
    y = pad;
  } else if (opts.position === "bottom-right") {
    ctx.textAlign = "right";
    x = w - pad;
  } else if (opts.position === "bottom-left" || opts.position === "bottom") {
    ctx.textAlign = "left";
    x = pad;
  }

  if (opts.position === "top") {
    lines.forEach((line, i) => {
      const yy = y + i * lineH;
      ctx.strokeText(line, x, yy);
      ctx.fillText(line, x, yy);
    });
  } else {
    lines
      .slice()
      .reverse()
      .forEach((line, i) => {
        const yy = y - i * lineH;
        ctx.strokeText(line, x, yy);
        ctx.fillText(line, x, yy);
      });
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), "image/jpeg", 0.92);
  });

  return {
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h,
    sizeKb: Math.round((blob.size / 1024) * 10) / 10,
    filename: `${opts.filename || "photo-name-date"}.jpg`,
  };
}
