import type { Metadata } from "next";
import { CustomResizeTool } from "@/components/CustomResizeTool";
import { TrustPills } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { ShareButtons } from "@/components/ShareButtons";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Size to KB ಕನ್ನಡ — ಫೋಟೋ & ಸಹಿ ಗಾತ್ರವನ್ನು KBಗೆ ಕಡಿಮೆ ಮಾಡಿ",
  description:
    "ಫೋಟೋ ಗಾತ್ರ ಹೇಗೆ ಕಡಿಮೆ ಮಾಡುವುದು? Size to KB ಕನ್ನಡದಲ್ಲಿ — 20KB / 50KB / 100KBಗೆ compress ಮಾಡಿ. ಸಹಿ 10–20KB. ಫೈಲ್ ಸೇವ್ ಆಗುವುದಿಲ್ಲ — ಉಚಿತ.",
  path: "/kannada/",
  keywords: [
    "photo size reduce kannada",
    "ಫೋಟೋ ಗಾತ್ರ ಕಡಿಮೆ",
    "signature size reduce kannada",
    "photo 50kb kannada",
    "size to kb kannada",
  ],
});

const FAQS = [
  {
    q: "ಫೋಟೋ ಗಾತ್ರ ಹೇಗೆ ಕಡಿಮೆ ಮಾಡುವುದು?",
    a: "ಕೆಳಗಿನ ಟೂಲ್‌ನಲ್ಲಿ ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಿ, crop ಮಾಡಿ, min–max KB ಸೆಟ್ ಮಾಡಿ Free Download ಒತ್ತಿರಿ.",
  },
  {
    q: "ನನ್ನ ಫೋಟೋ ಸೇವ್ ಆಗುತ್ತದೆಯೇ?",
    a: "ಇಲ್ಲ. ಪ್ರೊಸೆಸಿಂಗ್ ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲೇ — ನಾವು ಫೋಟೋ/PDF ಸೇವ್ ಮಾಡುವುದಿಲ್ಲ.",
  },
  {
    q: "50KB ಫೋಟೋ ಹೇಗೆ ಮಾಡುವುದು?",
    a: "Compress to 50KB ಪುಟ ತೆರೆಯಿರಿ ಅಥವಾ ಟೂಲ್‌ನಲ್ಲಿ max 50KB ಇರಿಸಿ.",
  },
];

export default function KannadaHomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          ಕನ್ನಡ · Size to KB
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          ಫೋಟೋ & ಸಹಿ ಗಾತ್ರವನ್ನು{" "}
          <span className="text-[var(--accent)]">exact KB</span>ಗೆ ಕಡಿಮೆ ಮಾಡಿ
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          SSC, Bank, Railway ಫಾರಂಗಳಿಗೆ 20KB / 50KB / 100KB. ಉಚಿತ · ಖಾಸಗಿ · ಫೈಲ್ ಸೇವ್ ಇಲ್ಲ.
        </p>
        <TrustPills />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/kannada/compress-to-50kb/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-white"
          >
            50KBಗೆ compress
          </Link>
          <Link
            href="/kannada/photo-size-kadime/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold"
          >
            ಗಾತ್ರ ಹೇಗೆ ಕಡಿಮೆ
          </Link>
          <Link
            href="/hindi/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
          >
            हिंदी
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
          >
            English
          </Link>
        </div>
      </section>

      <div id="tool" className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--card-shadow)] sm:p-7">
          <CustomResizeTool
            embedded
            initialMinKb={20}
            initialMaxKb={50}
            headline="ಇಲ್ಲಿ KB ಸೆಟ್ ಮಾಡಿ resize ಮಾಡಿ"
            subhead="Crop → compress → Free Download. ನಂತರ ಫಾರಂನಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
          />
        </div>
        <ShareButtons
          className="mt-6"
          title="Size to KB ಕನ್ನಡ — ಫೋಟೋ ಗಾತ್ರ ಕಡಿಮೆ"
          text="ಫೋಟೋ & ಸಹಿ exact KB — Size to KB"
          path="/kannada/"
        />
      </div>

      <Faq items={FAQS} />
      <SeoKeywordBlock
        heading="Photo size reduce Kannada — ಕನ್ನಡ ಮಾರ್ಗದರ್ಶಿ"
        paragraphs={[
          "Size to KB ನಲ್ಲಿ ಫೋಟೋ ಗಾತ್ರ ಕಡಿಮೆ ಮಾಡಿ: ಟೂಲ್ ತೆರೆಯಿರಿ, ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಿ, KB ಮಿತಿ ಸೆಟ್ ಮಾಡಿ Free Download ಮಾಡಿ. ಸಹಿಗೆ 10–20KB ಇರಿಸಿ. KPSC / Bank ಫಾರಂಗಳಿಗೂ ಉಪಯುಕ್ತ.",
        ]}
        links={[
          { href: "/kannada/compress-to-50kb/", label: "50KB tool" },
          { href: "/kannada/photo-size-kadime/", label: "ಗಾತ್ರ ಕಡಿಮೆ" },
          { href: "/tamil/", label: "தமிழ்" },
          { href: "/marathi/", label: "मराठी" },
          { href: "/telugu/", label: "తెలుగు" },
          { href: "/hindi/", label: "हिंदी" },
          { href: "/", label: "English home" },
        ]}
      />
    </>
  );
}
