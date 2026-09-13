import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import RelatedServiceLinks from "@/components/RelatedServiceLinks";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Exterior Car Detailing',
  description: 'Mobile exterior detailing including hand washing, wheel cleaning, bug removal, glass, decontamination, and simple paint protection.',
  path: "/exterior-detailing",
  keywords: ['exterior detailing', 'mobile car wash detailing', 'mobile exterior detail'],
});

const schema = serviceSchema({
  name: 'Exterior Car Detailing',
  description: 'Mobile exterior detailing including safe washing, wheel care, glass cleaning, decontamination, and simple protection.',
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
