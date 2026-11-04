import { MdArrowDownward, MdArrowForward } from 'react-icons/md'
import { CONTACT } from '@/data/projects'
import { HERO_CHIPS } from '@/data/stack'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { FadeUp, GrowLine } from './ui/FadeUp'
import { BTN_GHOST, BTN_PRIMARY } from './ui/Section'

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-15 -right-25 size-125 bg-[radial-gradient(circle,rgba(232,25,44,0.06)_0%,transparent_70%)]" />
      <section className="relative mx-auto max-w-[1000px] px-5 pt-15 pb-20 md:px-10 md:pt-20 md:pb-25">
        <FadeUp delay={0.05} y={20}>
          <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-accent">
            <span className="inline-block h-px w-8 bg-accent" />
            {dict.eyebrow}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h1 className="mb-5 font-display text-[clamp(56px,9vw,100px)] leading-[0.92]">
            <span>MATEO</span>
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(240,234,224,0.28)]">ORODAZ</span>
          </h1>
        </FadeUp>

        <GrowLine delay={0.25} className="my-6 h-0.5 w-16 bg-accent" />

        <FadeUp delay={0.28} y={20}>
          <p className="mb-2 text-xl font-light text-dim">{dict.role}</p>
        </FadeUp>

        <FadeUp delay={0.35} y={20}>
          <p className="mb-8 max-w-[560px] text-[15px] leading-[1.7] text-muted">{dict.desc}</p>
        </FadeUp>

        <FadeUp delay={0.42} y={20}>
          <div className="mb-9 flex flex-wrap gap-2">
            {HERO_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/9 bg-white/4 px-3 py-[5px] font-mono text-[11px] tracking-[0.5px] text-dim"
              >
                {chip}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.5} y={20}>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className={`${BTN_PRIMARY} px-6 py-3 text-[13px]`}>
              {dict.btn} <MdArrowDownward aria-hidden />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={`${BTN_GHOST} px-6 py-3 text-[13px]`}>
              GitHub <MdArrowForward aria-hidden />
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
