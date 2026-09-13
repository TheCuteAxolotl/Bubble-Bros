"use client";

import { useMemo, useState } from "react";
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
  packages: "Car Detailing Packages",
  exterior: "Exterior Detailing",
  interior: "Interior Detailing",
};

export default function PricingPageExperience({ kind, initialConfig }: { kind: PageKind; initialConfig: PricingPageConfig }) {
  const [config] = useState<PricingPageConfig>(initialConfig);
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");
  const slug = slugs[kind];


  const packageCount = useMemo(() => config.packages.length, [config.packages.length]);

  return (
    <main className="min-h-screen bg-white text-[#0B0F19]">
      <section className="relative isolate overflow-hidden border-b border-[#000B3D]/10">
        <SitePhoto category={`pricing-${slug}-hero`} fallbackCategory="hero" className="absolute inset-0 -z-30 h-full w-full object-cover opacity-68" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,255,255,.99)_0%,rgba(255,255,255,.95)_45%,rgba(255,255,255,.68)_72%,rgba(255,255,255,.28)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.58))]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#000B3D]">{config.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[.92] tracking-[-.06em] sm:text-7xl">{config.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 sm:text-lg">{config.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pricing" className="rounded-full bg-[#000B3D] px-6 py-3 text-sm font-semibold text-[#0B0F19]">View Packages</a>
            <a href="/quote" className="rounded-full border border-[#000B3D]/15 bg-[#F6F8FB] px-6 py-3 text-sm font-semibold">Ask About Your Vehicle</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <PricingMediaStrip category={`pricing-${slug}-intro`} />
      </section>

      <section id="pricing" className="mx-auto max-w-7xl scroll-mt-32 px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#000B3D]">Packages</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Pick your vehicle size to see the standard price.</h2>
          <p className="mt-5 text-black/50">These are the normal package prices. If your vehicle is much cleaner or dirtier than average, or you need something outside the package, send us a few photos and we’ll quote it first.</p>
        </div>

        <div className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2 rounded-[26px] border border-[#000B3D]/10 bg-[#F5F7FB] p-3">
          {(Object.keys(VEHICLE_LABELS) as VehicleClass[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setVehicle(key)}
              className={`min-w-[145px] flex-1 rounded-[20px] border px-5 py-4 text-sm font-semibold transition duration-300 ${vehicle === key ? "border-[#000B3D]/55 bg-[#000B3D]/10 text-[#0B0F19] shadow-[0_0_32px_rgba(0,11,61,.10)]" : "border-[#000B3D]/10 bg-[#F7F9FC] text-black/60 hover:border-[#000B3D]/30 hover:text-[#0B0F19]"}`}
            >
              {VEHICLE_LABELS[key]}
            </button>
          ))}
        </div>

        <div className={`mt-12 grid gap-6 ${packageCount >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {config.packages.map((pkg) => {
            const price = Number(pkg.prices?.[vehicle] || 0);
            const bookingHref = `/contact?pricingPage=${encodeURIComponent(kind)}&packageId=${encodeURIComponent(pkg.id)}&vehicleClass=${encodeURIComponent(vehicle)}`;
            return (
              <article key={pkg.id} className={`relative flex min-h-full flex-col overflow-hidden rounded-[32px] border p-6 sm:p-7 ${pkg.featured ? "border-[#000B3D]/45 bg-[linear-gradient(180deg,rgba(0,11,61,.07),rgba(74,85,104,.08)_24%,rgba(255,255,255,.02))] shadow-[0_22px_70px_rgba(0,11,61,.10)]" : "border-[#000B3D]/10 bg-[#F5F7FB]"}`}>
                {pkg.badge && <span className="absolute right-5 top-5 rounded-full bg-[#000B3D] px-4 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#0B0F19]">{pkg.badge}</span>}
                <PricingMediaStrip category={`pricing-${slug}-pkg-${pkg.id}`} className="mb-6" />
                <p className="text-[11px] font-bold uppercase tracking-[.24em] text-[#000B3D]">{pkg.tier}</p>
                <h3 className="mt-3 pr-20 text-3xl font-semibold tracking-[-.04em]">{pkg.name}</h3>
                <p className="mt-4 min-h-16 text-sm leading-7 text-black/50">{pkg.description}</p>
                <div className="mt-6 border-y border-[#000B3D]/10 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-[.22em] text-black/40">Standard package · {VEHICLE_LABELS[vehicle]}</p>
                  <p className="mt-2 text-5xl font-semibold tracking-[-.05em]"><span className="mr-1 text-2xl text-[#000B3D]">$</span>{price.toFixed(0)}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-0">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 border-b border-[#000B3D]/10 py-3 text-sm leading-6 text-black/70 last:border-b-0">
                      <span className="font-black text-[#000B3D]">✓</span><span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={bookingHref} className={`mt-7 block rounded-[20px] px-5 py-4 text-center text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${pkg.featured ? "bg-[#000B3D] text-[#0B0F19] shadow-[0_0_30px_rgba(0,11,61,.13)]" : "border border-[#000B3D]/15 bg-[#F4F7FB] text-[#0B0F19] hover:border-[#000B3D]/35 hover:bg-[#000B3D]/8"}`}>
                  {pkg.ctaLabel} →
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[26px] border border-[#000B3D]/10 bg-[#F7F9FC] px-6 py-5 text-sm leading-7 text-black/50">
          <span className="font-semibold text-black/75">Pricing note:</span> {config.priceNote}
        </div>
      </section>

      <section className="border-y border-[#000B3D]/10 bg-[#F5F7FB]/95">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#000B3D]">Recent Work</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.05em]">See more of the work we’ve done recently.</h2></div>
            <a href="/gallery" className="rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm font-semibold">View Gallery</a>
          </div>
          <PricingMediaStrip category={`pricing-${slug}-results`} className="mt-8" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="rounded-[34px] border border-[#000B3D]/20 bg-[linear-gradient(130deg,rgba(0,11,61,.08),rgba(74,85,104,.08),rgba(255,255,255,.015))] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-[#000B3D]">Package price or exact quote</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Know what you want? Book the package. Not sure? Send us photos and we’ll quote your vehicle.</h2>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#pricing" className="rounded-full bg-[#000B3D] px-6 py-3 font-semibold text-[#0B0F19]">Choose a package</a><a href="/quote" className="rounded-full border border-[#000B3D]/15 px-6 py-3 font-semibold">Get an Exact Quote</a></div>
        </div>
      </section>
    </main>
  );
}
