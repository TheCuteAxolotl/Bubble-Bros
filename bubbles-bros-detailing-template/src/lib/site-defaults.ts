import { DEFAULT_PRICING_PAGES } from "@/lib/pricing-config";
import { DEFAULT_BOOKING_PRICING } from "@/lib/booking-pricing";
import { BUSINESS_NAME, SERVICE_AREA } from "@/lib/business-config";

export const SITE_DEFAULTS = {
  heroEyebrow: SERVICE_AREA ? `Mobile detailing · ${SERVICE_AREA}` : "Mobile detailing · We come to you",
  heroTitle: "Mobile detailing that comes to you.",
  heroBody: SERVICE_AREA ? `We’re fully mobile and serve ${SERVICE_AREA}. Interior, exterior, paint correction, ceramic coating, and marine detailing — we bring the setup to you.` : "We’re fully mobile. Interior, exterior, paint correction, ceramic coating, and marine detailing — we bring the setup to you.",
  heroPrimaryCta: "Get an Exact Quote",
  heroSecondaryCta: "See Services",

  introEyebrow: "How pricing works",
  introTitle: "We price the work your vehicle actually needs.",
  introBody: "Size matters, but condition matters too. Send us the vehicle, what you want done, and a few photos if you can. We’ll look it over and quote the work instead of automatically charging the biggest package.",

  storyEyebrow: "Why mobile",
  storyTitle: "No shop drop-off. We come to you.",
  storyBody: "You do not have to arrange a ride or leave the vehicle somewhere all day. We bring the detailing setup to your home or location and handle the service there.",

  servicesEyebrow: "Services",
  servicesTitle: "What do you need done?",
  servicesBody: "Start with car detailing, paint and ceramic protection, or marine detailing. From there you can compare the services, prices, and what is included.",

  galleryEyebrow: "Recent work",
  galleryTitle: "Some of our recent work.",
  galleryBody: "Interiors, exterior details, paint correction, ceramic coatings, and cleanup work we have recently completed.",

  reviewsEyebrow: "Google reviews",
  reviewsTitle: "See what customers have said.",
  reviewsBody: `Customer feedback for ${BUSINESS_NAME}.`,

  contactEyebrow: "Book a detail",
  contactTitle: "Tell us what you drive and what you want done.",
  contactBody: "Pick the service, vehicle, date, and time that work for you. We’ll review the request and confirm everything before the appointment.",

  aboutEyebrow: `About ${BUSINESS_NAME}`,
  aboutTitle: "Mobile detailing without the shop drop-off.",
  aboutIntro: SERVICE_AREA ? `${BUSINESS_NAME} is fully mobile and serves ${SERVICE_AREA}. We do interior and exterior detailing, paint correction, ceramic coating, and marine detailing.` : `${BUSINESS_NAME} is fully mobile. We do interior and exterior detailing, paint correction, ceramic coating, and marine detailing.`,
  aboutStoryTitle: `Why ${BUSINESS_NAME}`,
  aboutStoryBody: `${BUSINESS_NAME} was started to make detailing easier to fit into the day. We come to the vehicle, explain what we recommend, and keep the service focused on what the vehicle actually needs.`,
  aboutValuesTitle: "What you can expect from us",
  aboutValue1Title: "Straight answers",
  aboutValue1Body: "We’ll tell you what we recommend, what it costs, and if something extra is actually worth doing before we add it.",
  aboutValue2Title: "We come to you",
  aboutValue2Body: "No shop drop-off or waiting around. We bring the detailing setup to your vehicle and do the work there.",
  aboutValue3Title: "Fair pricing for the condition",
  aboutValue3Body: "A vehicle that is already pretty clean should not automatically cost the same as one that needs hours of extra work.",

  faqEyebrow: "FAQ",
  faqTitle: "A few things people ask us a lot.",
  faqBody: "Quick answers about mobile service, timing, pricing, ceramic coatings, and getting ready for the appointment.",
  faq1Question: "Do you come to me?",
  faq1Answer: SERVICE_AREA ? `Yes. We’re completely mobile and serve ${SERVICE_AREA}. Availability depends on the service, your location, and the date you want.` : "Yes. We’re completely mobile. Availability depends on the service, your location, and the date you want.",
  faq2Question: "How long will the detail take?",
  faq2Answer: "It depends on the vehicle, condition, and service. A lighter detail may take a few hours. Deep interior work, paint correction, or ceramic coating prep can take much longer.",
  faq3Question: "Can my quote be lower than the listed SUV or truck price?",
  faq3Answer: "Yes. Size is only part of the job. If your SUV or truck is already pretty clean and needs less work, your exact quote can be lower than the standard package price. Heavy pet hair, stains, buildup, or restoration work can raise it.",
  faq4Question: "Can you detail a car that already has ceramic coating?",
  faq4Answer: "Yes. We can use coating-safe wash methods and compatible protection products to clean it without unnecessarily stripping the coating.",
  faq5Question: "What should I take out of the car before the appointment?",
  faq5Answer: "Please take out valuables, personal items, and anything that blocks the areas you want cleaned when you can. If you have child seats or larger items, just let us know first.",
  faq6Question: "How does the exact quote work?",
  faq6Answer: "Send us your contact info, vehicle, condition, the service you want, and photos if you have them. You do not need an account. We’ll look over the job and send the quote or ask anything else we need to price it correctly.",

  pricingPackagesConfig: JSON.stringify(DEFAULT_PRICING_PAGES.packages),
  pricingExteriorConfig: JSON.stringify(DEFAULT_PRICING_PAGES.exterior),
  pricingInteriorConfig: JSON.stringify(DEFAULT_PRICING_PAGES.interior),
  bookingPricingConfig: JSON.stringify(DEFAULT_BOOKING_PRICING),

  footerBlurb: SERVICE_AREA ? `Serving ${SERVICE_AREA} with mobile interior, exterior, paint correction, ceramic coating, and marine detailing.` : "Completely mobile interior, exterior, paint correction, ceramic coating, and marine detailing.",
} as const;

