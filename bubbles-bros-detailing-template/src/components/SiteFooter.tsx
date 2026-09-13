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
    <footer className="border-t border-[#000B3D]/10 bg-white text-[#0B0F19]">
      <div className="mx-auto grid max-w-[1540px] gap-12 border-x border-[#000B3D]/10 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#000B3D] shadow-[0_0_14px_rgba(0,11,61,.55)]" /><p className="text-3xl font-semibold tracking-[-.045em]">{BUSINESS_NAME}</p></div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-black/45">{blurb}</p>
          <div className="mt-7"><SocialLinks /></div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-black/35">Explore</p>
            <div className="space-y-2 text-black/70"><a href="/about" className="block hover:text-[#000B3D]">About {BUSINESS_NAME}</a><a href="/paint-correction" className="block hover:text-[#000B3D]">Paint Correction</a><a href="/ceramic-coatings" className="block hover:text-[#000B3D]">Ceramic Coatings</a><a href="/products-we-use" className="block hover:text-[#000B3D]">Products We Use</a><a href="/gallery" className="block hover:text-[#000B3D]">Gallery</a></div>
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-black/35">Services + Help</p>
            <div className="space-y-2 text-black/70"><a href="/car-detailing-packages" className="block hover:text-[#000B3D]">Car Packages</a><a href="/exterior-detailing" className="block hover:text-[#000B3D]">Exterior Detailing</a><a href="/interior-detailing" className="block hover:text-[#000B3D]">Interior Detailing</a><a href="/services#car-add-ons" className="block hover:text-[#000B3D]">Car Add-Ons</a><a href="/marine-detailing" className="block hover:text-[#000B3D]">Marine Detailing</a><a href="/faq" className="block hover:text-[#000B3D]">FAQ</a><a href="/contact" className="block hover:text-[#000B3D]">Book</a></div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.23em] text-black/35">Contact + Legal</p>
            <div className="space-y-2 text-black/70">{PHONE_FEATURE_ENABLED && BUSINESS_PHONE && <a href={`tel:${BUSINESS_PHONE}`} className="block hover:text-[#000B3D]">{BUSINESS_PHONE_DISPLAY}</a>}<a href={`mailto:${BUSINESS_EMAIL}`} className="block break-all hover:text-[#000B3D]">{BUSINESS_EMAIL}</a><a href="/privacy-policy" className="block hover:text-[#000B3D]">Privacy Policy</a><a href="/terms-and-conditions" className="block hover:text-[#000B3D]">Terms and Conditions</a></div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1540px] flex-col gap-2 border-x border-t border-[#000B3D]/10 bg-[#000B3D] px-5 py-5 text-[10px] uppercase tracking-[.2em] text-white/70 sm:flex-row sm:justify-between sm:px-8 lg:px-10"><span>{SERVICE_AREA || "Mobile detailing"}</span><span>Auto + marine detailing</span></div>
    </footer>
  );
}
