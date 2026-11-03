# Decisiones

Registro de decisiones importantes del portfolio: qué se decidió, por qué y qué se descartó.

---

## 2026-11-01 — Idiomas: rutas `/es` y `/en` con detección automática

### Decisión
- Cada idioma tiene su propia URL: `/es` y `/en`. No hay página en `/`.
- Quien entra a `/` es redirigido por `proxy.ts` al idioma detectado, en este orden:
  1. **Cookie `NEXT_LOCALE`**: la elección manual del selector de idioma siempre gana.
  2. **Idioma del navegador** (header `Accept-Language`): se usa el idioma soportado que el navegador prefiere más.
  3. **País del visitante**: si el navegador no pide español ni inglés, se mira el país. Un país hispanohablante lleva a `/es` y cualquier otro a `/en`.
  4. **Inglés**, si no hay ninguna señal.
- Se sacó i18next (`i18next`, `react-i18next`, `i18next-resources-to-backend`). Los textos están en `dictionaries/es.json` y `dictionaries/en.json` y se cargan solo en el servidor.

### Por qué
- **Sin parpadeo:** antes el idioma se resolvía en el navegador, así que la página cargaba en español y recién después cambiaba. Ahora el HTML llega del servidor ya traducido.
- **SEO:** antes Google indexaba solo la versión en español. Ahora cada idioma tiene su URL, su `<html lang>` y sus links `hreflang`.
- **Menos JavaScript:** los diccionarios ya no viajan en el bundle del cliente.
- **Una sola fuente para cada texto:** antes los textos de los proyectos estaban inline en el código y además duplicados (sin uso) en los JSON.
- **Traducciones completas:** el tipo del diccionario sale de `es.json`, así que si a `en.json` le falta una clave, el build falla.
- **El navegador antes que el país:** el idioma del navegador lo eligió la persona; el país es solo una aproximación (por ejemplo, alguien de habla inglesa que vive en Argentina). Por eso el país se usa solo cuando el navegador no da una señal útil.
- **Inglés por defecto:** sin ninguna señal, es más probable que quien visita sea un reclutador de afuera.
- Es el patrón que recomienda la guía oficial de internacionalización de Next.js 16.

### Alternativas descartadas
- **Detectar el idioma en el cliente** (`navigator.language`, como hacía i18next): produce parpadeo y una sola URL indexable.
- **Librerías de i18n para Next** (`next-intl` y similares): para dos idiomas y una sola página no compensan la dependencia.
- **`negotiator` + `@formatjs/intl-localematcher`** para leer `Accept-Language`: con dos idiomas alcanza con un parser chico propio (`lib/i18n/detect.ts`).

### Consecuencias
- El sitio necesita un servidor para correr el proxy, así que **no puede ser una exportación estática**. Se publica en **Vercel**, que además manda el país en el header `x-vercel-ip-country`. También se lee `cf-ipcountry` por si algún día se pasa a Cloudflare.
- Para agregar un idioma: sumarlo a `locales` en `lib/i18n/config.ts`, crear su JSON en `dictionaries/` y registrarlo en `lib/i18n/dictionaries.ts`.
- Pendiente: cuando haya dominio, agregar `metadataBase` en `app/[lang]/layout.tsx` para que el canonical y los `hreflang` sean URLs absolutas.
