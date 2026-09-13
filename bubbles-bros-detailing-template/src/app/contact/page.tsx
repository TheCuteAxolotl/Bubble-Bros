import BookingForm from "@/components/BookingForm";
import PublicHero from "@/components/PublicHero";
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, PHONE_FEATURE_ENABLED, SMS_FEATURE_ENABLED } from "@/lib/constants";
import { getSiteContent } from "@/lib/site-content";


export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B0F19]">
      <PublicHero content={content} imageCategory="contact-hero" eyebrowKey="contactEyebrow" titleKey="contactTitle" bodyKey="contactBody" action={<div className="flex flex-wrap gap-3">{PHONE_FEATURE_ENABLED && BUSINESS_PHONE && <a href={`tel:${BUSINESS_PHONE}`} className="inline-flex rounded-full bg-[#000B3D] px-6 py-3.5 text-sm font-semibold text-[#0B0F19] transition hover:brightness-95">Call {BUSINESS_PHONE_DISPLAY}</a>}{SMS_FEATURE_ENABLED && BUSINESS_PHONE && <a href={`sms:${BUSINESS_PHONE}`} className="inline-flex rounded-full border border-[#000B3D]/20 bg-[#F6F8FB] px-6 py-3.5 text-sm font-semibold text-black/80 backdrop-blur hover:border-[#000B3D]/35 hover:text-[#0B0F19]">Text us</a>}<a href={`mailto:${BUSINESS_EMAIL}`} className="inline-flex rounded-full border border-[#000B3D]/20 bg-[#F6F8FB] px-6 py-3.5 text-sm font-semibold text-black/80 backdrop-blur hover:border-[#000B3D]/35 hover:text-[#0B0F19]">Email us</a></div>} />
      <main className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="rounded-[30px] border border-[#000B3D]/10 bg-[#F7F9FC] p-5 shadow-2xl sm:p-8">
            <BookingForm initialSiteContent={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
