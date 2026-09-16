# Session Log

## 2026-09-16 — Home hero section
- Built the hero from a reference screenshot: floating pill header (Solutions dropdown, mobile menu), ratings, headline, CTAs, concentric orbit rings with 10 floating integration badges, an activity card stack with a blue glow, and a trusted-by wordmark row.
- Architecture: `(marketing)` route group + layout. Features in `src/features/{site-header,marketing/hero}` expose an `index.ts` API. Shared primitives are in `src/shared`, brand config in `src/config/site.ts`. Server Components everywhere except `nav-dropdown` and `mobile-nav`. Content is typed static data behind `getHeroContent()`. There's no API route, Server Action or client fetch because nothing needs one.
- Removed the template `src/app/page.tsx`, `public/*.svg` and the dark-mode CSS. No dependencies added.
- Verified: `biome check` clean, `tsc --noEmit` OK, `next build` → `/` static. Browser pane at 1280 and 375: no horizontal overflow (docW = innerWidth), no console errors. Menus open, close on Escape and close on outside pointer (checked with JS).
- Open: brand name (Infrantic vs Deflexai), logos are approximations, nav targets 404, no tests (no runner, dependency not approved).

## 2026-09-16 — Rest of the landing page
- Hero left visually unchanged. Added, from a reference screenshot: benefits bento (4 mockup cards), workflow tabs (4 steps with a flow-node canvas), use-case scroll-snap carousel, testimonials carousel, integrations constellation, pricing (monthly/yearly), CTA band, and site footer (in the `(marketing)` layout).
- Each section is `src/features/marketing/<section>/{*.types,*.data,components,index}`. Two new client islands: `WorkflowTabs` (ARIA tabs, server panels) and `BillingSwitch` (data-attribute toggle, server cards). New shared: `section-heading`, `initials-avatar`, `icons`, `types.ts` (Cta). `integration-logo` moved from hero into `shared/ui` with `useId` gradient ids. The hero's only diffs are its import paths.
- Verified: biome clean (69 files), `tsc --noEmit` OK, `next build` → `/` static. Headless-Edge full-page screenshot reviewed at 1280, which led to fixes for rings crossing the integrations heading, carousel clipping, the purple-card dead space and an avatar overlap. Pane at 375: docW = vw, no unclipped overflow. Yearly toggle → $5/$12/$25. ArrowRight moves the selected tab and focus, one panel visible. No console errors.
- Open: brand copy/prices/testimonials are placeholders; logos, avatars and portraits need real assets; most links 404; still no tests (runner not approved).
