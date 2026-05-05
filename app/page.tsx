'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
type Lang = 'es' | 'en'

interface Translation {
  navLinks: string[]
  eyebrow: string
  role: string
  desc: string
  heroBtn1: string
  lblProyecto: string
  lblStack: string
  lblAbout: string
  lblContacto: string
  projDesc: string
  csP: string; csPt: string
  csS: string; csSt: string
  csT: string; csTt: string
  csC: string; csCt: string
  csR: string; csRt: string
  stackTitle: string
  aboutTitle: string
  aboutText: string
  stat1: string; stat2: string; stat3: string
  contactTitle: string
  contactSub: string
  contactEmail: string
  thumbLabels: string[]
  screenL1: string
  screenL2: string
  tabs: string[]
  genres: string
  continuar: string
  capitulos: string
  caps: { n: string; s: string }[]
}

// ─────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────
const T: Record<Lang, Translation> = {
  es: {
    navLinks: ['Proyecto', 'Stack', 'Sobre mí', 'Contacto'],
    eyebrow: 'Full Stack Developer',
    role: 'enfocado en apps mobile',
    desc: 'Construyo aplicaciones completas de principio a fin. Actualmente desarrollando una plataforma de manga con soporte para creadores independientes.',
    heroBtn1: 'Ver proyecto',
    lblProyecto: 'PROYECTO', lblStack: 'STACK', lblAbout: 'SOBRE MÍ', lblContacto: 'CONTACTO',
    projDesc: 'Plataforma para leer y gestionar mangas, manhwas y cómics. Autenticación, biblioteca personal y soporte para contenido de creadores independientes.',
    csP: 'Problema', csPt: 'Las plataformas existentes dificultan la publicación a creadores indie y no ofrecen una experiencia de lectura mobile optimizada.',
    csS: 'Solución', csSt: 'App mobile con auth, biblioteca personalizable, lector configurable y soporte para contenido oficial e independiente.',
    csT: 'Stack técnico', csTt: 'Supabase para auth, DB y storage. Zustand para estado global. Persistencia local para lectura offline con CBZ.',
    csC: 'Desafíos', csCt: 'Lectura offline con CBZ, renderizado eficiente de imágenes y sincronización del progreso entre dispositivos.',
    csR: 'Resultado', csRt: 'App funcional con sistema de usuarios completo, lectura online/offline y arquitectura escalable para creadores.',
    stackTitle: 'Tecnologías',
    aboutTitle: 'Sobre mí',
    aboutText: 'Soy desarrollador full stack junior con foco en mobile. Me interesa construir productos reales, pensando tanto en la experiencia de usuario como en la infraestructura del sistema. Aprendo construyendo cosas concretas.',
    stat1: 'App en desarrollo activo', stat2: 'Full Stack Dev Junior', stat3: 'Mobile First',
    contactTitle: 'Hablemos.', contactSub: 'Abierto a oportunidades y colaboraciones.', contactEmail: 'Enviar email',
    thumbLabels: ['Biblioteca', 'Detalle', 'Lector'],
    screenL1: 'Mi Biblioteca', screenL2: 'Solo Leveling',
    tabs: ['Leyendo', 'Completado', 'Plan'],
    genres: 'MANHWA · ACCIÓN · FANTASÍA',
    continuar: 'Continuar leyendo',
    capitulos: 'Capítulos',
    caps: [{ n: 'Cap. 179', s: 'El rey sombra' }, { n: 'Cap. 178', s: 'El despertar' }, { n: 'Cap. 177', s: 'El sistema' }],
  },
  en: {
    navLinks: ['Project', 'Stack', 'About', 'Contact'],
    eyebrow: 'Full Stack Developer',
    role: 'focused on mobile apps',
    desc: 'I build complete applications end to end. Currently developing a manga platform with support for independent creators.',
    heroBtn1: 'See project',
    lblProyecto: 'PROJECT', lblStack: 'STACK', lblAbout: 'ABOUT ME', lblContacto: 'CONTACT',
    projDesc: 'Platform to read and manage manga, manhwa and comics. With authentication, personal library and support for indie creator content.',
    csP: 'Problem', csPt: "Existing platforms make it hard for indie creators to publish, and don't offer an optimized mobile reading experience.",
    csS: 'Solution', csSt: 'Mobile app with auth, customizable library, configurable reader and support for official and indie content.',
    csT: 'Tech stack', csTt: 'Supabase for auth, DB and storage. Zustand for global state. Local persistence for offline CBZ reading.',
    csC: 'Challenges', csCt: 'Offline reading with CBZ, efficient image rendering and cross-device progress sync.',
    csR: 'Outcome', csRt: 'Functional app with complete user system, online/offline reading and scalable architecture for creators.',
    stackTitle: 'Technologies',
    aboutTitle: 'About me',
    aboutText: "I'm a junior full stack developer focused on mobile. I'm interested in building real products, thinking about both user experience and backend infrastructure. I learn by building concrete things.",
    stat1: 'App in active development', stat2: 'Full Stack Junior Dev', stat3: 'Mobile First',
    contactTitle: "Let's talk.", contactSub: 'Open to opportunities and collaborations.', contactEmail: 'Send email',
    thumbLabels: ['Library', 'Detail', 'Reader'],
    screenL1: 'My Library', screenL2: 'Solo Leveling',
    tabs: ['Reading', 'Completed', 'Plan'],
    genres: 'MANHWA · ACTION · FANTASY',
    continuar: 'Continue reading',
    capitulos: 'Chapters',
    caps: [{ n: 'Ch. 179', s: 'The Shadow King' }, { n: 'Ch. 178', s: 'The Awakening' }, { n: 'Ch. 177', s: 'The System' }],
  },
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const COVERS = [
  { title: 'Solo Leveling', g: 'linear-gradient(160deg,#0D1B3E,#1A2D5A)', acc: '#4A90D9' },
  { title: 'Berserk',       g: 'linear-gradient(160deg,#1C0808,#2D1010)', acc: '#C0392B' },
  { title: 'Chainsaw Man',  g: 'linear-gradient(160deg,#0D0D0D,#1C0A0A)', acc: '#E74C3C' },
  { title: 'Spy×Family',    g: 'linear-gradient(160deg,#0A1628,#1A2B50)', acc: '#F39C12' },
  { title: 'Frieren',       g: 'linear-gradient(160deg,#0E1B2A,#18283D)', acc: '#9B8ECF' },
  { title: 'One Piece',     g: 'linear-gradient(160deg,#1A1200,#2D2000)', acc: '#F1C40F' },
]

const STACK_DATA = [
  { name: 'React Native', icon: '⚛', bg: '#0F1924', acc: '#61DAFB' },
  { name: 'Expo',         icon: '◉', bg: '#111111', acc: '#DDDDDD' },
  { name: 'TypeScript',   icon: 'TS', bg: '#0F1C2E', acc: '#3178C6' },
  { name: 'Supabase',     icon: '⚡', bg: '#061A0F', acc: '#3ECF8E' },
  { name: 'Zustand',      icon: '◎', bg: '#1A0B00', acc: '#F97316' },
  { name: 'Node.js',      icon: '⬡', bg: '#061206', acc: '#68A063' },
  { name: 'PostgreSQL',   icon: '◈', bg: '#051020', acc: '#4A90E2' },
  { name: 'Next.js',      icon: '▲', bg: '#0A0A0A', acc: '#EEEEEE' },
]

const CASE_STUDY_ICONS = ['◎', '◈', '⬡', '⚡', '✦']

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      letterSpacing: '3.5px',
      textTransform: 'uppercase',
      color: '#E8192C',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: '#E8192C' }} />
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PHONE SCREENS
// ─────────────────────────────────────────────────────────────────
function LibraryScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src="/screenshots/MuestraApp1.png"
        alt="Home"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

