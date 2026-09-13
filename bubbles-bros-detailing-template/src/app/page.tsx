import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience";
import StructuredData from "@/components/StructuredData";
import { absoluteUrl, pageMetadata, SITE_URL } from "@/lib/seo";
import { BUSINESS_NAME, SERVICE_AREA } from "@/lib/constants";
import { getSiteContent } from "@/lib/site-content";

const locationSuffix = SERVICE_AREA ? ` in ${SERVICE_AREA}` : "";

export const metadata: Metadata = pageMetadata({
  title: `Mobile Detailing${locationSuffix}`,
  description: `${BUSINESS_NAME} provides mobile interior and exterior detailing, paint correction, ceramic protection, and marine detailing${locationSuffix}.`,
  path: "/",
  keywords: SERVICE_AREA
    ? [
        `mobile detailing ${SERVICE_AREA}`,
        `car detailing ${SERVICE_AREA}`,
        `interior detailing ${SERVICE_AREA}`,
        `paint correction ${SERVICE_AREA}`,
        `ceramic coating ${SERVICE_AREA}`,
      ]
    : ["mobile detailing", "car detailing", "interior detailing", "paint correction", "ceramic coating"],
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS_NAME,
  publisher: { "@id": `${SITE_URL}/#business` },
  potentialAction: {
    "@type": "CommunicateAction",
    target: absoluteUrl("/quote"),
    name: "Get an Exact Quote",
  },
};

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <StructuredData data={websiteSchema} />
      <HomeExperience initialContent={content} />
    </>
  );
}
