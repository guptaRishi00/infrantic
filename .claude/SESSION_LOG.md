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

## 2026-09-17 — Hero: smaller, no blue arcs
- Removed the rotating blue accent arcs (`ACCENTS` group in `orbit-backdrop.tsx`) and the now-unused `animate-orbit` token/keyframes in `globals.css`.
- Scaled the hero down ~15%: orbit scale 0.44→0.85 (was 0.5→1), h1 lg 3.6→3.1rem / sm 3→2.75rem, subtitle 17→16px, tighter top padding and gaps, activity stack 22.5→21.5rem (20rem truncated the first card, so reverted), trusted-by gap mt-32→mt-24.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280 (no blue lines, card text fits).

## 2026-09-17 — Hero: more background rings
- `orbit-backdrop.tsx`: rings 5 → 9 (added radius 210 inside, plus 1040/1190/1340 outside). SVG canvas 1900 → 2800 design px, mask fade start 62% → 70% so the outer rings show. Badge positions unchanged.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280.

## 2026-09-17 — Hero: static badges on the rings
- Removed `animate-float` from the hero badges (the token still drives the integrations and CTA sections).
- `OrbitIntegration` changed from `{x, y}` to `{ring, angle}`; `pointOnRing()` computes the offset, so every badge centre lies exactly on a ring line (rings 1/2/3 = 340/470/600). Angles were derived from the previous positions to keep the layout.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot (without reduced motion) shows badges centred on the lines.

## 2026-09-17 — Hero: badges moved to outer rings
- `hero.data.ts`: the two innermost rings (210/340) are now empty; badges sit on rings 2-4 (470/600/740), 5 per side. The first pass put Slack/Zapier on ring 4 at ±42°, which collided with the header, so they moved to ring 3 at -140/-40.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshots at 1280 and 1024.
- Follow-up: at 1024px the ring-4 badges (Workspace, AWS) clipped at the viewport edge, so they're now `hidden xl:block`. Re-verified lint, tsc, build and screenshots at 1024 and 1280.

## 2026-09-17 — Hero: smaller CTAs and activity cards
- `hero.tsx`: both CTAs use `ButtonLink size="sm"` (h-9, was h-11); activity stack width 21.5 → 18.5rem.
- `activity-stack.tsx`: card padding 3.5/3 → 3/2.5, rounded-lg, avatars/Gmail tile 9 → 8, text a step smaller (13/11/10px), glow 36rem → 30rem.
- Shared `ButtonLink` is untouched. Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280 (the first card still shows "Final Presentation" in full).

## 2026-09-17 — Hero: inner rings removed, cards lower
- `orbit-backdrop.tsx`: dropped radii 210/340 from `RING_RADII`, `OUTER_RING` 4 → 2; badge `ring` indices in `hero.data.ts` shifted down by 2 (same visual positions).
- `hero.tsx`: `pt-8` on the activity-stack animate div moves the cards ~32px down while the rings and badges stay put.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280.

## 2026-09-17 — Hero: text block lower
- `hero.tsx`: `pt-6` on the ratings→CTA block (moves it 24px down); the orbit wrapper `mt-10` → `mt-4` compensates, so the rings, badges and cards stay exactly where they were. The button-to-card gap is now 48px (was 72).
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280.

## 2026-09-17 — Hero: text block lower again
- `hero.tsx`: text block `pt-6` → `pt-12` (another 24px). To keep the rings and badges fixed and the button-to-card gap at 48px, the orbit wrapper went `mt-4` → `-mt-2` and the cards `pt-8` → `pt-14`, so the cards moved 24px down with the text. The trusted-by row shifts 24px too.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280.

