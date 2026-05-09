'use client'

import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import '../lib/i18n'
import { useTranslation } from 'react-i18next'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
type Lang = 'es' | 'en'

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
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



// ─── Projects ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Manga Reader App',
    tag: 'MANGA · MANHWA · CÓMICS',
    links: [
      { label: '▶ Video',          href: 'https://youtu.be/MQcM05u0m4A' },
      { label: '↓ Demo APK',        href: 'https://github.com/Reiraku73/Tsundoku-app/releases' },
      { label: '⌥ Repo (privado)', href: 'mailto:mateo.orodaz4@gmail.com?subject=Solicitud código Manga Reader' },
      { label: '✉ Email',           href: 'mailto:mateo.orodaz4@gmail.com' },
    ],
  },
  // { title: 'Próximo projecto', tag: '...', links: [] },
]

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

function DetailScreen() {
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
function PhoneShowcase({ thumbLabels }: { thumbLabels: string[] }) {
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
    <LibraryScreen key="lib" />,
    <DetailScreen  key="det" />,
    <ReaderScreen  key="read" />,
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
        {screens.map((screen, i) => (
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
              {thumbLabels[i]}
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
  const [activeProject, setActiveProject] = useState(0)
  const { t, i18n } = useTranslation('common')
  const lang = i18n.language as Lang

  const switchLang = (l: Lang) => i18n.changeLanguage(l)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const thumbLabels = t('phone.thumbs', { returnObjects: true }) as string[]

  const caseStudy = [
    { icon: CASE_STUDY_ICONS[0], label: t('project.cs.problem'),    text: t('project.cs.problemText'),    full: false },
    { icon: CASE_STUDY_ICONS[1], label: t('project.cs.solution'),   text: t('project.cs.solutionText'),   full: false },
    { icon: CASE_STUDY_ICONS[2], label: t('project.cs.tech'),       text: t('project.cs.techText'),       full: false },
    { icon: CASE_STUDY_ICONS[3], label: t('project.cs.challenges'), text: t('project.cs.challengesText'), full: false },
    { icon: CASE_STUDY_ICONS[4], label: t('project.cs.result'),     text: t('project.cs.resultText'),     full: true  },
  ]

  return (
    <>
      {/* Fonts + responsive */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body::-webkit-scrollbar { width: 3px; }
        body::-webkit-scrollbar-thumb { background: rgba(232,25,44,0.2); border-radius: 2px; }

        @media (max-width: 768px) {
          #nav-links { display: none !important; }
          #project-grid { grid-template-columns: 1fr !important; }
          #project-showcase { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; min-height: auto !important; padding: 32px 20px !important; }
          #stack-grid { grid-template-columns: 1fr 1fr !important; }
          #about-grid { grid-template-columns: 1fr !important; }
          #about-stats { flex-direction: row !important; flex-wrap: wrap !important; }
          #hero-section { padding: 60px 20px 80px !important; }
          #contact-center { padding: 20px 0 40px !important; }
          .section-pad { padding: 60px 20px !important; }
          footer { flex-direction: column !important; gap: 8px !important; text-align: center !important; padding: 20px !important; }
        }
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
          <div id="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {(['projects', 'stack', 'about', 'contact'] as const).map((id) => (
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
                {t(`nav.${id}`)}
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
          <section id="hero-section" style={{ padding: '80px 40px 100px', maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '3px', color: '#E8192C', textTransform: 'uppercase', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{ display: 'inline-block', width: 32, height: 1, background: '#E8192C' }} />
              {t('hero.eyebrow')}
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
              {t('hero.role')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 15, color: '#555', lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}
            >
              {t('hero.desc')}
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
                onClick={() => scrollTo('projects')}
                style={{
                  background: '#E8192C', color: '#fff', border: 'none',
                  padding: '12px 24px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Sans', sans-serif", transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,25,44,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                {t('hero.btn')} ↓
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

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section id="projects" className="section-pad" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>01 / {t('nav.projects')}</SectionLabel></FadeUp>

          {/* Carousel header */}
          <FadeUp delay={0.12}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1 }}>
                {PROJECTS[activeProject].title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Counter */}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#555' }}>
                  {String(activeProject + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
                {/* Arrows */}
                {[
                  { dir: -1, label: '←' },
                  { dir:  1, label: '→' },
                ].map(({ dir, label }) => (
                  <button
                    key={dir}
                    onClick={() => setActiveProject(p => (p + dir + PROJECTS.length) % PROJECTS.length)}
                    style={{
                      width: 36, height: 36, borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'transparent', color: '#F0EAE0',
                      cursor: 'pointer', fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8192C'; e.currentTarget.style.color = '#E8192C' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#F0EAE0' }}
                  >{label}</button>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.18}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}
              >
                <div id="project-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                  {/* Left: Phone showcase */}
                  <div id="project-showcase" style={{
                    background: '#0A0A10', padding: 40,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.07)', minHeight: 460,
                  }}>
                    <PhoneShowcase thumbLabels={thumbLabels} />
                  </div>

                  {/* Right: Info + Case study */}
                  <div style={{ padding: '36px 32px' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#E8192C', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                      {PROJECTS[activeProject].tag}
                    </div>
                    <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, marginBottom: 12 }}>
                      {PROJECTS[activeProject].title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>
                      {t('project.desc')}
                    </p>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                      {PROJECTS[activeProject].links.map((btn, i) => (
                        <a
                          key={btn.label}
                          href={btn.href}
                          target={btn.href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noreferrer"
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
                        >
                          {btn.label}
                        </a>
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
              </motion.div>
            </AnimatePresence>
          </FadeUp>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProject(i)}
                style={{
                  width: i === activeProject ? 24 : 6,
                  height: 6, borderRadius: 3, border: 'none',
                  background: i === activeProject ? '#E8192C' : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer', transition: 'all .3s ease', padding: 0,
                }}
              />
            ))}
          </div>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* ── STACK ───────────────────────────────────────────── */}
        <section id="stack" className="section-pad" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>02 / {t('nav.stack')}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40, lineHeight: 1 }}>
              {t('stack.title')}
            </h2>
          </FadeUp>
          <div id="stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
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
        <section id="about" className="section-pad" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>03 / {t('nav.about')}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 40, lineHeight: 1 }}>
              {t('about.title')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div id="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 480 }}>{t('about.text')}</p>
              <div id="about-stats" style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
                {[
                  { num: '1',  label: t('about.stat1') },
                  { num: 'FS', label: t('about.stat2') },
                  { num: '📱', label: t('about.stat3') },
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
        <section id="contact" className="section-pad" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <FadeUp delay={0.05}><SectionLabel>04 / {t('nav.contact')}</SectionLabel></FadeUp>
          <FadeUp delay={0.12}>
            <div id="contact-center" style={{ textAlign: 'center', padding: '40px 0 60px' }}>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, marginBottom: 0 }}>
                {t('contact.title')}
              </h2>
              <p style={{ fontSize: 15, color: '#555', margin: '12px 0 32px' }}>{t('contact.sub')}</p>
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
                  {t('contact.email')} →
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
          <span style={{ fontSize: 12, color: '#444', fontFamily: "'DM Mono', monospace" }}>© 2026 Mateo Orodaz</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace" }}>Built with Next.js · Supabase</span>
        </footer>

      </main>
    </>
  )
}
