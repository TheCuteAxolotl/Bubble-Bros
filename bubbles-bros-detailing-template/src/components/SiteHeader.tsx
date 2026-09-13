"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BUSINESS_NAME, BUSINESS_SHORT_NAME, BUSINESS_TAGLINE, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, OWNER_EMAIL, PHONE_FEATURE_ENABLED, GOOGLE_REVIEWS_ENABLED } from "@/lib/constants";

type User = { id: string; name: string; email: string; role: string };
type Service = { id:string; title:string; category:string; subcategory:string; pricingType:string; active:boolean };

const publicLinks = [["/", "Home"],["/gallery", "Gallery"],["/faq", "FAQ"], ...(GOOGLE_REVIEWS_ENABLED ? [["/reviews", "Reviews"]] as const : []), ["/contact", "Contact"]] as const;
const exploreLinks = [
  ["/about", `About ${BUSINESS_SHORT_NAME}`, "Who we are and how the service works."],
  ["/paint-correction", "Paint Correction", "How polishing, correction levels, and paint refinement work."],
  ["/ceramic-coatings", "Ceramic Coatings", "GYEON Synchro, Gtechniq, and coating care."],
  ["/products-we-use", "Products We Use", "Professional chemistry led by Koch-Chemie."],
] as const;

function isMarineService(service: Service) {
  return `${service.category} ${service.subcategory} ${service.title}`.toLowerCase().includes("marine");
}

