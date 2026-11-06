# Portfolio — Pendientes

> Lista viva de pendientes, en el orden en que conviene hacerlos, agrupados por quién los hace. Para nombrar una sección se usa su título, no su número.
> Cuando una tarea se termina, se borra de acá y lo que haya cambiado se registra en el archivo del área (ver el índice de `docs/contexto.md`).

---

## Mateo

### 1. Capturas nuevas
- [ ] Sacar capturas nuevas de Jergario y Tsundoku. Van en `public/screenshots/`, con sus rutas en `data/projects.ts` y sus etiquetas en `screens` de los dos diccionarios.

## Claude con Mateo

### 2. Dominio propio
- [ ] Comprar `mateoorodaz.dev` en Cloudflare Registrar (decidido el 2026-11-03), agregarlo como dominio propio en Vercel (Hobby lo permite gratis) y apuntar el DNS desde Cloudflare. Después, agregar `metadataBase` en `app/[lang]/layout.tsx`, para que el canonical y los `hreflang` sean URLs absolutas (ver `docs/decisiones.md`). Este dominio es también el principal del Google Workspace compartido: en el DNS de Cloudflare conviven los registros de Vercel con los de Google (ver `../Ops/docs/dominios.md`).

