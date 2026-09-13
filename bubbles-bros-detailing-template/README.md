# Bubbles & Bros. Detailing

A rebranded Next.js/Vercel detailing website based on the supplied v5.5.1 detailing template. The public brand, owner account, logo, metadata, and configurable business settings have been changed for **Bubbles & Bros.**

## Current configuration

- Business: **Bubbles & Bros.**
- Tagline: **Because We Care.**
- Owner / business email: **kongkaeow5@gmail.com**
- Logo: `public/bubbles-bros-logo.png`
- Phone / Twilio: **disabled**
- Google Reviews integration: **disabled** until IDs/URLs are supplied
- Social links: hidden until URLs are supplied
- Service area: intentionally blank until supplied

## Stack

Next.js 16, React 19, TypeScript, Prisma, PostgreSQL, Tailwind CSS, owner/admin dashboards, account login, quotes, booking calendar/availability, pricing editor, gallery, support, warranties, and analytics.

## Start locally

1. Copy `.env.example` to `.env.local` and fill the required values.
2. Run `npm install`.
3. Run `npm run bootstrap` once to create/update the database schema and seed the owner account.
4. Run `npm run dev`.

For a clean Vercel deployment, follow `VERCEL_SETUP.md`.
