import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd, webAppJsonLd, websiteJsonLd } from "@/components/JsonLd";
import { PwaRegister } from "@/components/PwaRegister";
import { SiteChrome } from "@/components/SiteChrome";
import { defaultMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  applicationName: SITE.seoName,
  appleWebApp: {
    capable: true,
    title: SITE.seoName,
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
        <GoogleAnalytics />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={webAppJsonLd()} />
        <PwaRegister />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
