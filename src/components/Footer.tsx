import Link from "next/link";
import { SevaDeskFooterBlock } from "@/components/SevaDeskPartner";
import { EXAMS } from "@/lib/exams";
import { SITE } from "@/lib/site";

const POPULAR = [
  "afcat",
  "ssc-gd",
  "upsc-cse-pre",
  "railway-ntpc",
  "rrb-group-d",
  "up-police-constable",
  "dsssb-mts",
  "cuet",
  "gate",
  "jee-mains",
  "neet-ug",
  "bpsc",
  "ibps-po",
  "rrb-alp",
  "ssc-chsl",
  "ssc-mts",
  "sbi-clerk",
];

export function Footer() {
  const links = POPULAR.map((slug) => EXAMS.find((e) => e.slug === slug)).filter(Boolean);

  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--footer)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              SizeTo<span className="text-[var(--accent)]">KB</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              Free photo resize online & signature compressor for SSC, UPSC, NEET, JEE, Railway,
              IBPS and {EXAMS.length}+ exams. Compress image to 20KB / 50KB — private, no signup.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/45">Tools</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#custom-tool" className="text-white/75 hover:text-white">
                  Reduce size to KB
                </Link>
              </li>
              <li>
                <Link href="/passport-photo/" className="text-white/75 hover:text-white">
                  Passport photo maker
                </Link>
              </li>
              <li>
                <Link href="/signature-cleaner/" className="text-white/75 hover:text-white">
                  Reduce signature size
                </Link>
              </li>
              <li>
                <Link href="/pdf-editor/" className="text-white/75 hover:text-white">
                  Edit PDF
                </Link>
              </li>
              <li>
                <Link href="/pdf-compressor/" className="text-white/75 hover:text-white">
                  Reduce PDF size
                </Link>
              </li>
              <li>
                <Link href="/bulk-reduce/" className="text-white/75 hover:text-white">
                  Bulk reduce to KB
                </Link>
              </li>
              <li>
                <Link href="/form-wizard/" className="text-white/75 hover:text-white">
                  Form photo wizard
                </Link>
              </li>
              <li>
                <Link href="/upload-fixer/" className="text-white/75 hover:text-white">
                  Upload error fixer
                </Link>
              </li>
              <li>
                <Link href="/size-kam-kaise-kare/" className="text-white/75 hover:text-white">
                  Size kam kaise kare
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-white/75 hover:text-white">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/sitemap/" className="text-white/75 hover:text-white">
                  Full sitemap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/45">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about-us/" className="text-white/75 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us/" className="text-white/75 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap/" className="text-white/75 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/45">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy/" className="text-white/75 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service/" className="text-white/75 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer/" className="text-white/75 hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/45">
            Popular exam photo resizers
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((e) => (
              <Link
                key={e!.slug}
                href={`/${e!.slug}/`}
                className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
              >
                {e!.name} photo size
              </Link>
            ))}
          </div>
        </div>

        <SevaDeskFooterBlock />

        <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/40">
          <p>
            <strong className="text-white/55">People also search:</strong> reduce image size online
            free, reduce photo size for form, reduce signature size in KB, reduce photo size to
            50KB, reduce signature size to 20KB, how to reduce image size in KB, photo size kam
            kaise kare, signature size kam kaise kare, compress image to 20KB, compress image to
            50KB, signature resize 10KB to 20KB, SSC photo size, UPSC photo size, NEET photo size,
            JEE photo size, Railway RRB photo size, IBPS photo size, passport size photo maker, JPG
            compressor online free, decrease image size online, sarkari form photo size, image to
            PDF converter, PDF compressor online free.
          </p>
          <p>
            © {SITE.year} {SITE.name} ({SITE.domain} · {SITE.altDomain}). Always verify specs against
            the latest official notification. Not affiliated with any exam body.
          </p>
        </div>
      </div>
    </footer>
  );
}
