"use client";

import { useEffect, useState } from "react";
import { GOOGLE_BUSINESS_URL, GOOGLE_REVIEW_URL, GOOGLE_REVIEWS_ENABLED } from "@/lib/constants";

type GoogleReview = {
  id: string;
  author: string;
  authorProfileUrl: string | null;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string | null;
  publishTime: string | null;
  googleMapsUri: string;
};

type GoogleReviewData = {
  businessName: string;
  rating: number | null;
  reviewCount: number | null;
  googleMapsUri: string;
  reviewUrl: string;
  reviews: GoogleReview[];
  attributions?: Array<{ provider?: string; providerUri?: string }>;
};

function Stars({ rating }: { rating: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="tracking-[0.14em] text-[#000B3D]" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rounded)}
      <span className="text-black/20">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

export default function ReviewCards() {
  const [data, setData] = useState<GoogleReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!GOOGLE_REVIEWS_ENABLED) {
      setLoading(false);
      return;
    }

    fetch("/api/google-reviews", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Google reviews unavailable");
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setFailed(false);
      })
      .catch(() => {
        setData(null);
        setFailed(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!GOOGLE_REVIEWS_ENABLED) return null;

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-[#000B3D]/10 bg-[#F4F7FB] p-8 text-neutral-600">
        Loading live Google reviews…
      </div>
    );
  }

  if (failed || !data) {
    return (
      <div className="rounded-[2rem] border border-[#000B3D]/20 bg-[#F5F7FB] p-8">
        <p className="text-xl font-black text-[#0B0F19]">Google reviews are temporarily unavailable.</p>
        <p className="mt-3 text-neutral-600">Reviews can still be viewed or submitted directly on Google.</p>
        <a
          href={GOOGLE_REVIEW_URL || GOOGLE_BUSINESS_URL || "#"}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-[#000B3D] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#000B3D]"
        >
          Open Google Reviews
        </a>
      </div>
    );
  }

  return (
    <section aria-label="Google reviews">
      <div className="mb-7 flex flex-col gap-5 rounded-[2rem] border border-[#000B3D]/10 bg-[#F5F7FB] p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#000B3D]">Live from Google Maps</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {data.rating !== null && <span className="text-4xl font-black text-[#0B0F19]">{data.rating.toFixed(1)}</span>}
            {data.rating !== null && <Stars rating={data.rating} />}
            {data.reviewCount !== null && (
              <span className="text-sm text-neutral-600">{data.reviewCount} Google reviews</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={data.googleMapsUri || GOOGLE_BUSINESS_URL || GOOGLE_REVIEW_URL || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-[#000B3D]/15 bg-[#F4F7FB] px-5 py-2.5 text-sm font-black text-[#0B0F19] transition hover:bg-[#EEF2F7]"
          >
            View on Google Maps
          </a>
          <a
            href={data.reviewUrl || GOOGLE_REVIEW_URL || data.googleMapsUri || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[#000B3D] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#000B3D]"
          >
            Leave a Google Review
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {data.reviews.map((review) => (
          <article key={review.id} className="flex h-full flex-col rounded-[2rem] border border-[#000B3D]/10 bg-[#F5F7FB] p-7">
            <div className="flex items-center gap-4">
              {review.authorPhotoUrl ? (
                <img
                  src={review.authorPhotoUrl}
                  alt=""
                  className="h-12 w-12 rounded-full border border-[#000B3D]/10 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#000B3D]/12 text-lg font-black text-[#000B3D]">
                  {review.author.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                {review.authorProfileUrl ? (
                  <a
                    href={review.authorProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-black text-[#0B0F19] hover:text-[#000B3D]"
                  >
                    {review.author}
                  </a>
                ) : (
                  <p className="font-black text-[#0B0F19]">{review.author}</p>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <Stars rating={review.rating} />
                  {review.relativeTime && <span className="text-neutral-500">{review.relativeTime}</span>}
                </div>
              </div>
            </div>

            {review.text && <p className="mt-6 flex-1 text-base leading-8 text-neutral-700">“{review.text}”</p>}

            <a
              href={review.googleMapsUri}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit text-sm font-black text-[#000B3D] transition hover:text-[#000B3D]"
            >
              View this review on Google Maps →
            </a>
          </article>
        ))}
      </div>

      {!data.reviews.length && (
        <div className="rounded-[2rem] border border-[#000B3D]/10 bg-[#F4F7FB] p-8 text-neutral-600">
          No Google review cards were returned, but the business rating is live above.
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] px-5 py-4 text-xs leading-6 text-neutral-500">
        <span translate="no" className="font-bold text-neutral-700">Google Maps</span> reviews are shown in Google&apos;s relevance order. Reviewer names, profile links, photos, ratings and review links are provided by Google Maps.
      </div>
    </section>
  );
}
