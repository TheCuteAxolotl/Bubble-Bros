import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  PHONE_FEATURE_ENABLED,
  SERVICE_AREA,
} from "@/lib/constants";
import SocialLinks from "@/components/SocialLinks";

export default function SiteFooter({ blurb }: { blurb: string }) {
  return (
    <footer className="border-t border-white/10 bg-[#0D0D0D] text-white">
      <div className="mx-auto grid max-w-[1540px] gap-12 border-x border-white/10 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#5B8CFF] shadow-[0_0_14px_rgba(91,140,255,.55)]" /><p className="text-3xl font-semibold tracking-[-.045em]">{BUSINESS_NAME}</p></div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/42">{blurb}</p>
          <div className="mt-7"><SocialLinks /></div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-white/28">Explore</p>
            <div className="space-y-2 text-white/65"><a href="/about" className="block hover:text-[#5B8CFF]">About {BUSINESS_NAME}</a><a href="/paint-correction" className="block hover:text-[#5B8CFF]">Paint Correction</a><a href="/ceramic-coatings" className="block hover:text-[#5B8CFF]">Ceramic Coatings</a><a href="/products-we-use" className="block hover:text-[#5B8CFF]">Products We Use</a><a href="/gallery" className="block hover:text-[#5B8CFF]">Gallery</a></div>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-white/28">Services + Help</p>
            <div className="space-y-2 text-white/65"><a href="/car-detailing-packages" className="block hover:text-[#5B8CFF]">Car Packages</a><a href="/exterior-detailing" className="block hover:text-[#5B8CFF]">Exterior Detailing</a><a href="/interior-detailing" className="block hover:text-[#5B8CFF]">Interior Detailing</a><a href="/services#car-add-ons" className="block hover:text-[#5B8CFF]">Car Add-Ons</a><a href="/marine-detailing" className="block hover:text-[#5B8CFF]">Marine Detailing</a><a href="/faq" className="block hover:text-[#5B8CFF]">FAQ</a><a href="/contact" className="block hover:text-[#5B8CFF]">Book</a></div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-white/28">Contact + Legal</p>
            <div className="space-y-2 text-white/65">{PHONE_FEATURE_ENABLED && BUSINESS_PHONE && <a href={`tel:${BUSINESS_PHONE}`} className="block hover:text-[#5B8CFF]">{BUSINESS_PHONE_DISPLAY}</a>}<a href={`mailto:${BUSINESS_EMAIL}`} className="block break-all hover:text-[#5B8CFF]">{BUSINESS_EMAIL}</a><a href="/privacy-policy" className="block hover:text-[#5B8CFF]">Privacy Policy</a><a href="/terms-and-conditions" className="block hover:text-[#5B8CFF]">Terms and Conditions</a></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1540px] flex-col gap-2 border-x border-t border-white/10 px-5 py-5 text-[10px] uppercase tracking-[.2em] text-white/28 sm:flex-row sm:justify-between sm:px-8 lg:px-10"><span>{SERVICE_AREA || "Mobile detailing"}</span><span>Auto + marine detailing</span></div>
    </footer>
  );
}
