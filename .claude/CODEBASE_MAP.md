# Infrantic — Codebase Map
_Last updated: 2026-09-16_

> Legend: **[v]** confirmed against the filesystem/git on 2026-09-16. **[?]** inferred — check before relying on it.

## Identity
- Marketing site in early build: a complete one-page home (hero → benefits → workflow → use cases → testimonials → integrations → pricing → CTA → footer), built 2026-09-16 from two reference screenshots. **[v]**
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
  - `marketing/<section>/` — `hero`, `benefits`, `workflow`, `use-cases`, `testimonials`, `integrations`, `pricing`, `cta`. Each has `*.types.ts`, `*.data.ts` (`get*Content()`), `components/`, `index.ts`
  - **Client components (all of them):** `nav-dropdown`, `mobile-nav`, `workflow/components/workflow-tabs`, `pricing/components/billing-switch`
- `src/shared/` — feature-agnostic code: `ui/` (`button-link`, `brand-mark`, `new-badge`, `section-heading`, `initials-avatar` + `AvatarPerson`, `icons` (check/arrow/star), `integration-logo` + `IntegrationId`), `lib/cn.ts`, `types.ts` (`Cta`)
- `src/config/site.ts` — brand name + description
- `public/` — empty (template SVGs deleted)
- root — `next.config.ts`, `biome.json`, `tsconfig.json`, `postcss.config.mjs`, `AGENTS.md`, `CLAUDE.md`

## Surfaces
| Name | Type | File:Line | Auth/Cap | Purpose |
|---|---|---|---|---|
| `/` | Page (Server, static) | `src/app/(marketing)/page.tsx:18` | public | Home landing page (8 sections). In-page anchors: `#features`, `#workflow`, `#integrations`, `#pricing` |
| (marketing) layout | Layout | `src/app/(marketing)/layout.tsx:6` | public | Fixed floating header + footer |
| root layout | Layout | `src/app/layout.tsx:25` | public | Fonts, metadata (`title.template` = `%s · Infrantic`) |

The nav and CTAs link to routes that **don't exist yet** (they 404): `/products`, `/solutions/{startups,agencies,enterprise}`, `/services`, `/pricing`, `/insight`, `/sign-in`, `/sign-up` (+ `?plan=solo|team|studio` from pricing), `/contact`, `/demo`, `/use-cases/*`, and the footer's `/roadmap`, `/changelog`, `/blog`, `/docs`, `/docs/api`, `/guides`, `/help`, `/about`, `/careers`, `/privacy`, `/terms`. Social links point at the bare facebook.com / linkedin.com / x.com homepages (placeholders).

No API routes, route handlers, middleware/proxy, server actions, or jobs exist.

## Data
No database or CMS. Content is typed static data behind a getter (`hero.data.ts` → `getHeroContent()`). Every section works the same way: a `get*Content()` in its `*.data.ts`. To move content to a CMS, change only those function bodies and add caching there. Pricing is display-only (prices per user/month for monthly and yearly). No billing logic exists.

## Assets
No image assets. Brand and integration logos are **inline SVG approximations** (`integration-logo.tsx`), customer logos are **styled text wordmarks** (`trusted-by.tsx`), avatars and the testimonial "portrait" tile are initials, and product mockups (benefit visuals, flow canvas, use-case art) are hand-built HTML/SVG. Replace them with licensed assets before launch.

## External services
None.

## Conventions
- Server Components by default; `"use client"` only for interactive islands, which receive plain serializable props.
- **Client islands keep server-rendered content.** `WorkflowTabs` takes `panels: ReactNode[]` built on the server (all panels stay in the HTML, inactive ones `hidden`). `BillingSwitch` only toggles `data-billing` on a `group/billing` wrapper. Both prices are in the HTML, switched with `group-data-[billing=yearly]/billing:` variants.
- Horizontal carousels are native scroll-snap (no JS). They bleed to the viewport edge via `px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))]` plus matching `scroll-px`.
- Cross-feature imports go through shared code. Features don't import each other, except the footer reusing `NavLink` from `site-header/navigation`.
- Section headings use `SectionHeading` (`id` feeds `aria-labelledby`).
- Presentational components take content via props; data comes from a `get*()` in the feature's `*.data.ts`, called by the route's `page.tsx`.
- Content types live in `*.types.ts`. Data is `as const satisfies Type`.
- Animation is CSS-only: `animate-rise`, `animate-float`, `animate-orbit` tokens in `globals.css`, always behind `motion-safe:`.
- Decorative SVGs carry `aria-hidden="true"` (Biome `noSvgWithoutTitle` requires it).
- `cn()` from `@/shared/lib/cn` (no clsx/tailwind-merge: later classes don't override earlier ones, so avoid conflicting utilities).
- Biome formatting (2-space, double quotes), TS strict, `@/` imports. Root layout uses the `LayoutProps<"/">` global. The group layout uses `Readonly<{ children: ReactNode }>`.

## Where to add a <thing>
- **Marketing page:** `src/app/(marketing)/<route>/page.tsx` (gets the header and footer automatically)
- **Home section:** new `src/features/marketing/<section>/` folder, then add `<Section content={get…()} />` in `src/app/(marketing)/page.tsx`
- **Pricing plan:** `plans` in `pricing.data.ts` (`id` union + `planIcons` in `pricing.tsx`)
- **Integration logo:** add the id to `IntegrationId` and an entry in `logos` in `src/shared/ui/integration-logo.tsx`
- **Different chrome (app/auth):** a new route group, e.g. `src/app/(app)/layout.tsx`
- **Page section:** `src/features/marketing/<section>/` with `index.ts`, `*.types.ts`, `*.data.ts`, `components/`
- **Nav link:** `primaryNav` in `src/features/site-header/navigation.ts`
- **Route handler:** `src/app/<route>/route.ts` — read `node_modules/next/dist/docs/01-app/` first (Next 16 APIs differ from training data)
- **Design tokens:** `@theme` block in `src/app/globals.css`

## Risks & gotchas
- **Next 16 ≠ training data.** `AGENTS.md` (auto-written by `next dev`) says to read `node_modules/next/dist/docs/` before writing code. `CLAUDE.md` is just `@AGENTS.md`. `next dev` re-adds that block if removed — don't fight it.
- **Orbit stacking:** `OrbitBackdrop` uses `-z-10` against the hero `<section className="isolate">`. Never put transform/opacity/animation on its wrapper div in `hero.tsx`: that creates a local stacking context and paints the rings **over** the headline.
- Orbit geometry is design-pixel offsets (`x`/`y` in `hero.data.ts`) multiplied by `--orbit-scale` (0.5→1 across breakpoints). Integration badges are hidden below `sm`, accent arcs too.
- Dark mode was removed on purpose (the design is light-only).
- `IntegrationLogo` gradient ids come from `useId()` (the logos render in the hero, integrations and CTA). Never hard-code SVG gradient ids in shared components.
- Integrations constellation: rings sit in an `overflow-hidden` + radial-mask wrapper. Without it the outer rings run through the section heading.
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
