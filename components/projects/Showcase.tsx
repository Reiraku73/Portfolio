'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { Platform } from '@/data/projects'

type Screen = { src: string; label: string }

// Cycles through `count` screens; a manual pick pauses the rotation for a while.
function useAutoRotate(count: number, interval = 4000, pauseAfterPick = 6000) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(() => setActive((p) => (p + 1) % count), interval)
    return () => clearInterval(id)
  }, [paused, count, interval])

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const pick = (i: number) => {
    setActive(i)
    setPaused(true)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), pauseAfterPick)
  }

  return [active, pick] as const
}

function Slide({ screen, active, sizes, dx }: { screen: Screen; active: number; sizes: string; dx: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, x: dx }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -dx }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        <Image src={screen.src} alt={screen.label} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </AnimatePresence>
  )
}

// Fills the frame's screen when a project has no screenshots yet.
function Placeholder({ text }: { text: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
      {text}
    </div>
  )
}

function thumbClass(selected: boolean) {
  return `relative block overflow-hidden border-[1.5px] transition-all duration-200 ${
    selected ? 'scale-106 border-accent' : 'border-line'
  }`
}

function PhoneShowcase({ screens, emptyText }: { screens: Screen[]; emptyText: string }) {
  const [active, pick] = useAutoRotate(screens.length)
  return (
    <div className="flex items-center gap-5">
      <div className="relative aspect-[9/19.5] w-40 shrink-0 rounded-[28px] border-[1.5px] border-white/12 bg-black p-[5px] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        {/* Notch */}
        <div className="absolute top-[5px] left-1/2 z-10 h-[7px] w-11 -translate-x-1/2 rounded-[10px] bg-black" />
        <div className="relative size-full overflow-hidden rounded-[22px] bg-[#0B0B14]">
          {screens.length > 0
            ? <Slide screen={screens[active]} active={active} sizes="160px" dx={8} />
            : <Placeholder text={emptyText} />}
        </div>
        {/* Side button */}
        <div className="absolute top-1/4 -right-0.5 h-7 w-0.5 rounded-sm bg-[#333]" />
      </div>

      <div className={screens.length > 0 ? 'flex flex-col gap-2' : 'hidden'}>
        {screens.map((screen, i) => (
          <div key={screen.src}>
            <button
              type="button"
              aria-label={screen.label}
              aria-pressed={i === active}
              onClick={() => pick(i)}
              className={`${thumbClass(i === active)} aspect-[9/19.5] w-16 rounded-xl bg-black p-0.5`}
            >
              <span className="relative block size-full overflow-hidden rounded-[10px]">
                <Image src={screen.src} alt="" fill sizes="64px" className="object-cover" />
              </span>
            </button>
            <p className="mt-[3px] text-center font-mono text-[9px] tracking-[0.5px] text-muted">{screen.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrowserShowcase({ screens, url, emptyText }: { screens: Screen[]; url?: string; emptyText: string }) {
  const [active, pick] = useAutoRotate(screens.length)
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-white/12 bg-[#1A1A24] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-white/6 bg-[#111118] px-3 py-2">
          <div className="flex gap-[5px]">
            {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
              <div key={c} className="size-2.5 rounded-full opacity-80" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 rounded-[5px] bg-white/5 px-2.5 py-[3px] font-mono text-[10px] text-muted">{url}</div>
        </div>
        <div className="relative aspect-video overflow-hidden">
          {screens.length > 0
            ? <Slide screen={screens[active]} active={active} sizes="420px" dx={10} />
            : <Placeholder text={emptyText} />}
        </div>
      </div>

      <div className={screens.length > 0 ? 'flex justify-center gap-2' : 'hidden'}>
        {screens.map((screen, i) => (
          <div key={screen.src} className="text-center">
            <button
              type="button"
              aria-label={screen.label}
              aria-pressed={i === active}
              onClick={() => pick(i)}
              className={`${thumbClass(i === active)} aspect-video w-24 rounded-md`}
            >
              <Image src={screen.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
            <p className="mt-[3px] font-mono text-[9px] tracking-[0.5px] text-muted">{screen.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// One platform of a project, ready to render: its frame type, texts and screens.
export type PlatformView = {
  platform: Platform
  label: string
  statusLabel: string
  url?: string
  screens: Screen[]
}

function PlatformFrame({ view, emptyText }: { view: PlatformView; emptyText: string }) {
  return view.platform === 'mobile'
    ? <PhoneShowcase screens={view.screens} emptyText={emptyText} />
    : <BrowserShowcase screens={view.screens} url={view.url} emptyText={emptyText} />
}

// A tab per platform ("Web · In development", "App · Planned"), primary first.
// The carousel remounts this per project, so the tab resets on every change.
export function Showcase({ views, emptyText }: { views: PlatformView[]; emptyText: string }) {
  const [active, setActive] = useState(0)
  const view = views[active]

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div role="tablist" className="flex flex-wrap justify-center gap-2">
        {views.map((v, i) => (
          <button
            key={v.platform}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-[5px] border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[1.5px] transition-all ${
              i === active ? 'border-accent/50 text-accent' : 'border-line text-muted hover:border-white/20 hover:text-ink'
            }`}
          >
            {v.label} · {v.statusLabel}
          </button>
        ))}
      </div>
      <PlatformFrame key={view.platform} view={view} emptyText={emptyText} />
    </div>
  )
}
