import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd, webAppJsonLd, websiteJsonLd } from "@/components/JsonLd";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-lato)]">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={webAppJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
