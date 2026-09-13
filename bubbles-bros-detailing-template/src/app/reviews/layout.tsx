import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Customer Reviews',
  description: 'Read customer reviews and feedback for Bubbles & Bros. mobile detailing services.',
  path: "/reviews",
  keywords: ['Bubbles & Bros. reviews', 'detailer reviews'],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Bubbles & Bros. Reviews', path: "/reviews" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {children}
    </>
  );
}
