# Paul Adamu — Portfolio (Full-Stack Developer & Cybersecurity Specialist)

## Overview
A React + Vite single-page portfolio, originally exported from Figma Make, now wired to Firebase (Auth + Firestore). The public site ("/") is presentation + contact form. A password-free but Google-restricted admin panel ("/admin") manages the Work section's project list, which lives in Firestore and starts empty until the admin adds projects.

## Running it
- Dev server: `npm run dev` (binds `0.0.0.0:5000`, `allowedHosts: true` in `vite.config.ts` for the Replit proxy).
- Build: `npm run build` → outputs to `dist/`.
- The "Start application" workflow runs `npm run dev`.

## Routing
No router library is wired up — `src/main.tsx` does a simple path check: `/admin*` renders `src/admin/AdminApp.tsx`, everything else renders the main `src/app/App.tsx` (which handles its own home/work/case-study views via internal state, not real URLs). `vercel.json` rewrites all paths to `index.html` so `/admin` works after a hard refresh or direct link on Vercel.

## Firebase
- Client SDK config lives in env vars (`VITE_FIREBASE_*`, set as Replit shared env vars and mirrored on Vercel). See `.env.example` for the full list.
- `src/lib/firebase.ts` initializes the app; degrades gracefully (no crash) if config is missing.
- `src/lib/projects.ts` — Firestore CRUD for the `projects` collection (the Work section's data).
- `src/hooks/useAuth.ts` — Google sign-in via Firebase Auth; `VITE_ADMIN_EMAIL` (default `pauladamu600@gmail.com`) is the only account allowed into `/admin`.
- Images are uploaded as base64 data URIs directly in Firestore documents (no Storage bucket used) — kept under ~700KB client-side to stay within Firestore's 1MB document cap.

### Still required in the Firebase Console (cannot be done from here)
1. **Enable Google as a sign-in provider**: Firebase Console → Authentication → Sign-in method → enable Google.
2. **Add your Replit dev domain and your Vercel domain** to Authentication → Settings → Authorized domains, or Google sign-in popups will be blocked.
3. **Deploy `firestore.rules`** (in the project root) to the actual `paul-adamu` Firebase project: `firebase deploy --only firestore:rules` (requires `firebase login` first), or paste its contents into Firebase Console → Firestore Database → Rules. Until this is done, the Work section will show "no projects" and admin writes will fail with a permissions error — this is expected and by design (rules default-deny).

## Deploying to Vercel
1. Push this repo to GitHub and import it in Vercel (or `vercel` CLI from this directory).
2. In the Vercel project's Environment Variables, add every key from `.env.example` with your real values (same ones set as Replit env vars here).
3. Vercel auto-detects the Vite build; `vercel.json` already sets `buildCommand`/`outputDirectory` and the SPA rewrite so `/admin` resolves correctly.

## Structure
- `src/app/App.tsx` — public site (home, work, case study), tech-stack marquee (react-icons/si logos), countdown timer.
- `src/admin/` — `/admin` login + dashboard + project create/edit form (base64 image upload).
- `src/lib/` — `firebase.ts`, `projects.ts` (Firestore CRUD), `types.ts`, `toBase64.ts`.
- `src/hooks/useAuth.ts` — auth + admin-email gate.
- `firestore.rules` — public read on `projects`, write restricted to the admin email.

## Notes
- No TypeScript compiler is configured in this project (Vite/esbuild strips types without type-checking) — this matches how it was originally exported.
- `zipFile.zip` (the original import archive) is still in the project root and can be deleted.

## User preferences
- Full-stack developer + cybersecurity specialist positioning (not just frontend).
- Admin access restricted to `pauladamu600@gmail.com` only.
- Tech stack icons: TypeScript, Python, Firebase, JavaScript, Git, React, Figma, C, Tailwind CSS, Supabase, OWASP — rendered via `react-icons/si` (Simple Icons) rather than Flaticon, since Flaticon assets require manual per-icon download/attribution and aren't fetchable programmatically; Simple Icons are free, MIT-licensed, and give the same recognizable brand marks.
