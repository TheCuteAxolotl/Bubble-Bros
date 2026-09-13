# Bubbles & Bros. Light Theme — v1.1.0

## Brand direction

The site is now designed around the colors already present in the Bubbles & Bros. logo:

- Primary background: `#FFFFFF` (white)
- Brand navy: `#000B3D` (sampled from the supplied logo)
- Primary text / near-black: `#0B0F19`
- Soft navy tint: `#EEF2FA`
- Soft panel gray-blue: `#F5F7FB` / `#F7F9FC`

## What changed

- Public website moved from a dark-first design to a white-first design.
- Header and dropdown navigation are white with navy accents.
- The thin announcement bar is navy with white text.
- Hero sections now use bright white image washes instead of black overlays.
- Primary buttons, badges, active states, and important links use logo navy.
- Cards, forms, quote screens, booking screens, account pages, staff tools, and owner dashboards use white / soft blue-gray surfaces.
- Footer is mostly white with a navy closing strip.
- Gallery/image captions remain white over dark image gradients for readability.
- Black is kept mainly for body text, image contrast, and modal backdrops.
- Legacy bright-blue/red visual remnants were removed from the theme.

## Deployment

No new environment variables are required for this theme update. Commit and push these files to the existing Bubble Bros GitHub repository. Vercel can redeploy the same project and keep the existing Prisma database and environment variables.

The fixed RGBA favicon remains included.
