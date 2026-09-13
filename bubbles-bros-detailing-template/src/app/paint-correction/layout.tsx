import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import RelatedServiceLinks from "@/components/RelatedServiceLinks";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Paint Correction',
  description: 'Paint enhancement and correction from Bubbles & Bros. for swirl marks, haze, oxidation, wash marring, and loss of gloss. Inspection-based correction.',
  path: "/paint-correction",
  keywords: ['paint correction', 'paint enhancement', 'swirl removal'],
});

const schema = serviceSchema({
  name: 'Paint Correction',
  description: 'Machine polishing and paint correction for swirls, haze, oxidation, wash marring, and gloss restoration.',
  path: "/paint-correction",
  serviceType: 'Paint correction',
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Paint Correction', path: "/paint-correction" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={schema} />
      {children}
      <RelatedServiceLinks currentPath="/paint-correction" />
    </>
  );
}
