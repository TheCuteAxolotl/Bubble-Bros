import SitePhoto from "@/components/SitePhoto";
import { SiteContentKey } from "@/lib/site-defaults";
import type { SiteContent } from "@/lib/site-defaults";
import { getSiteContent } from "@/lib/site-content";

type Props = {
  imageCategory: string;
  eyebrowKey: SiteContentKey;
  titleKey: SiteContentKey;
  bodyKey: SiteContentKey;
  action?: React.ReactNode;
  content?: SiteContent;
};

export default async function PublicHero({ imageCategory, eyebrowKey, titleKey, bodyKey, action, content }: Props) {
  const resolvedContent = content ?? (await getSiteContent());

  return (
    <section className="border-b border-[#000B3D]/10 bg-[#F7F9FD] text-[#0B0F19]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:px-10 lg:py-20">
        <div className="py-4 lg:py-10">
          <p className="inline-flex rounded-full border border-[#000B3D]/12 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[.25em] text-[#000B3D]">
            {resolvedContent[eyebrowKey]}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.06em] text-[#000B3D] sm:text-7xl lg:text-[6.4rem]">
            {resolvedContent[titleKey]}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/55 sm:text-lg">{resolvedContent[bodyKey]}</p>
          {action && <div className="mt-8">{action}</div>}
        </div>

        <div className="relative min-h-[360px] sm:min-h-[500px]">
          <div className="absolute inset-4 rounded-[34px] bg-[#000B3D]" />
          <div className="absolute inset-0 overflow-hidden rounded-[34px] border-[8px] border-white bg-[#EEF2FA] shadow-[0_26px_70px_rgba(0,11,61,.16)] sm:inset-x-8">
            <SitePhoto category={imageCategory} fallbackCategory="hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000B3D]/42 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
