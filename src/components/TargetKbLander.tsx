import { CustomResizeTool } from "@/components/CustomResizeTool";
import { TrustPills } from "@/components/Features";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import Link from "next/link";

const RELATED = [
  { href: "/compress-to-10kb/", label: "Compress to 10KB" },
  { href: "/compress-to-20kb/", label: "Compress to 20KB" },
  { href: "/compress-to-50kb/", label: "Compress to 50KB" },
  { href: "/compress-to-100kb/", label: "Compress to 100KB" },
  { href: "/compress-to-200kb/", label: "Compress to 200KB" },
  { href: "/compress-to-500kb/", label: "Compress to 500KB" },
  { href: "/signature-cleaner/", label: "Signature 10–20KB" },
  { href: "/min-kb-padder/", label: "Min KB padder" },
  { href: "/#custom-tool", label: "Custom KB" },
];

export function TargetKbLander({
  targetKb,
  titleAccent,
  path,
  seoHeading,
  paragraphs,
}: {
  targetKb: number;
  titleAccent: string;
  path: string;
  seoHeading: string;
  paragraphs: string[];
}) {
  const minKb = Math.max(1, Math.round(targetKb * 0.4));
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl">
          Compress Image to <span className="text-[var(--accent)]">{titleAccent}</span>
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Reduce photo size to {targetKb}KB online free for SSC, Bank, Railway and government form
          uploads. Private browser tool.
        </p>
        <TrustPills />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {RELATED.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                l.href === path
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-white text-[var(--ink)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
        <CustomResizeTool
          initialMinKb={minKb}
          initialMaxKb={targetKb}
          defaultFilename={`photo-${targetKb}kb`}
          headline={`Hit ${targetKb} KB max`}
          subhead={`Preset for compress image to ${targetKb}KB — adjust min/max if your portal differs.`}
        />
      </div>

      <ShareButtons
        className="mt-6"
        title={`Compress image to ${targetKb}KB online free — Size to KB`}
        text={`Reduce photo size to ${targetKb}KB free on Size to KB`}
        path={path}
      />
      <SeoKeywordBlock heading={seoHeading} paragraphs={paragraphs} links={RELATED} />
    </div>
  );
}
