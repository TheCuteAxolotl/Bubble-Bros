import { DEFAULT_PRICING_PAGES } from "@/lib/pricing-config";
import { DEFAULT_BOOKING_PRICING } from "@/lib/booking-pricing";
import { BUSINESS_NAME, SERVICE_AREA } from "@/lib/business-config";

export const SITE_DEFAULTS = {
  heroEyebrow: SERVICE_AREA ? `Mobile auto detailing · ${SERVICE_AREA}` : "Mobile auto detailing · We come to you",
  heroTitle: "A cleaner car, without the shop drop-off.",
  heroBody: SERVICE_AREA
    ? `Bubbles & Bros. brings interior, exterior, and full-car detailing to ${SERVICE_AREA}. Pick the level of clean you need and we bring the setup to you.`
    : "Bubbles & Bros. brings interior, exterior, and full-car detailing to you. Pick the level of clean you need and we bring the setup to your location.",
  heroPrimaryCta: "Get an Exact Quote",
  heroSecondaryCta: "See Detailing Packages",

  introEyebrow: "Simple pricing",
  introTitle: "Choose a package or send photos for an exact quote.",
  introBody: "Vehicle size matters, but condition matters too. If the car needs more than a standard package, send us a few photos and we’ll price the cleaning before the appointment.",

  storyEyebrow: "Why mobile",
  storyTitle: "No shop drop-off. We come to the car.",
  storyBody: "You do not have to arrange a ride or leave the vehicle somewhere all day. We bring the detailing setup to your home or location and handle the interior, exterior, or both there.",

  servicesEyebrow: "Auto detailing",
  servicesTitle: "Interior, exterior, or the full car.",
  servicesBody: "Bubbles & Bros. stays focused on car detailing. Choose a full interior + exterior detail, an interior-only service, or exterior-only detailing.",

  galleryEyebrow: "Recent details",
  galleryTitle: "Clean cars. Real results.",
  galleryBody: "Recent interior, exterior, and full-detail work completed by Bubbles & Bros.",

  reviewsEyebrow: "Google reviews",
  reviewsTitle: "See what customers have said.",
  reviewsBody: `Customer feedback for ${BUSINESS_NAME}.`,

  contactEyebrow: "Book a detail",
  contactTitle: "Tell us what you drive and what needs cleaning.",
  contactBody: "Choose interior, exterior, or a full detail, then pick the vehicle, date, and time that work for you. We’ll review the request and confirm the appointment.",

  aboutEyebrow: `About ${BUSINESS_NAME}`,
  aboutTitle: "Straightforward mobile car detailing.",
  aboutIntro: SERVICE_AREA
    ? `${BUSINESS_NAME} is fully mobile and serves ${SERVICE_AREA}. We focus on interior, exterior, and complete vehicle detailing.`
    : `${BUSINESS_NAME} is fully mobile. We focus on interior, exterior, and complete vehicle detailing.`,
  aboutStoryTitle: `Why ${BUSINESS_NAME}`,
  aboutStoryBody: `${BUSINESS_NAME} was built around a simple idea: make it easier to keep the car clean. We come to the vehicle, explain what level of cleaning makes sense, and keep the service focused on detailing rather than unnecessary upgrades.`,
  aboutValuesTitle: "What you can expect from us",
  aboutValue1Title: "Straight answers",
  aboutValue1Body: "We’ll tell you what level of cleaning makes sense, what it costs, and when an add-on is actually useful.",
  aboutValue2Title: "We come to you",
  aboutValue2Body: "No shop drop-off or waiting around. We bring the detailing setup to your vehicle and do the work there.",
  aboutValue3Title: "Care for the whole car",
  aboutValue3Body: "Whether you book interior, exterior, or both, the goal is the same: a clean vehicle and a clear process from quote to finish.",

  faqEyebrow: "FAQ",
  faqTitle: "A few things people ask us a lot.",
  faqBody: "Quick answers about mobile detailing, timing, pricing, interior cleaning, exterior cleaning, and getting ready for the appointment.",
  faq1Question: "Do you come to me?",
  faq1Answer: SERVICE_AREA
    ? `Yes. We’re completely mobile and serve ${SERVICE_AREA}. Availability depends on your location, the service, and the date you want.`
    : "Yes. We’re completely mobile. Availability depends on your location, the service, and the date you want.",
  faq2Question: "How long will the detail take?",
  faq2Answer: "It depends on the vehicle, condition, and service. A maintenance clean may take a few hours, while a deep interior or full detail can take longer.",
  faq3Question: "Can my quote be lower than the listed SUV or truck price?",
  faq3Answer: "Yes. Size is only part of the job. If your SUV or truck is already pretty clean and needs less work, your exact quote can be lower than the standard package price. Heavy pet hair, stains, buildup, or extra cleaning can raise it.",
  faq4Question: "What detailing services do you offer?",
  faq4Answer: "Bubbles & Bros. focuses on interior cleaning, exterior cleaning, full interior + exterior details, and practical detailing add-ons.",
  faq5Question: "What should I take out of the car before the appointment?",
  faq5Answer: "Please take out valuables, personal items, and anything that blocks the areas you want cleaned when you can. If you have child seats or larger items, just let us know first.",
  faq6Question: "How does the exact quote work?",
  faq6Answer: "Send us your contact info, vehicle, condition, the detailing service you want, and photos if you have them. You do not need an account. We’ll look over the job and send the quote or ask anything else we need to price it correctly.",

  pricingPackagesConfig: JSON.stringify(DEFAULT_PRICING_PAGES.packages),
  pricingExteriorConfig: JSON.stringify(DEFAULT_PRICING_PAGES.exterior),
  pricingInteriorConfig: JSON.stringify(DEFAULT_PRICING_PAGES.interior),
  bookingPricingConfig: JSON.stringify(DEFAULT_BOOKING_PRICING),

  footerBlurb: SERVICE_AREA
    ? `Mobile interior, exterior, and full-car detailing throughout ${SERVICE_AREA}.`
    : "Mobile interior, exterior, and full-car detailing. We bring the setup to you.",
} as const;

