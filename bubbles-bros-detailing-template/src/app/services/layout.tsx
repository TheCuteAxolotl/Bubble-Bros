import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Mobile Detailing Services',
  description: 'Explore Bubbles & Bros. services for full car detailing, interior and exterior detailing, paint correction, ceramic protection, add-ons, and marine detailing.',
  path: "/services",
  keywords: ['detailing services', 'mobile detailer', 'car detailing services'],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Mobile Detailing Services', path: "/services" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {children}
    </>
  );
}
