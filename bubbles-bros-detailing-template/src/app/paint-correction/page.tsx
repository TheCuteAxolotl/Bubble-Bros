import SitePhoto from "@/components/SitePhoto";
import PricingMediaStrip from "@/components/PricingMediaStrip";

const levels = [
  {
    label: "Paint Enhancement",
    title: "One-step refinement",
    body: "Best when the paint mostly needs more gloss and a cleaner finish. A one-step polish can reduce light swirls, haze, wash marks, and mild oxidation.",
  },
  {
    label: "Paint Correction",
    title: "Two-step correction",
    body: "We cut the heavier defects first, then refine the paint with a second polishing step. This is for more noticeable swirls, oxidation, water spots, and defects a one-step cannot clean up enough.",
  },
  {
    label: "Advanced Correction",
    title: "Multi-step / inspection-based",
    body: "For paint that needs more than a normal two-step. We inspect deeper defects, heavy oxidation, sanding marks, and difficult finishes before deciding how far it is safe to go.",
  },
] as const;

export default function PaintCorrectionPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0F19]">
      <section className="relative isolate min-h-[620px] overflow-hidden border-b border-[#000B3D]/10">
        <SitePhoto category="paint-correction-hero" fallbackCategory="home-showcase-secondary" className="absolute inset-0 -z-30 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,255,255,.99)_0%,rgba(255,255,255,.95)_44%,rgba(255,255,255,.70)_72%,rgba(255,255,255,.30)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.58))]" />
        <div className="mx-auto flex min-h-[620px] max-w-[1540px] items-end border-x border-[#000B3D]/10 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#000B3D]">Paint Correction Guide</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[.9] tracking-[-.065em] sm:text-7xl lg:text-[6.5rem]">Fix the paint before you lock in the protection.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/60 sm:text-lg">Paint correction uses machine polishing to reduce swirls, haze, oxidation, and other defects. How far we go depends on the paint, how deep the defects are, and what can be corrected safely.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="/services#car-detailing" className="rounded-full bg-[#000B3D] px-6 py-3.5 text-sm font-semibold text-[#0B0F19]">View paint correction</a><a href="/quote" className="rounded-full border border-[#000B3D]/15 bg-[#F7F9FC] px-6 py-3.5 text-sm font-semibold">Ask us about your paint</a></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1540px] border-x border-[#000B3D]/10 px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">Correction levels</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Not every car needs a two-step correction.</h2>
            <p className="mt-5 text-sm leading-7 text-black/50">We only correct as far as the paint safely allows. Some cars just need a one-step polish; others need heavier correction.</p>
          </div>
          <div className="grid gap-4">
            {levels.map((level, index) => <article key={level.title} className="rounded-[28px] border border-[#000B3D]/10 bg-[linear-gradient(145deg,#F8FAFD,#EEF2FA)] p-7 sm:grid sm:grid-cols-[96px_1fr] sm:gap-6"><div><p className="text-xs font-semibold text-[#000B3D]">0{index + 1}</p><p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-black/35">{level.label}</p></div><div><h3 className="text-2xl font-semibold tracking-[-.04em]">{level.title}</h3><p className="mt-4 text-sm leading-7 text-black/50">{level.body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#000B3D]/10 bg-[#F5F7FB]">
        <div className="mx-auto grid max-w-[1540px] gap-px border-x border-[#000B3D]/10 bg-[#EEF2F7] md:grid-cols-4">
          {[
            ["01", "Inspect", "We inspect the paint under good lighting for swirls, oxidation, scratches, water spots, previous repair work, and anything that may limit correction."],
            ["02", "Decontaminate", "The vehicle is thoroughly washed and decontaminated so bonded contamination is not dragged through the polishing process."],
            ["03", "Correct + refine", "We choose the machine, pad, compound, and polish based on the paint and how much correction it needs."],
            ["04", "Protect", "After correction, wax, sealant, or ceramic protection can be applied to help preserve the corrected finish."],
          ].map(([number, title, body]) => <div key={number} className="bg-[#F5F7FB] p-7 sm:p-8"><p className="text-xs font-semibold text-[#000B3D]">{number}</p><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-black/45">{body}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1540px] border-x border-[#000B3D]/10 px-5 py-14 sm:px-8 lg:px-10"><PricingMediaStrip category="paint-correction-results" /></section>

      <section className="bg-white text-[#0B0F19]">
        <div className="mx-auto grid max-w-[1540px] gap-10 border-x border-black/10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">What correction can improve</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Swirls, haze, oxidation, and dull paint.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{["Swirl marks", "Light wash scratches", "Oxidation + haze", "Water spotting", "Light marring", "Loss of gloss"].map((item)=><div key={item} className="rounded-2xl border border-black/10 bg-[#F7F9FA] px-4 py-3 text-sm font-medium">{item}</div>)}</div>
          </div>
          <div className="rounded-[28px] border border-black/10 bg-[#F7F9FA] p-7 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#4A5568]">Important limitation</p>
            <h3 className="mt-4 text-2xl font-semibold">Some defects are too deep to safely polish out.</h3>
            <p className="mt-4 text-sm leading-7 text-black/58">Deep scratches, chips, failing clear coat, and some other defects cannot be safely polished away. We would rather leave a deeper mark than remove too much clear coat trying to chase it.</p>
            <div className="mt-6 flex flex-wrap gap-3"><a href="/products-we-use" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0B0F19]">Products we use</a><a href="/ceramic-coatings" className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold">Protect corrected paint</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}