export type SiteContentKey = keyof typeof SITE_DEFAULTS;
export type SiteContent = Record<SiteContentKey, string>;

// Replace only exact older default copy so owner-written custom text is never overwritten.
const LEGACY_COPY_REPLACEMENTS: Record<string, string> = {
  "Mobile detailing that comes to you.": SITE_DEFAULTS.heroTitle,
  "We’re fully mobile. Interior, exterior, paint correction, ceramic coating, and marine detailing — we bring the setup to you.": SITE_DEFAULTS.heroBody,
  "What do you need done?": SITE_DEFAULTS.servicesTitle,
  "Start with car detailing, paint and ceramic protection, or marine detailing. From there you can compare the services, prices, and what is included.": SITE_DEFAULTS.servicesBody,
  "Interiors, exterior details, paint correction, ceramic coatings, and cleanup work we have recently completed.": SITE_DEFAULTS.galleryBody,
  "Quick answers about mobile service, timing, pricing, ceramic coatings, and getting ready for the appointment.": SITE_DEFAULTS.faqBody,
  "Completely mobile interior, exterior, paint correction, ceramic coating, and marine detailing.": SITE_DEFAULTS.footerBlurb,
};

const LEGACY_PRICING_COPY_REPLACEMENTS: Record<string, string> = {
  "Everything in the full detail plus a light machine polish for more gloss and clarity.": "A deeper inside-and-out detail for vehicles that need more time and more cleaning.",
  "Clay decontamination as needed": "Extra exterior decontamination as needed",
  "Single-stage paint enhancement": "Detailed exterior hand cleaning",
  "Gloss refinement": "Hand-applied paint protection",
  "Final paint inspection": "Final exterior inspection",
  "Signature Detail": "Deep Clean Detail",
  "Book Signature Detail": "Book Deep Clean Detail",
  "Exterior detailing from a maintenance wash to paint enhancement.": "Exterior detailing from a maintenance wash to a deeper exterior clean.",
  "Choose your vehicle size, then pick anything from a maintenance wash to a full exterior detail or paint enhancement.": "Choose your vehicle size, then pick a maintenance wash, full exterior detail, or deeper exterior clean.",
  "Paint Enhancement Detail": "Deep Exterior Detail",
  "Full exterior prep plus a one-step machine polish for more gloss and clarity.": "A more thorough exterior detail with extra decontamination, hand-applied protection, and finish work.",
  "Book Paint Enhancement": "Book Deep Exterior Detail",
  "Single-stage machine polishing": "Detailed hand cleaning",
  "Gloss enhancement": "Hand-applied gloss protection",
  "Light swirl reduction": "Extra bug, tar, and bonded-contamination attention",
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