## 2026-09-17 — Hero: white fade under the logo row
- `hero.tsx`: gradient overlay behind `TrustedBy` (starts 8rem above the row, transparent → #fff at 55%, bleeds to the section edges and bottom), so the rings fade out and the logo row sits on white.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280 (the rings fade above the label, and the logos and the gap below are on plain white).

## 2026-09-17 — Hero: larger title
- `hero.tsx` h1: 2.25 → 2.4rem (base), 2.75 → 3rem (sm), 3.1 → 3.4rem (lg). Same two-line break.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280 (clear of the Slack/Zapier badges).

## 2026-09-17 — Hero: cards slightly higher
- `hero.tsx`: card wrapper `pt-14` → `pt-10` (16px up). The button-to-card gap is now 32px; rings and badges unchanged; the trusted-by row follows 16px up.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280.

## 2026-09-17 — Hero: trusted-by logos as an infinite marquee
- `trusted-by.tsx`: static wrapped row → edge-to-edge CSS marquee (two copies, -50% loop, 40s, pause on hover, edge fade mask). Logos 20/22px → 18/20px; spacing 64px (80px from sm), was 24-40px. Reduced motion: single static wrapped row.
- `globals.css`: new `--animate-marquee` token + `marquee` keyframes.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1280: marquee box spans 0→1265 (full width, docW = viewport, no overflow), `animation-name: marquee` 40s, both copies exactly 1325.54px wide (seamless). The pane freezes compositor animations, so the actual motion was not observed in-session. Headless-Edge crop checked the size and spacing.

## 2026-09-17 — Hero: founder testimonial cards, animated
- Replaced the activity notifications (`Activity` union, `activity-stack.tsx`, Gmail icon) with `Endorsement` {person, title "Founder, X", quote} and `endorsement-stack.tsx`. The three founders and companies are placeholders.
- CSS `card-cycle` animation (12s loop). Bugs found while verifying: (1) utility `[animation-delay]` was reset by the animation shorthand, so all cards moved in lockstep, fixed with inline delays; (2) static translate/scale utilities stacked on the keyframe transform, fixed by limiting them to `motion-reduce:`; (3) a 16/32px peek showed back-card quote text, reduced to 5/10px.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: paused the Web Animations and sampled at 0-11s. At each rest point the three cards hold distinct z 30/20/10 and y offsets, rotating correctly. Headless-Edge crops with and without reduced motion.

## 2026-09-17 — Hero: founder cards back to the original stack design
- `endorsement-stack.tsx`: restored the compact notification look (single-row card, avatar with blue check, 13/11px two lines, widths 100/88/72%, faded back card) with founder content: "Name · Founder, Company" + a short quote. Quotes shortened in `hero.data.ts` to fit one line.
- `card-cycle` keyframes now animate width + translateY (0/3rem/6rem) instead of scale, so text never shrinks.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: paused animations sampled at 1s/5s/9s, each shows one card per slot (w296/260/213, y 536/584/632, z 30/20/10) rotating. Headless-Edge crops with and without motion match the old layout.

## 2026-09-17 — Hero: card width fixed during animation
- Removed `width` from the `card-cycle` keyframes and the 88%/72% slot widths; every card is the full stack width at all times, and depth reads through the 3rem offset, fade and z-order only.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: paused animations sampled every 250ms across the 12s cycle (48 samples × 3 cards) and measured a single width, 296px. The slot rotation is intact.

## 2026-09-17 — Hero: original notification cards, animated
- User chose (via question) "original content, animated". Removed `Endorsement`/`endorsement-stack.tsx` and restored `Activity` data and `activity-stack.tsx` (Wei Chen joined / Matthew Johnson profile with kebab / Terry Lipshutz Gmail, blue and green badges) at the compact size.
- Kept the `card-cycle` rotation with one fixed width; slot step 3.25rem, so each card tucks ~8px under the one above.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: 48 paused samples × 3 cards all 296px wide, the slots rotate (z 30/20/10, y 536/588/640). Headless-Edge crop at 1280.
- Not matched: the reference shows photo avatars and a narrower, fading third card. We have no photos (initials are used), and narrowing would need width animation, which the user rejected.

## 2026-09-17 — Hero: stepped card widths back, content rotates instead
- The user wanted the reference image's stepped widths (100/88/72%) but no width animation. Cards are now stationary at those widths. The `card-cycle` keyframes were replaced by `row-cycle`, which cross-fades the rows inside each card so the notifications step upward through the stack every 4s.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: paused samples show card widths only 296/260/213px and heights 60px throughout; row opacities rotate slot0 row0→1→2 at 1s/5s/9s with a 0.5/0.5 cross-fade at 3.8s. Headless-Edge crop matches the reference layout.

## 2026-09-17 — Hero: wider activity cards
- The cause was not only width: the rows are grid items with `min-width:auto`, so in the 88%/72% cards they overflowed and were clipped by `overflow-hidden` instead of truncating.
- Measured natural row widths (268/218/253px). The stack wrapper went 18.5rem → 25.5rem so the 72% card is 294px and fits the widest row; rows got `min-w-0` for narrow screens.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1280: cards 408/359/294px, no row in any card is truncated or overflows (9/9). At 375: cards 343/302/247px, no overflow, docW = vw. Headless-Edge crop at 1280.

## 2026-09-17 — Hero icons from lucide-react / react-icons
- **New dependencies (user-requested):** `lucide-react@1.47.0`, `react-icons@5.7.0`.
- Replaced every hand-written icon SVG in the hero: integration badges (`shared/ui/integration-logo.tsx`, also used by the integrations and CTA sections), Google/Trustpilot ratings, the activity-card check/kebab/Gmail, and trusted-by company marks (the icon + name replaces the text-only wordmarks).
- Ids renamed: `pinwheel` → `googleDrive`, `stackedBars` → `figma` (Typeform only exists as an illegible wordmark icon). `SiZapier`/`SiCoinbase` are wordmarks, so they became `TbBrandZapier`/`TbBrandCoinbase`.
- The ring backdrop SVG stays (decorative geometry, not an icon).
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge screenshot at 1280 (all badges, ratings, card icons and logo row render).

## 2026-09-17 — Whole-site content from the Infrantic company brief
- Rewrote all copy from the brief; the design system is unchanged. Section mapping: hero (Big Idea title, short description, AI/automation tool badges, illustrative automation events, **industries marquee** replacing fake customer logos, **eyebrow** replacing fake Google/Trustpilot ratings); new `problem` (maze of tools → 7 effects → "Infrantic connects the maze"); new `services` (5 service cards with capabilities + goal, replacing `use-cases`); `workflow` = How we work (5 steps); `benefits` = outcomes (mockup copy retuned to ops); `integrations` = Technology (constellation + 5 stack groups + footnote); new `approach` (business-first difference, philosophy, personality), replacing `pricing`; `cta` = contact band (`#contact`); header/footer nav and site metadata.
- **Deleted:** `testimonials`, `pricing`, `use-cases`, `hero-ratings`, `trusted-by`, plus the unused `StarIcon`/`ArrowRightIcon`. The brief has no testimonials, pricing, ratings or customer logos, so no fabricated social proof is left.
- `IntegrationId` is now tech brands (OpenAI via `RiOpenaiFill`, Claude, Gemini, n8n `SiN8N`, Make, Zapier, Supabase, PostgreSQL, Vercel, GitHub, Next.js, Python, WhatsApp, Google Sheets).
- Verified: biome clean (66 files), tsc OK, `next build` → `/` static. Headless-Edge full-page screenshot at 1280 reviewed section by section; the hero title was fixed to a two-sentence line break. Pane: 375px has no horizontal overflow and all 8 anchor ids exist; at 1280 the h1 is 2 lines, activity rows fit all 3 cards (after shortening to "Invoice #1042"), and the tabs are Discover/Design/Build/Automate/Improve.
- Open: `/contact`, `/privacy`, `/terms` don't exist; no real contact method (email/form/booking link) in the brief; socials are placeholders.

## 2026-09-17 — Hero title smaller and tighter
- `hero.tsx` h1: 2.4/3/3.4rem → 2.2/2.75/3.1rem (base/sm/lg), line-height 1.08 → 1.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280 (two lines, no descender/ascender collision).

## 2026-09-17 — Hero description tighter
- `hero.tsx` subtitle line-height: 24px → 1.4 (base, 15px) and 28px → 1.45 (sm+, 16px), about 23px on desktop.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280.

## 2026-09-17 — Hero rings ~8% larger
- `orbit-backdrop.tsx`: `RING_RADII` 470…1340 → 510…1450, SVG canvas 2800 → 3000. Badges follow the rings automatically; angles retuned so none clip: n8n -158 → -150, Make -22 → -30 (ring 2 at 1280), Google Sheets 178 → -164, Gemini 2 → -16 (ring 1 clipped by 18px at 1024).
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane geometry at 1280 (10 badges) and 1024 (8 badges): 0 viewport clips, 0 overlaps with header/h1/subtitle/cards/marquee, 0 badge collisions. Headless-Edge screenshot at 1280.

## 2026-09-17 — Hero: Sheets and Gemini badges lower
- `hero.data.ts`: Google Sheets -164° → -174°, Gemini -16° → -6°, still on ring 1 (positions come from `pointOnRing`, so they stay centred on the line).
- Lower means closer to horizontal, which clips narrower viewports, so the hard-coded `OUTER_RING` hide rule became a computed `revealClass(x)` (shows each badge from the first breakpoint where it fits). Result: 10/10 badges at 1280, 6/10 at 1024 (Sheets and Gemini now hide there, as do n8n and Make), 6 at 768.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1280/1024/768: 0 clipped, 0 overlaps with header/text/cards/marquee, 0 badge collisions. Headless-Edge screenshot at 1280.

## 2026-09-17 — Wider header
- `site-header.tsx`: floating bar `max-w-5xl` (1024px) → `max-w-6xl` (1152px), matching the page content width.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1280.

## 2026-09-17 — Header wider again
- `site-header.tsx`: `max-w-6xl` → `max-w-7xl` (1280px). On 1280px screens it now fills the width minus the 16px side gutters (1248px).
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1440 (1280px bar).

## 2026-09-17 — Q: where to put logo/images (no code change)
- Answered: logo and brand files in `public/brand/`, photos in `public/images/`, favicon/app icon/OG image as file conventions in `src/app/`. Found `public/` no longer exists (the map said "empty") and corrected the map.

## 2026-09-17 — Real brand logo in header and footer
- New `shared/ui/brand-logo.tsx`: `next/image` for `/brand/logo-svg.svg` (1278×168, alt "Infrantic", `priority` in the header). No default size classes (cn does not merge conflicting utilities); callers pass `h-* w-auto` or `w-full h-auto`.
- Header: placeholder mark + "Infrantic" text → logo at 18px/20px tall. Footer: purple tile + giant lowercase text wordmark → full-width logo.
- Not changed: `BrandMark` placeholder shape inside the purple tiles (benefits collaboration card, problem callout, technology centre tile). A wide wordmark does not fit a square tile, and the logo's navy/blue palette would clash with the violet tiles.
- Verified: biome clean (67 files), tsc OK, `next build` → `/` static; `/brand/logo-svg.svg` 200 image/svg+xml; SSR HTML has both `<img>`; headless-Edge crops of header and footer at 1280.

## 2026-09-17 — Brand colours applied site-wide
- `globals.css`: new tokens `brand` #0796fe (+ 50/100/200/300/700) and `ink` #021c37 (+ 700/800).
- Scripted sweep over `src/` (23 files): violet/indigo/purple → brand tints (`-700` for small text), blue-* → brand, zinc-950/900 → ink, primary button hover → ink-800; purple gradients and shadows (brand tiles, collaboration card, philosophy card, CTA band, workflow edges/active ring, hero glow) → brand/ink equivalents; zinc shadow tints → ink. Problem-effect icons went from red to brand-50/ink. Avatar tones in hero/benefits data and the small mockup avatars/tags → brand tints. Emerald/amber kept as status colours only.
- Verified: biome clean, tsc OK, `next build` → `/` static; grep finds 0 violet/indigo/purple/fuchsia/blue-*/zinc-900/950 or old purple hex/rgb left in `src/`; headless-Edge full-page screenshot reviewed section by section. (The blank band above the footer in that capture is the 9600px window stretching `main flex-1`, not a page bug.)

## 2026-09-17 — Problem section: wider, tool tags with icons
- `problem.tsx`: container `max-w-6xl` → `max-w-7xl` (matches the header). Tool tags now `{label, icon}` (`ToolIcon` union): Excel `FaFileExcel`, WhatsApp `SiWhatsapp`, Google Sheets `SiGooglesheets` in brand colours; Email/CRM/ERP/Accounting/Documents use lucide `Mail`/`Contact`/`Boxes`/`Calculator`/`FileText` in brand-700.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1440.

## 2026-09-17 — No blue icons; straight tool tags
- Problem: generic tool-tag icons (Email/CRM/ERP/Accounting/Documents) `#0567b3` → `#27272a` (Excel/WhatsApp/Sheets keep their brand colours); removed the per-tag rotation, so the tags are straight; effect icons `bg-brand-50 text-ink` → `bg-zinc-100 text-zinc-800`.
- Same rule applied to the other blue icons: service icon tiles `bg-brand-50 text-brand-700 ring-brand-100` → `bg-zinc-100 text-zinc-800 ring-zinc-200`; capability checkmarks `text-brand` → `text-zinc-800`; approach "we start by asking" check badge `bg-brand` → `bg-ink`.
- Left as is: the hero "verified" dot (`bg-brand`) and brand-blue decorative tiles/gradients, which are not icons.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crops at 1440 (problem tags, services cards).

## 2026-09-17 — Problem section wider; last effect card full-width
- `problem.tsx`: container `max-w-7xl` → `max-w-[84rem]` (1344px); effect cards get `sm:odd:last:col-span-2`, so an odd final card ("Increasing overhead") spans both columns. The rule follows the data, so an even count reverts to a plain grid.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1440.

## 2026-09-17 — Google Sheets tag on its own row
- Problem tools data gained an optional `breakBefore` flag (set on Google Sheets); the component inserts an `aria-hidden` zero-height `basis-full` list item before it (`hidden sm:block`, so phones still wrap naturally). Rows are now Excel/Email/WhatsApp/CRM/ERP, then Google Sheets/Accounting software/Documents.
- Verified: biome clean, tsc OK, `next build` → `/` static, headless-Edge crop at 1440.

## 2026-09-17 — Problem section hover glow (BorderGlow)
- New client component `shared/ui/border-glow.tsx`, adapted from the user's BorderGlow snippet: same layers (conic-masked mesh border, masked edge fill, conic outer glow built from 13 box-shadows), recoloured to the brand palette. Pointer state lives in CSS custom properties (no `useState`, no re-render per pointermove); dropped the unused `animated` intro sweep; added `contentClassName`.
- Applied in `problem.tsx` to the 8 tool tags (radius 8, dashed border kept), 7 effect cards (radius 16, `h-full`) and the dark "Infrantic connects the maze" callout (`backgroundColor #021c37`).
- Verified: biome clean (68 files), tsc OK, `next build` → `/` static. Pane: dispatched pointer events and confirmed the handlers set `--glow-on=1`, edge 0.988 at the left edge / 0 at the centre, angle 270deg, and back to 0 on leave; computed layer opacities 0.9/0.45/0.93 at edge 0.95. Headless-Edge CDP screenshot with the state forced showed the blue glow on a tag, two cards and the dark callout, with the rest unchanged.

## 2026-09-17 — Hover glow removed
- Deleted `shared/ui/border-glow.tsx`; `problem.tsx` tags, effect cards and dark callout restored to their pre-glow markup (dashed tags, `sm:odd:last:col-span-2` kept).
- Verified: biome clean (67 files), tsc OK, `next build` → `/` static, grep finds no `BorderGlow`/`border-glow`/`glow-on` left in `src/`.

## 2026-09-17 — Services: ink background, Problem-width container, infinite carousel
- `services.tsx`: section `bg-ink px-4`, inner `max-w-[84rem]` (identical box to Problem: x=41, w=1344 at 1440); eyebrow `text-brand-300`; scroll-snap row → marquee (list rendered twice, `motion-safe:animate-marquee` at 60s, pause on hover, 4% edge mask, `motion-reduce` falls back to an `overflow-x-auto` single row). Cards stay white; the duplicate copy is `aria-hidden` without heading ids.
- `section-heading.tsx`: new `tone` prop ("dark" → white title, zinc-400 description).
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1440: bg rgb(2,28,55), h2 white, animation marquee 60s, halves 1760/1760px (seamless), 5 cards all 627px tall; 375px has no horizontal overflow. CDP screenshot with the loop paused at 9s.

## 2026-09-17 — Services carousel edge to edge
- `services.tsx`: marquee moved out of the `max-w-[84rem]` container (the heading stays in it), `-mx-4` to cancel the section padding; edge mask fade 4% → 1.5%.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: marquee box 0→1425 at 1440 (full width minus scrollbar) and 0→375 on mobile, docW = vw (no overflow), halves still 1760/1760. CDP screenshot at 1440.

## 2026-09-17 — No hand-written SVG anywhere
- Nav dropdown chevron → lucide `ChevronDown`; mobile menu toggle → lucide `Menu`/`X`; footer socials → react-icons `FaFacebookF`/`FaLinkedinIn`/`FaXTwitter` (fa6); `CheckIcon` (benefits, flow canvas) → lucide `Check`; deleted `shared/ui/icons.tsx`.
- `BrandMark` placeholder shape → CSS crop of the "I" glyph from `/brand/logo-svg.svg` via `next/image` (white knock-out on the three dark/blue tiles).
- Hero rings SVG → absolutely positioned bordered circles (same radii, same radial mask box); workflow connector paths → `Connector` component of bordered % segments (solid brand, dashed zinc for todo).
- Verified: biome clean (66 files), tsc OK, `next build` → `/` static; `grep "<svg|<path|<circle" src` → none. Rendered `<svg>`s are only from the icon libraries. Headless-Edge 1440 full-page crops: hero rings, workflow connectors (8 segments on step 1), brand mark tiles, footer socials all render.

## 2026-09-17 — Workflow: Problem width, taller step card
- `workflow.tsx` container `max-w-6xl` → `max-w-[84rem]`; `flow-canvas.tsx` `min-h-80` (320px) → `min-h-[30rem]` (480px), so the step card grows from about 354 to 514px. The tab strip keeps `max-w-4xl`.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1440: workflow box = problem box (x 41, w 1344); canvas 696×480; all flow nodes inside the canvas. Headless-Edge crop.

## 2026-09-17 — Primary buttons black
- `shared/ui/button-link.tsx` primary variant `bg-ink hover:bg-ink-800` → `bg-black hover:bg-zinc-800`. This covers every dark button (header "Book a call", hero, workflow CTA, contact band, mobile menu). Non-button ink surfaces (Services section, dark callout, badges, tab underline) are unchanged.
- Verified: biome clean, tsc OK, `next build` → `/` static, SSR HTML has 9 `bg-black` elements, and a headless-Edge pixel sample of the header button is black.

## 2026-09-17 — Consistent spacing between sections
- Measured visual gaps (last visible content → first visible content): hero→problem 176, contact→footer 240, all others 224. (The Workflow 14px discrepancy was the frozen `animate-rise` translate in the pane, not layout.)
- Fixes: hero `pb-14 lg:pb-16` → `pb-24 sm:pb-28` (overlay bottom offset updated to match); CTA band `pt-24 pb-36 sm:pt-28 sm:pb-44` → `py-24 sm:py-28`; footer `pt-16` → `pt-24 sm:pt-28`.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane with animations disabled: all 8 gaps are 224px at 1440 and 192px at 375; 0 CTA badge overlaps with text or buttons after the band got shorter; no mobile overflow. Headless-Edge crops of hero bottom and CTA.

## 2026-09-17 — Workflow heading slightly larger
- `section-heading.tsx`: new `size` prop (`"lg"`: title 34/42px instead of 30/36px, description `mt-4` instead of `mt-3`); `workflow.tsx` uses `size="lg"`. Other sections are unchanged.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1440: "How we work" 42px, title→subtext gap 16px (was 36px/12px; the benefits heading is still 36px/12px).

## 2026-09-17 — Benefits (outcomes) at Problem width
- `benefits.tsx` container `max-w-6xl` → `max-w-[84rem]`.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1440: outcomes box = problem box (x 41, w 1344); bento cards 437/437/437/891px wide, tall card 681 = 343 + 16 + 322 (grid still aligned); the only clipped element is the intentional BrandMark crop.

## 2026-09-17 — Benefits collaboration card: photo tiles
- User chose Unsplash placeholder portraits. `benefits.types.ts` collaborators → `Collaborator` union (`person` with photo | `agent`); data has 5 verified Unsplash photo URLs (all returned 200 image/jpeg) plus an "AI Agent" tile.
- `benefit-visuals.tsx`: circles (a `cn` conflict meant `rounded-full` beat the intended `rounded-2xl`) → 72px `rounded-2xl` tiles with `next/image` fill; the agent tile is a navy gradient with lucide `Bot`; role chips under each tile; subtle masked grid in the card; smaller brand badge; glass "Human in the loop" pill. Deleted the now-unused `shared/ui/initials-avatar.tsx`.
- `next.config.ts`: `images.remotePatterns` for Unsplash. The first attempt used `new URL(...)`, which returned 400 because it forbids query strings; switched to the object form. Restarted the orphaned dev server so the config loads.
- Verified: biome clean (65 files), tsc OK, `next build` → `/` static; dev `/` 200, `/_next/image` for an Unsplash URL 200 image/jpeg; CDP screenshot of the card shows 5 photos + AI tile with labels.

## 2026-09-17 — Refinement pass: Technology, Benefits heading, Approach, footer
- Consistency: Technology (`max-w-5xl`), Approach and footer (`max-w-6xl`) → `max-w-[84rem]`, so every section box is x 41 / w 1344 at 1440. Added section eyebrows "Our technology" and "Outcomes" (new `eyebrow` field in both content types).
- Technology stack cards: category icons (lucide Sparkles/Workflow/CodeXml/Server/Plug on grey tiles, per the no-blue-icons rule), ink semibold labels instead of tiny blue caps, bordered chips, p-5, gap-4, full container width.
- Approach: philosophy title `max-w-[18ch]` → `[24ch]` (2 lines instead of 3); personality cards get icons (Brain/Crosshair/Wrench/HeartHandshake) with `icon` added to the data.
- Verified: biome clean, tsc OK, `next build` → `/` static; pane container boxes equal at 1440, no overflow at 375; CDP screenshot of Technology → footer reviewed.

## 2026-09-17 — Services carousel: edge fade removed
- `services.tsx`: dropped the 1.5% `mask-image` gradient (and its `motion-reduce:[mask-image:none]` override) from the marquee wrapper; cards now meet the viewport edge crisply.
- Verified: biome clean, tsc OK, `next build` → `/` static; no `mask-image` left in the services feature. The user stopped the dev server, so there was no live visual check.

## 2026-09-18 — Hero: innermost ring removed
- `orbit-backdrop.tsx`: dropped radius 510 from `RING_RADII` (6 rings left). `hero.data.ts`: the four badges that sat on it (WhatsApp, Supabase, Zapier, PostgreSQL) moved out to the 650 ring with the other four; the 8 badges there were re-spaced 18° apart (-138/-156/-174/163 and -42/-24/-6/17). n8n and Make stay on the 800 ring (index 1).
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: 6 rings; at 1280 10 badges, at 1024 6 badges, 0 clipped / 0 overlaps with header/text/cards/marquee / 0 collisions at both. Headless-Edge screenshot at 1280.

## 2026-09-18 — Hero badges scattered over three rings
- `hero.data.ts`: ring 0 (650) OpenAI -135, WhatsApp -160, Supabase 165, Claude -46, Zapier -20, PostgreSQL 14; ring 1 (800) n8n -147, Make -33; ring 2 (960) Google Sheets -152, Gemini -28. `orbit-backdrop.tsx`: added a 1536 (`2xl`) entry to `BREAKPOINTS` so ring-2 badges appear on wide screens.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane: 10 badges at 1900 and 1536, 8 at 1280 (ring 2 hidden), each with 0 clipped / 0 overlaps / 0 collisions. Headless-Edge screenshot at 1900.

## 2026-09-18 — Hero badges as mirrored pairs, further from the header
- `hero.data.ts`: ring 0 OpenAI/Claude (-147/-33) + Supabase/PostgreSQL (172/8); ring 1 n8n/Make (-150/-30) + WhatsApp/Zapier (167/13); ring 2 Sheets/Gemini (-156/-24). `orbit-backdrop.tsx`: extra 1800px entry in `BREAKPOINTS` for the ring-2 pair.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1900: 10 badges, nearest is 77px below the header (was ~18px), lowest badge bottom 695 vs marquee top 787, 0 clipped / 0 overlaps / 0 collisions; at 1280: 6 badges, all clean. Headless-Edge screenshot at 1900.

## 2026-09-18 — Hero: outer badge pair lower
- `hero.data.ts`: ring-2 pair Google Sheets -156 → -163, Gemini -24 → -17 (top edge 152 → 246px at 1900; still on the ring line).
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1900: 10 badges, 0 clipped / 0 overlaps / 0 collisions.

## 2026-09-18 — Hero: n8n/Make pair lower
- `hero.data.ts`: ring-1 upper pair -150/-30 → -156/-24 (top edge 143 → 208px at 1900). Upper pairs now step down outward: 184 / 208 / 246px.
- Trade-off: at ±24° the pair no longer fits a 1280px viewport, so `revealClass` shows it from 1536px; 1280 now shows 4 badges.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1900: 10 badges, 0 clipped / 0 overlaps / 0 collisions.

## 2026-09-18 — Fix: n8n/Make badges vanished on the user's screen
- Cause: lowering them to ±24° pushed their fit width to 1317px, and `revealClass` rounded that up to the next listed breakpoint, 1536 (`2xl`). The user's viewport is below 1536 (likely 1920 at 125% ≈ 1500 CSS px), so they were hidden. I had verified at 1900 only.
- Fix: finer `BREAKPOINTS` steps above xl (1360/1440/1600/1680). Verified in the pane: 1366 → 6 badges, 1500 → 8 (n8n/Make back, 0 clipped/overlaps/collisions), 1700 → 10. biome/tsc/build clean.
- Still hidden at 1500: Google Sheets/Gemini on ring 2 (need 1635px at their lowered angle).

## 2026-09-18 — Hero industries row: no hover, darker, stronger label
- `industries-marquee.tsx`: removed hover colour change and pause-on-hover; items `text-zinc-400` → `text-zinc-600` (also fixed the no-op `font-regular` → `font-normal`); label `text-sm text-zinc-400` → `text-base font-medium text-zinc-600`.
- Verified: biome clean, tsc OK, `next build` → `/` static, no `hover:` left in the file, headless-Edge crop at 1500.

## 2026-09-18 — Hero content up 24px; industries text darker
- `hero.tsx`: text block `pt-12` → `pt-6`; to keep rings/badges fixed the orbit wrapper went `-mt-2` → `mt-4` and the cards `pt-10` → `pt-4`, so eyebrow, title, subtitle, buttons and cards all moved up 24px (badge tops unchanged at 184px). `industries-marquee.tsx`: label and items `text-zinc-600` → `text-zinc-800`.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1500: eyebrow 100px below header, 8 badges, 0 overlaps with header/eyebrow/title/subtitle/cards/marquee.

## 2026-09-18 — Hero content higher, more breathing room
- `hero.tsx`: text block `pt-6` → none (content up 24px; eyebrow now 76px below the header). Gaps widened: eyebrow→title 24 → 28, title→subtitle 16 → 20, subtitle→buttons 28 → 36, buttons→cards 32 → 48 (wrapper `mt-4` → `mt-6`, cards `pt-4` → `pt-6`). Rings and badges unchanged (first badge top still 184px).
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1500 with rise animation disabled: measured gaps 28/20/36/48, 8 badges, 0 overlaps.

## 2026-09-18 — Hero ring comet
- `orbit-backdrop.tsx`: thin (1.5px) blue comet on ring 1 (`COMET_RADIUS`). It is a ring-sized span masked to its stroke, with a conic `#0796fe` tail; `animate-comet` (new in globals.css, 9s linear) turns it half a turn so the head rises from the bottom, up the left side, then fades and pauses. Motion-safe only, and it stays below the badges.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1500: the head crosses the visible hero from about 15%–47% of the cycle (x≈62px at its widest); screenshot shows the arc on the left ring.

## 2026-09-18 — Comets on every hero ring
- `orbit-backdrop.tsx`: one comet per ring (`cometStyle`). Each has a short tail of 150 design px (≈128px at the xl scale, whatever the ring size) and alternates sides: even rings climb the left, odd rings the right (via `--comet-turn`). Delays are staggered by 4.3s.
- `globals.css`: the comet cycle went from 9s to 26s, with the half turn over 0–72% (about 19s, slow) and a pause after. The keyframe now rotates to `var(--comet-turn)`.
- Verified: biome clean, tsc OK, `next build` → `/` static. Pane at 1500: 6 comets on 6 radii, all 26s, sides alternate, staggered delays. Screenshot shows the short streak on the inner ring.

## 2026-09-18 — Hero comets on both sides
- User: comets never climbed the right side. Cause: comets alternated sides by ring, so the right side only got the odd (bigger) rings. At 1500px only ring 1 of those is really on screen, while the left got the inner ring 0.
- Fix in `orbit-backdrop.tsx`: two comets per ring (`COMET_SIDES`), the right one half a cycle (13s) after the left.
- Verified: 12 comets. Sampling a full 26s cycle at 1500: ring 0 13s visible on L and 13s on R; ring 1 9.5s L and 9.5s R; ring 2 2.5s L and 3s R. Rings 3–5 are never on screen at 1500 (their visible arcs sit above the section top) and show only on wider screens. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Hero comets: sides in sync
- `orbit-backdrop.tsx`: dropped the 13s right-side offset (`COMET_CYCLE_S`). The two comets on a ring now share one delay and mirror each other; rings are still staggered 4.3s apart.
- Verified: 12 comets with delays paired (0,0,-4.3,-4.3,…). Live sampling on every pair: mirror error 0.00px (x mirrored about the centre, same y, same opacity). biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Hero top fade
- `hero.tsx`: added a white→transparent top fade (`h-32 sm:h-40`, solid white for the top 15%) at `-z-10` after the orbit in DOM order, so it paints over the rings and comets and under the text. It ends above the highest badge.
- Verified at 1500: the fade covers 0–160px and the highest badge starts at 184px (0 badges overlap). The screenshot shows the rings dissolving under the header. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Taller header
- `site-header.tsx`: bar height `h-14` → `h-16` (56 → 64px). Items stay centred, so the vertical padding around the buttons went from 10 to 14px on each side.
- Verified at 1500: bar 12–76px, button padding 14/14. The hero label is still 82px below the header and the highest badge is at 184px. The `scroll-mt-24` anchors (96px) still clear the 76px header. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Header taller again
- `site-header.tsx`: bar `h-16` → `h-[4.5rem]` (64 → 72px). Button padding is now 18/18px.
- Verified at 1500: bar 12–84px, the hero label is 74px below it, the highest badge is at 184px, and `scroll-mt-24` (96px) still clears it. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Header horizontal padding
- `site-header.tsx`: bar padding `pl-4 pr-2` → `pl-6 pr-[1.125rem]` (left 16 → 24px, right 8 → 18px, so the buttons have the same 18px inset on the top, bottom and right).
- Caught in verification: the edit had merged `pl-6` into the shadow class (missing space), which silently dropped both. Fixed; checked with computed styles.
- Verified at 1500: computed pl 24px / pr 18px, shadow present, logo inset 25px, button inset right 19px / top 18px. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Brand-blue button hovers
- `shared/ui/button-link.tsx`: primary hover `bg-zinc-800` → `bg-brand` (#0796fe). Secondary and muted hovers → `bg-brand-50` with `border-brand-200` (they were zinc). This covers every button on the site; no other button styles exist.
- Verified by hovering in the pane: primary computed bg rgb(7,150,254) with white text; the screenshot shows the secondary "See how we work" with the light blue tint. biome/tsc clean, `next build` → `/` static.
- Note: white on #0796fe is about 3.1:1 contrast (below AA 4.5 for 14px text). It only applies while hovering, and the resting state stays black.

## 2026-09-18 — Header hides on scroll down, shows on scroll up
- Ported the scroll behaviour from softexedge (`resizable-navbar` Navbar, not its resize). New client island `site-header/components/auto-hide-header.tsx` wraps the server-rendered header content. It uses a passive scroll listener with an 8px direction threshold (so fling jitter cannot flap it) and only hides past 120px. It sets `data-hidden` on the header and CSS runs `-translate-y-[120px]` over 300ms ease-out (motion-reduce: instant). It never hides while a menu inside is open (`[aria-expanded=true]`), and `not-focus-within` keeps it visible for keyboard users. `site-header.tsx` now renders `<AutoHideHeader>` instead of `<header>`.
- Verified in the pane at 1500 (the tab reports `visibilityState: hidden`, so scroll events were dispatched manually and the transition was disabled to read the end state). Results: at 0 and 60 shown; down to 700 hidden; up 5px still hidden; up to 600 shown; down to 1500 hidden; keyboard focus shown; Services menu open plus scrolling down stays shown and hides after closing; the hidden bar bottom is at -36px (fully off-screen). biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Services dropdown opens on hover
- `nav-dropdown.tsx`: `pointerenter`/`pointerleave` (mouse only) on the root open the menu and close it after a 150ms grace. A mouse click keeps it open instead of toggling it shut. Touch and keyboard (`pointerType` "") keep click-to-toggle; Esc and outside-focus still close. The panel gap changed from `mt-3` to `pt-3` on an outer wrapper (the styling moved onto the `ul`), so the 12px gap is part of the hover area.
- Verified in the pane: hover opens it (aria-expanded true, panel shown, hoverable gap 0px, visual gap 12px); moving into the panel keeps it open; moving away closes it; a mouse click keeps it open; keyboard-style `.click()` toggles open and then closed; Esc restores focus. The screenshot shows the open panel. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Dropdown below the bar, header radius
- `nav-dropdown.tsx`: panel wrapper `pt-3` → `pt-7`. The menu used to start 12px under the trigger, which overlapped the 72px bar by 6px. It now starts 10px below the bar and the gap is still hoverable.
- `site-header.tsx`: bar `rounded-2xl` → `rounded-xl` (16 → 12px).
- Verified at 1500 by hovering in the pane: bar bottom 84, menu top 94 (gap 10px), hover zone continuous from the trigger bottom (66), computed bar radius 12px; the screenshot shows the menu clear of the bar. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Brand blue is a gradient (#047EFD → #07A1FD)
- `globals.css`: new tokens `--color-brand-from` #047efd and `--color-brand-to` #07a1fd, plus `@utility bg-brand-gradient` (90deg).
- Applied to every blue fill: primary button hover (`hover:bg-brand-gradient`), hero verified badge (activity-stack), CTA and benefit dots, workflow active step dot (flow-canvas), comet tails (#07a1fd → head #047efd). Blue→ink tiles (problem, integrations) are now `#07a1fd,#047efd_30%,#021c37`; the radial blue→ink cards (approach, benefit hero visual) start from #047efd, with #07a1fd before it in benefits.
- Left flat on purpose: `border-brand` and focus/ring shadows (a border cannot take a gradient without a mask hack), plus the `brand-50…700` tints and text shades.
- Verified in the pane: the hovered primary computes `linear-gradient(90deg, rgb(4,126,253), rgb(7,161,253))`, the static dots and badges compute the same, the tiles compute the new 3-stop gradient, and the comet conic uses the two stops. The screenshot shows the gradient button on hover. biome/tsc clean, `next build` → `/` static.
- Note: the switch from background-image on hover is instant; the old background-color faded over 150ms.

## 2026-09-18 — Button shadows removed
- `shared/ui/button-link.tsx`: dropped the primary inset highlight and drop shadow and the secondary drop shadow (muted had none). These were the only button shadows (checked with grep; workflow-tabs has none).
- Verified: the pane's computed `box-shadow` is `none` on all 20 buttons and button-styled links on `/`. Biome flagged the now-short line (formatting only; fixed with `--write`). biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Problem section rebuilt as label + title + gap cards
- The user supplied new copy (rephrased as asked). Layout: eyebrow "Where work slows down", h2 (`size="lg"`, left), then a 3/2/1-column grid of 6 "Operational gap" cards. Each card has a zinc icon tile, the label, an h3, a symptom, an impact line under a divider, and "Learn more ↗".
- Removed the old tool tags, the effects list and the ink resolution card (with their types, react-icons and the BrandMark tile).
- "Learn more" goes to `/#services` for all six for now; no per-gap pages exist. Links use `aria-describedby` on the card h3 so screen readers can tell them apart.
- Map note fixed: BrandMark is no longer used in problem.
- Verified: pane at 1500 shows 6 cards in 2 rows (heights 314/290, equal within a row), a 3-line title and a 1344px container. CDP headless screenshot `infrantic-shots/problem.png` looks right. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Learn more gradient + arrow nudge; tighter hero → Problem gap
- `problem.tsx`: the "Learn more" label is gradient text (`bg-brand-gradient bg-clip-text text-transparent` on its own span) and the arrow is `text-brand-to` (#07a1fd). Hovering the link (`group/link`) nudges the arrow 2px up-right over 200ms ease-out (no motion under reduced motion).
- Problem top padding `py-24 sm:py-28` → `pt-12 sm:pt-16` (bottom unchanged). The hero → Problem gap went from 224 to 176px on desktop and from 192 to 144px on mobile. Recorded as the one exception to the section-rhythm rule in the map.
- Verified at 1500: the text computes the 90deg gradient with a text clip and transparent colour; the arrow is rgb(7,161,253); a real hover gives the arrow `translate: 2px -2px`; the marquee bottom → Problem label is 176px. CDP screenshot `problem2.png` shows the blue gradient links. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Hero → Problem gap reduced again
- `problem.tsx`: top padding `pt-12 sm:pt-16` → none (bottom `pb-24 sm:pb-28` unchanged). The gap is now just the hero's bottom padding: 112px on desktop (was 176) and 96px on mobile (was 144).
- `#problem` anchor: `scroll-mt-24` (96px) still clears the 84px header.
- Verified at 1500: marquee bottom → "Where work slows down" is 112px and the computed padding-top is 0px. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Problem section narrower side gutters
- `problem.tsx`: container `max-w-[84rem]` → `max-w-[88rem]` (1344 → 1408px). At 1500 the side gutters go from 71 to 39px (excluding the 15px scrollbar), and cards from 437 to 459px wide.
- Problem is now wider than the other sections (Services, Workflow, Benefits, Technology and Approach stay 84rem); noted in the map.
- Verified in the pane at 1500: Problem 1408 vs Services 1344, cards 459/459/459. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — All sections match Problem's width
- `max-w-[84rem]` → `max-w-[88rem]` in services, workflow, benefits, integrations, approach and the site footer (Problem was already 88rem). Left alone: the header bar (`max-w-7xl`, sized separately) and the intentionally narrow inner columns (hero text, CTA band, workflow tabs, technology diagram).
- Verified at 1500: all 7 containers are 1408px wide with their left edge at 39px, and there's no horizontal overflow. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Wider Problem title
- `shared/ui/section-heading.tsx`: new optional `titleWidth` prop (default `max-w-[20ch]`, applied through the prop instead of hard-coded, because `cn()` does not resolve conflicting utilities). `problem.tsx` passes `max-w-[34ch]`.
- Verified at 1500: the Problem h2 max-width is 975px and it now wraps to 2 lines (was 3). Every other section h2 keeps its previous max-width (Services/Benefits/Technology/Approach 492px, Workflow 574px, CTA 590px). biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Outcomes removed, new "Selected work" section
- Deleted `features/marketing/benefits` (Outcomes bento with Unsplash portraits) and the Unsplash `remotePatterns` in `next.config.ts`, which only it used.
- New `features/marketing/work`: types, data (3 case studies, reworded from the user's screenshots), `components/work.tsx` (server, `bg-ink`, id `work`), `work-tabs.tsx` (client WAI-ARIA tabs: arrow keys on both axes plus Home/End; panels share one grid cell so the height stays 1220px on every tab), `automation-flow.tsx`, `app-mocks.tsx`. Replaces Benefits in `page.tsx`, between Workflow and Technology.
- Automation flow: CSS-only (no hand-drawn SVG, per the icon rule). Nodes and wires are placed by % on a 2:1 canvas; wires run centre to centre under the opaque white tiles. Motion: marching dashes (`animate-flow-x/y`), glowing packets travelling in order (`animate-packet-x/y`, staggered delays) and a pulsing agent (`animate-agent-glow`); new keyframes in globals.css, all `motion-safe`. Logos: Sheets, Slack (FaSlack; no SiSlack), Gmail, OpenAI, Supabase, Jira, keeping their brand colours.
- Mocks: the proofreader ("ProofDesk", fictional) and the task board, in brand colours, with amber/emerald only as status colours. Each visual is role="img" with a text description and the inner UI is aria-hidden. On phones the visuals scroll inside their frame (min-w 40rem).
- Not added, as asked: the two header CTAs. Also left out "View project" because no project pages exist.
- Verified: CDP headless screenshots `infrantic-shots/work0-2.png` for each tab. In the pane at 1500: 3 tabs switch correctly, ArrowDown and End move focus, 10 wires and 10 packets animate (`flow-x` running), 1 visible panel at a time, no page overflow. At 375: the tab strip and canvas scroll internally with no page overflow. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Workflow: smaller panel radius, refined and animated flow
- `workflow.tsx` StepPanel: outer `rounded-[1.75rem]` → `rounded-2xl` (28 → 16px), inner `rounded-3xl` → `rounded-xl` (24 → 12px). In `flow-canvas.tsx` the canvas went `rounded-2xl` → `rounded-lg`.
- `flow-canvas.tsx` refined: cards are rounded-lg with a status pill (Done/In progress/Queued) and a clearer status icon. Emerald check for done; a pinging gradient dot for active; a dashed hollow ring for todo, whose card is also dashed. Active cards have a brand glow and an indeterminate gradient progress bar (new `animate-progress` keyframe in globals.css).
- Connectors are now styled by the target's status: done is solid brand-300; active is marching gradient dashes (`animate-flow-x/y`, same as Selected work) with a packet that runs each elbow segment in turn, respecting direction; todo is static grey dashes. Cards rise in with a 90ms stagger each time a tab is shown. All `motion-safe`.
- Verified: CDP screenshots `workflow0.png` (Discover) and `workflow2.png` (Build). In the pane the active panel runs flow-x, flow-y, packet-x, packet-y, rise, ping and progress; computed radii are 16/12/8px. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Selected work automation rebuilt to match the user's reference
- `work/components/automation-flow.tsx` rewritten to the n8n-style reference. Stock form → "AI AGENT / Tools agent" card (Chat Model, Memory and Tool ports) → Route badge → Slack ("Approval request") and Email. The agent's ports feed Chat Model (OpenAI), Supabase, Memory (lucide MemoryStick) and Jira.
- Layout: a 1000×540 design grid. `--u` = `calc(100cqw/1000)` on a child of an `@container`, so positions, tile sizes, radii and labels scale together (labels have `max()` minimums). The frame keeps `min-w-[40rem]` with an internal scroll on phones.
- Connectors are still CSS-only: `straight` / `hvh` / `vhv` route builders produce straight legs (marching dashes + glowing packets, direction-aware, staggered) and quarter-circle corners (dashed borders on two edges with one rounded corner), with CSS-triangle arrowheads. Dark tiles use `#07131d`. Logos keep their brand colours, except OpenAI (white) and Slack (its red #E01E5A), whose originals would vanish on dark.
- `work.data.ts` visualLabel updated to the new nodes.
- Verified: CDP screenshot `work-flow-crop.png` matches the reference. In the pane (canvas 640px) a tile is 60px (94u × 0.64); 10 flow-x, 10 flow-y, 10 packet-x, 10 packet-y and the agent glow are running; no page overflow. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Selected work automation scaled down
- `automation-flow.tsx`: the `@container` that defines `--u` is now `mx-auto w-[88%]` inside the frame, which keeps `min-w-[40rem]`. The whole graph (tiles, lines, radii, labels) renders 12% smaller and centred, and the canvas is 12% shorter. The Selected work section at 1500 went from 1261 to 1193px.
- Verified: CDP screenshot `work-flow2-crop.png` shows the graph centred with even margins. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Technology: logos orbit on the ring lines
- `integrations.tsx`: the constellation box went from 16:9 with a radial mask to a square `max-w-[36rem]` with 3 full rings (34/58/84% = r 98/167/242px). The 112% ring and the mask are gone. Logos sit exactly on the ring lines and each ring's `<ul>` turns (40s, then 60s reversed, then 80s). Removed the per-logo `animate-float` bob (float is still used by the CTA band).
- Data: `ConstellationItem` changed from `x/y` to `ring` + `angle`, spread evenly (3/4/5 logos per ring). `desktopOnly` kept for Python, PostgreSQL, Vercel and GitHub.
- Upright logos: the first version gave each logo its own reverse animation, and the CDP shot caught Vercel's triangle tilted 90° (the animations can start at different times, e.g. desktop-only logos shown later). Fixed by animating one registered `@property --orbit-angle` (inherits) per ring: the ring uses `rotate: var(--orbit-angle)` and the logo `rotate: calc(var(--orbit-angle) * -1)`.
- Section top padding `py-24 sm:py-28` → `pt-16 sm:pt-20` (bottom unchanged); noted as a rhythm exception in the map.
- Verified in the pane at 1500, seeking to 7s, 21s and 33s: logo distance from the centre is always 98/167/242px (on the lines), each logo's rotate equals minus its ring's, logo bounding boxes stay 48×48 (upright), and there are only 3 animations in total. CDP screenshot `tech2-crop.png` shows every logo upright. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Technology rings bigger, fading top and bottom
- `integrations.tsx`: the diagram went from `max-w-[36rem]` to `max-w-[44rem]` (576 → 704px). Ring radii at desktop go from 98/167/242 to about 120/204/296px; the logos follow automatically (ring-relative placement).
- The ring lines moved into a wrapper with `mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)`. Only the lines fade; the orbiting logos are outside the wrapper and stay fully visible.
- Verified: CDP screenshot `tech3-crop.png` shows larger rings whose tops and bottoms fade out with the logos intact. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Technology rings: bigger again, stronger fade (repeat request)
- The user re-sent the same request, so the first pass read as too subtle. `integrations.tsx`: diagram `max-w-[44rem]` → `max-w-[50rem]` (800px), rings 34/58/84% → 38/66/94%. Desktop radii are now about 152/264/376px (were 120/204/296).
- Fade mask on the ring lines strengthened from `transparent, #000 30%, #000 70%, transparent` to `transparent 4%, #000 40%, #000 60%, transparent 96%`, so the tops and bottoms fully disappear. Logos are still unmasked.
- Verified: CDP screenshot `tech4-crop.png` shows clearly larger rings, with lines vanishing at the top and bottom and all logos visible. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Technology: logos fade with the rings
- `integrations.tsx`: the vertical fade mask moved from the ring-lines wrapper (now removed) to the whole diagram container. Logos now fade out as they orbit past the top and bottom, the same as the lines, instead of floating over the fade. The centre brand tile sits in the fully opaque middle band, so it is unaffected.
- Verified: CDP screenshot `tech5-crop.png`. Vercel (top) and Next.js (bottom) are faded into the mask; mid-band logos are fully opaque. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Merged origin/sudeep into main and pushed
- Committed all local work on main as `c8c2a33`. Merged `origin/sudeep` (`5d6e68c`: new `what-we-build` feature plus a `package-lock.json`) as `53fe4a8` and pushed `d37b301..53fe4a8` to origin/main.
- Conflict in `page.tsx`: sudeep had replaced Services with WhatWeBuild; locally, Work sat after Problem and the user had moved Services below Workflow. Kept both sides. Order: Hero → Problem → What we build → Selected work → Workflow → Services → Technology → Approach → CTA.
- Merge fixups: Biome formatting (CRLF and layout) on the 4 what-we-build files, and removed an unused `LucideIcon` import. Verified: biome clean, tsc OK, `next build` → `/` static, and the dev page renders the 9 sections in that order.
- Open items (not changed): `package-lock.json` now sits beside `bun.lock` (two lockfiles). What we build uses `max-w-[84rem]` instead of 88rem, and `animate-in`/`slide-in-from-bottom-4`/`fade-in` classes that do nothing without tailwindcss-animate.

## 2026-09-18 — What we build restyled to house style
- `what-we-build.tsx` rewritten in house style: `max-w-[88rem]`, `py-24 sm:py-28` rhythm, sentence-case eyebrow (`text-brand-700`), `SectionHeading` size lg with `titleWidth` 26ch, and "View all services" as the standard black `ButtonLink` (hover gradient) beside the heading on lg. Cards are a single bordered 2×2 grid with inner dividers only, zinc icon tiles (Workflow / LayoutDashboard / BrainCircuit / CodeXml, replacing the unrelated Blocks / Server / FolderOpen / LockKeyhole) and gradient "Learn more ↗" links with the arrow nudge (same as Problem).
- Removed: no-op `animate-in/slide-in/fade-in` classes, blur glows, the shimmer button, the `uppercase tracking-widest` eyebrow and the `\n` forced title breaks.
- Data/types: copy tightened; links go to `/#services` instead of `#`; `learnMoreLabel` and `allServices {label, href}` moved into data; `interface` → `type` to match the codebase.
- Verified: CDP screenshot `wwb.png`. biome/tsc clean, `next build` → `/` static. Not committed (the user commits on request).

## 2026-09-18 — Services icons use the brand gradient
- `services.tsx`: service icon tile `bg-zinc-100 text-zinc-800 ring-zinc-200` → `bg-brand-gradient text-white`, with a soft inset highlight and a blue drop glow. This is a scoped exception to the "icons never brand blue" rule, requested by the user and noted in the map. The gradient is on the tile because lucide icons are single-colour strokes; a gradient stroke would need hand-written SVG `<linearGradient>` defs, which the no-self-coded-SVG rule forbids and which previously caused id collisions. The capability check marks are unchanged (zinc-800).
- Verified: CDP screenshot `svc.png` shows gradient tiles on all visible cards. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — Services: gradient-stroked icons, no tile; gradient checks
- `services.tsx`: removed the gradient tile behind each service icon. The icon itself (size-8, stroke 1.75) and every capability `Check` now use `stroke="url(#services-icon-gradient)"`.
- Added `BrandIconGradient`, rendered once in the section: a hidden 0×0 `<svg><defs><linearGradient>`, a colour definition only (the icons are still lucide). `gradientUnits="userSpaceOnUse"` 0,0→24,24 matches the lucide viewBox, so zero-width straight segments (e.g. the Network stem) still paint, which objectBoundingBox would not. Stop colours use `style={{ stopColor: "var(--color-brand-from|to)" }}` because presentation attributes don't resolve `var()`. The one id is safe with the marquee's duplicate list because the defs sit outside both lists.
- Verified: CDP screenshot `svc2.png`: gradient-blue service icons and checks, and the Network icon's vertical stem renders. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — What we build on ink
- `what-we-build.tsx`: section `bg-brand-50/60` → `bg-ink`. Dark variants: eyebrow `text-brand-300`, `SectionHeading tone="dark"`, "View all services" as `variant="secondary"` (white; a black primary would vanish on ink), grid `border-white/10 bg-white/[0.03]` with `white/10` dividers and `hover:bg-white/[0.04]`, icon tiles `bg-white/[0.06] text-white ring-white/10` (still not blue), titles white, body zinc-400, link focus outline brand-300. The gradient "Learn more" links are unchanged.
- Note: page order is Problem → What we build → Selected work, so two ink sections now sit back to back.
- Verified: CDP screenshot `wwb2.png`. biome/tsc clean, `next build` → `/` static.

## 2026-09-18 — New Featured project section (below What we build)
- New feature `features/marketing/featured-project` (types, data, index, `components/featured-project.tsx`), rendered right after `<WhatWeBuild>` in `page.tsx`. The user had since reordered the page (What we build now follows Technology), so the order is … Technology → What we build → Featured project → Approach. Fixed the stale order comment in `page.tsx`.
- Built from the user's reference, with the copy reworded as asked. White section. Left: 3 numbered facts (Where it started / How we structured it / What it changes) on zinc-50 with dividers, plus one CTA "Discuss a similar project" → `/#contact`. Dropped "View case study" because no case-study page exists. Right: graph-paper canvas with a hub "Shared internal order ID" → dashed bus → 6 steps (FileText, Calculator, ShoppingCart, ClipboardCheck, Factory, Truck; zinc icons, ink number badges) with ArrowRight between them → "Shared visibility across teams" → legend. The diagram is vertically centred (`my-auto`) with the legend pinned to the bottom. Steps are a semantic `<ol>`; the connectors are aria-hidden CSS dashes.
- Verified: CDP screenshots `fp.png` and `fp2.png` (centred). At 375px there's no page overflow (the canvas scrolls internally) and there are 6 steps. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — All workflow connectors animated
- The request was ambiguous (How we work vs the new Featured project diagram, both workflows), so I animated both.
- `workflow/components/flow-canvas.tsx`: done connectors went from solid brand-300 to marching brand-300 dashes, and todo connectors from static grey to marching grey dashes at half speed (`animationDuration: 1.6s` inline). Todo dash period changed 7px → 8px to match the 8px flow keyframe, so the loop is seamless. Active edges are unchanged (brand dashes plus a packet). Updated the stale doc comment.
- `featured-project.tsx`: `DASH_X`/`DASH_Y` now march (`animate-flow-x/y`). The bus is split into two halves (left reversed) so data flows outward from the hub. The legend uses a still `DASH_KEY`.
- Verified in the pane at 1500: How we work tabs 0–4 have 8/10/7/5/5 connector segments, all animating (1/3/3/1/1 slow todo). Featured project has 11 dashed lines, 10 animating (the 11th is the legend key), with bus directions reverse/normal. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — Approach removed, FAQ added, CTA band rings + comets
- Deleted `features/marketing/approach` and removed it from `page.tsx`. Nav "Approach" → "FAQ" `/#faq` in `site-header/navigation.ts`, and footer "Our approach" → "FAQ" `/#faq`, so no link points at `#approach`.
- New `features/marketing/faq` (types, data, index, component), rendered where Approach was (before the CTA band). 6 questions in brand voice (who we work with, replacing tools, how projects start, time to results, AI with control, after launch), careful not to promise specifics. Built on native `<details name="faq">`/`<summary>`: no client JS, exclusive where supported, first item open, marker hidden, Plus rotates 45° to a ×, focus ring. Two-column layout on lg with a sticky heading.
- `cta-band.tsx`: removed the floating integration badges (and `badges` from data/types). Added a radial-masked 100rem box of 5 `brand-200` rings (r 260…740px) with two mirrored comets each (local `cometStyle`, same `animate-comet` / `--comet-turn` as the hero, 5.2s stagger). `animate-float` had no users left, so I removed it and its keyframe from globals.css.
- Verified in the pane: 6 FAQ items; clicking #3 closes #1 and a second click closes it (open sets [0] → [2] → []). The CTA has 10 comets, all running, and 0 logos. No `#approach` element or links remain; 3 `/#faq` links. Order: … featured-project > faq > contact. CDP screenshot `faq-cta.png`. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — CTA band edge fades; tighter Featured project → FAQ gap
- `cta-band.tsx`: the background gradient now starts and ends in white (`#fff 0% → #eef8ff 16% → #d9efff 48% → #f5fbff 82% → #fff 100%`), so the band no longer has a hard top edge against the white FAQ. The rings/comets box sits inside a new full-band wrapper with a vertical mask (`transparent → #000 20% … 80% → transparent`), so the rings fade at the top and bottom as well as the sides (the existing radial mask).
- `faq.tsx`: `py-24 sm:py-28` → `pt-12 pb-24 sm:pt-16 sm:pb-28`. The Featured project → FAQ gap went from 224 to 176px on desktop and from 192 to 144px on mobile; recorded as a rhythm exception in the map.
- Verified: CDP screenshot `faq-cta2.png` (Featured project bottom → FAQ → CTA → footer top). biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — Font → Plus Jakarta Sans; all sections narrowed to 80rem
- No font was named, so I chose Plus Jakarta Sans (modern geometric sans, fits AI/automation B2B). `layout.tsx` uses `Plus_Jakarta_Sans` from `next/font/google` (built in, no new dependency) as `--font-brand-sans`, and `globals.css` maps `--font-sans` to it. Geist Mono is kept for the mono labels.
- Width: "reduce Problem, then resize the others" → every section container `max-w-[88rem]` → `max-w-[80rem]` (1280px) in problem, services, workflow, work, integrations, what-we-build, featured-project, faq and site-footer. This matches the header bar (`max-w-7xl` = 80rem), so content and header now share the same left edge.
- Gotcha: after the bulk `sed`, the running dev server kept serving stale CSS (still containing 84/88rem rules, but not the new 80rem class) and computed widths stayed at 1453px. Touching files did not help. I restarted the dev server I had started (killed PID 18032 on :3000 and relaunched `bun run dev`); the production build had the rule all along.
- Verified in the pane after the restart: body font is "Plus Jakarta Sans" (loaded) and Geist Mono is loaded. At 1500, all 9 containers are 1280@102, the same as the header (1280@102), with 0 hero badge/text overlaps and no page overflow. At 1024 the header nav stays on one row, bar children don't overlap, and nothing overflows. CDP screenshot `font-top.png`. biome/tsc clean, `next build` → `/` static. Not committed.
- Possible follow-up: the headings' tight negative tracking was tuned for Geist and reads slightly tight in Jakarta.

## 2026-09-18 — "Learn more" links → standard buttons
- User: make "Learn more" like the other CTAs. Replaced the gradient-text + nudging-arrow links with the shared `ButtonLink` (size sm), keeping `href` and `aria-describedby` (the card heading). Problem cards (white): primary black button, hover brand gradient. What we build (ink): `variant="secondary"` (white), matching its "View all services" button. Removed the now-unused `Link` and `ArrowUpRight` imports from both files.
- Verified: CDP screenshots `lm-problem.png` (6 black buttons) and `lm-wwb.png` (4 white buttons). biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — What we build buttons: gradient hover
- `shared/ui/button-link.tsx`: new `onDark` variant (`border-transparent bg-white text-ink hover:bg-brand-gradient hover:text-white`) for buttons on ink sections. I used a variant rather than hover overrides on `secondary`, because `cn()` does not dedupe conflicting utilities, so `hover:border-*` / `hover:bg-*` clashes would resolve by emission order.
- `what-we-build.tsx`: "View all services" and all 4 "Learn more" buttons use `variant="onDark"`.
- Verified in the pane (a real hover): the hovered "View all services" computes `linear-gradient(90deg, rgb(4,126,253), rgb(7,161,253))` with white text and a transparent border, while the others stay white with ink text; all 5 buttons carry the variant. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — Header links semibold
- Added `font-semibold` to the desktop nav links (`site-header.tsx`), the "Services" dropdown trigger (`nav-dropdown.tsx`) and the mobile menu links (`mobile-nav.tsx`). The dropdown panel items were not changed (their titles are already `font-medium`).
- Verified at 1024 (the tightest desktop width): the 5 top-level items compute weight 600, the nav stays one row (36px), there is 49px clearance between logo, nav and actions, and the bar doesn't scroll. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — Bigger, more readable type outside the hero
- Scripted a one-step bump of every text-size token (sm:/md:/lg: prefixed too): 10→11px, 11→12, xs→13, 13→14, sm→15, 15→16, base→17, lg→xl, xl→2xl. It ran over problem, services, workflow, workflow-tabs, work, work-tabs, integrations, what-we-build, featured-project (only the left/story part, not the diagram), faq, cta-band and site-footer; 60 tokens changed. Contrast: on light sections zinc-500→600 and zinc-400→500; on ink sections (work, work-tabs, what-we-build) zinc-400→300.
- `section-heading.tsx`: lg title 34/42 → 36/46px, md 30/36 → 32/40px, description 15px leading-6 max-w-md zinc-500/400 → 16px leading-7 max-w-lg zinc-600/300. The hero doesn't use it, so it's untouched.
- Excluded on purpose: the hero (user), the header (just tuned), and the fixed-layout illustrations (automation-flow, app-mocks, flow-canvas, the featured-project diagram).
- Verified at 1500: 0 clipped text elements; Problem h2 46px; FAQ answers 16px; no page overflow. At 375: no elements past the viewport outside the intentional scrollers. CDP screenshots `fs-problem.png`, `fs-wwb.png` and `fs-faq.png`. biome/tsc clean, `next build` → `/` static. Not committed.

## 2026-09-18 — Fixed the lag: animations moved to the compositor
- Symptom: the deployed site was very laggy. Not page weight: `/` is 653 KB raw but 96 KB gzipped. Measured with a CDP probe against `next start` (1500×900, idle 4s per section): **60 style recalcs + 60 layouts per second forever, main thread 65–80% busy, ~300 MB of compositor layers (18 layers over 1 MP)**.
- Causes and fixes:
  - Comets (hero 12, CTA 10) were ring-sized conic boxes with `mask` composite, rotated: one multi-megapixel layer each. New `shared/ui/ring-comet.tsx` is a small clipping window over a ring-sized bordered circle, rotating about the ring centre (same curvature and tail fade). Literal `comet` / `comet-right` keyframes, no `var()`.
  - Ring fades were `mask-image` radial gradients on 2550px/1600px boxes. Rings are concentric with the fade, so a constant per-ring border alpha (`ringFadeAlpha`) is exactly equivalent.
  - Dashes animated `background-position` and packets animated `left`/`top` (layout every frame). New `shared/ui/flow-line.tsx`: `FlowLine` (a clipped strip sliding 80px per 8s) and `FlowPacket` (a track translating by its own length, 4 passes per 12.8s). Used by automation-flow, flow-canvas and featured-project.
  - `agent-glow` animated `box-shadow`; now an overlay fading its opacity.
  - Technology orbit animated a registered `--orbit-angle` on the main thread under a mask around animated logos. Now nested `animate-orbit` / `animate-orbit-back` wrappers per logo (both inside the `<li>`, so always in sync) with `cqw` radius, and white gradient overlays instead of the mask.
  - The CTA band vertical mask and the hero marquee edge mask became white gradient overlays. Removed `backdrop-blur` from the fixed header (bg white/85 → white/95) and from the hero and CTA eyebrow pills.
- Findings worth keeping: `var()` in transform keyframes and short iterations × many elements (React's root `animationiteration` listener) both keep waking the main thread. A probe that pauses and plays animations via JS gives misleading per-animation numbers; disable groups with injected CSS instead.
- After: **0 layouts/s, 6–18 style recalcs/s, main thread 6–19% at idle (headless, no GPU), ~100 MB layers (4 big: two viewport layers, the page, the services marquee)**. Visuals compared via CDP screenshots of the hero, Selected work, How we work, Technology, Featured project and CTA: unchanged. biome/tsc clean, `next build` → `/` static.
- Git note: the user committed and pushed during this task (commits up to `d41fa1d` include my intermediate state with `var()` keyframes). The final fixes (literal keyframes, long iterations, orbit nesting, blur/mask removals) are still uncommitted in the working tree. The user also removed the featured-project step number badges and the `page.tsx` header comment themselves; I left both alone.

## 2026-09-28 — Seven inner pages (Challenges, Services, Case studies, Industries, Process, About, Careers)
- Reference (glitchaisolutions.com) has the same nav; used its section rhythm (hero → problem → services → case studies → industries → principles → team → stack → process → FAQ → CTA) as a guide, in our own style and copy.
- New `marketing/page-blocks`: PageHero, FeatureGrid, SplitSection, Steps, BeforeAfter, Stats, BlockHeading + a lucide icon map. All static except what the reused sections already animate; nothing new animates (per the perf rules).
- Seven page features + routes under `app/(marketing)/<slug>/page.tsx`, each with `metadata`. Every page: hero + 5–7 sections + `CtaBand` (footer comes from the layout). Reused home sections: Problem, WhatWeBuild, Services data (via new ServiceDetails rows with anchors), Work, FeaturedProject, Workflow, Integrations, FAQ.
- Copy is in brand tone and avoids unverifiable claims: hero stats are site facts (5 service lines, 5 stages, 10 industries, 3 case studies). Careers roles are marked "we hire when a project needs it" and every Apply goes to `/#contact` (no careers mailbox exists). "Discuss this" per service also → `/#contact`.
- Nav: header → the seven pages (Services stays a dropdown, items now `/services#<id>`); footer Company column mirrors them. Seven items wrapped at 1024 (nav 56px), fixed with `px-2 xl:px-3` on links and showing the secondary "Challenges" button only from `xl` (`hidden xl:contents` wrapper, because `cn()` would not resolve `hidden` vs the button's `inline-flex`).
- Review fixes: Case studies hero title no longer duplicates the Selected work heading beneath it; Industries sector grid uses 2 columns so 10 cards don't leave an orphan.
- Verified: `next build` → all 8 routes static; every route 200 with 6–8 sections. CDP checks per page at 1500/1280/1024/375: nav one row (36px) at ≥1024, burger at 375, no header overlap, no horizontal overflow, 0 clipped text on the new pages. Full-page screenshots `infrantic-shots/pg-*.png` reviewed. biome/tsc clean. Not committed.

## 2026-09-28 — Pull from main
- `git fetch` + `git pull --ff-only origin main`: already up to date. Local, `origin/main` and the remote (`ls-remote`) are all `07b6c77`. The uncommitted work (the seven inner pages plus the perf fixes) is untouched.
- Noted, not pulled: `origin/sudeep` has one new commit, `73d13ab` "UI polish: enhance marketing cards, fix layout bugs, and improve tech stack aesthetics" (2026-09-18), touching integrations.tsx, problem.tsx and services.tsx. Our working tree changes integrations.tsx (orbit perf rebuild) and services.tsx, so merging it will need conflict resolution.

## 2026-09-28 — Pull from main (Sudeep's PR #1)
- `git pull --ff-only origin main`: fast-forwarded `07b6c77` → `281f283` ("Merge pull request #1 from guptaRishi00/sudeep", carrying `73d13ab` UI polish). It touched integrations.tsx, problem.tsx and services.tsx. None of these had local changes: the perf fixes were already committed in `07b6c77`, which corrects my previous log entry that said they were uncommitted.
- Perf regression check on the pulled files: no `--orbit-angle`, `mask-image`, `animate-float` or `background-position`; the `animate-orbit-back` orbit is intact. One `backdrop-blur` came in on the Technology stack tag chips (static, small, over static cards), so it's left in and mentioned to the user.
- The pulled files failed `bun run lint` (CRLF/format in all 3, plus an unused import in services.tsx). Fixed with `biome check --write` (+ `--unsafe` for the import). The whitespace-insensitive diff is only line wrapping plus the removed import. Left uncommitted.
- Verified on the merged tree with the seven uncommitted pages: lint clean, tsc OK, `next build` → all 9 routes static.

## 2026-09-28 — Services back to an edge-to-edge infinite marquee
- Sudeep's PR #1 had turned the Services row into a contained (`max-w-[80rem]`), manually scrolled, snap row. `services.tsx` now restores the marquee around his new card design: a `-mx-4` full-bleed viewport (`overflow-hidden`; `motion-reduce:overflow-x-auto`), a `w-max` track with `motion-safe:animate-marquee` (translateX -50%, compositor-only) at 60s, hover pause, and two `ServiceList` copies. The second copy is `aria-hidden`, has no heading ids, and is `motion-reduce:hidden`. Cards keep their own `pr-6` so the halves are exactly equal. Dropped `snap-start`, which does nothing on a moving track.
- Verified in the pane at 1500: the viewport spans 0 → 1485 (the full client width), both lists are 1920px (half the track, so the loop is seamless), the animation `marquee` 60s is running, and there's no page overflow. Headless screenshot `infrantic-shots/svc-marquee.png` shows cards bleeding off both edges. biome/tsc clean, `next build` → static. (The old CDP shot scripts had been cleared from temp; a replacement `section-shot.mjs` is in the session scratchpad.)
- Noted for the user, not changed: the card hover uses `from-blue-600 to-indigo-700`, which conflicts with the "no violet/indigo" brand rule (brand is the #047EFD→#07A1FD gradient).

## 2026-09-28 — Inner pages: no home-section reuse
- User rule: pages other than home must not reuse home-page section components; build page-specific variants with a design tweak and new content (CtaBand + footer stay shared, as asked earlier). Saved to auto-memory and the map.
- Replaced all 11 reuses on 6 pages:
  - Challenges: Problem → `GapRows` (numbered rows pairing "what you see today" with "what changes"; new copy).
  - Services: WhatWeBuild → focus-areas `FeatureGrid` (ink, new copy); Integrations → `StackShowcase` (static logo grid).
  - Case studies: Work → `CaseList` (stacked write-ups: sector, tools, challenge, what we built as steps, results); FeaturedProject → `FeaturedCase` (ink: facts row, 6-stage numbered flow, before/after).
  - Process: Workflow → `EngagementTimeline` (6 phases with "you'll see" and "your time").
  - About: Integrations → `StackShowcase` (different grouping and copy from Services).
  - Faq → `PageFaq` on Challenges, Services, Industries and Process, each with 5 page-specific questions and its own `<details name>` group.
- All new components are static (per the perf rules). New blocks live in page-blocks (`PageFaq`, `StackShowcase`; `blockIcons` is now exported); bespoke ones sit in the page feature folders with their content types in `<page>.data.ts`.
- Verified: grep for home-section imports in inner page folders returns none. biome/tsc clean; `next build` gives 9 static routes; all 7 inner routes 200 with 6–8 sections. CDP checks at 1500/1024/375: nav one row, no overlap, no overflow, 0 clipped text. Section screenshots `infrantic-shots/v-*.png` and `v-sheet1/2.png` reviewed. Not committed.

## 2026-09-28 — FAQ back to the home component on inner pages
- User: the FAQ, CTA band and footer may reuse the home components everywhere; the new FAQ design didn't look good. Challenges, Services, Industries and Process now render the home `Faq`. Each keeps its own five questions: the `faq` objects in their data files now satisfy `FaqContent` (id/group/cta dropped, the home description line added), and `FaqContent` is exported from `features/marketing/faq`.
- Removed `page-blocks/components/page-faq.tsx`, its export, and the `PageFaqContent`/`FaqEntry` types. Memory and map rule updated: FAQ, CTA band and footer are the allowed shared home sections.
- Verified: biome/tsc clean; `next build` gives 9 static routes; the 4 pages return 200 with `id="faq"`. CDP screenshot `infrantic-shots/faq-process.png` shows the home FAQ layout with the Process questions. Not committed.

## 2026-09-28 — Inner pages: hero automation visuals + scroll reveals
- User: the inner pages read as a block of text, with no movement or automation graphs. Added motion that pulls readers down the page, all CSS and compositor-only, and no new dependencies.
- **Hero visuals** (`page-blocks/components/hero-visual.tsx`, `PageHero.visual`, shown from `md`):
  - "flow" graphs built from the existing `FlowLine`/`FlowPacket` primitives, with nodes, a hub and a record card:
    - Challenges: scattered tools → Infrantic → Order #1042.
    - Services: 5 service lines → your system.
    - Case studies: procurement flow with an AI agent.
    - Process: 5 stages plus a loop.
    - Careers: You → Map → Build → Ship staircase.
  - "orbit" diagrams using the `RingComet`s: Industries (10 sectors) and About (disciplines and tools).
  - Data lives in each page's `*.data.ts`.
- **Scroll reveals** (`globals.css`): `.reveal` (rise and fade), `.reveal-grow-y` (the `Steps` progress line) and `.reveal-grow-x` are scroll-driven (`animation-timeline: view()`), gated on `@supports` and no-reduced-motion. They're applied to FeatureGrid cards (plus hover lift), SplitSection panel, Steps, BeforeAfter, Stats, StackShowcase, GapRows, CaseList, ServiceDetails, OpenRoles, FeaturedCase stages and EngagementTimeline phases.
- Fix: the FeaturedCase and EngagementTimeline packet tracks overflowed the page on Process; they now sit in `overflow-hidden` wrappers.
- Perf bug found and fixed: /about idled at ≈190 ms/s main thread with 60 recalcs/s.
  - Bisect: cells with `.reveal` inside a `rounded-2xl overflow-hidden` grid (the Stats and StackShowcase blocks) forced a mask layer, which pushed the CTA comets onto the main thread. `contain: paint/strict` on the CTA didn't help.
  - Fix: `.reveal` moved to the Stats/StackShowcase grid itself. GapRows and OpenRoles drop the parent clip, and so does ServiceDetails (with `bg-white` moved to the list); OpenRoles rows round their own first/last corners.
  - The rule is now in the map's animation perf rules.
- Verified:
  - biome/tsc clean; `next build` gives 9 static routes.
  - CDP probe at 1500×900 on `next start`, all 7 pages: `timeline: view()`, no horizontal overflow, 0 layouts/s. Main thread was 6–10 ms/s, except Industries at 28 in the probe (6–7 in a dedicated 3-run harness). About went 167 → 6–8.
  - Screenshots of the reworked Stats, GapRows, ServiceDetails and OpenRoles show rounded corners intact.
- Map: PageHero/HeroVisual, reveals, the no-reveal-in-rounded-clip rule, and fixed stale notes (the "reused home sections" wording, numbered GapRows, `--comet-turn`). Not committed.

## 2026-09-28 — Transient horizontal scroll, timeline centring, frameless hero diagrams
- **Transient horizontal scrollbar** (user: it appears when an animation starts and disappears when it ends, on "some page"). I couldn't reproduce it after the earlier Process packet-clip fix. Checks run:
  - CDP on `next start`, all 8 routes, at 390/768/900/1024/1100/1229/1280/1366/1440/1500/1536/1600/1920, at DPR 1 and 1.25, with and without visible scrollbars.
  - Every time-based animation paused and seeked 0–30s in 250ms steps, and scroll-driven reveals pinned at 0/50/100%. Checked both the document's scroll size and every element-level scroll container against its t=0 baseline.
  - Per-frame sampling from navigation start.
  - In the user's pane (dev :3000): client-side navigation plus slow scrolling.
  - Every check came out 0.
  - Added `overflow-x-clip` to `<body>` (`src/app/layout.tsx`) as a guard. Clip doesn't make a scroll container, so sticky still works: the FAQ heading holds at 112px and releases at its container's end (measured).
- **EngagementTimeline:** dots are `self-center` over their cards. The track now spans `calc((100%-5rem)/12)` from each side, so it starts and ends at the first and last dot centres. Measured at 1500: dot cx = card cx for all 6; track 210→1290 = first→last dot.
- **Hero diagrams:** removed the canvas frame (background, dots, border, radius, shadow) and the caption text, so the diagrams sit on the hero wash. The invisible `overflow-hidden` stays for the packets. The now-unused `caption` field is gone from both visual types and all 7 data files.
- Verified: biome/tsc clean; `next build` gives 9 static routes. Screenshots `scratchpad/shots/t-hero-*.png` and `t-process-timeline.png` reviewed, with no labels clipped. Map updated. Not committed.

## 2026-09-28 — Small-screen pass (desktop ≥1024 untouched)
- User: desktop (lg and up) is right and must not change; optimise smaller screens.
- **Audit:**
  - CDP at 375/430/768: every route, full-page shots, tap targets, text <12px, clipped text, off-screen elements.
  - `ui-visual-validator` agent reviewed the contact sheets.
  - Found no overflow or clipping. Tiny text only in the home illustration mocks, which are deliberately sized.
- **Changes** (all base classes overridden at `sm`/`lg`, or `max-lg:`/`md:max-lg:`/`md:hidden`):
  - Phone rhythm: sections `py-24` → `py-16` (192 → 128px between blocks). Also FAQ/Integrations/Problem `pb`, home hero `pb`, footer `pt`, and the marquee fade `-bottom-16` to match. PageHero `pt-36 pb-20` → `pt-32 pb-16`. 24 files, one class each. Phone pages are 380–510px shorter.
  - Mobile menu: `max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain`. It ended at 670px on a 667px iPhone SE; now 646px, and it scrolls on shorter screens. Dropped the duplicate "Challenges" secondary button; only "Book a call" remains, full width.
  - Footer links `max-lg:inline-block max-lg:py-1` with `max-lg:space-y-1`: tap height 19 → 27px.
  - PageHero diagram between md and lg: `md:max-lg:mx-auto md:max-lg:w-full md:max-lg:max-w-lg`, so it's not 736px wide under the text.
  - CaseList challenge/built/changed `md:grid-cols-3` → `lg:grid-cols-3` (stacks on tablets; the columns were ~200px).
  - Featured-project diagram: phone-only "Swipe to see all six steps →" hint (`md:hidden`).
- **Not changed:** the agent's footer suggestion (1 column below `sm`). The 2+1 grid is conventional, and 3 stacked columns would add length.
- **Verified:**
  - biome/tsc clean; `next build` gives 9 static routes.
  - Desktop proof: layout dump of every rendered element (box, font-size, colour) at 1024/1280/1500 on all 8 routes. A repeat of the baseline shows 0 noise. After the changes: 17,876 elements, 0 differences, identical page heights. The only deltas are zero-size elements inside the hidden mobile menu.
  - Small widths: 0 horizontal overflow at 375/768. Crops reviewed (768 process hero, 768 case list, 375 featured project with hint).
- Map: rhythm numbers, marquee coupling, the desktop-frozen rule with the dump method, mobile-nav notes. Not committed.

## 2026-09-28 — Contact page
- New `/contact` (static) with feature `features/marketing/contact/`:
  - data (intro, "what happens next", details, form copy, 5-question FAQ);
  - `contact-page.tsx`: intro left, form card right from lg; on phones the form comes straight after the heading;
  - `contact-form.tsx` (client);
  - `contact.actions.ts` (server action);
  - `contact.delivery.ts`.
- The page ends with the home `Faq` and has no CtaBand, because that button targets this page. Before this, the CTA band's "Book a discovery call" already linked to `/contact`, which was a 404.
- User decisions (asked): design now, wire delivery later; placeholder contact details. `deliverContactRequest` only logs "received, not delivered" with no personal data. Placeholders are flagged in `contact.data.ts` and the map.
- Form:
  - Fields: name*, work email*, company, phone, interest chips (radio, `has-checked:` styling), message* (≥20), honeypot.
  - The server re-validates everything (public POST endpoint). After an error it echoes values as `defaultValue`s, so React's post-action reset keeps them. Focus goes to the first invalid field, or to the success heading.
  - The success panel is an `<output>` with a "Send another message" reset (remount via key).
  - Pending state uses a spinner (`motion-safe`).
- Repointed all 20 `/#contact` links (hero/page CTAs, header "Book a call", footer, service rows) to `/contact`.
- Verified:
  - biome/tsc clean; build gives 10 static routes including `/contact`.
  - CDP on `next start`:
    - Invalid submit (browser validation bypassed) → server errors on email/message; name, email, message and interest kept; focus on email.
    - Valid submit → success panel, focus on its h2; the server log shows exactly one `[contact]` line.
    - Honeypot → success shown, no delivery line.
  - 0 overflow at 375/768/1024/1500; contact cards untruncated at 375–1500 (a first 3-col xl layout truncated, fixed). Screenshots reviewed.
- Not committed.

## 2026-09-28 — Products + Sectors pages; Industries and Process removed
- (The preceding "map Book a call to contact" task needed no change: every Book a call/discovery call link already pointed to `/contact`. Confirmed in source, dev-server HTML, and the pane.)
- User decisions (asked):
  - Remove Industries and Process.
  - Products = packaged offerings derived from existing site content.
  - Sectors = a hover dropdown only (no `/sectors` page) with Healthcare, Tech product companies, Marketing.
  - Case studies and Contact already existed.
- New:
  - `/products`: `features/marketing/products` (data, `ProductCatalog` cards: icon, summary, "Replaces", included list, works-with logos, "Discuss this product" → /contact), then Steps (ink), Faq, CtaBand.
  - `/sectors/[slug]`: `features/marketing/sectors` with one `SectorPage` layout and per-sector content. `generateStaticParams` + `dynamicParams = false`; `PageProps<"/sectors/[slug]">` with awaited params.
  - Each sector: flow hero diagram, 6-item friction grid, 4 systems (ink, → /products), approach split, 4 FAQs. No compliance certifications or prices claimed.
- Nav: Services ▾, Products, Sectors ▾ (`sectorLinks` in `site-header/navigation.ts`), Case studies, Challenges, About, Careers.
- Footer: 4 columns (added Sectors; Company swaps Industries/Process for Products; "Book a discovery call" → "Contact us"), `grid-cols-2 lg:grid-cols-4`.
- Removed routes and feature folders for industries and process (incl. EngagementTimeline). Repointed their links: case-studies secondary → /products, challenges "See how we work" → /#workflow.
- Verified:
  - biome clean; `next build` → /products static and 3 sector pages SSG; industries/process gone; tsc exit 0.
  - On `next start`: new routes 200. `/sectors`, `/sectors/foo`, `/industries`, `/process` all 404.
  - A crawl of every internal link on 11 pages: only `/privacy` and `/terms` 404, both pre-existing.
  - Header one row at 1024/1280/1500. Sectors hover dropdown lists the 3 pages. Mobile menu has Services and Sectors groups.
  - 0 overflow at 1500/375. Screenshots reviewed (nav dropdown, products and healthcare at 1500, products at 375).
- Noted, not changed: About still says "10 Industries we build for".
- Not committed.

## 2026-09-28 — Distinct hero visuals for the three sector pages
- User: the sector heroes reused the same automation diagram (Healthcare and Marketing = the Challenges "4 sources → hub → record" layout; Tech = the Case-studies flow). Wanted something different and creative.
- New bespoke visuals in `sectors/components/visuals/` (shared `VisualFrame`: 5:4, one `role="img"` label, inner `aria-hidden`), passed via a new optional `aside` prop on `PageHero`. The old `visual` data and shared wires were removed from `sectors.data.ts`.
  - **Healthcare:** referral card with an ECG strip (static SVG trace; a full-width layer carrying a small white erase gap and a glowing dot sweeps across it, like a patient monitor), a 5-step care pathway (done ticks, the current step pulsing, a packet to the next), a WhatsApp reminder toast, and an "AI first pass · awaiting doctor" card.
  - **Tech product companies:** dark "events · production" console with an event stream scrolling upward (duplicated list, `marquee-y` 40s, unrounded clip, static fade overlays; tags ok/new/ai/warn), an admin-panel card (seats, onboarding toggle, refund approved), and an "AI ticket routed" toast.
  - **Marketing:** a four-stage funnel with lead packets falling through it, a "Client report · Week 38" card whose bars rise (`bar-rise`, staggered), and "new lead assigned" / "report sent to client" toasts offset by 6s.
- New keyframes in `globals.css` (`ecg-sweep`, `marquee-y`, `toast`, `bar-rise`): transform/opacity only, literal values, 12s+ iterations, everything behind `motion-safe:` (reduced motion shows a static, complete picture).
- Verified:
  - biome/tsc clean; build OK (3 sector pages SSG).
  - CDP on `next start`: idle main thread 10–13 ms/s and 0 layouts/s on all three (Products, on the old diagram, measured 36–40). 0 page overflow at 1500/1024/768.
  - Healthcare toast initially covered the "In progress" pill at 1024. Card widths were retuned; a script check found no text in the referral card covered by either floating card at 1024 or 1500.
  - Screenshots reviewed at 1500 and 1024.
- Not committed.

## 2026-09-28 — Sector heroes, third pass: one bold illustration each
- User rejected the UI-mock card visuals ("doesn't look good"). I asked for a direction with 4 previewed options; they chose "one bold illustration, 2–3 labels max".
- Rewrote `sectors/components/visuals/`. Each drawing is one SVG (500×400 viewBox) in brand-gradient strokes. Motion is HTML overlays positioned with `X()/Y()` helpers, reusing the compositor-only `FlowPacket` via a new `Packet` segment helper in `visual-frame.tsx`:
  - **Healthcare:** a large heartbeat trace. Its flat line branches (orthogonal) to three node circles, Patients / Staff / Systems (the headline's words), with packets on the branches, a pulsing peak, and a soft radial scan beam (`scan-sweep`) crossing the stage.
  - **Tech:** a circuit board. A dark "Your product" chip (glow pulse) with 12 orthogonal traces to pads, 8 packets, and labels API / Webhooks / Admin.
  - **Marketing:** a big gradient funnel with leads falling through it and out along an outlet into four rising bars (`bar-rise`, staggered), a trend arrow, and labels "Leads" / "+18%".
- `globals.css`: `ecg-sweep` became `scan-sweep`; the unused `marquee-y` and `toast` keyframes were removed.
- Verified:
  - biome/tsc clean; build OK.
  - CDP on `next start`: idle 6–11 ms/s main thread, 0 layouts/s. 0 overflow at 1500/1024/768.
  - Screenshots reviewed. The first scan beam had hard edges and was switched to a radial gradient, re-shot mid-sweep with animations paused.
- Not committed.

## 2026-09-29 — Inner pages aligned with Products and Sectors (home untouched)
- User: "except for the homepage, change the content of the other pages according to the new pages added". Read as: the inner pages still described the pre-09-28 structure (Industries, Process) and never pointed at Products or the three Sectors.
- Audit of every inner page's data: stale only on About ("10 Industries we build for" twice; "not from a product", which contradicts /products). Challenges' secondary CTA still went to the home `#workflow` anchor left over from the removed Process page. Careers, Case studies (already → /products), Contact: nothing stale.
- **About:** hero stat → "3 Sectors we specialise in"; numbers stat → "6 Products to start from"; story point → "we map how the work runs before choosing what to build"; "What we do" adds "plus six products to start from"; "Who it's for" names Healthcare, tech product companies, and marketing teams.
- **Challenges:** secondary CTA → "See the products that fix these" (/products). Each of the 6 gap rows gets a product link under "What changes" (`product` field on `GapRowsContent`, rendered in `gap-rows.tsx` with the product-catalog link style): status → Shared Order Record, approvals → Approval Flow, reports and late problems → Operations Dashboard, departments' own truth → System Connector, first-pass checking → Document Review Assistant.
- **Services:** "Ways to work with us" panel gains "Product start" first.
- Not changed: home (excluded), Careers, Case studies (their real client sectors are not the three sector pages), Contact (its interest chips are service lines; a "product" option would need the server enum too — offered to the user).
- Verified: tsc 0; `biome check` clean; `next build` OK; on `next start` all 9 routes 200, all 5 linked product anchors exist once on /products, /about has 0 "industries we build". Headless shots at 1500 and 375 of the gap rows, About numbers, Services engagement: no overflow, link text "Product: Shared Order Record" (accessible name has the space). Not committed.

## 2026-09-29 — /sectors/marketing hero: megaphone replaces the funnel
- User: change the illustration on the right of the /sectors/marketing hero. Kept the direction they chose on 09-28 (one bold illustration, 2–3 labels, brand-gradient strokes, compositor-only motion) but a new subject: the funnel-and-bars was replaced.
- `sectors/components/visuals/marketing-visual.tsx` rewritten: a campaign megaphone (cone + navy cap + grip, gradient fill and stroke, mouth ellipse), three sound waves out of the mouth, and orthogonal traces to three channel pads (lucide MousePointerClick / Mail / AtSign) labelled Ads, Email, Social. Motion: the three waves pulse with the existing `agent-glow` (staggered 0.35s), each wave its own HTML-level `<svg>` layer so the opacity animates on the compositor, not an SVG child repaint; resting waves stay drawn at 22% so reduced motion still shows them. Five `Packet`s run the traces. No new keyframes, no new dependencies; `bar-rise` is now unused by this file (still defined in globals.css).
- Gotcha hit: I first wrote the file CRLF; this repo's biome formatter expects LF (unlike softexedge). Fixed.
- Verified: tsc 0, `biome check` clean, `next build` (3 sector pages SSG). Headless on `next start`: pads circular (52/40/45 px at 1500/1024/768), labels inside the frame, 0 horizontal overflow; at 375 the visual is hidden (existing md+ rule). Idle at 1500: 0 ms/s script, 10 ms/s tasks, 0 layouts/s (siblings measured 6–13). Screenshots at 1500 and 1024 reviewed. Not committed.

## 2026-09-29 — /sectors/marketing hero illustration replaced
- The file on disk had already been changed outside this session, from my funnel to a megaphone (waves, Ads/Email/Social pads). The user asked to change it.
- New "on target" illustration (`marketing-visual.tsx`, same one-bold-illustration style, 3 labels):
  - a bullseye at (320,200) with rings r=150/105/62 on a soft radial fill;
  - each ring has a sweeping arc: an HTML ring with only `border-t` coloured, rotated with the existing `orbit`/`orbit-back` keyframes at 18/13/9s; transform only, no mask, `motion-safe` only;
  - Ads/Email/Social pads on the left, their traces merging into one line that runs into the centre;
  - 6 packets, and a gradient "customer" disc (Users icon) that pulses (`agent-glow`).
- Also fixed the stale `sector-page.tsx` comment.
- Verified:
  - biome/tsc clean; build OK.
  - CDP on `next start`: 9 ms/s idle main thread, 0 layouts/s; 0 overflow at 1500/1024/768.
  - Screenshots reviewed at 1500 and 1024.
- Not committed.
- Removed the now-unused `bar-rise` keyframes from globals.css (nothing references them after the change); map updated.

## 2026-09-29 — Hero stats restyled like SoftexEdge
- User asked for the inner-page `content.stats` (the PageHero stat row: 6 pages, with Sectors covering 3) to look like SoftexEdge's. The match is `softexedge-sept-2026/src/components/*/AgencyStats.tsx`, which sits under that site's service heroes: no card, centred big tight-tracked numbers that count up in view, gradient suffix, uppercase tracked labels, vertical hairline dividers. (The home `StatsSection` is a scroll-scrubbed full section, not the analogue.)
- New `page-blocks/components/hero-stats.tsx` (client), used by `PageHero` in place of the old bordered `gap-px` card grid:
  - figures `text-5xl` / `sm:text-4xl` / `lg:text-[4rem]`, semibold, `-0.045em` tracking;
  - labels 12px semibold, 0.16em tracking, uppercase;
  - `sm:border-l` dividers (`border-t` when stacked on phones); `motion-safe:animate-rise` entrance.
- Count-up: no framer-motion (no new dependency). IntersectionObserver + rAF, 1.6s ease-out cubic, starts at 0 like SoftexEdge. Numeric values only ("Yours", "Human" etc. render as-is); `prefix`/`suffix` kept, suffix in the brand gradient. An sr-only copy holds the final value (visible counter `aria-hidden`); reduced motion jumps to the final value.
- Verified:
  - biome/tsc clean; build OK.
  - CDP on `next start`:
    - count-up sampled 0|0 → 3|1 → 6|1 on products and 0|0|0 → 6|1|0 on challenges;
    - off-screen stats wait: 375 About showed 1|0|0 before scrolling and 1|5|3 after;
    - no wrap at 1500/768/375 (incl. "Your stack", "Handover" at 768); 0 overflow;
    - settled idle 7–9 ms/s, 0 layouts (one 30 ms/s noise sample; the repeat was 9).
  - Screenshots reviewed at 1500, 768 and 375.
- Not committed.

## 2026-09-29 — Hero stats spacing
- User: less space below the hero stat row, slightly more above.
- `hero-stats.tsx`: `mt-14` → `mt-16` (56 → 64px).
- `page-hero.tsx`: section bottom padding is conditional (`cn`): `pb-8 sm:pb-12` with stats, and the unchanged `pb-16 sm:pb-24` without (Careers).
- Measured on `next start`:
  - last label → section end: 64px at 1500 (was 112) and 60px at 375 (was 92);
  - stats margin-top 64px;
  - Careers padding unchanged (96 / 64px).
- biome/tsc clean; build OK; screenshot reviewed. Not committed.

## 2026-09-29 — Hero stats spacing, second pass
- User re-sent the same request; read as "further in the same direction".
- Stats `mt-16` → `mt-20` (80px). With stats, the hero's bottom padding `pb-8 sm:pb-12` → `pb-4 sm:pb-6`.
- Measured on `next start`: last label → section end 40px at 1500 (was 64, originally 112) and 44px at 375 (was 60, originally 92); Careers unchanged (96 / 64px).
- biome/tsc clean; build OK; screenshot reviewed. Not committed.

## 2026-09-29 — Clickable cards: card hover drives the button, whole card follows the link
- `shared/ui/button-link.tsx`: new `stretched` prop. It adds `after:absolute after:inset-0 after:content-['']` (stretched link) plus literal `group-hover/card:` versions of each variant's hover look (primary/onDark → brand gradient, onDark text white, secondary/muted → brand-50). A named `group/card` avoids clashing with the existing `group` classes inside cards.
- Applied (card gets `group/card relative`):
  - home Problem articles and What-we-build articles ("Learn more");
  - Services detail rows ("Discuss this"; added a row hover tint `hover:bg-zinc-50/80` with `first:rounded-t-2xl last:rounded-b-2xl` so it respects the list's rounded border);
  - Products cards ("Discuss this product", a plain `Link`: same `after:` layer; `group-hover/card:` for its colour and arrow; card border tints on hover).
- Skipped, with reasons: Challenges gap rows (text link to a product, not a button); the home Featured project card (sideways-scrolling diagram an overlay would block); the How-we-work step panel (tab panel); Open Roles and Contact cards were already whole-card links.
- First tsc run failed: `cn()` doesn't accept arrays (`'false | string[]' is not assignable…`). Fixed by passing the two classes as separate conditionals.
- Verified:
  - biome clean; tsc exit 0; build OK.
  - A CDP test on `next start` (`scratchpad/cardlink2.mjs`), for all four card types:
    - hit-tests at two corners and the card body land on the link;
    - exactly 1 focusable element per card;
    - a real mouse hover on the card corner changes the button's computed style (gradient, or brand text on Products);
    - clicking an empty corner navigates to the link's href (`/#services`, `/contact`).
    - Result: ALL PASS.
- Trade-off: text inside these cards can no longer be selected by dragging (the overlay sits on top).
- Not committed.

## 2026-09-29 — Work: tabs on top, new automation
- `work-tabs.tsx`: the tablist is a horizontal segmented bar above the panel at every width (`lg:grid-cols-3`, snap scroller below lg, `bg-white/[0.08]` + gradient underline on the active tab). The vertical lg column and chevrons are gone. Keys are now Left/Right/Home/End (Up/Down dropped: the list is horizontal).
- `work.tsx` CasePanel: from xl a two-column grid (title and notes left, visual right spanning both rows, notes stacked in one column); below xl unchanged (title, visual, 3-col notes). The xl breakpoint is because the mocks and the graph need ≥ 40rem.
- `automation-flow.tsx`: same canvas, connectors and tiles; new graph for case 01 — Schedule "Every morning" → Supabase "Low-stock items" → AI AGENT "Supplier picker" (Chat Model / Memory / Tool ports → OpenAI, Memory, Google Sheets "Price list") → "Over budget?" → Slack "Manager approval" / Gmail "Send RFQ", with mono branch labels. `straight()` draws a downward arrow for vertical wires. `visualLabel` in `work.data.ts` updated.
- Two label collisions found by the test were fixed: "Over budget" × the Slack label (branch labels moved left of the branch line, right-aligned), and "Chat Model" × "Memory" port labels at phone scale (ports spread 400/492/584).
- Verified:
  - biome/tsc clean; build OK.
  - CDP (`scratchpad/worktabs.mjs`) at 1500/1024/375:
    - tabs above the panel, one row (3×418 / 3×322 / scroller 256);
    - Right/Right/Right/Left/End/Home → selected 1,2,0,2,2,0 with focus following;
    - section height identical on every tab; 0 overflow; 0 label clashes.
  - Screenshots reviewed.
- Perf: the home page idles at ~110–158 ms/s (noisy). With everything outside #work frozen it drops to 11 ms/s, so Work (incl. the new graph) is a small share. A per-section bisect shows the cost spread across the animated sections (workflow, hero, work largest). Pre-existing; flagged as a follow-up, not fixed here.
- Not committed.

## 2026-09-29 — Work tabs: undo my over-reach, keep only "tabs on top"
- User: I had asked only to put the 01/02/03 tabs on top (the container becomes flex-col) and to change the automation; I shouldn't have restyled the tabs or reworked the panel.
- Restored `work-tabs.tsx` and `work.tsx` to their original UI. vs HEAD the only changes are:
  - outer `grid lg:grid-cols-[18rem_1fr]` → `flex flex-col`;
  - tablist loses `lg:flex-col` and gets `lg:divide-x` instead of `lg:divide-y`;
  - comments updated.
  - Tab cards, chevrons, the left gradient marker, the both-axes arrow keys and the stacked case panel are all original again.
- Kept: the new automation graph (daily supplier run) from the previous entry.
- Verified:
  - biome/tsc clean; build OK.
  - `worktabs.mjs` at 1500/1024/375: tabs above the panel in one row (3×426 / 3×330 / scroller 256); keys 1,2,0,2,2,0 with focus following; equal heights on every tab; 0 overflow; 0 label clashes.
  - Screenshot at 1500 shows the original tab design in a row.
- Lesson: "make X on top" means move it, not restyle it; keep unrequested UI untouched.
- Not committed.

## 2026-09-29 — "move the tabs on top" (repeat): no code change
- The user repeated the request, frustrated. Checked what their dev server serves instead of editing blind:
  - `curl :3000/` has the Work wrapper `mt-12 flex flex-col gap-4` and the tablist without `lg:flex-col` (horizontal row, `lg:divide-x`);
  - in the pane at 1500: 3 tabs side by side at y=342 (426px each), tablist bottom 504 < panel top 534.
- The tabs are already a row above the panel in the running code. Asked the user to hard-refresh, or to send a screenshot or describe the placement they want (e.g. tabs attached to the top of the panel card), rather than guessing again.

## 2026-09-29 — Work case panel: slight card refresh
- `work.tsx` CasePanel only (tabs, automation and mocks untouched):
  - card fill `bg-white/[0.03]` → a soft vertical gradient (5.5% → 1.5% white) with an inset top hairline highlight;
  - the case number becomes a small outlined brand chip, baseline-aligned in one row with the title (was a line above it);
  - the "What we built" column gets the same `md:border-l` divider as "Operational benefit", so all three notes columns are evenly separated.
- No overflow clipping added (animation rule respected).
- Verified:
  - biome/tsc clean; build OK.
  - `worktabs.mjs` at 1500/1024/375: tabs still above the panel; keys/heights/0 overflow/0 label clashes unchanged.
  - Screenshots at 1500 and 375 reviewed. The chip first centred against a 3-line phone title, so it was switched to `items-baseline`.
- Not committed.

## 2026-09-29 — Navbar: gradient hover, Challenges button removed, slight restyle
- `site-header.tsx`:
  - removed the xl-only "Challenges" secondary button (and the stale comment); `navigation.ts` `headerActions.secondary` deleted (no other users);
  - the bar goes `rounded-xl` → `rounded-2xl`, plus a faint brand hairline along the bottom edge (height kept at 72px: the dropdown `pt-7` and hero padding depend on it);
  - nav links: label span with `bg-brand-gradient bg-clip-text` that goes `text-transparent` on hover (gradient text), and an `::after` gradient underline `scale-x-0 → 100` from the left (`motion-reduce` disables the transition).
- `nav-dropdown.tsx`: triggers get the same gradient text and underline, held while `aria-expanded`; menu item labels turn gradient on hover and focus-visible. Chevrons stay zinc (no-blue-icons rule).
- The "Challenges" nav link is unchanged.
- Verified:
  - biome/tsc clean; build OK.
  - CDP (`scratchpad/navbar.mjs`):
    - nav one row at 1024/1280/1500; the only header button outside the nav is "Book a call"; the /challenges link is still in the nav; bar radius 16px, height 72;
    - real-mouse hover: Products text zinc → transparent over the clipped gradient; Services trigger transparent/gradient while open; first menu item rgb(2,28,55) → transparent on hover.
  - Screenshots show the gradient text + underline on hover and in the open menu. (The `::after` read `transform: none` because Tailwind v4 `scale-x` uses the `scale` property; the screenshot confirms the underline.)
- Not committed.

## 2026-09-29 — Header: underline hover removed
- Removed the `::after` gradient underline (and the `relative` it needed) from the nav links (`site-header.tsx`) and dropdown triggers (`nav-dropdown.tsx`). Gradient text hover is kept.
- Verified:
  - biome/tsc clean; build OK.
  - CDP: `::after` content is `none` at rest, on hover and while open; Products text still goes transparent over the gradient on hover; Services trigger and menu items unchanged.
  - Screenshot shows gradient "Products" with no underline.
- Not committed.

## 2026-09-29 — Problem ("Where work slows down") card row gap
- `problem.tsx`: card grid `gap-4` → `gap-x-4 gap-y-6`. Vertical gap 16 → 24px; horizontal unchanged.
- Verified: biome/tsc clean; build OK. CDP measured row gap 24px and column gap 16px at 1500 and 768, row gap 24px at 375 (single column); 0 overflow.
- Not committed.

## 2026-09-29 — Selected work: a different automation (fan-in stock sync)
- Only `automation-flow.tsx` and the case-01 `visualLabel` in `work.data.ts` changed; tabs and panel untouched.
- The previous graphs were all "trigger → agent card with tool ports → fork". The new one changes the shape: three event sources fan in and one linear pipeline runs:
  - Shopify "New order", Warehouse "Barcode scan", Returns "Form" → Merge "One stream" → Update stock (Code) → Supabase "Stock levels" → AI "Reorder check" (pulsing glow) → Slack "Reorder alert".
  - Removed: agent card, ports, branch labels, the unused `vhv`.
  - `NodeTile` gained optional `rotate` (merge icon points downstream) and `glow`.
- The first render had the source tiles too close (tiles covering the labels above) and the merge icon pointing upstream. Fixed: sources at y 110/270/430, `rotate: 90`.
- `scratchpad/worktabs.mjs` now also flags text hidden under a tile (the old text-vs-text check had missed it).
- Verified:
  - biome/tsc clean; build OK.
  - At 1500/1024/375: 16 labels, 0 clashes (text or tile); tabs, keys and heights unchanged; 0 overflow.
  - Screenshot reviewed.
- Not committed.

## 2026-09-29 — Work panels: no empty band under the notes
- Cause: the tab panels share one grid cell (tallest sets the height) and the shorter cards stretched (`h-full`). After the new automation, case 01's visual was 578px at 1500 against ~340px for the app mocks, leaving about 270px empty under the notes in cases 02/03 (about 160px at 1024).
- Fix:
  - `work.tsx`: the card is a flex column and the visual wrapper is `flex-1`, so spare height goes to the visual, not to the bottom.
  - `app-mocks.tsx` Frame: stretches (`flex-1` chain), and the window bodies (`grid flex-1`) grow with it.
  - `automation-flow.tsx`: the frame fills the area with the graph centred (`justify-center`), and the graph is capped at `max-w-[50rem]` so it isn't much taller than the mocks.
- Measured (`scratchpad/panels.mjs`): space under the notes is 33px (the card's own padding) on all three cases at 1500/1024 (was 270/157 on 02/03) and 21px at 375. Desktop card height 901 → 757.
- `worktabs.mjs`: tabs, keys, heights, 0 overflow and 0 label clashes unchanged. Screenshots of all three panels reviewed.
- biome/tsc clean; build OK. Not committed.

## 2026-09-29 — Automation canvas: flickering scrollbar fixed
- Cause: the frame was `overflow-x-auto`, which computes to `auto/auto`, so vertical overflow was scrollable too. A reversed packet on the bottom fan-in leg slid its track to y≈542 of the 540-unit canvas once per pass. Stepping the 23 animations through 0–13s measured transient vertical overflow of 1–2px at 1500/1024, first at 1.0s.
- Fix (`automation-flow.tsx`): the graph canvas gets `overflow-hidden` (unrounded, per the animation rule), and the frame becomes `overflow-x-auto overflow-y-hidden`.
- Verified: the same time-stepped probe gives max overflow 0/0 at 1500 and 1024 with no transient. At 375 the intended sideways scroll (341px) is unchanged and constant. `worktabs.mjs`: 0 label clashes; tabs, keys and heights unchanged. Screenshot shows nothing clipped.
- biome/tsc clean; build OK. Not committed.

## 2026-09-29 — How we work: card shadows removed
- `flow-canvas.tsx`: removed the base card shadow and the "In progress" card's glow/ring (it keeps its `border-brand-200`). `workflow.tsx`: removed the step panel's drop shadow. The moving packet dot's glow is kept (not a card).
- Verified: biome/tsc clean; build OK. CDP: 0 visible elements with a box-shadow in the Workflow panel on all 5 tabs (Discover…Improve). Screenshot reviewed.
- Not committed.

## 2026-09-29 — Services card hover removed; Technology stars removed, AI icon swapped
- "What we do" = home Services (`services.tsx`). Removed the card hover (blue→indigo gradient fill, `group-hover` colour/ring changes, transitions) and the hover-only white duplicate icons and checks, leaving one gradient-stroke icon per slot (no longer absolutely stacked). The marquee's pause-on-hover (track, not cards) is kept.
- Technology (`integrations.tsx`): removed the two `Sparkles` flanking the footnote "Our technology choices are driven by the problem…"; the AI stack card icon `Sparkles` → `BrainCircuit`; unused `Sparkles` import removed.
- Verified:
  - biome/tsc clean; build OK.
  - CDP: a real-mouse hover leaves the Services card's computed background identical to rest.
  - The footnote has 0 svgs; the home HTML has `lucide-brain-circuit` and no `lucide-sparkles`.
  - Screenshot of the Technology cards and footnote reviewed.
- Not committed.

## 2026-09-29 — Featured project: stacked card, diagram touch-up
- `featured-project.tsx`:
  - the card's outer `grid lg:grid-cols-[22rem_1fr]` → `flex flex-col`: facts on top, diagram below at full width;
  - facts become `md:grid-cols-3` with dividers (stacking three full-width rows would leave dead space), CTA row beneath.
- Diagram (slight, brand-fitting):
  - dashed shared-data connectors grey → brand blue (`rgb(4 126 253 / 0.55)`, legend follows);
  - hub pill → ink with white text; outcome pill → brand-50/brand-200/brand-700;
  - 01–06 mono numbers in the step cards;
  - step arrows stay ink (no-blue-icons rule).
- Verified:
  - biome/tsc clean; build OK.
  - CDP at 1500/1024/768/375: info above diagram everywhere; facts in 3 columns from 768 (1 at 375).
  - The diagram fits without sideways scroll at 1500/1024 (scroll kept at ≤768 by design, since it needs 46rem); 0 page overflow.
  - Screenshots at 1500 and 375 reviewed.
- Not committed.

## 2026-09-29 — Seven page fixes (services, case studies, challenges, about, careers)
1. /services hero bottom: `PageHero` gained `padBottom`; services passes `pb-10 sm:pb-14` (stats → hero end 24 → 56px at desktop). Other pages unchanged.
2. Service lines → Engagement: ServiceDetails `py-16 sm:py-28` → `pt-16 pb-12 sm:pt-28 sm:pb-20` (gap 275 → 243px). The shared SplitSection is untouched.
3. /case-studies step numbers: the digits sat 3px low (the 11px mono inherited the list's 24px line-height inside a 20px circle). Added `leading-none tabular-nums`; measured offset now −0.5px.
4. /challenges hero record "Order #1042" → kicker "Live workspace", "Operations status", lines Approvals routed / Report sent Monday / 1 risk flagged; aria label updated.
5. /challenges gap table: "No." removed (empty column kept); header is a tinted row (`bg-zinc-50/80`, 12px semibold tracked labels, `rounded-t-2xl`); row icons sit in `size-10` tiles.
6. /about "At a glance": `Stats` now renders `HeroStats` with the new `tone="dark"` (white figures, zinc-400 labels, white/10 hairlines, count-up) and 4-up layout; the ink background stays. Found and fixed a figure misalignment when labels wrap to different line counts (`justify-end` with `flex-col-reverse`); this also protects the hero stats.
7. /careers hero: staircase → growth loop (Learn the stack → Pair with a lead → Build real systems → Ship to clients, "You at Infrantic" hub in the middle). Vertical runs sit at x = 10/90 so labels stay clear of lines.
- The first attempt at the edit script failed in a bash heredoc (unexpected EOF, nothing applied); it was re-run from a scratchpad .py file.
- Verified:
  - biome/tsc clean; build OK.
  - CDP (`seven.mjs`, `numbers.mjs`, `glance.mjs`): spacing/offset numbers above. About stats 0|0|0|0 before scroll → 5|5|6|1 in view, figures aligned per row at 1500/768/375, 0 overflow.
  - Screenshots of the numbers, gap table, glance, challenges and careers heroes reviewed.
- Not committed.

## 2026-09-29 — Favicon: Infrantic mark replaces the default Next/Vercel triangle
- New `src/app/icon.svg`: a 64×64 rounded tile (rx 15) with the site's hub gradient (#07a1fd → #047efd → #021c37) and the white "I" glyph taken verbatim from `/brand/logo-svg.svg` (the signal and stem paths, scaled to 44 units tall and centred), matching the BrandMark tiles.
- `src/app/favicon.ico` regenerated from that SVG: rendered in headless Edge at 256px on a transparent background, then Pillow-packed at 16/32/48/256.
- Verified: biome clean; build lists `/icon.svg`; home and /services `<head>` carry `rel="icon"` links for `/favicon.ico` (256x256) and `/icon.svg` (sizes any) with content hashes; both serve 200 (`image/x-icon` 19,270 B, `image/svg+xml` 880 B). Preview at 16/32/48/256 reviewed: legible at 16px, transparent corners.
- Not committed.

## 2026-09-29 — Pushed to main
- Before: local = origin/main at `437e698` (0/0); the earlier work was already committed upstream. Uncommitted were only the favicon (`favicon.ico` modified, `icon.svg` new) and this log.
- Gate: `bun run lint` (biome check, 136 files) clean; `tsc --noEmit` exit 0; `next build` OK.
- Committed `f910872` "Replace default favicon with the Infrantic mark" and pushed `437e698..f910872` to origin/main. Tree clean and 0/0 with origin afterwards. (This entry is local; it will ride with the next commit.)

## 2026-09-29 — Framer Motion page entry on every page
- Dependency (user-requested): `bun add framer-motion` → 13.4.5 (+ motion-dom, motion-utils). `package-lock.json` synced with `npm install --package-lock-only`; nothing removed, but it also filled in 6 optional Tailwind wasm entries the old lock lacked.
- `src/app/(marketing)/template.tsx` (client): `MotionConfig reducedMotion="user"` + `motion.div data-page-enter`, opacity 0→1 and y 14→0, 0.55s ease [0.22,1,0.36,1]. It remounts per navigation, so first load and client navigation both animate; the header and footer (layout) don't.
- Root layout: a `<noscript>` style forces `[data-page-enter]` visible without JS. `globals.css`: under reduced motion, `[data-page-enter]{transform:none!important}` (scoped biome-ignore), so there's no movement even on the SSR first frame.
- Verified:
  - `bun run lint` clean (137 files); tsc exit 0; build OK, all routes static.
  - CDP (`scratchpad/entry.mjs`), all 11 routes (home, services, products, 3 sectors, case-studies, challenges, about, careers, contact): one wrapper inside `<main>`, header outside, first frame `0|matrix(…,14)`, settled `1|none`, 0 overflow.
  - Client nav home→/products replays (opacity 0→…→1).
  - Reduced motion: fade only, no translate on any frame. JS disabled: opacity 1, transform none. Console: no errors or warnings.
  - `sticky.mjs`: the FAQ heading holds at 112px and releases at its column's end (unchanged).
  - `idle.mjs`: settled idle 9–12 ms/s (contact 0), 0 layouts: unchanged.

## 2026-09-29 — "Book a call" CTAs unified, links fixed, framer entry animations on every component
- **CTAs:**
  - every "Book a discovery call" label → "Book a call" (9 data files, including the FAQ prompt copy);
  - all booking CTAs at ButtonLink `md` (home hero, How we work, mobile nav; SplitSection/FeatureGrid section CTAs `sm` → `md`);
  - navbar at the new `lg` size (h-12, 16px);
  - in-card buttons stay `sm`.
- **Links:**
  - 6 Problem-card "Learn more" `/#services` → the matching product anchors (shared-record, approval-flow, operations-dashboard ×2, system-connector, document-review);
  - 4 What-we-build cards → `/services#systems-integrations|data-intelligence|ai-automation|custom-software`;
  - "View all services" and "Explore our services" → `/services`.
- **Animations:**
  - new `shared/ui/entry-animations.tsx` mounted in `(marketing)/template.tsx`: section containers rise and fade in, and inner elements stagger in batches as they enter (framer `animate`, WAAPI, one-shot, inline styles cleared);
  - skips CSS-animated subtrees and closed `<details>`; no-op under reduced motion; nothing hidden without JS;
  - removed the `.reveal` class (11 components) and its CSS rule/keyframes, since CSS animations would override framer's inline styles.
- **Bugs found and fixed:**
  - collapsed FAQ answers stayed hidden (they can't intersect while closed) → skip `details:not([open])`;
  - the footer copyright never revealed with a −8% bottom rootMargin → rootMargin 0.
- **Verified:**
  - biome clean; tsc 0; build OK.
  - CDP `ctaanim.mjs` on all 11 routes:
    - 0 elements left hidden after a full scroll;
    - below-fold elements hidden before scroll → opacity 1 with no inline style after;
    - 0 overflow; no console errors.
  - "Book a call": navbar 48px/16px ×11, page 44px/15px ×22, mobile menu 44px.
  - Links: 12 hash targets all exist; 13 internal paths all 200 except `/privacy` and `/terms` (pre-existing 404s, no legal pages).
  - Reduced motion: 0 hidden. JS off: only the pre-existing RingComet spans at opacity 0. Idle 15 ms/s, 0 layouts.
  - Reveal sequence screenshots (120/450/1400ms) show the stagger. The first capture was blank from my clip not adding scrollY, not the site.

## 2026-09-30 — Navbar "Book a call" reduced
- `site-header.tsx`: the navbar CTA `size="lg"` → default `md` (48px/16px → 44px/15px, the same as every other Book a call). The now-unused `lg` size was removed from `shared/ui/button-link.tsx`; the other `size="lg"` props in the repo are SectionHeading sizes, not buttons.
- Verified: lint (138 files) clean; tsc 0; build OK. CDP at 1024/1280/1500: CTA 113×44px, 15px; bar still 72px; nav one row. Screenshot reviewed.
- Not committed (the user didn't ask this time).

## 2026-09-30 — Navbar "Book a call" reduced again
- The user found 44px still too big for the navbar. `site-header.tsx`: navbar CTA → `size="sm"` (36px tall, 14px text, the original navbar size). Page-level Book a call CTAs stay `md` (44px).
- Verified: lint clean; tsc 0; build OK. CDP at 1024/1280/1500: CTA 100×36px, 14px; bar 72px; nav one row. Screenshot reviewed.
- Not committed.

## 2026-09-30 — Button labels trimmed to three words max
- The user wants every button label to be 2–3 words ("Book a call" and "Learn more" were already fine). Eight labels were over 3 words:
  - "See the products that fix these" → "View products"
  - "Talk through your workflow" → "Discuss your workflow"
  - "Discuss a similar project" ×2 → "Start a project"
  - "Talk about your outcomes" → "Discuss outcomes"
  - "See how we work" → "How we work"
  - "Discuss where to start" → "Get started"
  - "See what we build" → "See our work"
  - Links are unchanged.
- Verified:
  - lint clean; tsc 0; build OK.
  - CDP scan of every visible button-styled link and `<button>` (excluding tabs, the nav and the menu toggle) on all 11 pages: 19 distinct labels, none over 3 words. The first scan run garbled labels (a `\s` regex lost its backslash in the heredoc); rerun with a backslash-free split.
- Not committed.

## 2026-09-30 — Home hero: GSAP intro + parallax, Framer card spring
- Dependency (user asked for GSAP): `bun add gsap` → 3.15.0; package-lock synced (+7 lines). No `@gsap/react`: a scoped `gsap.matchMedia()` in `useLayoutEffect` with `mm.revert()` cleanup instead.
- `hero/components/hero-motion.tsx`: a GSAP timeline (eyebrow → headline word-by-word clip reveal, `expo.out`, 0.06 stagger → subtitle → CTAs, with clearProps after), plus a pointer parallax on the orbit badge list (`quickTo` x/y), under `(pointer: fine) and (prefers-reduced-motion: no-preference)`.
- `hero/components/hero-cards.tsx`: Framer Motion spring entrance (y 36, scale .96 → 1, delay .75s) + hover lift for the activity stack.
- `hero.tsx`: headline rendered as line/word spans (`HeadlineWords`) with a real space between lines; `data-hero`/`data-entry-skip`/`data-hero-*` hooks; the CSS `animate-rise` on eyebrow/h1/subtitle/CTA/cards removed (replaced).
- `orbit-backdrop.tsx`: `data-orbit-badges` on the badge list.
- `entry-animations.tsx`: skips sections with `data-entry-skip`.
- Verified (`scratchpad/heromotion.mjs` on `next start`):
  - intro frames go from words offset/cta 0/cards 0 to settled `none`/1/1; headline 2 lines, 0 clipped descenders; h1 text "Business is complex. Your systems shouldn't be." (the first run read "complex.Your"; fixed).
  - Parallax −10/−1px at the top-left and +10/+5px at the bottom-right, back to 0 on leave. The first run showed "none" because my pointer points were over the fixed header or below the viewport, not a code bug.
  - Reduced motion: no word translate, no parallax. JS off: all visible. No console errors. Idle after intro 39–49 ms/s, 0 layouts (home baseline was ~110). Settled screenshot identical to before.
- lint clean; tsc 0; build OK. Not committed.

## 2026-09-30 — Selected work: index numbers removed, two mock dashboards redesigned
- Removed the 01/02/03 index from the case tab cards (`work-tabs.tsx`; the spacing that only separated it from the title went too) and the badge in the case panel (`work.tsx`). The unused `number` was dropped from the tab type and mapping; the case data keeps it.
- `app-mocks.tsx` (Frame/Chip/ToolbarButton kept; still stretch-to-fill):
  - **ProofreaderMock:** an active review. A spec page ("4.2 Flange assembly") with numbered amber highlights matching a findings list: Mixed units (high), Unapproved term (medium), Missing reference (medium), Tolerance format (low), with page refs, "4 flagged · 18 passed", a reviewer progress bar "Awaiting sign-off", and a Sign off button.
  - **TaskBoardMock:** a Kanban with 4 columns × 2 cards; each card has a TSK id, title, role chip (Executor/Checker/Approver), due date, owner initials, and Overdue/Rework flags; Board/List/Timeline views and a "2 overdue" counter in the header.
  - Both `visualLabel`s in `work.data.ts` were rewritten to match.
- Verified:
  - lint clean; tsc 0; build OK.
  - Settled measurement at 1500/1024/375: tabs 16px above the panel, no tab starts with a number, and no number badge beside the case headings. (A first reading of "tabs not above" was the entry reveal still offsetting the tablist 18px; the "02"/"03" text hits were the new due dates.)
  - `worktabs.mjs`: keys, equal heights, 0 overflow, 0 label clashes. `panels.mjs`: 33/21px under the notes on all cases.
  - Screenshots of both dashboards at 1500 and the board at 375 reviewed. Due dates wrapped on phones; fixed with `whitespace-nowrap`. The old screenshot script predated the entry animations, so a new one scrolls first.
- Not committed.

## 2026-09-30 — Home Technology cards restyled to the stack-grid look
- Per the user's screenshot, the home Technology section's 5 chip cards (hover gradients, group icons) became one bordered panel split by hairlines: `grid gap-px` over `bg-zinc-200/80`, `sm:grid-cols-2 lg:grid-cols-4`, mono uppercase brand-700 labels, rows of a `size-8` ringed logo tile + name (a brand dot when there's no logo). Same markup pattern as the page-blocks StackShowcase, light variant.
- Data: 4 groups from the screenshot: Intelligence (OpenAI, Claude, Gemini, Agents and retrieval), Automation (n8n, Make, Zapier), Engineering (Next.js, Python, GitHub, Vercel), Data (Supabase, PostgreSQL, Google Sheets, Business APIs). Types are now `TechStackItem { name, logo? }`; `TechStackIcon`, the `stackIcons` map and 5 lucide imports removed. Orbit, heading and footnote untouched.
- Verified: lint clean; tsc 0; build OK. CDP: 4/2/1 columns at 1500/768/375, 0 overflow; tools and dots as in the screenshot. Screenshot at 1500 matches.
- Not committed.

## 2026-09-30 — Technology footnote removed
- Removed "Our technology choices are driven by the problem, not by a fixed stack." from the home Technology section: the whole callout box (gradient card with blurred blobs) in `integrations.tsx`, plus the `footnote` field in `integrations.data.ts` and `IntegrationsContent`.
- Verified: lint (140 files) clean; tsc 0; build OK. The home HTML contains the line 0 times. The stack grid is now the section's last child, ending 112px above the section edge (the section's own `sm:pb-28`). Screenshot shows the grid → next section with no empty box.
- Not committed.

## 2026-09-30 — "Learn more" hover: light stripe on the left edge fixed
- Cause (measured): the white onDark "Learn more" (home What we build) has `border border-transparent`; on hover `bg-brand-gradient` painted with the default `background-origin: padding-box` (clip border-box, repeat), so the 1px border strip showed the gradient's END colour rgb(7,161,253) before it started at rgb(4,126,253). That was the light, jagged line. The Problem-card "Learn more" has no border and was clean.
- Fix: `background-origin: border-box` inside `@utility bg-brand-gradient` (globals.css), which covers every gradient-on-bordered-element case site-wide, including the `group-hover/card` variants.
- Verified: lint clean; build OK. CDP at DPR 2 with a real hover, sampling the left-edge device pixels: before (7,161,253)×2 then (4,126,253); after (4,126,253) from the first pixel. Problem button unchanged. Enlarged before/after crop reviewed.
- Not committed.

## 2026-09-30 — Index numbers removed from cards (timelines keep theirs)
- Removed the 01/02… index from item cards: home services marquee cards (`services.tsx`), /services service rows (`service-details.tsx`, heading `mt-3` dropped with it), /products cards (`product-catalog.tsx`, unused `index` param removed), /case-studies write-up cards (`case-list.tsx`, the sector chip stays), and the home featured-project facts (`featured-project.tsx`, number circles removed, key → `fact.label`).
- Kept, as timelines / ordered step flows: `Steps` block, contact "What happens next", workflow "Step 01" pills, featured-case 6-stage flow, featured-project 6-step diagram, case-list "What we built" step circles.
- The now-unused `number` fields in services / case-studies / featured-project data and types were left in place (minimal diff).
- Verified: lint (140 files) clean; tsc 0; build OK. Prerendered HTML: `/services` and `/about` have 0 standalone `>0N<` nodes; every remaining hit is a Steps circle, the featured-case stage or the featured-project diagram (checked by class). Screenshots at 1440 of a home service card, the facts row, a /services row, a product card and a case card: none show a number and the layout is unchanged.
- Not committed.

## 2026-09-30 — Stat rows: numbers only, refined
- Rule (user): the big-figure stat design (`HeroStats`, used by `PageHero` stats and the `Stats` block) shows numerals only, never words. Now enforced by the type: `Stat.value` is `` `${number}${string}` `` (a tsc probe with "Yours" fails with TS2322).
- Word values replaced by honest figures, labels reworded to match:
  - /products: Yours → **0** "Existing tools you have to replace".
  - /services: Yours → **0** "Tools you have to replace".
  - Healthcare: Yours → **0** "Existing systems you have to replace"; Human → **100%** "Clinical decisions signed off by a person".
  - Tech product companies: Your stack → **0** "New platforms your team has to adopt"; Handover → **100%** "Documented so your team can own it".
  - Marketing: Instant → **24/7** "Lead routing from form to owner"; Yours → **0** "Existing tools you have to replace".
- Refinement (awesome-design-md, `stripe` spec: light display weights, negative tracking, `tnum` on numerics, restrained accent): figures 600 → 400, tracking -0.045em → -0.02em (-0.05 and -0.03 made the zeros in "100" touch), `lg:text-[4.25rem]`, a 32px brand-gradient hairline under each figure, and an invisible final-value sizer so the count-up doesn't shift width. Weight 300 was tried first and looked too thin next to the labels, so it was dropped.
- Verified: lint (140 files) clean; tsc 0; build OK. CDP across all 10 stat rows (8 pages) at 1500 and 375: every value starts with a digit, the counted value equals the final value, weight 400, 68px / 48px, 0 horizontal overflow. Screenshots of /services, healthcare, marketing and About (dark) reviewed.
- Not committed.

## 2026-09-30 — Site-wide Cohere polish pass (awesome-design-md)
- User chose the `cohere` spec and a **polish pass** (system level; layouts, content and animations untouched). Brand blue, gradient and ink kept (project identity wins over the spec).
- Changes:
  - Headings: 600 → 500 on `SectionHeading`, page-hero / contact / home-hero h1s, the CTA band h2, the FAQ summaries, and 14 card/panel headings. Display tracking eased to -0.03em / -0.035em to suit the lighter weight.
  - Eyebrows: mono uppercase labels (`font-mono text-[13px] tracking-[0.08em] uppercase`) in `BlockHeading`, 7 home sections, and the 2 contact sub-labels.
  - CTAs: `rounded-full` pills (ButtonLink, with sm px-4 / md px-5, plus the contact submit and reset buttons).
  - Flat cards: Problem cards lost `shadow-sm`, the blue hover glow and the white→blue tint (hover lift and border kept); icon tile flattened; contact form card shadow removed.
- Specialists: awesome-design-md (`cohere.md`); inline, no subagents.
- Verified: lint clean; tsc 0; build OK. CDP across 9 pages at 1500 and 375: every CTA radius is a pill (one computed value), every h1/h2 is 500, section eyebrows are mono (only the intended hero/CTA pill chips are sans), 0 horizontal overflow. Screenshots reviewed: home hero, Problem, Selected work, /services hero, /products catalogue, /contact.
- Not committed.

## 2026-09-30 — Buttons: pills → Vercel 6px radius
- User: buttons must not be `rounded-full`; use Vercel's button radius. Applied the Vercel spec's base `--geist-radius` 6px (`rounded-md`) to `ButtonLink` and the contact submit and reset buttons, and restored the pre-pill padding (sm px-3.5, md px-4.5; reset px-4.5). The awesome-design-md vercel.md lists 100px pills for marketing CTAs and 6px for in-app buttons; the user explicitly ruled out pills, so 6px it is.
- Verified: lint clean; tsc 0; build OK. CDP on /, /services, /products, /about and /contact at 1500 and 375: every button's computed radius is `6px` (one value), 0 overflow. Screenshots of the home hero and /contact reviewed.
- Not committed.

## 2026-09-30 — "Discuss …" button labels reworded
- User: replace the button labels containing "Discuss".
  - /products cards: "Discuss this product" → **"Enquire now"**.
  - /services rows: "Discuss this" → **"Enquire now"**.
  - /case-studies CTA: "Discuss outcomes" → **"Enquire now"**. "Get in touch" was tried first but is already the footer column title.
  - /challenges CTA: "Discuss your workflow" → **"Share your workflow"**.
- Data-only change (4 `*.data.ts` files); the `discussLabel` prop name in service-details was left as is (minimal diff). The per-card buttons keep their name-bearing aria-labels ("Enquire now: AI Automation").
- Verified: lint clean; tsc 0; build OK. Prerendered HTML of all 11 pages: 0 "Discuss…" button texts; "Enquire now" ×5 on /services, ×6 on /products (includes the page's other occurrences), ×1 on /case-studies; "Share your workflow" ×1 on /challenges.
- Not committed.

## 2026-09-30 — Hero stat symbols (+ / %)
- User asked for symbols in the stats below the page heroes. After being asked, they chose "+ on the counts too" (accepting that "5+ service lines" overstates exact counts).
- Changes (data only):
  - Counts above 1 gained "+": /services 5+, /about 5+ and 3+, /case-studies 3+ and 6+, /challenges 6+, /products 6+.
  - The "0 … to replace" stats were reworded as "100% … kept / stay in use" (services, challenges, products, healthcare, marketing).
  - Tech product companies: "0 sprints" → "100% of your sprints stay on the product roadmap"; "0 new platforms" → "100% built on the tools you already run". The row now reads 100 / 100 / 100%.
  - "1 …" stats stay plain ("1+ team" would contradict "one team"). The About "At a glance" dark row (not a hero) still shows "5 service lines", which the /services hero now shows as "5+".
- Suffixes render through the existing HeroStats suffix path (brand-gradient text, count-up on the number).
- Verified: lint clean; tsc 0; build OK. CDP on all 10 stat rows at 1500 and 375: shown values equal the finals (e.g. "6+ | 100% | 1"), 0 overflow. Screenshots of /products and the tech sector reviewed.
- Not committed.

## 2026-09-30 — Inner-page hero buttons: "Book a call" + "View products"
- User chose "all inner pages". The hero second button is now "View products" → /products on /about (was "Work with us"), /case-studies ("See our products"), /services ("See case studies"), /careers ("See our work") and the 3 sector pages ("See our products"). /challenges already had it.
- Exceptions (stated when asking): /products keeps "See case studies" (it can't link to itself); /careers keeps "Introduce yourself" as its primary. Home hero unchanged ("Book a call" + "How we work").
- Sectors: added `heroProductsCta` for the 3 heroes; the shared `productsCta` ("See our products") still drives the "What we build" section buttons, which were not in scope.
- Verified: lint clean; tsc 0; build OK. Built HTML: the first two links after each h1 read "Book a call → /contact | View products → /products" on all 8 inner pages in scope; /products and home as above; "See our products" still once on each sector page (section CTA). Data-only change inside the existing PageHero, so no layout re-check.
- Not committed.

## 2026-09-30 — Careers Open roles: "Send an introduction" button removed
- Removed the `onDark` sm ButtonLink beside the Open roles heading (`careers/components/open-roles.tsx`) along with its flex wrapper and the ButtonLink import; the heading now stands alone. `introduceCta` stays: its `href` is still every role row's Apply target (documented on the prop). Its "Send an introduction" label in `careers.data.ts` is now unused but left in place (minimal diff). The hero's "Introduce yourself" is unaffected.
- Verified: lint clean; tsc 0; build OK. Built /careers: "Send an introduction" appears 0 times; role rows still link to /contact with "Apply: <role>" aria-labels.
- Not committed.

## 2026-09-30 — Pointer cursor everywhere + footer credit
- Cursor: Tailwind v4's preflight sets buttons to `cursor: default`. Added one `@layer base` rule in `globals.css` (enabled `button`, `[role=button]`, `[role=tab]`, `summary`, `select`, checkbox/radio labels → `pointer`). It covers the work and workflow tabs, the nav dropdown and mobile-menu toggles, and the contact submit and reset, and future buttons automatically. The pending submit keeps its `cursor-wait` utility (utilities beat base).
- Footer: the bottom bar is now a flex row: "© {year} Infrantic. All rights reserved." left, "Made with love by Softexedge" right (stacked on phones). "Softexedge" links to https://softexedge.com (the domain SoftexEdge's own site code uses for its email) with `target=_blank rel="noopener noreferrer"`; the spelling follows that codebase.
- Verified: lint clean; tsc 0; build OK. CDP on 9 pages at 1500 and 375: every `a[href]`, button, tab, summary and chip label (58–88 per page) computes `cursor: pointer`, 0 exceptions; the credit is on every page and links to softexedge.com in a new tab; 0 overflow. Footer screenshots at 1500 and 375 reviewed.
- Not committed.

## 2026-09-30 — Hero pills rewritten (no more page names)
- The pill above each inner-page h1 (`PageHero` eyebrow, and the contact intro) said only the page name. Each now carries a short line drawn from that page's own copy:
  - /about "One team, first call to support"; /careers "Small team, real client problems".
  - /case-studies "Proof from client work"; /challenges "The work between the tools".
  - /contact "Rough notes are fine"; /products "Six ready starting points"; /services "Five service lines, one team".
  - Healthcare "For clinics, labs, and pharmacies"; Tech "For product and engineering teams"; Marketing "For agencies and marketing teams".
- Unchanged: the home hero pill ("AI. Automation. Software.", already descriptive) and the "Case studies" section eyebrow lower on that page (not a hero). Eyebrows are display-only (no metadata or breadcrumb use).
- Verified: lint clean; tsc 0; build OK. CDP on all 10 pages at 1500 and 375: the pill before each h1 shows the new text, one line, 159–254px wide, 0 overflow. Healthcare hero screenshot reviewed.
- Not committed.

## 2026-09-30 — Home hero refinement (taste-skill + awesome-design-md cohere)
- Design read: preserve-mode refresh of a B2B services hero; dials variance 5 / motion 5 / density 3. Audit against taste-skill hard rules (hero stack ≤4, subtext ≤20 words, 2-line headline, CTA above the fold, no wrap) and the Cohere spec already guiding the site.
- Changes (`hero/components/hero.tsx` only):
  - Headline `sm` 2.75 → 3rem and `lg` 3.1 → 3.5rem (49.6 → 56px), leading 1 → 1.02; phones stay 2.2rem, since line 2 already wraps there.
  - Every line but the last is `text-zinc-500` (4.8:1), so "Your systems shouldn't be." leads in ink (hierarchy by colour, not scale).
  - Subtext `sm:text-[17px]` / 1.5 in a 34rem measure, mt-6.
  - Secondary CTA "How we work" gains a lucide ArrowRight that nudges on hover (reduced-motion safe).
- Kept: copy (subtext is 18 words, within the limit), pill, orbit, badges, activity cards, marquee, and the GSAP word reveal (per-line spans unchanged).
- Verified: lint clean; tsc 0; build OK. CDP before/after at 1500×900, 1280×720 and 375×812: h1 56px on 2 lines (1 + 2 on phones, unchanged), CTAs bottom at 493px (inside 720), no CTA wrap, 0 overflow. Before/after screenshots compared.
- Not committed.

## 2026-09-30 — Inner-page heroes fill the first screen
- User: inner-page heroes should be full-screen, with nothing from below visible on load (their screenshot showed the /about stat row peeking at the bottom).
- `PageHero`: the section lost its `pt-32 sm:pt-44`. The copy + visual grid is now `min-h-[100dvh] content-center items-center` with the header clearance inside it (`pt-28 pb-12 sm:pt-32 sm:pb-16`), so the stat row (or the next section on stat-less pages) starts below the fold. `min-h-[100dvh]`, not `h-screen`: it grows rather than clipping on short or stacked layouts, and doesn't jump with the mobile URL bar. `content-center` keeps the stacked tablet rows together. Covers all 9 PageHero pages. Home and /contact (form hero) unchanged.
- Verified: lint clean; tsc 0; build OK. CDP on 9 pages × 1440×820, 1280×720, 1920×1080, 768×1024 and 375×812 (45/45 OK): content below the hero starts at or after the fold, pill below the header, CTAs inside the viewport, 0 overflow. At 768×1024 the stacked hero is 1024–1085px, so it grows past the fold. Screenshots of /about (1440) and /services (375) reviewed.
- Not committed.

## 2026-09-30 — Glow cursor (user's GlowCursor, rationed placement)
- Dependency: `ogl` ^1.0.11 (user approved when asked); package.json, bun.lock and package-lock.json updated.
- New `src/shared/ui/glow-cursor.tsx` (client): the user's GlowCursor shader, props and trail physics kept, adapted into a section background layer (canvas `absolute inset-0 -z-10`, pointer listeners on the parent) instead of a content wrapper, so sections needed no restructuring. Additions:
  - no-op on touch-only devices and for reduced motion;
  - lazy WebGL (created on first hover);
  - rAF loop sleeps when off-screen (IntersectionObserver) or after the fade;
  - leaving the section always fades (the user's `idleFade={false}` still keeps the glow while resting inside);
  - context released on unmount;
  - shader `break` past the active points (16 of 64, ~4× less per-pixel work, same output).
  - `BrandGlow` holds the user's exact settings: dark = screen blend; light = normal blend at 0.55 opacity (screen is invisible on white).
- Placement (taste-skill: a rationed accent): home hero, home What we build, `CtaBand` (every page gets one glow moment), About "At a glance" (`Stats`), Careers "Open roles". Home: 3 of ~10 sections; inner pages: 1–2.
- Biome: `<canvas>` counts as focusable, so `aria-hidden` carries a justified `biome-ignore`.
- Verified: lint clean; tsc 0; build OK.
  - CDP (headless Edge, Intel Iris Xe via ANGLE/D3D11): hero at 1440×1009 canvas holds 60 fps / 17 ms worst frame while the trail moves (baseline 61/18).
  - Glow rAF lifecycle: 0/s before hover → 62 moving → 44 in the fade second → 0 asleep → wakes on move.
  - Canvases stay 300px (uninitialised) until hovered; touch and reduced-motion never initialise.
  - Screenshots of the trail in the hero, What we build and the CTA band reviewed. The swiftshader run showed the hero CTAs mid-fade; that is a software-GL stall on first hover, and they read 1/1 opacity once settled.
- Not committed.

## 2026-09-30 — Glow cursor moved to white sections only
- User: the effect belongs on white sections only. Removed `BrandGlow` (and the `relative isolate` it needed) from the three ink sections: home What we build, About At a glance (`Stats`), Careers Open roles.
- To keep the balance, re-homed on light sections: home "Our technology" (`integrations.tsx`, section gains `relative isolate`) and the inner-page hero (`PageHero`, section gains `isolate`), both `tone="light"`. Hero and `CtaBand` placements kept.
- Result: home 3 of ~10 sections (hero, Our technology, CTA band); every PageHero page 2 (hero, CTA band); /contact none (no PageHero or CtaBand).
- Verified: lint clean; tsc 0; build OK. CDP on 9 pages: every glow canvas sits in a light section with `mix-blend-mode: normal`, none in an ink section. Trail screenshots (real GPU, Iris Xe) of home Our technology and the /about hero reviewed.
- Not committed.

## 2026-09-30 — Glow cursor removed
- User: remove the effect. Deleted `src/shared/ui/glow-cursor.tsx`, removed `BrandGlow` from the home hero, Our technology, `PageHero` and `CtaBand`, dropped the `isolate` classes added only for it (integrations, PageHero), and removed the `ogl` dependency (package.json, bun.lock, package-lock.json). The map entry was removed. Kept: full-screen inner heroes and the footer "Made with ❤️" edit.
- Verified: `git diff 3e3dbf5` (pre-glow) over src + package files differs only in the PageHero full-screen change and the footer line. Lint clean; tsc 0; build OK. 0 `<canvas>` in prerendered HTML and 0 shader strings in `.next/static`.
