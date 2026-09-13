const clean = (value: string | undefined) => value?.trim() || "";

export const BUSINESS_NAME = clean(process.env.NEXT_PUBLIC_BUSINESS_NAME) || "Bubbles & Bros.";
export const BUSINESS_SHORT_NAME = clean(process.env.NEXT_PUBLIC_BUSINESS_SHORT_NAME) || "Bubbles & Bros.";
export const BUSINESS_TAGLINE = clean(process.env.NEXT_PUBLIC_BUSINESS_TAGLINE) || "Because We Care.";
export const BUSINESS_EMAIL = clean(process.env.NEXT_PUBLIC_BUSINESS_EMAIL) || "kongkaeow5@gmail.com";
export const OWNER_EMAIL = (clean(process.env.NEXT_PUBLIC_OWNER_EMAIL) || "kongkaeow5@gmail.com").toLowerCase();

export const SITE_URL = (clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000").replace(/\/$/, "");
export const SERVICE_AREA = clean(process.env.NEXT_PUBLIC_SERVICE_AREA);
export const BUSINESS_PHONE = clean(process.env.NEXT_PUBLIC_BUSINESS_PHONE);
export const BUSINESS_PHONE_DISPLAY = clean(process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY) || BUSINESS_PHONE;

export const FACEBOOK_URL = clean(process.env.NEXT_PUBLIC_FACEBOOK_URL);
export const INSTAGRAM_URL = clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL);
export const GOOGLE_BUSINESS_URL = clean(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL);
export const GOOGLE_REVIEW_URL = clean(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL);

export const SMS_FEATURE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SMS === "true";
export const PHONE_FEATURE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PHONE === "true" && Boolean(BUSINESS_PHONE);
export const GOOGLE_REVIEWS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_REVIEWS === "true";
