import Image from "next/image";
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
    <footer className="border-t border-[#000B3D]/10 bg-[#F7F9FD] text-[#0B0F19]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <Image src="/bubbles-bros-logo.png" alt={BUSINESS_NAME} width={110} height={110} className="h-16 w-16 object-contain" />
              <div>
                <p className="text-lg font-extrabold uppercase tracking-[.04em] text-[#000B3D]">{BUSINESS_NAME}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.22em] text-black/35">Interior + exterior auto detailing</p>
              </div>
            </div>
            <p className="mt-6 max-w-lg text-sm leading-7 text-black/50">{blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${BUSINESS_EMAIL}`} className="rounded-full border border-[#000B3D]/12 bg-white px-4 py-2.5 font-semibold text-[#000B3D]">{BUSINESS_EMAIL}</a>
              {PHONE_FEATURE_ENABLED && BUSINESS_PHONE && (
                <a href={`tel:${BUSINESS_PHONE}`} className="rounded-full border border-[#000B3D]/12 bg-white px-4 py-2.5 font-semibold text-[#000B3D]">{BUSINESS_PHONE_DISPLAY}</a>
              )}
            </div>
            <div className="mt-5"><SocialLinks /></div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#000B3D]">Detailing</p>
              <div className="mt-4 space-y-3 text-sm text-black/55">
                <a href="/car-detailing-packages" className="block hover:text-[#000B3D]">Full Detail</a>
                <a href="/interior-detailing" className="block hover:text-[#000B3D]">Interior</a>
                <a href="/exterior-detailing" className="block hover:text-[#000B3D]">Exterior</a>
                <a href="/services#car-add-ons" className="block hover:text-[#000B3D]">Add-Ons</a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#000B3D]">Company</p>
              <div className="mt-4 space-y-3 text-sm text-black/55">
                <a href="/about" className="block hover:text-[#000B3D]">About</a>
                <a href="/gallery" className="block hover:text-[#000B3D]">Gallery</a>
                <a href="/faq" className="block hover:text-[#000B3D]">FAQ</a>
                <a href="/contact" className="block hover:text-[#000B3D]">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#000B3D]">Book</p>
              <div className="mt-4 space-y-3 text-sm text-black/55">
                <a href="/quote" className="block hover:text-[#000B3D]">Exact Quote</a>
                <a href="/estimate" className="block hover:text-[#000B3D]">Estimate</a>
                <a href="/login" className="block hover:text-[#000B3D]">Login</a>
                <a href="/privacy-policy" className="block hover:text-[#000B3D]">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#000B3D] text-white/65">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-[10px] font-semibold uppercase tracking-[.18em] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>{SERVICE_AREA || "Mobile auto detailing"}</span>
          <span>Interior · Exterior · Full Detail</span>
        </div>
      </div>
    </footer>
  );
}
