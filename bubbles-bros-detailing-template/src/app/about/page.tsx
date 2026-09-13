import PublicHero from "@/components/PublicHero";
import SitePhoto from "@/components/SitePhoto";
import { getSiteContent } from "@/lib/site-content";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div className="min-h-screen bg-white text-[#0B0F19]">
      <PublicHero
        content={content}
        imageCategory="about-hero"
        eyebrowKey="aboutEyebrow"
        titleKey="aboutTitle"
        bodyKey="aboutIntro"
        action={<a href="/quote" className="inline-flex rounded-2xl bg-[#000B3D] px-6 py-3.5 text-sm font-bold text-white">Get an Exact Quote</a>}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
          <div className="overflow-hidden rounded-[32px] bg-[#EEF2FA]">
            <SitePhoto category="about-story" fallbackCategory="home-story" className="h-full min-h-[460px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center rounded-[32px] border border-[#000B3D]/10 bg-[#F7F9FD] p-8 sm:p-12">
            <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#000B3D]">Why Bubbles & Bros.</p>
            <h2 className="mt-5 text-4xl font-black leading-[.96] tracking-[-.05em] text-[#000B3D] sm:text-6xl">{content.aboutStoryTitle}</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-black/52">{content.aboutStoryBody}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#000B3D]/10 bg-[#EEF2FA]">
        <div className="mx-auto max-w-[1440px] px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#000B3D]">What matters to us</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.05em] text-[#000B3D] sm:text-6xl">{content.aboutValuesTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [content.aboutValue1Title, content.aboutValue1Body],
              [content.aboutValue2Title, content.aboutValue2Body],
              [content.aboutValue3Title, content.aboutValue3Body],
            ].map(([title, body], index) => (
              <article key={title} className="rounded-[26px] border border-[#000B3D]/10 bg-white p-7 sm:p-8">
                <p className="text-xs font-black tracking-[.2em] text-[#000B3D]/40">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black tracking-[-.035em] text-[#000B3D]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/50">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["/car-detailing-packages", "Full Detail", "Interior + exterior in one appointment."],
              ["/interior-detailing", "Interior Detailing", "Cabin cleaning from refreshes to deep resets."],
              ["/exterior-detailing", "Exterior Detailing", "Hand washing, wheels, glass, decontamination, and finish work."],
            ].map(([href, title, body]) => (
              <a key={href} href={href} className="group rounded-[28px] border border-[#000B3D]/10 bg-[#F7F9FD] p-7 transition hover:border-[#000B3D]/25 hover:shadow-[0_18px_45px_rgba(0,11,61,.07)]">
                <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#000B3D]">Detailing</p>
                <h3 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#000B3D]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/50">{body}</p>
                <span className="mt-7 inline-flex text-sm font-bold text-[#000B3D]">View service →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
