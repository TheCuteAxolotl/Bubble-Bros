"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-defaults";
import SitePhoto from "@/components/SitePhoto";
import DynamicGallery from "@/components/DynamicGallery";
import ReviewCards from "@/components/ReviewCards";
import SocialLinks from "@/components/SocialLinks";
import { FACEBOOK_URL, GOOGLE_REVIEWS_ENABLED, INSTAGRAM_URL } from "@/lib/constants";

const services = [
  {
    number: "01",
    label: "Full detail",
    title: "Interior + exterior in one visit.",
    body: "A complete reset for the cabin and exterior, with package options based on the vehicle size and condition.",
    href: "/car-detailing-packages",
    category: "pricing-car-packages-hero",
    fallback: "home-showcase-primary",
  },
  {
    number: "02",
    label: "Interior",
    title: "A cleaner cabin from top to bottom.",
    body: "Vacuuming, surfaces, seats, carpets, vents, glass, crevices, stain-focused cleaning, and deeper resets when needed.",
    href: "/interior-detailing",
    category: "pricing-interior-hero",
    fallback: "home-showcase-secondary",
  },
  {
    number: "03",
    label: "Exterior",
    title: "A careful wash with a finished look.",
    body: "Hand washing, wheels, tires, bugs, glass, decontamination when needed, and simple protection for a clean glossy finish.",
    href: "/exterior-detailing",
    category: "pricing-exterior-hero",
    fallback: "home-services-bg",
  },
] as const;

