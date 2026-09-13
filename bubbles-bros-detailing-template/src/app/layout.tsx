import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SupportWidget from "@/components/SupportWidget";
import StructuredData from "@/components/StructuredData";
import { localBusinessSchema, SITE_URL } from "@/lib/seo";
import { BUSINESS_NAME, SERVICE_AREA } from "@/lib/constants";
import { getSiteContent } from "@/lib/site-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locationSuffix = SERVICE_AREA ? ` in ${SERVICE_AREA}` : "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} | Mobile Detailing${locationSuffix}`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: `Mobile auto and marine detailing${locationSuffix}. Interior detailing, exterior detailing, paint correction, ceramic coatings, and condition-based exact quotes.`,
  applicationName: BUSINESS_NAME,
  category: "automotive detailing",
  openGraph: {
    siteName: BUSINESS_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = await getSiteContent();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex min-h-screen flex-col bg-[#0D0D0D] text-white">
        <StructuredData data={localBusinessSchema} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter blurb={siteContent.footerBlurb} />
        <SupportWidget />
      </body>
    </html>
  );
}
