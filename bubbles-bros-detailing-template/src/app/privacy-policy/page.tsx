import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, PHONE_FEATURE_ENABLED, SMS_FEATURE_ENABLED } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Bubbles & Bros., including quote requests, accounts, bookings, support, and data retention.',
  path: '/privacy-policy',
});

const effectiveDate = "September 12, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white px-5 py-20 text-[#0B0F19] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#000B3D]">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-black/50">Effective {effectiveDate}</p>

        <div className="mt-10 space-y-10 text-[15px] leading-7 text-black/70">
          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Overview</h2>
            <p className="mt-3">
              Bubbles & Bros. respects your privacy. This Privacy Policy explains what information we collect through
              your deployed site, how we use it, and the choices available to you when you request a quote, book a service,
              create an account, use support or quote chat, or otherwise contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Information we collect</h2>
            <p className="mt-3">
              Depending on how you use the website, we may collect information such as your name, email address, phone number,
              account information, vehicle details, service selections, appointment preferences, service address, quote, booking-chat, and support
              messages, photos you choose to upload, booking history, and other information you provide to us. We may also collect
              limited technical and security information needed to operate and protect the website, such as authentication data,
              device or browser information, and network identifiers used for fraud or abuse prevention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">How we use information</h2>
            <p className="mt-3">
              We use information to provide and improve our detailing services, respond to quote and support requests, manage
              customer accounts and saved vehicles, schedule and manage bookings, communicate about appointments, maintain service
              and service records, prevent abuse, troubleshoot the website, and comply with legal obligations.
            </p>
          </section>

          {SMS_FEATURE_ENABLED && (
          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">SMS and mobile information</h2>
            <p className="mt-3">
              If you separately opt in to SMS, Bubbles & Bros. may send transactional or customer-care text messages related to
              your quote, booking, appointment, or service. Message frequency varies. Message and data rates may apply. Reply STOP
              to opt out or HELP for help.
            </p>
            <p className="mt-3">
              Mobile information, including phone numbers and SMS opt-in data or consent, will not be sold or shared with third
              parties or affiliates for their marketing or promotional purposes. We may share information with service providers
              that help us deliver requested communications or operate our services, but text messaging originator opt-in data and
              consent will not be shared with third parties for their own marketing.
            </p>
          </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Service providers</h2>
            <p className="mt-3">
              We may use service providers to host the website, store data, deliver communications, process website
              requests, or provide other infrastructure. These providers may process information only as needed to perform services
              for Bubbles & Bros. and are subject to their own privacy and security obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Cookies and authentication</h2>
            <p className="mt-3">
              The website may use cookies or similar browser storage that are necessary for features such as account login,
              authentication, security, and site preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Data retention and security</h2>
            <p className="mt-3">
              We retain information for as long as reasonably necessary to provide services, maintain business and service records,
              resolve disputes, enforce agreements, and meet legal obligations. We use reasonable administrative and technical
              safeguards, but no internet service or storage system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Your choices</h2>
            <p className="mt-3">
              You may contact us to ask questions about your information or request updates to information you have provided,
              subject to legal and recordkeeping requirements.
            </p>
            <p className="mt-3">
              Signed-in customers can also permanently delete their account from the Account page. Account deletion removes the
              account and data directly linked to it. Information submitted outside the account system, such as certain support
              requests or public reviews, may be retained when needed for legitimate business, security, or legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Changes to this policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy as our services or legal requirements change. The effective date at the top of this
              page will show when the policy was last updated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0B0F19]">Contact us</h2>
            <p className="mt-3">
              Questions about this Privacy Policy can be sent to{" "}
              <a className="text-[#000B3D] hover:text-[#000B3D]" href={`mailto:${BUSINESS_EMAIL}`}>
                {BUSINESS_EMAIL}
              </a>
              {PHONE_FEATURE_ENABLED && BUSINESS_PHONE ? (<> or by calling <a className="text-[#000B3D] hover:text-[#000B3D]" href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a></>) : "."}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
