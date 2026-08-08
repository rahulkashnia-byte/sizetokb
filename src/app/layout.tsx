import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd, webAppJsonLd, websiteJsonLd } from "@/components/JsonLd";
import { PwaRegister } from "@/components/PwaRegister";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  applicationName: "SizeToKB",
  appleWebApp: {
    capable: true,
    title: "SizeToKB",
    statusBarStyle: "default",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon-32.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#c45c26",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-[family-name:var(--font-lato)]">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={webAppJsonLd()} />
        <PwaRegister />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