export default function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [staffAccess, setStaffAccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" }).then(async r => r.ok ? r.json() : null).then(d => { setUser(d?.user || null); setStaffAccess(Boolean(d?.staffAccess)); }).catch(() => { setUser(null); setStaffAccess(false); });
    fetch("/api/services", { cache: "no-store" }).then(r => r.ok ? r.json() : []).then(d => setServices(Array.isArray(d) ? d.filter((x:Service)=>x.active) : [])).catch(()=>setServices([]));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-nav-open");
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("mobile-nav-open");
    };
  }, [menuOpen]);

  const { carServices, marineServices } = useMemo(() => {
    const marine = services.filter(isMarineService);
    const car = services.filter((service) => !isMarineService(service));
    return { carServices: car, marineServices: marine };
  }, [services]);

  const cancelMenuClose = () => {
    if (menuCloseTimer.current) {
      clearTimeout(menuCloseTimer.current);
      menuCloseTimer.current = null;
    }
  };

  const scheduleMenuClose = (menu: "services" | "explore") => {
    cancelMenuClose();
    menuCloseTimer.current = setTimeout(() => {
      if (menu === "services") setServicesOpen(false);
      if (menu === "explore") setExploreOpen(false);
      menuCloseTimer.current = null;
    }, 320);
  };

  const openSupport = () => { window.dispatchEvent(new Event("open-support")); setMenuOpen(false); };
  const owner = Boolean(user && (user.role === "owner" || user.email.toLowerCase() === OWNER_EMAIL.toLowerCase()));
  const staff = Boolean(user && !owner && staffAccess);
  const exploreActive = exploreLinks.some(([href]) => pathname === href);
  const servicesActive = pathname.startsWith("/services") || pathname.startsWith("/car-detailing-packages") || pathname.startsWith("/exterior-detailing") || pathname.startsWith("/interior-detailing") || pathname.startsWith("/marine-detailing");

  return <>
    <div className="bg-[#000B3D] text-[#0B0F19]"><div className="mx-auto flex max-w-[1540px] items-center justify-center border-x border-black/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] sm:justify-between sm:px-8 sm:tracking-[.24em] lg:px-10"><span className="hidden sm:block">{BUSINESS_SHORT_NAME} · {BUSINESS_TAGLINE}</span><div className="flex items-center gap-4 sm:gap-6">{PHONE_FEATURE_ENABLED && BUSINESS_PHONE && <a href={`tel:${BUSINESS_PHONE}`} className="transition-opacity hover:opacity-65">Call {BUSINESS_PHONE_DISPLAY}</a>}<a href="/estimate" className="opacity-75">Get an instant estimate ↗</a></div></div></div>
    <header className="sticky top-0 z-50 border-b border-[#000B3D]/10 bg-white/95 text-[#0B0F19] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-5 border-x border-[#000B3D]/10 px-5 py-4 sm:px-8 lg:px-10">
        <a href="/" aria-label={`${BUSINESS_NAME} home`} className="flex shrink-0 items-center">
          <Image
            src="/bubbles-bros-logo.png"
            alt={BUSINESS_NAME}
            width={420}
            height={420}
            priority
            className="h-[54px] w-[54px] rounded-xl bg-white object-contain p-1 sm:h-[60px] sm:w-[60px]"
          />
        </a>
        <nav className="hidden items-center gap-6 text-[13px] font-medium text-black/55 xl:flex">
          <a href="/" className={pathname==="/"?"text-[#0B0F19]":"hover:text-[#000B3D]"}>Home</a>

          <div className="relative flex items-center" onMouseEnter={()=>{cancelMenuClose();setServicesOpen(true);setExploreOpen(false)}} onMouseLeave={()=>scheduleMenuClose("services")}>
            <button onClick={()=>{setServicesOpen(v=>!v);setExploreOpen(false)}} className={`py-3 ${servicesActive?'text-[#000B3D]':'hover:text-[#000B3D]'}`}>Services ▾</button>
            {servicesOpen && <div
              onMouseEnter={cancelMenuClose}
              onMouseLeave={()=>scheduleMenuClose("services")}
              style={{ left: 0, right: "auto", top: "100%" }}
              className="menu-pop-services absolute z-[100] max-h-[calc(100vh-96px)] w-[760px] max-w-[calc(100vw-32px)] overflow-y-auto rounded-[28px] border border-[#000B3D]/15 bg-white/98 p-6 shadow-[0_28px_90px_rgba(0,11,61,.14)]"
            >
              <div className="grid gap-5 md:grid-cols-[1fr_1fr_.78fr]">
                <div className="rounded-[22px] border border-[#000B3D]/10 bg-[#F7F9FC] p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#000B3D]">Car Detailing</p>
                  <div className="space-y-1">
                    <a href="/car-detailing-packages" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Car Detailing Packages</a>
                    <a href="/exterior-detailing" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Exterior Detailing</a>
                    <a href="/interior-detailing" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Interior Detailing</a>
                    <a href="/paint-correction" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Paint Correction</a>
                  </div>
                  <a href="/services#car-add-ons" className="mt-3 block rounded-xl border border-[#000B3D]/15 bg-[#000B3D]/[.05] px-3 py-2 text-sm text-[#000B3D]">Car Add-Ons + Pricing →</a>
                </div>

                <div className="rounded-[22px] border border-[#000B3D]/10 bg-[#F7F9FC] p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#000B3D]">Marine Detailing</p>
                  <div className="space-y-1">
                    {(marineServices.length ? marineServices.slice(0, 8) : [
                      {id:"marine-maintenance",title:"Marine Maintenance"},
                      {id:"marine-complete",title:"Complete Marine Detail"},
                      {id:"marine-enhancement",title:"Marine Enhancement"},
                      {id:"marine-ceramic",title:"Marine Ceramic Protection"},
                    ]).map((service:any)=><a key={service.id} href={marineServices.length ? `/marine-detailing#${service.id}` : "/marine-detailing#marine-services"} className="block rounded-xl px-2 py-1.5 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">{service.title}</a>)}
                  </div>
                  <a href="/marine-detailing#marine-add-ons" className="mt-3 block rounded-xl border border-[#000B3D]/15 bg-[#000B3D]/[.05] px-3 py-2 text-sm text-[#000B3D]">Marine Add-Ons + Pricing →</a>
                </div>

                <div className="rounded-[22px] border border-[#000B3D]/10 bg-[#4A5568]/10 p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-black/40">Quick Links</p>
                  <a href="/paint-correction" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Paint Correction Guide</a>
                  <a href="/ceramic-coatings" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Ceramic Coatings</a>
                  <a href="/car-detailing-packages" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Car Packages</a>
                  <a href="/marine-detailing" className="block rounded-xl px-2 py-2 text-sm text-black/70 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Marine Services</a>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[#000B3D]/10 pt-5"><a href="/estimate" className="rounded-full bg-[#000B3D] px-5 py-2.5 text-sm font-semibold text-[#0B0F19]">Get an Estimate</a><a href="/quote" className="rounded-full border border-[#000B3D]/15 bg-[#F5F7FB] px-5 py-2.5 text-sm font-semibold">Get an Exact Quote</a><a href="/car-detailing-packages" className="ml-auto px-3 py-2.5 text-sm text-black/55 hover:text-[#000B3D]">Car packages →</a><a href="/marine-detailing" className="px-3 py-2.5 text-sm text-black/55 hover:text-[#000B3D]">Marine services →</a></div>
            </div>}
          </div>

          <div className="static" onMouseEnter={()=>{cancelMenuClose();setExploreOpen(true);setServicesOpen(false)}} onMouseLeave={()=>scheduleMenuClose("explore")}>
            <button onClick={()=>{setExploreOpen(v=>!v);setServicesOpen(false)}} className={`py-3 ${exploreActive?'text-[#000B3D]':'hover:text-[#000B3D]'}`}>Explore ▾</button>
            {exploreOpen && <div onMouseEnter={cancelMenuClose} onMouseLeave={()=>scheduleMenuClose("explore")} className="menu-pop absolute left-1/2 top-full max-h-[calc(100vh-96px)] w-[min(460px,calc(100vw-32px))] overflow-y-auto rounded-[26px] border border-[#000B3D]/15 bg-white/98 p-4 shadow-[0_28px_90px_rgba(0,11,61,.14)]">
              <p className="px-3 pb-3 pt-1 text-[10px] font-bold uppercase tracking-[.25em] text-[#000B3D]">{BUSINESS_SHORT_NAME} Guide</p>
              <div className="space-y-1">{exploreLinks.map(([href,label,desc])=><a key={href} href={href} className="block rounded-2xl border border-transparent px-3 py-3 hover:border-[#000B3D]/20 hover:bg-[#000B3D]/[.06]"><span className="block text-sm font-semibold text-[#0B0F19]">{label}</span><span className="mt-1 block text-xs leading-5 text-black/40">{desc}</span></a>)}</div>
            </div>}
          </div>

          {publicLinks.slice(1).map(([href,label])=><a key={href} href={href} className={pathname===href?"text-[#0B0F19]":"hover:text-[#000B3D]"}>{label}</a>)}
          <button onClick={openSupport} className="hover:text-[#000B3D]">Support</button>
          {user&&!owner&&!staff&&<><a href="/dashboard" className="text-black/80 hover:text-[#000B3D]">Dashboard</a><a href="/vehicles" className="text-black/80 hover:text-[#000B3D]">Vehicles</a></>}
          {staff&&<a href="/admin/dashboard" className="text-[#000B3D]">Staff</a>}{owner&&<a href="/owner/dashboard" className="text-[#000B3D]">Owner</a>}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">{!user?<a href="/login" className="rounded-full border border-[#000B3D]/15 bg-[#F7F9FC] px-4 py-2.5 text-xs font-semibold text-black/70 hover:border-[#000B3D]/40 hover:bg-[#000B3D]/10 hover:text-[#000B3D]">Login</a>:<a href="/account" className="rounded-full border border-[#000B3D]/10 bg-[#F7F9FC] px-4 py-2.5 text-xs font-semibold text-black/70 hover:border-[#000B3D]/40 hover:bg-[#000B3D]/10 hover:text-[#000B3D]">Account</a>}<a href="/estimate" className="rounded-full bg-[#000B3D] px-5 py-2.5 text-xs font-semibold text-[#0B0F19]">Get Estimate</a></div>
        <button aria-expanded={menuOpen} aria-controls="mobile-site-menu" onClick={()=>setMenuOpen(!menuOpen)} className="rounded-full border border-[#000B3D]/15 bg-[#F7F9FC] px-4 py-2 text-xs font-semibold hover:border-[#000B3D]/40 hover:text-[#000B3D] xl:hidden">{menuOpen?"Close":"Menu"}</button>
      </div>

      <div
        id="mobile-site-menu"
        aria-hidden={!menuOpen}
        className={`mobile-menu-shell border-t bg-white xl:hidden ${menuOpen ? "mobile-menu-shell-open" : ""}`}
      >
        <div className="mobile-menu-scroll max-h-[68dvh] overflow-y-auto overscroll-contain px-5 py-4 pb-24">
        <nav className="flex flex-col text-sm text-black/70">
          <a href="/" className="rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Home</a>

          <div className="mt-2 overflow-hidden rounded-[20px] border border-[#000B3D]/10 bg-[#F7F9FC]">
            <button type="button" aria-expanded={mobileServicesOpen} onClick={()=>setMobileServicesOpen(v=>!v)} className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold text-[#0B0F19]">
              <span>Services</span><span className={`text-[#000B3D] transition-transform duration-300 ${mobileServicesOpen?'rotate-180':''}`}>⌄</span>
            </button>
            <div className={`mobile-accordion ${mobileServicesOpen ? "mobile-accordion-open" : ""}`}>
              <div className="mobile-accordion-inner">
              <div className="border-t border-[#000B3D]/10 px-3 pb-3 pt-2">
              <p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[.24em] text-black/30">Car Detailing</p>
              <a href="/car-detailing-packages" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Car Detailing Packages</a>
              <a href="/exterior-detailing" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Exterior Detailing</a>
              <a href="/interior-detailing" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Interior Detailing</a>
              <a href="/services#car-add-ons" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Car Add-Ons + Pricing</a>
              <p className="px-2 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[.24em] text-black/30">Marine Detailing</p>
              <a href="/marine-detailing" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Marine Detailing Services</a>
              <a href="/marine-detailing#marine-add-ons" className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Marine Add-Ons + Pricing</a>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <a href="/estimate" className="rounded-xl bg-[#000B3D]/10 px-3 py-3 text-[#000B3D]">Get an Estimate</a>
                <a href="/quote" className="rounded-xl border border-[#000B3D]/10 px-3 py-3 hover:border-[#000B3D]/30 hover:text-[#000B3D]">Get an Exact Quote</a>
              </div>
              </div>
              </div>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-[20px] border border-[#000B3D]/10 bg-[#F7F9FC]">
            <button type="button" aria-expanded={mobileExploreOpen} onClick={()=>setMobileExploreOpen(v=>!v)} className="flex w-full items-center justify-between px-4 py-4 text-left font-semibold text-[#0B0F19]">
              <span>Explore</span><span className={`text-[#000B3D] transition-transform duration-300 ${mobileExploreOpen?'rotate-180':''}`}>⌄</span>
            </button>
            <div className={`mobile-accordion ${mobileExploreOpen ? "mobile-accordion-open" : ""}`}>
              <div className="mobile-accordion-inner">
                <div className="border-t border-[#000B3D]/10 px-3 pb-3 pt-2">
                  {exploreLinks.map(([href,label,desc])=><a key={href} href={href} className="block rounded-xl px-3 py-3 hover:bg-[#000B3D]/8"><span className="block text-black/80">{label}</span><span className="mt-1 block text-xs leading-5 text-black/35">{desc}</span></a>)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-1">
            {publicLinks.slice(1).map(([href,label])=><a key={href} href={href} className="rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">{label}</a>)}
            <button onClick={openSupport} className="rounded-xl px-3 py-3 text-left hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Support</button>
            {!user&&<a href="/login" className="rounded-xl px-3 py-3 text-[#000B3D] hover:bg-[#000B3D]/8">Login</a>}
            {user&&!owner&&!staff&&<><a href="/dashboard" className="rounded-xl px-3 py-3">Dashboard</a><a href="/vehicles" className="rounded-xl px-3 py-3">Saved Vehicles</a></>}
            {staff&&<a href="/admin/dashboard" className="rounded-xl px-3 py-3 text-[#000B3D]">Staff Dashboard</a>}
            {owner&&<a href="/owner/dashboard" className="rounded-xl px-3 py-3 text-[#000B3D]">Owner Dashboard</a>}
            {user&&<a href="/account" className="rounded-xl px-3 py-3 hover:bg-[#000B3D]/8 hover:text-[#000B3D]">Account</a>}
          </div>
        </nav>
        </div>
      </div>
    </header>
  </>;
}
