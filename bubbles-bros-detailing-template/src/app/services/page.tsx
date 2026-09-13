import SitePhoto from "@/components/SitePhoto";
import { parseBookingPricingConfig } from "@/lib/booking-pricing";
import { getSiteContent } from "@/lib/site-content";

const pages = [
  {
    href: "/car-detailing-packages",
    number: "01",
    eyebrow: "Full Detail",
    title: "Interior + exterior packages",
    body: "One appointment for the inside and outside of the vehicle. Pick the package and vehicle size that match what you need.",
    category: "pricing-car-packages-hero",
    fallback: "home-showcase-primary",
  },
  {
    href: "/interior-detailing",
    number: "02",
    eyebrow: "Interior",
    title: "Cabin cleaning + deep resets",
    body: "From a maintained interior to carpets, seats, stains, vents, glass, and the areas that need extra attention.",
    category: "pricing-interior-hero",
    fallback: "home-showcase-secondary",
  },
  {
    href: "/exterior-detailing",
    number: "03",
    eyebrow: "Exterior",
    title: "Hand wash + exterior detailing",
    body: "Wheels, tires, bodywork, bugs, glass, decontamination when needed, and simple protection for a clean finished look.",
    category: "pricing-exterior-hero",
    fallback: "home-services-bg",
  },
] as const;

export default async function ServicesPage() {
  const content = await getSiteContent();
  const bookingPricing = parseBookingPricingConfig(content.bookingPricingConfig);
  const carAddOns = bookingPricing.addOns.filter((item) => item.active);

  return (
    <main className="min-h-screen bg-white text-[#0B0F19]">
      <section className="border-b border-[#000B3D]/10 bg-[#F7F9FD]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-22 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-[#000B3D]/12 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">Auto detailing only</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.06em] text-[#000B3D] sm:text-7xl">Inside. Outside. Or both.</h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-black/52">That is the complete Bubbles & Bros. service menu: full-car detailing, interior detailing, exterior detailing, and practical cleaning add-ons.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-22 lg:px-10">
        <div className="space-y-5">
          {pages.map((page, index) => (
            <a key={page.href} href={page.href} className="group grid overflow-hidden rounded-[30px] border border-[#000B3D]/10 bg-[#F8FAFD] transition hover:border-[#000B3D]/25 hover:shadow-[0_24px_65px_rgba(0,11,61,.08)] md:grid-cols-[.72fr_1.28fr]">
              <div className={`relative min-h-[280px] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <SitePhoto category={page.category} fallbackCategory={page.fallback} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000B3D]/45 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-2 text-[10px] font-black tracking-[.18em] text-[#000B3D]">{page.number}</span>
              </div>
              <div className={`flex flex-col justify-between p-7 sm:p-10 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">{page.eyebrow}</p>
                  <h2 className="mt-4 max-w-xl text-3xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl">{page.title}</h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-black/50 sm:text-base">{page.body}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#000B3D]/10 pt-5">
                  <span className="text-sm font-bold text-[#000B3D]">View packages & pricing</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000B3D] text-white transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="car-add-ons" className="scroll-mt-32 border-y border-[#000B3D]/10 bg-[#EEF2FA]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#000B3D]">Detailing add-ons</p>
            <h2 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.05em] text-[#000B3D] sm:text-5xl">Extra cleaning when the car needs it.</h2>
            <p className="mt-5 text-sm leading-7 text-black/50">Add-ons are for things like pet hair, stains, extraction, odor work, bug and tar cleanup, and other detailing tasks outside the standard package.</p>
            <a href="/quote" className="mt-7 inline-flex rounded-2xl bg-[#000B3D] px-5 py-3.5 text-sm font-bold text-white">Get an Exact Quote</a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {carAddOns.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-[22px] border border-[#000B3D]/10 bg-white px-5 py-4">
                <span className="text-sm font-semibold text-black/70">{item.name}</span>
                <span className="rounded-full bg-[#F7F9FD] px-3 py-1.5 text-xs font-black text-[#000B3D]">+${item.price.toFixed(0)}</span>
              </div>
            ))}
            {!carAddOns.length && <p className="text-sm text-black/40">Add-ons are being updated.</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="rounded-[34px] bg-[#000B3D] p-8 text-white sm:p-12">
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-white/50">Not sure which one?</p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="max-w-4xl text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl">Send a few photos and we’ll tell you which detail makes sense.</h2>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="/quote" className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#000B3D]">Exact Quote</a>
              <a href="/contact" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-bold text-white">Book a Detail</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
