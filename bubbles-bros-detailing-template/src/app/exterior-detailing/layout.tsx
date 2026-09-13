import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import RelatedServiceLinks from "@/components/RelatedServiceLinks";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Exterior Car Detailing',
  description: 'Mobile exterior detailing including hand washing, decontamination, wheel cleaning, gloss enhancement, and paint protection options.',
  path: "/exterior-detailing",
  keywords: ['exterior detailing', 'mobile car wash detailing', 'car paint protection'],
});

const schema = serviceSchema({
  name: 'Exterior Car Detailing',
  description: 'Mobile exterior detailing including safe washing, decontamination, wheel care, gloss enhancement, and protection.',
  path: "/exterior-detailing",
  serviceType: 'Exterior detailing',
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Exterior Car Detailing', path: "/exterior-detailing" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={schema} />
      {children}
      <RelatedServiceLinks currentPath="/exterior-detailing" />
    </>
  );
}
