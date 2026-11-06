# Mateo Orodaz — Portfolio

My personal portfolio: a single page in Spanish and English that shows my projects (Jergario, Tsundoku and Tsundenki), the stack I work with and how to reach me.

Live at **[mateoorodaz.vercel.app](https://mateoorodaz.vercel.app)**.

## Stack

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **Tailwind CSS v4**, with the design tokens in `app/globals.css`
- **framer-motion** for the scroll animations
- Own i18n with no library: one URL per language (`/es`, `/en`), JSON dictionaries loaded on the server and language detection in `proxy.ts` (saved choice → browser language → country → English)
- Deployed on **Vercel**

## Run it locally

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks and checks that both dictionaries have the same keys) |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests with `node:test` (language detection and project helpers) |

No environment variables are needed.

## Project structure

```
app/[lang]/      the page, its layout and the error screen (one route per language)
app/global-not-found.tsx   404 for unknown URLs
components/      page sections and UI pieces
data/projects.ts project data that doesn't depend on the language
dictionaries/    all the texts, in es.json and en.json
lib/             i18n and project helpers, with their tests
proxy.ts         redirects / to the visitor's language
```

## Contact

[mateo.orodaz4@gmail.com](mailto:mateo.orodaz4@gmail.com) · [GitHub](https://github.com/Reiraku73)
