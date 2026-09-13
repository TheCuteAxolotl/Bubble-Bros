import PublicHero from "@/components/PublicHero";
import ReviewCards from "@/components/ReviewCards";

const REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || "";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0F19]">
      <PublicHero imageCategory="reviews-hero" eyebrowKey="reviewsEyebrow" titleKey="reviewsTitle" bodyKey="reviewsBody" action={<a href={REVIEW_URL || "/contact"} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-[#F1F4F8]5">Leave a Google review</a>} />
      <main className="mx-auto max-w-[1540px] border-x border-[#000B3D]/10 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <ReviewCards />
      </main>
    </div>
  );
}
