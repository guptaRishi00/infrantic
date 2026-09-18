# Infrantic — Codebase Map
_Last updated: 2026-09-17_

> Legend: **[v]** confirmed against the filesystem/git on 2026-09-16. **[?]** inferred — check before relying on it.

## Identity
- Marketing site for **Infrantic, an AI, automation and custom-software company** ("AI & Automation Systems for Modern Businesses"). One-page home built from the company brief (2026-09-17): hero → problem → selected work → how we work → services → technology → what we build → featured project → FAQ → contact band → footer. **[v]**
- Name `infrantic` (package.json). What the product actually is: **[?] unknown** — see Open questions.
- Next.js **16.3.5** App Router, React **19.2.8**, TypeScript (strict), Tailwind CSS **v4**, React Compiler on (`reactCompiler: true`). **[v]**
- Git repo, branch `master`, **no remote**, one commit `40fe870` "Initial commit from Create Next App" (2026-09-16, guptaRishi00). All landing-page work is uncommitted. **[v]**

## Stack & build
- Package manager: **Bun 1.2.16** (`packageManager` field, `bun.lock`). No `package-lock.json`. **[v]**
- Lint/format: **Biome 2.4.2** (`biome.json`: recommended rules + `next` and `react` domains, Tailwind directives parsing on, organize-imports on, 2-space indent). No ESLint, no Prettier. **[v]**
- Styling: Tailwind v4 CSS-first — `@import "tailwindcss"` + `@theme inline` in `src/app/globals.css`; **no `tailwind.config.js`**. PostCSS via `@tailwindcss/postcss`. **[v]**
- Path alias `@/*` → `./src/*`. **[v]**
- Fonts: Geist + Geist Mono via `next/font/google` (fetched at build time — needs network). **[v]**
- No env vars, no `.env*` files (and `.env*` is gitignored). **[v]**
- `/` is statically prerendered (`○` in `next build`). No route reads request-time APIs, and `cacheComponents` is off. **[v]**

## Commands
| Action | Command |
|---|---|
| Run dev | `bun run dev` → http://localhost:3000 |
| Run all tests | — none (no test runner installed) |
| Run one test | — |
| Lint | `bun run lint` (`biome check`) |
| Format | `bun run format` (`biome format --write`) |
| Typecheck | `bunx tsc --noEmit` (no script for it) |
| Build | `bun run build` |

## Bootstrap flow
`src/app/layout.tsx` (root: fonts, metadata from `siteConfig`, `<html>/<body>`) → `src/app/(marketing)/layout.tsx` (`SiteHeader` + `<main>` + `SiteFooter`) → `src/app/(marketing)/page.tsx` (`/`: composes 8 sections, each `<Section content={getXContent()} />`).

