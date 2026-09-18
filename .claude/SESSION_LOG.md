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
