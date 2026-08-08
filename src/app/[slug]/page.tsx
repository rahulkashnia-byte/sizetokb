import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocUploader } from "@/components/DocUploader";
import { Faq } from "@/components/Faq";
import { TrustPills } from "@/components/Features";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/JsonLd";
import { SeoKeywordBlock } from "@/components/SeoKeywordBlock";
import { EXAMS, getExam } from "@/lib/exams";
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
  const year = exam.year ?? 2026;
  const title = `Reduce ${exam.name} Photo & Signature Size ${year} | KB Online Free`;
  const description = `Reduce ${exam.name} photo size & signature size online free. Compress image to required KB (often 20–50KB photo / 10–20KB signature) for ${year} form fill — SizeToKB.in`;
  const url = `${SITE.url}/${exam.slug}/`;
  return {
    title,
    description,
    keywords: [
      `reduce ${exam.name} photo size`,
      `reduce ${exam.name} signature size`,
      `${exam.name} photo size`,
      `${exam.name} signature size`,
      `${exam.name} photo resize`,
      "reduce image size online",
      "reduce signature size online",
      "reduce image size in KB",
      "compress image to 50kb",
      "compress signature to 20kb",
      "photo size kam kaise kare",
      "signature size kam kaise kare",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
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
  const faqs = [
    {
      q: `Is ${exam.name} photo and signature resizer free?`,
      a: "Yes — SizeToKB is free. No registration. Processing stays in your browser.",
    },
    {
      q: `What is the ${exam.name} photo size in KB?`,
      a: `Check the quick reference table on this page for ${exam.name} ${year}. Always confirm against the official notification before submitting.`,
    },
    {
      q: "Can I resize on mobile?",
      a: "Yes. Use Chrome/Safari on Android or iPhone, upload from gallery, download the JPG, and attach it to your form.",
    },
    {
      q: "Why does output show out of range?",
      a: "Very small source images may stay under the minimum KB. Use a clearer, higher-resolution original.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: exam.name, path: `/${exam.slug}/` },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-10 text-center sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
          {exam.name} — size photo & signature to KB{" "}
          <span className="text-[var(--accent)]">{year}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
          Compress {exam.name} documents to the KB window below. Need different limits?{" "}
          <a href="/custom/" className="font-bold text-[var(--accent-ink)]">
            Open Custom
          </a>
          .
        </p>
        <TrustPills />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--card-shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] bg-[var(--wash)] px-5 py-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
              {exam.name}
            </h2>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--muted)]">
              {exam.documents.length} Docs
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            {exam.documents.map((doc) => (
              <DocUploader key={doc.id} spec={doc} examSlug={exam.slug} />
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          <div className="border-b border-[var(--line)] bg-[var(--wash)] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              {exam.name} Quick Reference Table {year}
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
                      <td className="px-4 py-3 font-semibold">{doc.label}</td>
                      <td className="px-4 py-3">{s.size}</td>
                      <td className="px-4 py-3">{s.fmt}</td>
                      <td className="px-4 py-3">{s.dim}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq items={faqs} />

      <SeoKeywordBlock
        heading={`Reduce ${exam.name} image size & signature size online free`}
        paragraphs={[
          `Use this free tool to reduce ${exam.name} photo size and reduce ${exam.name} signature size to the KB limits in the table above. Aspirants search “${exam.name} photo size”, “${exam.name} signature size”, reduce image size in KB, reduce signature size online, compress image to 50KB, compress signature to 20KB, photo size kam kaise kare, and signature size kam kaise kare before form upload.`,
          `Processing stays on your device. After download, upload the JPG to the official ${exam.name} portal. Re-check the latest notification — boards may change dimensions and min–max KB.`,
        ]}
        links={[
          { href: "/custom/", label: "Reduce to any custom KB" },
          { href: "/image-resizer/", label: "Image size reducer" },
          { href: "/", label: "All exam presets" },
          { href: "/disclaimer/", label: "Disclaimer" },
        ]}
      />
    </>
  );
}
