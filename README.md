# Pylon Energy

Next.js frontend with an Express API in `pylon-energy-backend`.

## Local development

1. Run `npm ci` and `npm run dev` in this directory.
2. In `pylon-energy-backend`, run `npm ci` and `npm run dev`.
3. Open http://localhost:3000. The API defaults to http://localhost:4000.

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the deployed API origin for production. Configure the backend's `MONGO_URI`, `CORS_ORIGIN`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `ADMIN_EMAIL` in its environment. Without MongoDB, the existing backend uses temporary in-memory storage, which is lost on restart. Without SMTP, notification emails are skipped.

## Design and quote behaviour

The site uses Manrope throughout the interface and uses the supplied Pylon Energy logo artwork. The homepage features a full-width rotating solar, battery and commercial banners, compact lead capture, package comparison cards, a three-way electricity cost calculator and a warm-toned enquiry section. Banners rotate every 5 seconds unless manually paused, and support manual arrows, indicators and a pause control. Reduced-motion preferences remove animated transitions; playback remains enabled as requested. Compact right-side calculator, quote and call shortcuts follow the supplied references.

Quote buttons open the shared accessible dialog on the current page. It first appears after one minute, with at least one minute after each dismissal and a maximum of two automatic appearances per browser session. Page navigation and refresh preserve the cooldown and limit. Completion is remembered for the current browser session. Escape, the close button and backdrop dismiss the dialog. Package selection and calculator details are passed into the quote request. Admin routes do not show the automatic dialog.

All quote forms send real requests to `/api/leads`; errors retain entered details. Postal addresses are stored and shown in the admin lead table and email notification. The calculator is illustrative and displays its assumptions; its results exclude upfront installation costs.

The highlighted Make a Payment button opens payment assistance with the business's telephone and email. Connect a verified payment provider or invoice payment URL before using it for online checkout.

## Checks

- `npx tsc --noEmit`
- `$env:PYLON_BUILD_DIR='.next-check'; npx next build` (isolated frontend production build in PowerShell, so the running development preview keeps its own output)
- `npx tsc --noEmit` inside `pylon-energy-backend`

`npm run build` also runs the existing Cloudflare packaging step. Existing deployment configuration is preserved.

## Educational content

Four local guides in `src/data/solarGuides.ts` provide content even when the CMS is unavailable, with source links to Smart House Solar. Published CMS articles are merged into the index. Legacy in-memory demo posts are omitted from the index. Package category panels explain equipment, suitability and backup requirements; prices and site-specific savings remain subject to a written quote.
