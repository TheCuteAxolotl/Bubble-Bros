"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  BUSINESS_NAME,
  BUSINESS_SHORT_NAME,
  BUSINESS_TAGLINE,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  OWNER_EMAIL,
  PHONE_FEATURE_ENABLED,
  GOOGLE_REVIEWS_ENABLED,
} from "@/lib/constants";

type User = { id: string; name: string; email: string; role: string };

const mainLinks = [
  ["/services", "Detailing"],
  ["/interior-detailing", "Interior"],
  ["/exterior-detailing", "Exterior"],
  ["/gallery", "Gallery"],
  ["/about", "About"],
  ...(GOOGLE_REVIEWS_ENABLED ? [["/reviews", "Reviews"]] as const : []),
  ["/contact", "Contact"],
] as const;

export default function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [staffAccess, setStaffAccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((data) => {
        setUser(data?.user || null);
        setStaffAccess(Boolean(data?.staffAccess));
      })
      .catch(() => {
        setUser(null);
        setStaffAccess(false);
      });
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

  const owner = Boolean(user && (user.role === "owner" || user.email.toLowerCase() === OWNER_EMAIL.toLowerCase()));
  const staff = Boolean(user && !owner && staffAccess);
  const openSupport = () => {
    window.dispatchEvent(new Event("open-support"));
    setMenuOpen(false);
  };

  return (
    <>
      <div className="border-b border-white/10 bg-[#000B3D] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[.2em] sm:justify-between sm:px-8 lg:px-10">
          <span className="hidden sm:block">{BUSINESS_SHORT_NAME} · {BUSINESS_TAGLINE}</span>
          <span>Interior + exterior detailing only</span>
          <div className="hidden items-center gap-5 sm:flex">
            {PHONE_FEATURE_ENABLED && BUSINESS_PHONE && (
              <a href={`tel:${BUSINESS_PHONE}`} className="text-white/80 hover:text-white">
                {BUSINESS_PHONE_DISPLAY}
              </a>
            )}
            <a href="/quote" className="text-white/80 hover:text-white">Exact quote ↗</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#000B3D]/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 py-3.5 sm:px-8 lg:px-10">
          <a href="/" aria-label={`${BUSINESS_NAME} home`} className="flex shrink-0 items-center gap-3">
            <Image
              src="/bubbles-bros-logo.png"
              alt={BUSINESS_NAME}
              width={300}
              height={300}
              priority
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <div className="hidden sm:block">
              <p className="text-[15px] font-extrabold uppercase tracking-[.05em] text-[#000B3D]">{BUSINESS_SHORT_NAME}</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.2em] text-black/35">Auto detailing</p>
            </div>
          </a>

          <nav className="mx-auto hidden items-center rounded-full border border-[#000B3D]/10 bg-[#F7F9FD] p-1.5 text-[12px] font-semibold text-black/55 xl:flex">
            {mainLinks.map(([href, label]) => {
              const active = pathname === href || (href === "/services" && pathname === "/car-detailing-packages");
              return (
                <a
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2.5 ${active ? "bg-white text-[#000B3D] shadow-sm" : "hover:bg-white hover:text-[#000B3D]"}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-2 xl:flex">
            <button onClick={openSupport} className="px-3 py-2 text-xs font-semibold text-black/50 hover:text-[#000B3D]">Support</button>
            {owner && <a href="/owner/dashboard" className="px-3 py-2 text-xs font-semibold text-[#000B3D]">Owner</a>}
            {staff && <a href="/admin/dashboard" className="px-3 py-2 text-xs font-semibold text-[#000B3D]">Staff</a>}
            {!user ? (
              <a href="/login" className="rounded-full border border-[#000B3D]/12 px-4 py-2.5 text-xs font-semibold text-black/60 hover:border-[#000B3D]/30 hover:text-[#000B3D]">Login</a>
            ) : (
              <a href="/account" className="rounded-full border border-[#000B3D]/12 px-4 py-2.5 text-xs font-semibold text-black/60 hover:border-[#000B3D]/30 hover:text-[#000B3D]">Account</a>
            )}
            <a href="/quote" className="rounded-full bg-[#000B3D] px-5 py-2.5 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,11,61,.16)]">Get a Quote</a>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="ml-auto rounded-full border border-[#000B3D]/12 bg-[#F7F9FD] px-4 py-2.5 text-xs font-semibold text-[#000B3D] xl:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div
          id="mobile-site-menu"
          aria-hidden={!menuOpen}
          className={`mobile-menu-shell border-t bg-white xl:hidden ${menuOpen ? "mobile-menu-shell-open" : ""}`}
        >
          <div className="mobile-menu-scroll max-h-[76dvh] overflow-y-auto px-5 py-5 pb-24">
            <nav className="grid gap-2">
              <a href="/" className="rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FD] px-4 py-4 font-semibold text-[#000B3D]">Home</a>
              <div className="grid grid-cols-2 gap-2">
                <a href="/car-detailing-packages" className="rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-4 text-sm font-semibold text-black/75">Full Details</a>
                <a href="/interior-detailing" className="rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-4 text-sm font-semibold text-black/75">Interior</a>
                <a href="/exterior-detailing" className="rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-4 text-sm font-semibold text-black/75">Exterior</a>
                <a href="/services#car-add-ons" className="rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-4 text-sm font-semibold text-black/75">Add-Ons</a>
              </div>
              {mainLinks.filter(([href]) => !["/services", "/interior-detailing", "/exterior-detailing"].includes(href)).map(([href, label]) => (
                <a key={href} href={href} className="rounded-2xl px-4 py-3.5 text-sm font-medium text-black/60 hover:bg-[#F7F9FD] hover:text-[#000B3D]">{label}</a>
              ))}
              <button onClick={openSupport} className="rounded-2xl px-4 py-3.5 text-left text-sm font-medium text-black/60 hover:bg-[#F7F9FD] hover:text-[#000B3D]">Support</button>
              {!user && <a href="/login" className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#000B3D]">Login</a>}
              {user && <a href="/account" className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#000B3D]">Account</a>}
              {owner && <a href="/owner/dashboard" className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#000B3D]">Owner Dashboard</a>}
              {staff && <a href="/admin/dashboard" className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#000B3D]">Staff Dashboard</a>}
              <a href="/quote" className="mt-2 rounded-2xl bg-[#000B3D] px-5 py-4 text-center text-sm font-bold text-white">Get an Exact Quote</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
