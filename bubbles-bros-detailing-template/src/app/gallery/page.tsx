import DynamicGallery from "@/components/DynamicGallery";
import PublicHero from "@/components/PublicHero";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B0F19]">
      <PublicHero imageCategory="gallery-hero" eyebrowKey="galleryEyebrow" titleKey="galleryTitle" bodyKey="galleryBody" />
      <main className="mx-auto max-w-[1540px] border-x border-[#000B3D]/10 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <DynamicGallery />
      </main>
    </div>
  );
}