## Directory layout
- `src/app/` — routing only: root `layout.tsx`, `globals.css` (theme + keyframes), `favicon.ico`; `(marketing)/` route group holds public pages and their shared layout
- `src/features/<feature>/` — feature code. Each feature has an `index.ts` public API; import from that, never from its internals
  - `site-header/` — `navigation.ts` (typed nav data, `NavLink` type), `components/site-header.tsx` (server), `nav-dropdown.tsx` + `mobile-nav.tsx` (client)
  - `site-footer/` — `footer-navigation.ts` (columns, socials), `components/site-footer.tsx`
  - `marketing/<section>/` — `hero`, `what-we-build` (Sudeep, merged 2026-09-18; restyled to house style the same day, then made an **ink section** per user: `bg-ink`, 88rem, dark heading with a white (secondary) "View all services" ButtonLink, 2×2 grid with white/10 dividers and translucent white icon tiles and gradient "Learn more" links → `/#services`), `featured-project` (white section: eyebrow + title, bordered card with 3 numbered facts and a "Discuss a similar project" CTA on the left, and on the right a graph-paper "connected operating structure" diagram. Hub box → dashed bus → 6 numbered steps as a real `<ol>` with ArrowRight between them → shared-visibility box, plus a legend. CSS-gradient dashes, no SVG, marching via `animate-flow-x/y` with the bus split into two halves flowing outward from the hub; the legend sample stays still; the canvas scrolls sideways under 46rem), `problem` (label, title, 6 "operational gap" cards: icon, symptom, impact, Learn more → `/#services`), `services`, `workflow` (How we work, 5 steps; StepPanel `rounded-2xl`/`rounded-xl`; `flow-canvas` cards show a status pill, active cards ping and run an indeterminate `animate-progress` bar, every connector marches in its flow direction: brand-300 dashes (done), brand dashes plus a packet (active), slower grey dashes (todo), cards rise in staggered), `work` (Selected work, ink section: client `work-tabs` (vertical tabs on lg, horizontal scroller on mobile; panels stacked in one grid cell so height never jumps) + 3 case panels; `automation-flow` is a CSS-only animated n8n-style graph on a 1000×540 design grid (`--u` = `100cqw/1000` inside an `@container` that is 88% of the frame, centred; dark tiles, "AI AGENT" card with Chat Model/Memory/Tool ports; connectors = straight legs with marching dashes + packets and quarter-circle dashed-border corners, CSS-triangle arrowheads); `app-mocks` has the proofreader and task-board mock UIs; no "View project"/CTA buttons by request), `integrations` (Technology: orbit diagram + stack groups), `faq` (native `<details name="faq">` accordion, exclusive where supported, no client JS; sticky heading on lg; replaced `approach` 2026-09-18), `cta` (contact band: light-blue gradient with 5 concentric `brand-200` rings, each carrying two mirrored comets on `animate-comet` like the hero, radial-masked sideways and wrapped in a vertical linear mask (transparent → #000 20%…80% → transparent), with the band background starting and ending in white so it fades in and out; floating logo badges removed 2026-09-18). Each has `*.types.ts`, `*.data.ts` (`get*Content()`), `components/`, `index.ts`. **Removed 2026-09-17:** `use-cases`, `testimonials`, `pricing`; the brief has no testimonials or pricing, so none are invented.
  - **Client components (all of them):** `nav-dropdown` (opens on mouse hover with a 150ms close grace; touch and keyboard click-toggle; panel uses `pt-7` padding so it sits 10px below the 72px bar and the gap stays hoverable), `mobile-nav`, `auto-hide-header` (hides the fixed header on scroll down and shows it on scroll up; 8px direction threshold, only after 120px; not while any `[aria-expanded=true]` menu is open; focus-within reveals it), `workflow/components/workflow-tabs`, `work/components/work-tabs`
- `src/shared/` — feature-agnostic code: `ui/` (`button-link`, `brand-logo` (real logo: header + footer), `brand-mark` (placeholder shape still used in the integrations tile), `new-badge`, `section-heading` (optional `titleWidth`, default `max-w-[20ch]`; Problem uses 34ch), `integration-logo` + `IntegrationId`), `lib/cn.ts`, `types.ts` (`Cta`)
- `src/config/site.ts` — brand name + description
- `public/brand/logo-svg.svg` — **the master INFRANTIC wordmark** (1278×168, navy `#021C38` + blue gradients), rendered only through `shared/ui/brand-logo.tsx` (`next/image`, SVG served unoptimized automatically). Put further static assets in `public/brand/` and `public/images/`
- root — `next.config.ts`, `biome.json`, `tsconfig.json`, `postcss.config.mjs`, `AGENTS.md`, `CLAUDE.md`

## Surfaces
| Name | Type | File:Line | Auth/Cap | Purpose |
|---|---|---|---|---|
| `/` | Page (Server, static) | `src/app/(marketing)/page.tsx:18` | public | Home. In-page anchors used by nav/footer: `#problem`, `#services`, `#workflow`, `#industries` (hero marquee), `#work`, `#technology`, `#faq`, `#contact` (CTA band) |
| (marketing) layout | Layout | `src/app/(marketing)/layout.tsx:6` | public | Fixed floating header + footer |
| root layout | Layout | `src/app/layout.tsx:25` | public | Fonts, metadata (`title.template` = `%s · Infrantic`) |

Nearly all links are in-page anchors. Routes that **don't exist yet** (404): `/contact` (the CTA band's primary button), `/privacy`, `/terms`. Social links are placeholder homepages.

No API routes, route handlers, middleware/proxy, server actions, or jobs exist.

## Data
No database or CMS. Content is typed static data behind a getter (`hero.data.ts` → `getHeroContent()`). Every section works the same way: a `get*Content()` in its `*.data.ts`. To move content to a CMS, change only those function bodies and add caching there. All copy comes from the company brief. Hero activity cards and benefit mockup numbers (Invoice #1042, PO #418, 1,284 tasks) are illustrative UI, not claims.

## Assets
No image assets. **Icons come from `react-icons` and `lucide-react` (added 2026-09-17 at the user's request). Do not hand-write icon SVGs in the hero.** Integration logos (`shared/ui/integration-logo.tsx`) map an id to a react-icons component plus brand colour; trusted-by uses Simple Icons (Coinbase from Tabler) with the name text; ratings use `FcGoogle`/`SiTrustpilot`; activity cards use lucide `Check`/`EllipsisVertical` and `SiGmail`. Several `Si*` icons are wordmarks that turn illegible at badge size (Zapier, Typeform, Coinbase), so use `TbBrand*` or pick another brand., avatars and the testimonial "portrait" tile are initials, and product mockups (benefit visuals, flow canvas, use-case art) are hand-built HTML/SVG. Replace them with licensed assets before launch.

## External services
None.

## Conventions
- **Section width:** all content containers (Problem, Services heading, Workflow, Selected work, Technology, FAQ, footer) use **`max-w-[88rem]`** (widened from 84rem on 2026-09-18, Problem first and then everything, per user); the hero keeps its own narrower text column. Section eyebrows are a `text-sm font-medium text-brand-700` `<p>` above `SectionHeading` (`text-brand-300` on ink).
- **Section rhythm:** every page section (hero bottom, all `main > section`, footer top) uses **`py-24 sm:py-28`** vertical padding (**exceptions: Technology uses `pt-16 sm:pt-20` and FAQ `pt-12 sm:pt-16`, so Featured project → FAQ is 144/176px (user, 2026-09-18); user request 2026-09-18: Problem has no top padding, so hero → Problem is the hero bottom padding alone, 96/112px**), so any two adjacent blocks are 192px apart on phones and 224px from `sm` up (measured). New sections must use the same padding; don't add margins between sections.
- **Brand palette (2026-09-17): white, `brand` #0796fe, `ink` #021c37**; **the blue is drawn as a gradient #047EFD→#07A1FD (user, 2026-09-18)**: tokens `brand-from`/`brand-to` plus the `@utility bg-brand-gradient` in globals.css for every blue fill (buttons, dots, badges); blue→ink tiles start `#07a1fd,#047efd_30%`; comets fade #07a1fd→#047efd; flat `brand` only for borders and rings; defined as `@theme` tokens in `globals.css` with derived `brand-50/100/200/300/700` and `ink-700/800`. Use `text-brand-700` for small blue text (#0796fe on white is too low-contrast), `bg-ink`/`text-ink` for dark surfaces and headings (**primary buttons are pure black `bg-black`, not ink**, per the user on 2026-09-17; **button hovers use the brand blue** (2026-09-18): primary `hover:bg-brand-gradient`, secondary and muted `hover:bg-brand-50 hover:border-brand-200`), and brand→ink gradients for brand tiles and cards. **No violet/indigo/purple.** **Icons are never brand blue** (user rule, 2026-09-17; **exception, user 2026-09-18: in Services the card icons and capability checks are stroked with the brand gradient**: no tile; `stroke="url(#services-icon-gradient)"` pointing at one hidden `<linearGradient>` (`BrandIconGradient`, `userSpaceOnUse` 0,0→24,24 so zero-width straight lines still paint; stop colours via `style` because SVG attributes can't read CSS vars). It is a colour definition only; the icons are still lucide): generic icons use dark grey (`zinc-800`, `#27272a`) or ink, and brand/product logos keep their original colours. Blue stays for text accents, surfaces and gradients. Greys (`zinc-*` except 900/950) stay for secondary text, borders and surfaces; emerald/amber only as status colours in mockups.
- Server Components by default; `"use client"` only for interactive islands, which receive plain serializable props.
- **Client islands keep server-rendered content.** `WorkflowTabs` takes `panels: ReactNode[]` built on the server (all panels stay in the HTML, inactive ones `hidden`).
- Services is an **ink section**: heading in the same `max-w-[88rem]` container as Problem; the infinite CSS marquee sits **outside** it, edge to edge (`-mx-4`, no edge fade): two copies, -50% loop, `animationDuration: 60s` inline, per-card `pr-4` (never `gap`), pause on hover, edge mask; reduced motion gives one manually scrollable row. The duplicate list is `aria-hidden` and omits heading ids. `SectionHeading` takes `tone="dark"` for ink backgrounds.
- Cross-feature imports go through shared code. Features don't import each other, except the footer reusing `NavLink` from `site-header/navigation`.
- Section headings use `SectionHeading` (`id` feeds `aria-labelledby`).
- Presentational components take content via props; data comes from a `get*()` in the feature's `*.data.ts`, called by the route's `page.tsx`.
- Content types live in `*.types.ts`. Data is `as const satisfies Type`.
- Animation is CSS-only: `animate-rise`, `animate-marquee` (40s, translateX -50%), `animate-row-cycle` (12s), `animate-comet` (26s, two hero comets per ring, mirrored in sync; `--comet-turn` ±180deg picks the side) tokens in `globals.css`, always behind `motion-safe:`.
- Decorative SVGs carry `aria-hidden="true"` (Biome `noSvgWithoutTitle` requires it).
- `cn()` from `@/shared/lib/cn` (no clsx/tailwind-merge: later classes don't override earlier ones, so avoid conflicting utilities).
- Biome formatting (2-space, double quotes), TS strict, `@/` imports. Root layout uses the `LayoutProps<"/">` global. The group layout uses `Readonly<{ children: ReactNode }>`.

## Where to add a <thing>
- **Marketing page:** `src/app/(marketing)/<route>/page.tsx` (gets the header and footer automatically)
- **Home section:** new `src/features/marketing/<section>/` folder, then add `<Section content={get…()} />` in `src/app/(marketing)/page.tsx`
- **Service:** `services` in `services.data.ts` (+ `serviceLinks` in `site-header/navigation.ts`, which feeds the nav dropdown and footer)
- **Integration logo:** add the id to `IntegrationId` and a `{ Icon, color }` entry (react-icons) in `logos` in `src/shared/ui/integration-logo.tsx`
- **Different chrome (app/auth):** a new route group, e.g. `src/app/(app)/layout.tsx`
- **Page section:** `src/features/marketing/<section>/` with `index.ts`, `*.types.ts`, `*.data.ts`, `components/`
- **Nav link:** `primaryNav` in `src/features/site-header/navigation.ts`
- **Route handler:** `src/app/<route>/route.ts` — read `node_modules/next/dist/docs/01-app/` first (Next 16 APIs differ from training data)
- **Design tokens:** `@theme` block in `src/app/globals.css`

## Risks & gotchas
- **Next 16 ≠ training data.** `AGENTS.md` (auto-written by `next dev`) says to read `node_modules/next/dist/docs/` before writing code. `CLAUDE.md` is just `@AGENTS.md`. `next dev` re-adds that block if removed — don't fight it.
- **Hero activity stack** (`activity-stack.tsx`, data `activity` in `hero.data.ts`, `Activity` union joined/profile/email): three **stationary** cards at stepped widths (100/88/72%, `-mt-1.5` overlap, the back card faded and masked). The animation rotates the **content**, not the cards: each card holds all 3 rows grid-stacked, and `row-cycle` (12s) shows one row per third with a 0.4s cross-fade, so each notification steps up a card every 4s. Per-row delay is `-((slot-row) mod 3) × 4s`, set **inline** because the `animate-*` shorthand resets utility delays. Non-own rows are `opacity-0` + `aria-hidden`, so under reduced motion each card shows its own row. Never animate card width or position: the user rejected both. Because every row passes through the 72% card, the stack wrapper in `hero.tsx` is `max-w-[25.5rem]` so the longest row (the Wei Chen line, 268px + padding) fits there untruncated. Re-measure if the copy gets longer. Rows are `min-w-0`, so on phones they truncate instead of being clipped.
- **Industries marquee** (`hero/components/industries-marquee.tsx`, lucide icons, `id="industries"`; replaced the fake customer-logo row and fake ratings on 2026-09-17): the logo list is rendered twice (the second copy `aria-hidden`) in a `w-max` track animated -50%. Spacing is per-item `px-8/sm:px-10`, never flex `gap`, which would break the seamless loop. `-mx-4` cancels the section `px-4` so it runs edge to edge, with masked fade edges; it pauses on hover. Reduced motion: the duplicate is hidden and the row wraps centred.
- **Marquee fade:** a `-z-10` gradient div (transparent → white at 55%) inside the marquee wrapper in `hero.tsx` paints over the rings (same z, later DOM order) and under the logos. It bleeds `-inset-x-4` and down to the section bottom (`-bottom-24 sm:-bottom-28`, which must equal the hero's `pb-24 sm:pb-28`). Keep it `-z-10`, because a higher z would cover the logos.
- **Orbit stacking:** `OrbitBackdrop` uses `-z-10` against the hero `<section className="isolate">`. The cards are pushed down with `pt-6` on the inner animate div, not margin on the wrapper, because the wrapper top is the orbit anchor. Never put transform/opacity/animation on its wrapper div in `hero.tsx`: that creates a local stacking context and paints the rings **over** the headline.
- Orbit rings: 6 radii in `RING_RADII` (650→1450; the 510 innermost ring was removed 2026-09-18) inside a 3000 design-px SVG (`VIEWBOX` and the `size-[calc(var(--orbit-scale)*3000px)]` class must match). The mask fades out from 70%.
- Hero integration badges sit **on** the rings: data is `{ ring, angle }` (`ring` indexes `RING_RADII`, angle in degrees clockwise from 3 o'clock), turned into x/y by `pointOnRing()` in `orbit-backdrop.tsx` and multiplied by `--orbit-scale` (0.44→0.85). They are static (no float) and hidden below `sm`. Badges sit as **mirrored left/right pairs**: two pairs on ring 0 (650), two on ring 1 (800), one on ring 2 (960), with upper pairs ≥ ~75px below the header (user request, 2026-09-18). `BREAKPOINTS` has fine steps above `xl` (1360/1440/1536/1600/1680/1800, static `min-[Npx]` classes) so a badge appears as soon as it fits: 4 badges at 1280, 6 from 1360 (n8n/Make), 8 from 1440 (WhatsApp/Zapier), 10 from 1680 (Sheets/Gemini). **The user's window is ~1500px wide (1920 at 125% scaling), so don't assume 1900 when checking.** Ring 2 only fits between about 20° and 46° above horizontal: flatter angles clip at the 1280px viewport edge, steeper ones hit the header. Badge visibility per breakpoint is **computed**: `revealClass(x)` in `orbit-backdrop.tsx` picks the first breakpoint (`BREAKPOINTS`, whose scales must mirror the `--orbit-scale` classes) where the badge fits horizontally, so near-horizontal badges only appear on wider screens. At 1024 only 6 of 10 show. Adding or removing a ring shifts the indices, so update `hero.data.ts` too.
- Dark mode was removed on purpose (the design is light-only).
- `IntegrationLogo` gradient ids come from `useId()` (the logos render in the hero, integrations and CTA). Never hard-code SVG gradient ids in shared components.
- Integrations orbit (2026-09-18): a square `max-w-[50rem]` diagram with 3 rings (38/66/94%); the whole diagram (ring lines AND orbiting logos) carries a vertical linear mask (transparent 4% → #000 40%…60% → transparent 96%), so logos fade out as they pass the top and bottom, so they fade out at the top and bottom. Logos are placed by `ring` + `angle` (data) on a per-ring `<ul>` that turns via `animate-orbit`, which animates the registered `@property --orbit-angle` (40/60/80s, alternating direction). Logos apply `rotate: calc(var(--orbit-angle) * -1)` from the inherited value, so they stay upright and can never desync (separate counter-animations did desync). The old float animation was removed here.
- Footer copyright year is `new Date().getFullYear()` at build time (the page is static), so it only updates on rebuild.
- **Windows line endings:** editing files via Python/shell text mode writes CRLF and Biome fails. Run `bunx biome check --write` after scripted edits. `core.autocrlf=true` makes `package.json` show `M` with an empty diff after a dev/build run; that's harmless.
- **Browser pane:** `preview_start {name}` reads the *workspace* `Desktop\claude\.claude\launch.json`, not this project's. Start `bun run dev` in the background and use `preview_start {url: "http://localhost:3000"}`. Screenshots after a scroll or menu click time out or come back blank, so verify interactions with `javascript_tool`. **For full-page visuals use headless Edge:** `msedge.exe --headless=new --hide-scrollbars --force-prefers-reduced-motion --window-size=1280,7400 --screenshot=<file> http://localhost:3000/`, then crop with PIL. Narrow windows (390px) render wider than requested and look clipped, so check mobile overflow with JS in the pane instead.
- `ignoreScripts: ["sharp", "unrs-resolver"]` plus `trustedDependencies` listing the same two — contradictory-looking; harmless today. **[?]** intent unconfirmed.
- No tests, no CI, no remote — nothing guards a push yet.

## Open questions
1. What is Infrantic — product, audience, pages needed? (Sibling projects in the workspace — ca-pravin-jain, softexedge — are marketing sites on this exact stack; **[?]** is this the same kind of project?)
2. Brand: the reference design said "Deflexai". The build uses `siteConfig.name` = "Infrantic" **[?]**. Are the copy, ratings (4.6/4.9) and "200,000+ users" placeholders?
3. Git remote to add, and should the default branch be `master` or `main`?
4. Deploy target — Vercel (as with the sibling sites)? **[?]**
- Nav/footer links share `href`s (all services → `/#services`), so list keys use `label`, never `href`.
- Scripted edits via Python heredocs in Bash mangle `\n` escapes. When a data file is left invalid, `biome check --write` "formats" the broken syntax into worse garbage, so fix with Edit/Write, never with biome.
- Before changing hero rings or badge angles, re-measure in the pane at **1024 and 1280**. Select badges with `section[aria-labelledby=hero-title] div[aria-hidden] > ul > li`, not `span.grid`, which also matches the card avatars. Check viewport clipping, overlap with header/h1/subtitle/cards/marquee, and badge-badge collisions. Badges no longer need hand-tuned angles to avoid clipping; `revealClass` hides them where they would clip.
- **Visual check of hover/animated states:** the Browser pane freezes transitions and its screenshots come back blank. Drive headless Edge over CDP with a scratch Node script (`--remote-debugging-port`, `Runtime.evaluate` to force state, `Page.captureScreenshot` with a clip). Node 22's global `WebSocket` and `fetch` suffice, no dependencies.
- **Remote images:** none. The Unsplash `remotePatterns` was removed with the benefits section (2026-09-18); add a pattern back only if a remote image returns.
- **`next.config.ts` changes need a dev-server restart**; hot reload does not pick up `images` config.
