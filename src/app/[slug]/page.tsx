import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationPack } from "@/components/ApplicationPack";
import { DocUploader } from "@/components/DocUploader";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { SevaDeskPartnerStrip } from "@/components/SevaDeskPartner";
import { ShareButtons } from "@/components/ShareButtons";
import { EXAMS, getExam } from "@/lib/exams";
import { examDocLabel, examSeo } from "@/lib/examSeo";
import { formatSpecSummary } from "@/lib/format";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return EXAMS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Exam not found" };
  const seo = examSeo(exam);
  const url = `${SITE.url}/${exam.slug}/`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE.seoName,
      locale: SITE.locale,
      type: "website",
    },
  };
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const year = exam.year ?? 2026;
  const seo = examSeo(exam);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: exam.name, path: `/${exam.slug}/` },
        ])}
      />
      <JsonLd data={faqJsonLd(seo.faqs)} />

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-10 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          {exam.name} · {year} · Free
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          {seo.h1}{" "}
          <span className="text-[var(--accent)]">{year}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">{seo.lead}</p>
        <TrustPills />
        <ol className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 text-left text-xs font-semibold text-[var(--ink)] sm:gap-3">
          {[
            "1 · Crop photo / sign",
            "2 · Compress to KB",
            "3 · Free Download",
            "4 · Upload to portal",
          ].map((step) => (
            <li
              key={step}
              className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 shadow-sm"
            >
              {step}
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--muted)]">
          Different limits?{" "}
          <a href="/custom/" className="font-bold text-[var(--accent-ink)]">
            Open Custom KB
          </a>
          {" · "}
          <a href="/hindi/" className="font-bold text-[var(--accent-ink)]">
            हिंदी
          </a>
          {" · "}
          <a href="/telugu/" className="font-bold text-[var(--accent-ink)]">
            తెలుగు
          </a>
          {" · "}
          <a href="/tamil/" className="font-bold text-[var(--accent-ink)]">
            தமிழ்
          </a>
        </p>
        {seo.tips && seo.tips.length > 0 ? (
          <div className="mx-auto mt-5 max-w-2xl space-y-2 text-left">
            {seo.tips.map((tip) => (
              <p
                key={tip}
                className="rounded-2xl border border-[var(--line)] bg-[var(--wash)] px-4 py-3 text-sm text-[var(--ink)]"
              >
                <span className="font-bold text-[var(--accent-ink)]">Tip · </span>
                {tip}
              </p>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--card-shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] bg-[var(--wash)] px-5 py-3">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
                Resize tools
              </h2>
              <p className="text-xs text-[var(--muted)]">
                After compress, tap <strong className="text-[var(--accent-ink)]">Free Download</strong>
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--muted)]">
              {exam.documents.length} Docs
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            {exam.documents.map((doc) => (
              <DocUploader
                key={doc.id}
                spec={{ ...doc, label: examDocLabel(doc) }}
                examSlug={exam.slug}
              />
            ))}
          </div>
        </div>

        <ApplicationPack exam={exam} />

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          <div className="border-b border-[var(--line)] bg-[var(--wash)] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              {exam.name} photo & signature size table {year}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-xs uppercase tracking-wide text-[var(--muted)]">
                  <th className="px-4 py-3 font-bold">Document</th>
                  <th className="px-4 py-3 font-bold">File size</th>
                  <th className="px-4 py-3 font-bold">Format</th>
                  <th className="px-4 py-3 font-bold">Dimensions</th>
                </tr>
              </thead>
              <tbody>
                {exam.documents.map((doc) => {
                  const s = formatSpecSummary(doc);
                  return (
                    <tr key={doc.id} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 font-semibold">{examDocLabel(doc)}</td>
                      <td className="px-4 py-3">{s.size}</td>
                      <td className="px-4 py-3">{s.fmt}</td>
                      <td className="px-4 py-3">{s.dim}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--muted)]">
            Always verify against the latest official {exam.name} notification before submitting.
          </p>
        </div>
      </section>

      <Faq items={seo.faqs} />

      <SevaDeskPartnerStrip examSlug={exam.slug} examName={exam.name} />

      <SeoKeywordBlock
        heading={`${exam.name} photo size and signature size in KB`}
        paragraphs={[
          `Aspirants search “${exam.name} photo size”, “${exam.name} signature size”, and “${exam.name} photo and signature size” before form fill. Use this free Size to KB page to crop, compress to the KB table above, Free Download, then upload to the official portal.`,
          `Processing stays on your device — we don’t save your photos. Re-check the latest notification; boards may change dimensions and min–max KB.`,
        ]}
        links={[
          { href: "/custom/", label: "Custom KB tool" },
          { href: "/compress-to-50kb/", label: "Compress to 50KB" },
          { href: "/signature-cleaner/", label: "Signature 10–20KB" },
          ...(seo.relatedLinks ?? []),
          { href: "/hindi/", label: "हिंदी में इस्तेमाल करें" },
          { href: "/telugu/", label: "తెలుగులో ఉపయోగించండి" },
          { href: "/disclaimer/", label: "Disclaimer" },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <ShareButtons
          title={`${exam.name} photo & signature size — Size to KB`}
          text={`Reduce ${exam.name} photo & signature size to exact KB free on Size to KB`}
          path={`/${exam.slug}/`}
        />
      </div>
    </>
  );
}
