import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import RelatedServiceLinks from "@/components/RelatedServiceLinks";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Car Detailing Packages',
  description: 'Mobile full-detail packages from Bubbles & Bros. for cars, SUVs, and trucks. Compare interior + exterior package options and request an exact quote.',
  path: "/car-detailing-packages",
  keywords: ['car detailing packages', 'mobile car detailing', 'full car detail'],
});

const schema = serviceSchema({
  name: 'Car Detailing Packages',
  description: 'Mobile full-vehicle detailing packages combining interior and exterior care for cars, SUVs, and trucks.',
  path: "/car-detailing-packages",
  serviceType: 'Car detailing',
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Car Detailing Packages', path: "/car-detailing-packages" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={schema} />
      {children}
      <RelatedServiceLinks currentPath="/car-detailing-packages" />
    </>
  );
}
