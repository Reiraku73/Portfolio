'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  MdAndroid, MdArrowBack, MdArrowForward, MdBolt, MdErrorOutline, MdLayers,
  MdLightbulbOutline, MdLockOutline, MdMailOutline, MdPlayCircleOutline, MdTimeline,
} from 'react-icons/md'
import type { LinkKind, Project, ProjectId } from '@/data/projects'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { orderedPlatforms } from '@/lib/projects'
import { EASE, FadeUp } from '../ui/FadeUp'
import { H2 } from '../ui/Section'
import { Showcase } from './Showcase'

// Project data merged with its translated texts (built on the server in page.tsx).
export type ProjectView = Project & Dictionary['projects'][ProjectId]
type Labels = Dictionary['projectsSection']

// Material Icons, the same set Tsundoku uses.
const CASE_STUDY = [
  { key: 'problem',    Icon: MdErrorOutline },
  { key: 'solution',   Icon: MdLightbulbOutline },
  { key: 'stack',      Icon: MdLayers },
  { key: 'challenges', Icon: MdBolt },
  { key: 'status',     Icon: MdTimeline, full: true },
] as const

const LINK_ICONS: Record<LinkKind, IconType> = {
  video: MdPlayCircleOutline,
  apk:   MdAndroid,
  repo:  MdLockOutline,
  email: MdMailOutline,
}

// First link is the highlight, second is secondary, the rest are muted.
const LINK_STYLES = [
  'border-accent/40 text-accent',
  'border-white/15 bg-white/5 text-ink',
  'border-line text-dim',
]

const pad = (n: number) => String(n).padStart(2, '0')

export function ProjectCarousel({ projects, labels }: { projects: ProjectView[]; labels: Labels }) {
  const [active, setActive] = useState(0)
  const project = projects[active]
  const go = (dir: number) => setActive((p) => (p + dir + projects.length) % projects.length)

  return (
    <>
      <FadeUp delay={0.12}>
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className={H2}>{project.title}</h2>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted">
              {pad(active + 1)} / {pad(projects.length)}
            </span>
            {[
              { dir: -1, Icon: MdArrowBack, label: labels.prev },
              { dir: 1, Icon: MdArrowForward, label: labels.next },
            ].map(({ dir, Icon, label }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                onClick={() => go(dir)}
                className="flex size-9 items-center justify-center rounded-md border border-white/10 text-sm text-ink transition-all hover:border-accent hover:text-accent"
              >
                <Icon aria-hidden />
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.18}>
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <div className="grid md:grid-cols-2">
              <div className="flex items-center justify-center border-b border-line bg-showcase px-5 py-8 md:min-h-[460px] md:border-r md:border-b-0 md:p-10">
                <Showcase
                  emptyText={labels.screenshotsSoon}
                  views={orderedPlatforms(project).map((platform) => {
                    const info = project.platforms[platform]!
                    return {
                      platform,
                      label: labels.platforms[platform],
                      statusLabel: labels.status[info.status],
                      url: info.url,
                      screens: info.screenshots.map((src, i) => ({ src, label: project.screens[platform][i] })),
                    }
                  })}
                />
              </div>

              <div className="px-8 py-9">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[2px] text-accent">{project.tag}</div>
                <h3 className="mb-3 font-display text-[32px]">{project.title}</h3>
                <p className="mb-6 text-sm leading-[1.7] text-muted">{project.desc}</p>

                <div className="mb-8 flex flex-wrap gap-2.5">
                  {project.links.map((link, i) => (
                    <a
                      key={link.kind}
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-[5px] border px-4 py-2 font-mono text-xs transition-all hover:border-white/20 hover:text-ink ${LINK_STYLES[Math.min(i, LINK_STYLES.length - 1)]}`}
                    >
                      {(() => { const Icon = LINK_ICONS[link.kind]; return <Icon aria-hidden className="text-sm" /> })()}
                      {labels.links[link.kind]}
                    </a>
                  ))}
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {CASE_STUDY.map((item) => (
                    <div
                      key={item.key}
                      className={`rounded-xl border border-line bg-white/2 p-[18px] transition-colors hover:border-accent/25 ${
                        'full' in item ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <item.Icon aria-hidden className="mb-2 block text-lg text-accent" />
                      <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[2px] text-accent">
                        {labels.caseStudy[item.key]}
                      </div>
                      <p className="text-xs leading-[1.65] text-muted">{project.caseStudy[item.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeUp>

      <div className="mt-6 flex justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`${labels.goTo}: ${p.title}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-[3px] p-0 transition-all duration-300 ${
              i === active ? 'w-6 bg-accent' : 'w-1.5 bg-white/15'
            }`}
          />
        ))}
      </div>
    </>
  )
}
