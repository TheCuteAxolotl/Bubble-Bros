import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Mobile Detailing Services',
  description: 'Explore Bubbles & Bros. mobile auto detailing services for full-car, interior, and exterior cleaning, plus detailing add-ons.',
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