function DetailScreen(){
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src="/screenshots/MuestraApp2.png"
        alt="Profile"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

function ReaderScreen() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src="/screenshots/MuestraApp3.png"
        alt="Reader"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PHONE SHOWCASE
// ─────────────────────────────────────────────────────────────────
function PhoneShowcase({ t }: { t: Translation }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(p => (p + 1) % 3), 4000)
    return () => clearInterval(id)
  }, [paused])

  const handleThumbClick = (i: number) => {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 6000)
  }

  const screens = [
    <LibraryScreen key="lib"/>,
    <DetailScreen  key="det"/>,
    <ReaderScreen  key="read"/>,
  ]
  const thumbScreens = [
    <LibraryScreen key="lib-t"/>,
    <DetailScreen  key="det-t"/>,
    <ReaderScreen  key="read-t"/>,
  ]

  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      {/* Main phone */}
      <div style={{
        width: 160,
        aspectRatio: '9/19.5',
        background: '#000',
        borderRadius: 28,
        border: '1.5px solid rgba(255,255,255,0.12)',
        padding: 5,
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.03)',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', width: 44, height: 7, background: '#000', borderRadius: 10, zIndex: 10 }} />
        <div style={{ width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden', background: '#0B0B14' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%' }}
            >
              {screens[active]}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Side button */}
        <div style={{ position: 'absolute', right: -2, top: '25%', width: 2, height: 28, background: '#333', borderRadius: 2 }} />
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {thumbScreens.map((screen, i) => (
          <div key={i}>
            <div
              onClick={() => handleThumbClick(i)}
              style={{
                width: 64,
                aspectRatio: '9/19.5',
                background: '#000',
                borderRadius: 12,
                padding: 2,
                border: `1.5px solid ${active === i ? '#E8192C' : 'rgba(255,255,255,0.07)'}`,
                cursor: 'pointer',
                transform: active === i ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}>
                {screen}
              </div>
            </div>
            <p style={{ fontSize: 9, color: '#555', fontFamily: "'DM Mono', monospace", textAlign: 'center', marginTop: 3, letterSpacing: '0.5px' }}>
              {t.thumbLabels[i]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>('es')
  const t = T[lang]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const switchLang = (l: Lang) => setLang(l)

  const caseStudy = [
    { icon: CASE_STUDY_ICONS[0], label: t.csP, text: t.csPt, full: false },
    { icon: CASE_STUDY_ICONS[1], label: t.csS, text: t.csSt, full: false },
    { icon: CASE_STUDY_ICONS[2], label: t.csT, text: t.csTt, full: false },
    { icon: CASE_STUDY_ICONS[3], label: t.csC, text: t.csCt, full: false },
    { icon: CASE_STUDY_ICONS[4], label: t.csR, text: t.csRt, full: true  },
  ]

  return (
    <>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body::-webkit-scrollbar { width: 3px; }
        body::-webkit-scrollbar-thumb { background: rgba(232,25,44,0.2); border-radius: 2px; }
      `}</style>

      <main style={{ background: '#0B0B0F', color: '#F0EAE0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── NAV ─────────────────────────────────────────────── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '0 40px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2 }}>
            M<span style={{ color: '#E8192C' }}>.</span>O
          </span>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {['proyecto', 'stack', 'about', 'contacto'].map((id, i) => (
              <span
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontSize: 11, color: '#666', cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace", letterSpacing: '1.5px',
                  textTransform: 'uppercase', transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0EAE0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}
              >
                {t.navLinks[i]}
              </span>
            ))}
            {/* Lang toggle */}
            <div style={{ display: 'flex', gap: 4, marginLeft: 16, borderLeft: '1px solid rgba(255,255,255,0.07)', paddingLeft: 16 }}>
              {(['es', 'en'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  style={{
                    fontSize: 11, padding: '3px 9px', borderRadius: 4, cursor: 'pointer',
                    fontFamily: "'DM Mono', monospace", letterSpacing: 1, transition: 'all .15s',
                    border: `1px solid ${lang === l ? '#E8192C' : 'rgba(255,255,255,0.07)'}`,
                    background: lang === l ? '#E8192C' : 'transparent',
                    color: lang === l ? '#fff' : '#666',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: -60, right: -100,
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(232,25,44,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <section style={{ padding: '80px 40px 100px', maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '3px', color: '#E8192C', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{ display: 'inline-block', width: 32, height: 1, background: '#E8192C' }} />
              {t.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 9vw, 100px)', lineHeight: 0.92, marginBottom: 20 }}
            >
              <span>MATEO</span><br />
              <span style={{ WebkitTextStroke: '1px rgba(240,234,224,0.28)', color: 'transparent' }}>ORODAZ</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 64, height: 2, background: '#E8192C', margin: '24px 0', transformOrigin: 'left' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 20, color: '#888', fontWeight: 300, marginBottom: 8 }}
            >
              {t.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 15, color: '#555', lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}
            >
              {t.desc}
            </motion.p>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}
            >
              {['React Native', 'TypeScript', 'Supabase', 'Zustand', 'Node.js', 'Expo'].map(chip => (
                <span key={chip} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 11, padding: '5px 12px',
                  borderRadius: 100, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)', color: '#888', letterSpacing: '0.5px',
                }}>{chip}</span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <button
                onClick={() => scrollTo('proyecto')}
                style={{
                  background: '#E8192C', color: '#fff', border: 'none',
                  padding: '12px 24px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Sans', sans-serif", transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,25,44,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                {t.heroBtn1} ↓
              </button>
              <a
                href="https://github.com/Reiraku73" target="_blank" rel="noreferrer"
                style={{
                  background: 'transparent', color: '#F0EAE0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '12px 24px', borderRadius: 6, fontSize: 13,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
              >
                GitHub →
              </a>
            </motion.div>
          </section>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* ── PROJECT ─────────────────────────────────────────── */}
        <section id="proyecto" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>01 / {t.lblProyecto}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40, lineHeight: 1 }}>
              Manga Reader App
            </h2>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                {/* Left: Phone showcase */}
                <div style={{
                  background: '#0A0A10', padding: 40,
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  borderRight: '1px solid rgba(255,255,255,0.07)', minHeight: 460,
                }}>
                  <PhoneShowcase t={t} />
                </div>

                {/* Right: Info + Case study */}
                <div style={{ padding: '36px 32px' }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#E8192C', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                    MANGA · MANHWA · CÓMICS
                  </div>
                  <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, marginBottom: 12 }}>Manga Reader</h3>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{t.projDesc}</p>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                    {[
                      // { label: '▶ Video', href: 'https://youtube.com/TU_VIDEO_ID' },
                      // { label: '↓ Demo APK', href: '/downloads/app.apk' },
                      { label: '⌥ Repo (privado)', href: 'mailto:mateo.orodaz4@gmail.com?subject=Solicitud código Manga Reader' },
                      { label: '✉ Email', href: 'mailto:mateo.orodaz4@gmail.com' },
                    ].map((btn, i) => (
                      <a key={btn.label} href={btn.href}
                        target={btn.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noreferrer"
                        download={btn.label.includes('APK') ? true : undefined}
                        style={{
                          fontSize: 12, padding: '8px 16px', borderRadius: 5,
                          border: `1px solid ${i === 0 ? 'rgba(232,25,44,0.4)' : i === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
                          color: i === 0 ? '#E8192C' : i === 1 ? '#F0EAE0' : '#888',
                          background: i === 1 ? 'rgba(255,255,255,0.05)' : 'transparent',
                          cursor: 'pointer', textDecoration: 'none', display: 'inline-flex',
                          alignItems: 'center', gap: 6, fontFamily: "'DM Mono', monospace",
                          transition: 'all .2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#F0EAE0' }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = i === 0 ? 'rgba(232,25,44,0.4)' : i === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'
                          e.currentTarget.style.color = i === 0 ? '#E8192C' : i === 1 ? '#F0EAE0' : '#888'
                        }}
                      >{btn.label}</a>
                    ))}
                  </div>

                  {/* Case study grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {caseStudy.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          gridColumn: item.full ? '1 / -1' : undefined,
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: 12, padding: 18,
                          transition: 'border-color .2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,25,44,0.25)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                      >
                        <span style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>{item.icon}</span>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#E8192C', marginBottom: 6 }}>
                          {item.label}
                        </div>
                        <p style={{ fontSize: 12, color: '#555', lineHeight: 1.65 }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* ── STACK ───────────────────────────────────────────── */}
        <section id="stack" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>02 / {t.lblStack}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40, lineHeight: 1 }}>
              {t.stackTitle}
            </h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STACK_DATA.map((s, i) => (
              <FadeUp key={s.name} delay={0.06 * i}>
                <div
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
                    padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(255,255,255,0.02)', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  <div style={{
                    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 6, background: s.bg, color: s.acc,
                    border: `1px solid ${s.acc}22`, fontSize: 13, fontFamily: "'DM Mono', monospace", fontWeight: 500, flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F0EAE0' }}>{s.name}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>03 / {t.lblAbout}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40, lineHeight: 1 }}>
              {t.aboutTitle}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 480 }}>{t.aboutText}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
                {[
                  { num: '1', label: t.stat1 },
                  { num: 'FS', label: t.stat2 },
                  { num: '📱', label: t.stat3 },
                ].map(stat => (
                  <div key={stat.num} style={{
                    background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10, padding: '16px 20px', minWidth: 160,
                  }}>
                    <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: '#E8192C', lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontSize: 11, color: '#555', marginTop: 4, lineHeight: 1.4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* ── CONTACT ─────────────────────────────────────────── */}
        <section id="contacto" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>04 / {t.lblContacto}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <div style={{ textAlign: 'center', padding: '40px 0 60px' }}>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, marginBottom: 0 }}>
                {t.contactTitle}
              </h2>
              <p style={{ fontSize: 15, color: '#555', margin: '12px 0 32px' }}>{t.contactSub}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <a
                  href="mailto:mateo.orodaz4@gmail.com"
                  style={{
                    background: '#E8192C', color: '#fff', border: 'none',
                    padding: '14px 28px', borderRadius: 6, fontSize: 14, fontWeight: 500,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,25,44,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  {t.contactEmail} →
                </a>
                <a
                  href="https://github.com/Reiraku73" target="_blank" rel="noreferrer"
                  style={{
                    background: 'transparent', color: '#F0EAE0',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '14px 28px', borderRadius: 6, fontSize: 14,
                    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: '#444', fontFamily: "'DM Mono', monospace" }}>© 2025 Mateo Orodaz</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace" }}>Built with Next.js · Supabase</span>
        </footer>

      </main>
    </>
  )
}
