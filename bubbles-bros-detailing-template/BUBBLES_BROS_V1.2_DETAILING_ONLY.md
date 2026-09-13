# Bubbles & Bros. v1.2 — Detailing-Only Redesign

This release separates Bubbles & Bros. visually and structurally from the original Car Dash template.

## Public-site changes
- Rebuilt the homepage around a split hero, three service lanes, a three-step process, recent work, and a strong navy/white CTA system.
- Replaced the old service mega-menu with a compact navigation and a different mobile menu.
- Rebuilt the reusable public hero as a split text/photo layout so About, Contact, Gallery, FAQ, and Reviews no longer inherit the old page structure.
- Rebuilt pricing pages around a sticky vehicle selector and stacked package rows rather than the prior card layout.
- Rebuilt the Services and About pages with a different composition.
- Simplified the footer around Full Detail, Interior, Exterior, Gallery, About, FAQ, Contact, and Quote.

## Service scope
Bubbles & Bros. is now positioned as an auto-detailing-only business:
- Full interior + exterior detailing
- Interior detailing
- Exterior detailing
- Practical detailing add-ons

Marine detailing, paint correction, and ceramic-coating public pages were removed from the site and sitemap. Their old URLs permanently redirect to `/services` so old bookmarks do not land on a dead page.

## Pricing updates
- Replaced paint-enhancement/correction packages with deeper detailing packages.
- Removed Ceramic Sealant, Wheel Coating, and standalone Headlight Restoration from the default booking flow so services stay focused on interior/exterior detailing.
- Existing owner-customized pricing remains protected where possible; exact old default wording is normalized to the new detailing-only copy.

## Owner / staff cleanup
- Service categories are limited to Car Detailing, Interior Detailing, and Exterior Detailing.
- Removed marine, paint-correction, and ceramic image-placement choices from the Gallery editor.
- Removed ceramic-warranty pages from the visible owner/staff/customer workflows.
- Updated Staff Guide wording to detailing/service concerns rather than coating/warranty claims.

## Validation
- Parsed 167 TypeScript/TSX files after the redesign with 0 syntax errors.
- No new environment variables or database migration are required for this release.
- Return the Vercel Build Command to the normal project build (`npm run build`) after the one-time database initialization is complete.