export default function HomeExperience({ initialContent }: { initialContent: SiteContent }) {
  const content = initialContent;
  const [showFloatingQuote, setShowFloatingQuote] = useState(false);

  useEffect(() => {
    const update = () => setShowFloatingQuote(window.scrollY > Math.max(500, window.innerHeight * 0.7));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="overflow-hidden bg-white text-[#0B0F19]">
      <a
        href="/quote"
        className={`fixed bottom-5 right-[8.5rem] z-[69] rounded-full border border-white/15 bg-[#000B3D] px-5 py-3 text-xs font-bold text-white shadow-[0_18px_45px_rgba(0,11,61,.25)] transition-all sm:right-[9.2rem] sm:text-sm ${
          showFloatingQuote ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        Exact Quote
      </a>

      <section className="relative border-b border-[#000B3D]/10 bg-[#F7F9FD]">
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#000B3D]/[.05] blur-3xl" />
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-10 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#000B3D]/12 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#000B3D] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#000B3D]" />
              {content.heroEyebrow}
            </div>

            <h1 className="mt-7 max-w-3xl text-[clamp(3.7rem,7.4vw,7.6rem)] font-black leading-[.86] tracking-[-.07em] text-[#000B3D]">
              {content.heroTitle}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-black/55 sm:text-lg">{content.heroBody}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/quote" className="rounded-2xl bg-[#000B3D] px-6 py-4 text-sm font-bold text-white shadow-[0_16px_34px_rgba(0,11,61,.18)]">
                {content.heroPrimaryCta}
              </a>
              <a href="/car-detailing-packages" className="rounded-2xl border border-[#000B3D]/15 bg-white px-6 py-4 text-sm font-bold text-[#000B3D]">
                View detailing packages
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 overflow-hidden rounded-[22px] border border-[#000B3D]/10 bg-white shadow-sm">
              {[
                ["Full", "Inside + out"],
                ["Interior", "Cabin reset"],
                ["Exterior", "Wash + finish"],
              ].map(([title, subtitle], index) => (
                <div key={title} className={`px-4 py-4 ${index ? "border-l border-[#000B3D]/10" : ""}`}>
                  <p className="text-sm font-extrabold text-[#000B3D]">{title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-black/35">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] sm:min-h-[640px]">
            <div className="absolute inset-5 rounded-[38px] bg-[#000B3D]" />
            <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-[38px] border-[10px] border-white bg-[#EEF2FA] shadow-[0_32px_90px_rgba(0,11,61,.18)] sm:inset-x-6">
              <SitePhoto category="hero" fallbackCategory="home-showcase-primary" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,11,61,.55)_100%)]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.24em] text-white/70">Bubbles & Bros.</p>
                  <p className="mt-2 max-w-xs text-2xl font-bold leading-tight">Clean car. Cleaner process. We come to you.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl backdrop-blur sm:flex">↗</div>
              </div>
            </div>
            <div className="absolute -left-2 top-10 rounded-2xl border border-[#000B3D]/10 bg-white px-5 py-4 shadow-[0_16px_40px_rgba(0,11,61,.12)] sm:left-0">
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-black/35">Service focus</p>
              <p className="mt-1 text-sm font-extrabold text-[#000B3D]">Cars · SUVs · Trucks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#000B3D]/10 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-5 text-[11px] font-bold uppercase tracking-[.18em] text-black/35 sm:px-8 lg:px-10">
          <span>Mobile detailing</span><span className="text-[#000B3D]">•</span><span>Interior cleaning</span><span className="text-[#000B3D]">•</span><span>Exterior cleaning</span><span className="text-[#000B3D]">•</span><span>Exact quotes</span><span className="text-[#000B3D]">•</span><span>Easy booking</span>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">{content.servicesEyebrow}</p>
              <h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-.055em] text-[#000B3D] sm:text-6xl">Three ways to get the car cleaned.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-black/50">{content.servicesBody}</p>
          </div>

          <div className="mt-12 space-y-5">
            {services.map((service, index) => (
              <a
                key={service.href}
                href={service.href}
                className="group grid overflow-hidden rounded-[30px] border border-[#000B3D]/10 bg-[#F8FAFD] transition hover:border-[#000B3D]/25 hover:shadow-[0_24px_70px_rgba(0,11,61,.08)] md:grid-cols-[.76fr_1.24fr]"
              >
                <div className={`relative min-h-[280px] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <SitePhoto category={service.category} fallbackCategory={service.fallback} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B3D]/45 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-2 text-[10px] font-black tracking-[.18em] text-[#000B3D] backdrop-blur">{service.number}</span>
                </div>
                <div className={`flex flex-col justify-between p-7 sm:p-10 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#000B3D]">{service.label}</p>
                    <h3 className="mt-4 max-w-xl text-3xl font-black leading-[.98] tracking-[-.045em] text-[#0B0F19] sm:text-5xl">{service.title}</h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-black/50 sm:text-base">{service.body}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-[#000B3D]/10 pt-5">
                    <span className="text-sm font-bold text-[#000B3D]">See packages & pricing</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000B3D] text-white transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#000B3D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/55">How it works</p>
              <h2 className="mt-4 max-w-md text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl">Simple from quote to clean car.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[28px] bg-white/15 sm:grid-cols-3">
              {[
                ["01", "Tell us about the car", "Send the year, make, model, condition, and what you want cleaned."],
                ["02", "Get the right price", "Choose a standard package or send photos when the condition needs a closer look."],
                ["03", "We come to you", "Pick an available day and time. We bring the detailing setup to your location."],
              ].map(([number, title, body]) => (
                <article key={number} className="bg-[#07134D] p-7 sm:p-8">
                  <span className="text-xs font-black tracking-[.2em] text-white/40">{number}</span>
                  <h3 className="mt-14 text-2xl font-bold tracking-[-.03em]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FD]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">{content.introEyebrow}</p>
              <h2 className="mt-4 text-4xl font-black leading-[.96] tracking-[-.05em] text-[#000B3D] sm:text-6xl">{content.introTitle}</h2>
            </div>
            <div className="rounded-[28px] border border-[#000B3D]/10 bg-white p-7 shadow-sm sm:p-9">
              <p className="text-base leading-8 text-black/55">{content.introBody}</p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-[#000B3D]">
                <span className="rounded-full bg-[#EEF2FA] px-4 py-2">Vehicle size</span>
                <span className="rounded-full bg-[#EEF2FA] px-4 py-2">Interior condition</span>
                <span className="rounded-full bg-[#EEF2FA] px-4 py-2">Exterior condition</span>
                <span className="rounded-full bg-[#EEF2FA] px-4 py-2">Add-ons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">{content.galleryEyebrow}</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.05em] text-[#000B3D] sm:text-6xl">{content.galleryTitle}</h2>
            </div>
            <a href="/gallery" className="w-fit rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm font-bold text-[#000B3D]">Open gallery →</a>
          </div>
          <div className="mt-10"><DynamicGallery limit={6} /></div>
        </div>
      </section>

      <section className="border-y border-[#000B3D]/10 bg-[#EEF2FA]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
          <div className="rounded-[32px] bg-white p-8 sm:p-12">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">Because we care</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[.95] tracking-[-.05em] text-[#000B3D] sm:text-6xl">The detail should fit the car, not the other way around.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/52">We keep the service focused on what actually needs attention. That means straightforward recommendations, sensible add-ons, and no unrelated services pushed into the appointment.</p>
          </div>
          <div className="grid gap-4">
            {[
              ["Mobile", "No shop drop-off. We bring the setup to you."],
              ["Focused", "Interior, exterior, or both — that is the whole service menu."],
              ["Clear", "You see the package price or get an exact quote before the work starts."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[26px] border border-[#000B3D]/10 bg-white p-7">
                <p className="text-sm font-extrabold text-[#000B3D]">{title}</p>
                <p className="mt-2 text-sm leading-7 text-black/50">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {GOOGLE_REVIEWS_ENABLED && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">Customer feedback</p>
            <ReviewCards />
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="relative overflow-hidden rounded-[38px] bg-[#000B3D] px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/[.05]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.28em] text-white/50">Ready when you are</p>
                <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.05em] sm:text-6xl">{content.contactTitle}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{content.contactBody}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a href="/quote" className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-[#000B3D]">Get an Exact Quote</a>
                <a href="/contact" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-bold text-white">Book a Detail</a>
              </div>
            </div>
          </div>

          {(INSTAGRAM_URL || FACEBOOK_URL) && (
            <div className="mt-8 flex justify-center"><SocialLinks /></div>
          )}
        </div>
      </section>
    </main>
  );
}
