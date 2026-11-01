# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands
- `npm run dev`: dev server (Next.js 16, App Router, Turbopack)
- `npm run build`: production build; also the type check (there's no separate tsc script) and the check that both dictionaries have the same keys
- `npm run lint`: ESLint 9 flat config (`eslint.config.mjs`, eslint-config-next)
- No test suite exists. To check locale detection, run `npx next start` after a build and `curl -I` `/` with different `Accept-Language`, `x-vercel-ip-country` or `cf-ipcountry` headers, or a `NEXT_LOCALE` cookie.
- If the build fails with type errors in `.next/dev/types/validator.ts` about routes that no longer exist, delete `.next/dev` (stale types from an old dev server).

Deploy target: Vercel. The site needs a server runtime for `proxy.ts`, so it can't be a static export.

## Architecture
Single-page personal portfolio in Spanish and English. Every page lives under `app/[lang]/` (`/es`, `/en`); there's no root `app/layout.tsx`. Both locales are prerendered (`generateStaticParams`, `dynamicParams = false`).

**Locale detection**: `proxy.ts` (Next 16's name for middleware) redirects any path without a locale prefix to `/<locale><path>`. `lib/i18n/detect.ts` picks the locale in this order: `NEXT_LOCALE` cookie (set by `LangSwitcher` on click) → `Accept-Language` → country header (`x-vercel-ip-country` / `cf-ipcountry`; Spanish-speaking country → `es`, any other → `en`) → `defaultLocale` (`en`). `lib/i18n/config.ts` must stay importable from the proxy, so no `server-only` there.

**Translations**: no i18n library. `dictionaries/{es,en}.json` hold every string, including project content. `lib/i18n/dictionaries.ts` (`server-only`) loads them; `Dictionary` is typed from `es.json` and `en.json` must match it. Server components receive dictionary slices as props. Client components never import dictionaries; they get the strings they need through props.

**Content split**: `data/projects.ts` holds language-independent project data (id, `type`, screenshots, links, browser URL); `dictionaries/*.json` under `projects.<id>` holds the texts, and `screens[i]` labels `screenshots[i]`. Both projects currently have no screenshots (`screenshots: []`, `screens: []`), so `Showcase` renders the empty frame with `projectsSection.screenshotsSoon`; adding image paths and their labels brings back the thumbnails and rotation with no component changes. `app/[lang]/page.tsx` merges both into `ProjectView`s for `ProjectCarousel`. To add a project: add an entry in `PROJECTS`, a `projects.<id>` block in **both** dictionaries, and the id to the `ProjectId` union. `data/stack.ts` holds the stack grid and hero chips.

**Components**: sections are server components. Only the interactive parts are client components: `LangSwitcher`, `projects/ProjectCarousel`, `projects/Showcase` (phone or browser frame chosen by `type`, sharing the `useAutoRotate` hook), and `ui/FadeUp` (framer-motion wrappers used inside server components). Navigation uses plain `#id` anchors with CSS smooth scrolling.

**Styling**: Tailwind v4. Design tokens (`bg`, `surface`, `ink`, `accent`, `muted`, `line`, … and the `display`/`sans`/`mono` fonts) are in the `@theme` blocks of `app/globals.css`. Fonts (Anton, DM Sans, DM Mono) come from `next/font` in the layout. Shared class strings (`H2`, `BTN_PRIMARY`, `BTN_GHOST`) and the `Section`/`Divider` wrappers are in `components/ui/Section.tsx`. Hover effects are Tailwind `hover:` classes, not JS handlers, so sections can stay server components.

## docs/
`docs/portfolio_*.md` are source briefs (Spanish/English) with the real, current facts for each project: Tsundoku, and Jergario (formerly "Diccionario Urbano"). `docs/` is gitignored, so it only exists on the author's machine. Use them as the reference when writing or updating project copy, and don't claim anything they mark as planned.
