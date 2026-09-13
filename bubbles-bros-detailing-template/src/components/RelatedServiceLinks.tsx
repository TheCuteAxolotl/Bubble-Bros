const services = [
  { href: "/car-detailing-packages", title: "Full Car Detailing", body: "Interior + exterior packages for coupes, sedans, SUVs, and trucks." },
  { href: "/interior-detailing", title: "Interior Detailing", body: "Vacuuming, seats, carpets, stains, surfaces, vents, glass, and deeper cabin cleaning." },
  { href: "/exterior-detailing", title: "Exterior Detailing", body: "Hand washing, wheels, tires, bugs, glass, decontamination, and simple protection." },
];

export default function RelatedServiceLinks({ currentPath }: { currentPath?: string }) {
  const visible = services.filter((service) => service.href !== currentPath);
  return (
    <section className="border-t border-[#000B3D]/10 bg-[#F7F9FD] px-5 py-14 text-[#0B0F19] sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.26em] text-[#000B3D]">More detailing options</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.04em] text-[#000B3D] sm:text-4xl">Interior, exterior, or the full car.</h2>
          </div>
          <a href="/quote" className="inline-flex w-fit rounded-2xl bg-[#000B3D] px-5 py-3 text-sm font-bold text-white">Get an Exact Quote</a>
        </div>
        <div className={`mt-8 grid gap-3 ${visible.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {visible.map((service) => (
            <a key={service.href} href={service.href} className="group rounded-[22px] border border-[#000B3D]/10 bg-white p-5 transition hover:border-[#000B3D]/25 hover:shadow-[0_12px_34px_rgba(0,11,61,.06)]">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-[#000B3D]">{service.title}</h3>
                <span className="text-black/30 transition group-hover:translate-x-1 group-hover:text-[#000B3D]">→</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-black/45">{service.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
