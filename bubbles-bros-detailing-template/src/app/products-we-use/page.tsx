import SitePhoto from "@/components/SitePhoto";

const productGroups = [
  ["Interior", "Gentle interior cleaners", "Interior-safe chemistry for plastics, vinyl, touch points, fabrics, and other cabin surfaces."],
  ["Carpets + seats", "Extraction and fabric chemistry", "Products chosen around the material, stain type, and how much cleaning the surface can safely handle."],
  ["Exterior wash", "Foam + contact wash chemistry", "Pre-cleaning, foam, and wash products used to safely lift dirt before and during the hand wash."],
  ["Wheels + tires", "Dedicated wheel and tire cleaners", "Separate cleaners for brake dust, road grime, tire buildup, and wheel faces."],
  ["Glass", "Streak-free glass cleaners", "Interior and exterior glass products selected for clean visibility without oily residue."],
  ["Finishing", "Dressings + simple protection", "Tire dressing, trim finishing, and straightforward paint protection used as part of detailing packages."],
] as const;

export default function ProductsWeUsePage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0F19]">
      <section className="border-b border-[#000B3D]/10 bg-[#F7F9FD]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10">
          <div>
            <p className="inline-flex rounded-full border border-[#000B3D]/12 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.25em] text-[#000B3D]">Products + process</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.06em] text-[#000B3D] sm:text-7xl">The right product for the surface in front of us.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/55">Bubbles & Bros. uses professional detailing chemistry for interiors, exteriors, wheels, tires, glass, fabrics, and finishing work. Product choice changes with the surface and condition.</p>
          </div>
          <div className="relative min-h-[380px] sm:min-h-[500px]">
            <div className="absolute inset-5 rounded-[34px] bg-[#000B3D]" />
            <div className="absolute inset-0 overflow-hidden rounded-[34px] border-[8px] border-white bg-[#EEF2FA] shadow-[0_28px_75px_rgba(0,11,61,.16)] sm:inset-x-8">
              <SitePhoto category="products-hero" fallbackCategory="home-showcase-secondary" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productGroups.map(([category, name, body]) => (
            <article key={category} className="rounded-[26px] border border-[#000B3D]/10 bg-[#F7F9FD] p-7">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#000B3D]">{category}</p>
              <h2 className="mt-4 text-2xl font-black tracking-[-.03em] text-[#000B3D]">{name}</h2>
              <p className="mt-3 text-sm leading-7 text-black/50">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#000B3D]/10 bg-[#EEF2FA]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
          <div className="rounded-[30px] bg-[#000B3D] p-8 text-white sm:p-10">
            <p className="text-sm leading-7 text-white/65">Brand names and exact product choices can change as vehicle needs and professional product lines evolve. The goal stays the same: use the safest effective process for the material being cleaned.</p>
            <a href="/services" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#000B3D]">View detailing services</a>
          </div>
        </div>
      </section>
    </div>
  );
}
