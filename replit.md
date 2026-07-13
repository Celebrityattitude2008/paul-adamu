# Cybersecurity Portfolio Design

## Overview
A static React + Vite single-page portfolio site for a cybersecurity specialist / frontend developer, exported from Figma Make. No backend or database — all content is client-side React components. Uses Tailwind CSS v4, Radix UI, MUI, Framer Motion ("motion"), and a small set of other UI libraries.

## Running it
- Dev server: `npm run dev` (bound to `0.0.0.0:5000`, `allowedHosts: true` in `vite.config.ts` for the Replit proxy/iframe preview).
- Build: `npm run build` (outputs via Vite's default `dist/`).
- The "Start application" workflow runs `npm run dev` and is the primary way to preview the site.

## Structure
- `src/main.tsx` — app entry point.
- `src/app/App.tsx` — main page/component logic.
- `src/app/components/` — UI components.
- `src/imports/` — Figma-imported assets/components.
- `src/styles/` — global styles.
- `vite.config.ts` — includes a custom `figma-asset-resolver` plugin resolving `figma:asset/...` imports to `src/assets`.

## Notes
- A stray `.env` file contains an unused Firebase config snippet (not wired into the app — no Firebase SDK calls exist in the code, "Firebase" only appears as text/content). Left as-is since it's not referenced anywhere; can be removed if unwanted.
- `zipFile.zip` (the original import) is still present in the project root and can be deleted once no longer needed.

## User preferences
None recorded yet.
