import type { Metadata } from "next";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  FACEBOOK_URL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  SERVICE_AREA,
  SITE_URL,
} from "@/lib/business-config";

export { SITE_URL, BUSINESS_NAME, BUSINESS_EMAIL };

export const SERVICE_AREAS = SERVICE_AREA ? [SERVICE_AREA] : [];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const sameAs = [FACEBOOK_URL, INSTAGRAM_URL, GOOGLE_BUSINESS_URL].filter(Boolean);

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/bubbles-bros-logo.png"),
  image: absoluteUrl("/bubbles-bros-logo.png"),
  ...(BUSINESS_PHONE ? { telephone: BUSINESS_PHONE } : {}),
  email: BUSINESS_EMAIL,
  priceRange: "$$",
  description: SERVICE_AREA
    ? `Mobile car detailing serving ${SERVICE_AREA}, including interior detailing, exterior detailing, and complete vehicle detailing.`
    : "Mobile car detailing including interior detailing, exterior detailing, and complete vehicle detailing.",
  ...(SERVICE_AREA
    ? {
        areaServed: [{ "@type": "Place", name: SERVICE_AREA }],
      }
    : {}),
  ...(sameAs.length ? { sameAs } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Detailing Services",
    itemListElement: [
      "Interior Detailing",
      "Exterior Detailing",
      "Full Car Detailing",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType: serviceType || name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#business` },
    ...(SERVICE_AREAS.length
      ? { areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area })) }
      : {}),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
