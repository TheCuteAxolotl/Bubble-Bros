"use client";

import { useState } from "react";
import PricingMediaStrip from "@/components/PricingMediaStrip";
import SitePhoto from "@/components/SitePhoto";
import { PricingPageConfig, VEHICLE_LABELS, VehicleClass } from "@/lib/pricing-config";

type PageKind = "packages" | "exterior" | "interior";

const slugs: Record<PageKind, string> = {
  packages: "car-packages",
  exterior: "exterior",
  interior: "interior",
};

const pageLabels: Record<PageKind, string> = {
  packages: "Full Car Detail",
  exterior: "Exterior Detailing",
  interior: "Interior Detailing",
};

export default function PricingPageExperience({ kind, initialConfig }: { kind: PageKind; initialConfig: PricingPageConfig }) {
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");
  const config = initialConfig;
  const slug = slugs[kind];

  return (
    <main className="min-h-screen bg-white text-[#0B0F19]">
      <section className="border-b border-[#000B3D]/10 bg-[#F7F9FD]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-10">
          <div>
            <p className="inline-flex rounded-full border border-[#000B3D]/12 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">{config.eyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.06em] text-[#000B3D] sm:text-7xl">{config.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/55 sm:text-lg">{config.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#packages" className="rounded-2xl bg-[#000B3D] px-6 py-4 text-sm font-bold text-white">See packages</a>
              <a href="/quote" className="rounded-2xl border border-[#000B3D]/15 bg-white px-6 py-4 text-sm font-bold text-[#000B3D]">Exact quote</a>
            </div>
          </div>

          <div className="relative min-h-[380px] sm:min-h-[500px]">
            <div className="absolute inset-5 rounded-[34px] bg-[#000B3D]" />
            <div className="absolute inset-0 overflow-hidden rounded-[34px] border-[8px] border-white bg-[#EEF2FA] shadow-[0_28px_75px_rgba(0,11,61,.16)] sm:inset-x-8">
              <SitePhoto category={`pricing-${slug}-hero`} fallbackCategory="hero" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000B3D]/48 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 text-sm font-bold text-white">{pageLabels[kind]} · Bubbles & Bros.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-22 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <p className="text-[10px] font-black uppercase tracking-[.26em] text-[#000B3D]">Choose vehicle size</p>
              <h2 className="mt-4 text-3xl font-black leading-[1] tracking-[-.04em] text-[#000B3D] sm:text-4xl">See the standard package price.</h2>
              <div className="mt-7 grid gap-2">
                {(Object.keys(VEHICLE_LABELS) as VehicleClass[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setVehicle(key)}
                    className={`flex items-center justify-between rounded-[20px] border px-5 py-4 text-left text-sm font-bold ${vehicle === key ? "border-[#000B3D] bg-[#000B3D] text-white" : "border-[#000B3D]/10 bg-[#F7F9FD] text-black/60 hover:border-[#000B3D]/25 hover:text-[#000B3D]"}`}
                  >
                    <span>{VEHICLE_LABELS[key]}</span><span>{vehicle === key ? "✓" : "→"}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-[22px] border border-[#000B3D]/10 bg-[#EEF2FA] p-5 text-sm leading-7 text-black/50">
                Not sure which package fits? Send photos and we’ll price the exact cleaning before the appointment.
              </div>
            </aside>

            <div className="space-y-5">
              {config.packages.map((pkg, index) => {
                const price = Number(pkg.prices?.[vehicle] || 0);
                const bookingHref = `/contact?pricingPage=${encodeURIComponent(kind)}&packageId=${encodeURIComponent(pkg.id)}&vehicleClass=${encodeURIComponent(vehicle)}`;
                return (
                  <article key={pkg.id} className={`overflow-hidden rounded-[30px] border ${pkg.featured ? "border-[#000B3D]/35 bg-[#F6F8FD] shadow-[0_20px_60px_rgba(0,11,61,.08)]" : "border-[#000B3D]/10 bg-white"}`}>
                    <div className="grid gap-0 md:grid-cols-[.7fr_1.3fr]">
                      <div className="relative min-h-[250px] bg-[#EEF2FA]">
                        <SitePhoto category={`pricing-${slug}-pkg-${pkg.id}`} fallbackCategory={`pricing-${slug}-hero`} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000B3D]/28 via-transparent to-transparent" />
                        <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-2 text-[10px] font-black tracking-[.18em] text-[#000B3D]">0{index + 1}</span>
                      </div>

                      <div className="p-7 sm:p-9">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">{pkg.tier}</p>
                            <h3 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">{pkg.name}</h3>
                          </div>
                          <div className="text-right">
                            {pkg.badge && <p className="mb-2 text-[9px] font-black uppercase tracking-[.18em] text-[#000B3D]">{pkg.badge}</p>}
                            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/35">{VEHICLE_LABELS[vehicle]}</p>
                            <p className="mt-1 text-4xl font-black tracking-[-.05em] text-[#000B3D]">${price.toFixed(0)}</p>
                          </div>
                        </div>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-black/50">{pkg.description}</p>

                        <div className="mt-6 grid gap-x-6 border-y border-[#000B3D]/10 py-4 sm:grid-cols-2">
                          {pkg.features.map((feature) => (
                            <div key={feature} className="flex gap-3 py-2 text-sm leading-6 text-black/65">
                              <span className="font-black text-[#000B3D]">•</span><span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <a href={bookingHref} className="rounded-2xl bg-[#000B3D] px-5 py-3.5 text-sm font-bold text-white">{pkg.ctaLabel}</a>
                          <a href="/quote" className="rounded-2xl border border-[#000B3D]/12 px-5 py-3.5 text-sm font-bold text-[#000B3D]">Ask about my car</a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="rounded-[24px] border border-[#000B3D]/10 bg-[#F7F9FD] px-6 py-5 text-sm leading-7 text-black/50">
                <span className="font-bold text-black/75">Pricing note:</span> {config.priceNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#000B3D]/10 bg-[#EEF2FA]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">Recent work</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-.05em] text-[#000B3D]">See more detailing results.</h2>
            </div>
            <a href="/gallery" className="w-fit rounded-full border border-[#000B3D]/15 bg-white px-5 py-3 text-sm font-bold text-[#000B3D]">View gallery →</a>
          </div>
          <PricingMediaStrip category={`pricing-${slug}-results`} className="mt-8" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="rounded-[34px] bg-[#000B3D] p-8 text-white sm:p-12">
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-white/50">Package or exact quote</p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="max-w-4xl text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl">Know what you want? Book it. Not sure? Send photos.</h2>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#packages" className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#000B3D]">Choose a package</a>
              <a href="/quote" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-bold text-white">Exact quote</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
