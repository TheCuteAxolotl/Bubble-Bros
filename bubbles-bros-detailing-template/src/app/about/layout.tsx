import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'About Bubbles & Bros.',
  description: 'Learn about Bubbles & Bros., a mobile detailing business focused on convenient service, clear communication, paint care, and finished details.',
  path: "/about",
  keywords: ['Bubbles & Bros. detailing', 'mobile detailing business'],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'About Bubbles & Bros.', path: "/about" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {children}
    </>
  );
}
