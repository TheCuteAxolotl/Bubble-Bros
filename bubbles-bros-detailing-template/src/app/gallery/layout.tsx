import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: 'Car Detailing Gallery | Before & After Work',
  description: 'See recent Bubbles & Bros. work including interior cleanups, exterior details, full vehicle details, and vehicle transformations.',
  path: "/gallery",
  keywords: ['car detailing before after', 'detailing gallery'],
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: 'Car Detailing Gallery', path: "/gallery" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {children}
    </>
  );
}
