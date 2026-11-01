import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { LangSwitcher } from './LangSwitcher'

const SECTIONS = ['projects', 'stack', 'about', 'contact'] as const

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary['nav'] }) {
  return (
    <nav className="sticky top-0 z-100 flex h-14 items-center justify-between border-b border-line bg-bg/85 px-5 backdrop-blur-md md:px-10">
      <span className="text-sm font-semibold tracking-[2px]">
        M<span className="text-accent">.</span>O
      </span>
      <div className="flex items-center gap-7">
        {/* Section links are hidden on mobile; the language switcher stays visible. */}
        <div className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-mono text-[11px] uppercase tracking-[1.5px] text-subtle transition-colors hover:text-ink"
            >
              {dict[id]}
            </a>
          ))}
        </div>
        <LangSwitcher current={lang} label={dict.language} className="md:border-l md:border-line md:pl-4" />
      </div>
    </nav>
  )
}
