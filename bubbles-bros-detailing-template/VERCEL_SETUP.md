# Bubbles & Bros. — New Vercel Project Setup

This template is prepared for a **separate Vercel project and separate database**. Do not reuse the original project's production database or secrets.

## 1. Create the new Vercel project

Create/import a new Vercel project from this codebase. A project name such as `bubbles-bros-detailing` is fine.

## 2. Create a new PostgreSQL database

Use a new Postgres database (for example Prisma Postgres, Neon, Supabase Postgres, or another Vercel-compatible Postgres provider). Add its connection string as:

```env
DATABASE_URL=postgresql://...
```

The Prisma schema requires `DATABASE_URL` during schema generation/push. The runtime can also recognize common pooled Vercel database variables, but `DATABASE_URL` is the simplest required setup.

## 3. Add Vercel environment variables

Add these to Production, Preview, and Development unless you intentionally want different values:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<long-random-secret>
NEXT_PUBLIC_SITE_URL=https://YOUR-VERCEL-PROJECT.vercel.app
NEXT_PUBLIC_OWNER_EMAIL=kongkaeow5@gmail.com
NEXT_PUBLIC_BUSINESS_NAME=Bubbles & Bros.
NEXT_PUBLIC_BUSINESS_SHORT_NAME=Bubbles & Bros.
NEXT_PUBLIC_BUSINESS_TAGLINE=Because We Care.
NEXT_PUBLIC_BUSINESS_EMAIL=kongkaeow5@gmail.com
NEXT_PUBLIC_SERVICE_AREA=
NEXT_PUBLIC_ENABLE_PHONE=false
NEXT_PUBLIC_ENABLE_SMS=false
NEXT_PUBLIC_ENABLE_GOOGLE_REVIEWS=false
```

Generate `NEXTAUTH_SECRET` with a password manager or a command such as:

```bash
openssl rand -base64 48
```

Do **not** add Twilio variables right now. No business phone number is required, the public phone UI is hidden, the SMS/phone dashboard cards are hidden, and SMS consent controls are disabled in this version.

## 4. Initialize the database + owner account

For the one-time owner seed, set these locally alongside the same `DATABASE_URL`:

```env
OWNER_EMAIL=kongkaeow5@gmail.com
OWNER_NAME=Bubbles & Bros. Owner
OWNER_PASSWORD=<choose-a-strong-password-at-least-12-characters>
```

Then run:

```bash
npm install
npm run bootstrap
```

`npm run bootstrap` runs Prisma `db push` and seeds/updates the owner account. Do this before giving anyone the production URL.

## 5. Deploy

Push the code and deploy in Vercel. The normal build command is:

```bash
npm run build
```

After the first deployment, make sure `NEXT_PUBLIC_SITE_URL` matches the actual Vercel production URL (or the custom domain later), then redeploy so metadata and generated links use the right origin.

## Optional integrations later

The code still keeps the existing integration hooks so they can be turned on later without rebuilding the feature from scratch. They are dormant now. When the owner is ready, phone/SMS, Google Reviews, and social links can be enabled by adding their provider credentials/URLs and turning on the corresponding `NEXT_PUBLIC_ENABLE_*` flag.

## Important

Never copy the original project's `DATABASE_URL`, `NEXTAUTH_SECRET`, Twilio credentials, Google Place ID, Discord webhooks, or other production secrets into this project. Use fresh credentials for Bubbles & Bros.
