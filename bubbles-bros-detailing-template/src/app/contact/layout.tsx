import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Send a booking request or contact Bubbles & Bros. for mobile detailing services.',
  path: "/contact",
  keywords: ['contact Bubbles & Bros.', 'mobile detailer'],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Contact Bubbles & Bros.', path: "/contact" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {children}
    </>
  );
}
