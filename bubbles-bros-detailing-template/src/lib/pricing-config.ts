export type VehicleClass = "coupe" | "sedan" | "truckSuv";

export type PricingPackage = {
  id: string;
  tier: string;
  name: string;
  description: string;
  badge?: string;
  featured?: boolean;
  ctaLabel: string;
  prices: Record<VehicleClass, number>;
  features: string[];
};

export type PricingPageConfig = {
  eyebrow: string;
  title: string;
  body: string;
  priceNote: string;
  packages: PricingPackage[];
};

export const VEHICLE_LABELS: Record<VehicleClass, string> = {
  coupe: "Coupe",
  sedan: "Sedan",
  truckSuv: "Truck & SUV",
};

export const DEFAULT_PRICING_PAGES: Record<"packages" | "exterior" | "interior", PricingPageConfig> = {
  packages: {
    eyebrow: "Full Car Detailing",
    title: "Interior + exterior packages for the whole vehicle.",
    body: "Pick your vehicle size, compare the level of cleaning, and choose the package that fits how much work the car needs.",
    priceNote: "Prices shown are standard for the selected vehicle class. Extreme pet hair, biohazards, excessive personal-item removal, or unusual cleanup needs are quoted separately before service begins.",
    packages: [
      {
        id: "essential",
        tier: "Essential",
        name: "Essential Detail",
        description: "A straightforward inside-and-out clean for a vehicle that is already kept up pretty well.",
        ctaLabel: "Book Essential Detail",
        prices: { coupe: 159, sedan: 179, truckSuv: 219 },
        features: ["Foam hand wash", "Wheels and tires", "Interior vacuum", "Interior wipe-down", "Glass inside and out", "Crevices and touch points", "Tire dressing"],
      },
      {
        id: "complete",
        tier: "Best Value",
        name: "Complete Detail",
        description: "A more complete interior + exterior reset with extra cleaning, decontamination, and simple paint protection.",
        badge: "Most Popular",
        featured: true,
        ctaLabel: "Book Complete Detail",
        prices: { coupe: 219, sedan: 249, truckSuv: 299 },
        features: ["Everything in Essential", "Interior disinfecting", "Vent and detail brushing", "Iron decontamination", "Contact wash", "Spray sealant protection", "Door jambs"],
      },
      {
        id: "deep-detail",
        tier: "Deep Clean",
        name: "Deep Clean Detail",
        description: "A longer inside-and-out detail for vehicles that need extra cleaning time and more attention throughout.",
        ctaLabel: "Book Deep Clean Detail",
        prices: { coupe: 299, sedan: 329, truckSuv: 389 },
        features: ["Everything in Complete", "Extra interior detail time", "Carpet extraction as needed", "Seat shampoo as applicable", "Extra exterior decontamination", "Hand-applied paint protection", "Detailed final inspection"],
      },
    ],
  },
  exterior: {
    eyebrow: "Exterior Detailing",
    title: "Exterior cleaning from a maintenance wash to a deeper detail.",
    body: "Choose your vehicle size, then pick the exterior service that matches how much cleaning and decontamination the vehicle needs.",
    priceNote: "Prices shown are standard for the selected vehicle class. Severe tar, overspray, heavy contamination, or unusual cleanup needs are quoted separately.",
    packages: [
      {
        id: "maintenance-wash",
        tier: "Entry",
        name: "Maintenance Wash",
        description: "A careful wash for vehicles that are already in good condition.",
        ctaLabel: "Book Maintenance Wash",
        prices: { coupe: 79, sedan: 89, truckSuv: 109 },
        features: ["Pre-rinse", "Foam cannon wash", "Contact hand wash", "Wheel faces and tires", "Bug removal", "Exterior glass", "Tire dressing"],
      },
      {
        id: "full-exterior",
        tier: "Best Value",
        name: "Full Exterior Detail",
        description: "A deeper exterior clean with decontamination and simple paint protection.",
        badge: "Most Popular",
        featured: true,
        ctaLabel: "Book Full Exterior Detail",
        prices: { coupe: 149, sedan: 169, truckSuv: 199 },
        features: ["Everything in Maintenance Wash", "Inner wheel cleaning", "Door jamb wipe-down", "Iron decontamination", "Light clay treatment as needed", "Paint sealant", "Trim and tire finish"],
      },
      {
        id: "deep-exterior",
        tier: "Deep Clean",
        name: "Deep Exterior Detail",
        description: "A more thorough exterior detail with extra decontamination, finish work, and hand-applied protection.",
        ctaLabel: "Book Deep Exterior Detail",
        prices: { coupe: 219, sedan: 249, truckSuv: 299 },
        features: ["Everything in Full Exterior", "Extra bug and tar attention", "Clay treatment as needed", "Detailed hand cleaning", "Hand-applied gloss protection", "Exterior trim finish", "Detailed final inspection"],
      },
    ],
  },
  interior: {
    eyebrow: "Interior Detailing",
    title: "Interior detailing from a quick refresh to a deep clean.",
    body: "Choose your vehicle size and how much cleaning the cabin needs.",
    priceNote: "Prices shown are standard for the selected vehicle class. Extreme pet hair, mold, biohazards, heavy bodily-fluid contamination, or excessive personal-item removal require a custom quote.",
    packages: [
      {
        id: "interior-refresh",
        tier: "Entry",
        name: "Interior Refresh",
        description: "A lighter clean for interiors that are already kept up pretty well.",
        ctaLabel: "Book Interior Refresh",
        prices: { coupe: 119, sedan: 129, truckSuv: 159 },
        features: ["Full vacuum", "Dash and console wipe-down", "Cupholders and touch points", "Interior glass", "Light crevice cleaning", "Floor mats", "Final interior check"],
      },
      {
        id: "full-interior",
        tier: "Best Value",
        name: "Full Interior Detail",
        description: "A full cabin detail when the interior needs more than a quick cleanup.",
        badge: "Most Popular",
        featured: true,
        ctaLabel: "Book Full Interior Detail",
        prices: { coupe: 179, sedan: 199, truckSuv: 239 },
        features: ["Everything in Interior Refresh", "Detailed brushing", "Seat cleaning", "Carpet and mat cleaning", "Door panels and jambs", "Vent detailing", "Interior protection on compatible surfaces"],
      },
      {
        id: "deep-reset",
        tier: "Deep Clean",
        name: "Deep Interior Reset",
        description: "A deeper clean for stains, neglected interiors, and heavier buildup.",
        ctaLabel: "Book Deep Interior Reset",
        prices: { coupe: 249, sedan: 279, truckSuv: 329 },
        features: ["Everything in Full Interior", "Carpet extraction", "Seat shampoo as applicable", "Heavier stain treatment", "Deep crevice work", "Odor-focused cleaning", "Extended detail time"],
      },
    ],
  },
};

export function parsePricingConfig(value: string | null | undefined, fallback: PricingPageConfig): PricingPageConfig {
  try {
    const parsed = JSON.parse(value || "") as PricingPageConfig;
    if (!parsed || !Array.isArray(parsed.packages)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function getPackagePrice(config: PricingPageConfig, packageId: string, vehicleClass: string) {
  const pkg = config.packages.find((item) => item.id === packageId);
  if (!pkg) return null;
  if (!(vehicleClass in VEHICLE_LABELS)) return null;
  const key = vehicleClass as VehicleClass;
  const price = Number(pkg.prices?.[key]);
  if (!Number.isFinite(price) || price <= 0) return null;
  return { pkg, key, price };
}
