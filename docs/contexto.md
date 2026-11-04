# Portfolio — Contexto del proyecto

> Lo que necesita casi cualquier tarea. El detalle de cada área está en los archivos del índice (al final): lo que cambie se registra ahí, no acá.

---

## Qué es

Portfolio personal de Mateo (GitHub `Reiraku73`), de una sola página, en español y en inglés. Muestra Jergario y Tsundoku. Se publica en Vercel.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Estilos | Tailwind v4 (tokens en el `@theme` de `app/globals.css`), fuentes con `next/font` (Anton, DM Sans, DM Mono) |
| Animaciones | `framer-motion`, solo en `components/ui/FadeUp` |
| Idiomas | Sin librería de i18n: diccionarios JSON propios (ver Arquitectura) |
| Deploy | Vercel. Necesita servidor por `proxy.ts`, así que no puede ser una exportación estática |

## Comandos

Todos desde la raíz. Node 24 (`.nvmrc`).

- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción. También es el chequeo de tipos (no hay script de `tsc`) y el de que los dos diccionarios tengan las mismas claves.
- `npm run lint`: ESLint 9 con config plana (`eslint.config.mjs`, `eslint-config-next`).
- `npm test`: tests con `node:test` (`lib/**/*.test.ts`), sin dependencias extra. Node corre el TypeScript sin compilar; `test/register.mjs` resuelve los imports sin extensión. Hoy cubren la detección de idioma.
- Para probar la detección de idioma de punta a punta: `npm run build`, después `npx next start`, y `curl -I` a `/` con distintos `Accept-Language`, `x-vercel-ip-country` o `cf-ipcountry`, o con la cookie `NEXT_LOCALE`.
- Si el build falla con errores de tipos en `.next/dev/types/validator.ts` sobre rutas que ya no existen, borrá `.next/dev` (son tipos viejos de un dev server anterior).

## Variables de entorno

Ninguna por ahora.

## Arquitectura

- **Rutas:** todas las páginas viven en `app/[lang]/` (`/es`, `/en`); no hay `app/layout.tsx` en la raíz. Los dos idiomas se prerenderizan (`generateStaticParams`, `dynamicParams = false`).
- **Detección de idioma:** `proxy.ts` (el nombre que Next 16 le da al middleware) redirige cualquier ruta sin idioma a `/<idioma><ruta>`. `lib/i18n/detect.ts` elige en este orden: cookie `NEXT_LOCALE` (la pone `LangSwitcher` al hacer clic) → `Accept-Language` → header de país (`x-vercel-ip-country` / `cf-ipcountry`; país hispanohablante → `es`, cualquier otro → `en`) → `defaultLocale` (`en`). `lib/i18n/config.ts` tiene que poder importarse desde el proxy, así que no lleva `server-only`. El porqué, en `docs/decisiones.md`.
- **Traducciones:** `dictionaries/{es,en}.json` tienen todos los textos, incluido el contenido de los proyectos. `lib/i18n/dictionaries.ts` (`server-only`) los carga; el tipo `Dictionary` sale de `es.json` y `en.json` tiene que coincidir. Los server components reciben partes del diccionario por props. Los client components nunca importan diccionarios: reciben por props los textos que necesitan.
- **Contenido de los proyectos:** `data/projects.ts` tiene los datos que no dependen del idioma: id, `primary` (la plataforma principal), `platforms` (`web` y/o `mobile`, cada una con `status` —`live`, `demo`, `dev` o `planned`—, `screenshots` y la `url` del navegador) y los links. `dictionaries/*.json`, en `projects.<id>`, tiene los textos, y `screens.<plataforma>[i]` es la etiqueta de `screenshots[i]` de esa plataforma. Sin capturas, el marco muestra `projectsSection.screenshotsSoon`; al agregar las rutas y sus etiquetas vuelven las miniaturas y la rotación sin tocar componentes. `app/[lang]/page.tsx` une las dos fuentes en `ProjectView`s para `ProjectCarousel`. `data/stack.ts` tiene la grilla del stack y los chips del hero.
- **Web y app:** `Showcase` muestra una pestaña por plataforma ("Web · En desarrollo", "App · Planeada"), con la principal primero (`orderedPlatforms` en `lib/projects.ts`). Cada pestaña usa su marco: navegador para `web`, celular para `mobile`. Orden del carrusel: Jergario, Tsundoku, Tsundenki.
- **Agregar un proyecto:** una entrada en `PROJECTS`, un bloque `projects.<id>` en **los dos** diccionarios y el id en la unión `ProjectId`.
- **Componentes:** las secciones son server components. Solo las partes interactivas son client components: `LangSwitcher`, `projects/ProjectCarousel`, `projects/Showcase` (pestañas por plataforma; marco de celular o de navegador, con el hook compartido `useAutoRotate`) y `ui/FadeUp` (wrappers de framer-motion que se usan dentro de server components). La navegación usa anclas `#id` con scroll suave de CSS.
- **Estilos:** los tokens de diseño (`bg`, `surface`, `ink`, `accent`, `muted`, `line`… y las fuentes `display`/`sans`/`mono`) están en el `@theme` de `app/globals.css`. Las clases compartidas (`H2`, `BTN_PRIMARY`, `BTN_GHOST`) y los wrappers `Section`/`Divider` están en `components/ui/Section.tsx`. Los hover son clases `hover:` de Tailwind, no handlers de JS, para que las secciones sigan siendo server components.

## Estado

Reestructurado con las rutas `/es` y `/en` y la detección de idioma (2026-11-01). Las capturas de los proyectos se sacaron hasta tener nuevas. Sin dominio propio todavía (ver `docs/pending.md`). Tsundoku figura con la v0.4.2, la publicada; cuando salga la build 0.4.3, se cambia en los dos diccionarios.

## Reglas propias del proyecto

- **Fuentes de los textos de los proyectos:** `docs/portfolio_Jergario.md`, `docs/portfolio_Tsundoku.md` y `docs/portfolio_Tsundenki.md` tienen los datos reales y actuales de cada uno. Se usan como referencia al escribir o actualizar los textos, y no se afirma nada que marquen como planeado. Si cambia algo en uno de esos proyectos, primero se actualiza la ficha y después los diccionarios.
- Esas fichas no están en git (están en el `.gitignore`): solo existen en la PC de Mateo.
- Los links del repo de Tsundoku apuntan a `Reiraku73/Tsundoku-showcase` (el repo público de releases) a propósito: el código es privado.

## Índice

> **Lo compartido entre proyectos** (cuentas, plata, dominios y mail) está en `../Ops/docs/` (ver su `contexto.md`). Si una tarea necesita esos datos, se leen ahí.

| Archivo | Qué tiene |
| --- | --- |
| `docs/decisiones.md` | Decisiones importantes del portfolio, con su porqué y las alternativas descartadas |
| `docs/portfolio_Jergario.md` · `docs/portfolio_Tsundoku.md` · `docs/portfolio_Tsundenki.md` | Fichas con los datos reales de cada proyecto (fuera de git) |
| `docs/pending.md` | Pendientes, agrupados por quién los hace |