export type SiteContentKey = keyof typeof SITE_DEFAULTS;
export type SiteContent = Record<SiteContentKey, string>;

// Only replace copy that exactly matches an older Bubbles & Bros. default. Owner-written custom
// content is left untouched, so upgrading the site never silently overwrites a custom edit.
const LEGACY_COPY_REPLACEMENTS: Record<string, string> = {};

const LEGACY_PRICING_COPY_REPLACEMENTS: Record<string, string> = {
  "Complete detailing packages with a clear price before you book.": "Pick a full-detail package and your vehicle size.",
  "Pick your vehicle type, compare what is included, and book the package that matches the level of reset you want.": "Choose your vehicle size, compare what is included, and pick the package that fits what you want done.",
  "A straightforward inside-and-out reset for a regularly maintained vehicle.": "A basic inside-and-out clean for a vehicle that is already kept up pretty well.",
  "A deeper full-vehicle detail with added decontamination and protection.": "A more complete interior + exterior detail with extra cleaning and paint protection.",
  "The full reset plus a light machine paint enhancement for extra gloss and clarity.": "Everything in the full detail plus a light machine polish for more gloss and clarity.",
  "Reserve Signature Detail": "Book Signature Detail",
  "Exterior packages built around the finish you want.": "Exterior detailing from a maintenance wash to paint enhancement.",
  "Choose the vehicle type first, then select a fixed-price exterior service from maintenance washing through paint enhancement.": "Choose your vehicle size, then pick anything from a maintenance wash to a full exterior detail or paint enhancement.",
  "A safe exterior refresh for vehicles that are already in good condition.": "A maintenance wash for vehicles that are already in good condition.",
  "A deeper exterior clean with chemical decontamination and paint protection.": "A deeper exterior clean with decontamination and paint protection.",
  "Exterior decontamination plus a single-stage machine enhancement for added gloss and clarity.": "Full exterior prep plus a one-step machine polish for more gloss and clarity.",
  "Reserve Paint Enhancement": "Book Paint Enhancement",
  "Interior packages from a clean refresh to a deep reset.": "Interior detailing from a quick refresh to a deep clean.",
  "Choose the vehicle type, compare the level of cleaning, and book with the exact package price shown.": "Choose your vehicle size and how much cleaning the interior needs.",
  "A clean-up for regularly maintained interiors that need the basics handled well.": "A lighter clean for interiors that are already kept up pretty well.",
  "A thorough interior detail for vehicles that need more than a maintenance clean.": "A full interior detail when the cabin needs more than a quick cleanup.",
  "A more intensive reset for neglected interiors, stains, and heavier buildup.": "A deeper clean for stains, neglected interiors, and heavier buildup.",
  "Reserve Deep Interior Reset": "Book Deep Interior Reset",
};

function normalizeLegacyPricingCopy(value: string) {
  try {
    const parsed = JSON.parse(value);
    const walk = (item: unknown): unknown => {
      if (typeof item === "string") return LEGACY_PRICING_COPY_REPLACEMENTS[item] || item;
      if (Array.isArray(item)) return item.map(walk);
      if (item && typeof item === "object") {
        return Object.fromEntries(Object.entries(item as Record<string, unknown>).map(([key, nested]) => [key, walk(nested)]));
      }
      return item;
    };
    return JSON.stringify(walk(parsed));
  } catch {
    return value;
  }
}

export function normalizeLegacySiteContent<T extends Record<string, string>>(content: T): T {
  return Object.fromEntries(
    Object.entries(content).map(([key, value]) => {
      const normalized = LEGACY_COPY_REPLACEMENTS[value] || value;
      if (key === "pricingPackagesConfig" || key === "pricingExteriorConfig" || key === "pricingInteriorConfig") {
        return [key, normalizeLegacyPricingCopy(normalized)];
      }
      return [key, normalized];
    })
  ) as T;
}
