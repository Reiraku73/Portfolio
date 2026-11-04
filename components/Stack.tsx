import { STACK } from '@/data/stack'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { FadeUp } from './ui/FadeUp'
import { H2, Section } from './ui/Section'

export function Stack({ label, dict }: { label: string; dict: Dictionary['stack'] }) {
  return (
    <Section id="stack" label={label}>
      <FadeUp delay={0.12}>
        <h2 className={`${H2} mb-10`}>{dict.title}</h2>
      </FadeUp>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {STACK.map((s, i) => (
          <FadeUp key={s.name} delay={0.04 * i}>
            <div className="flex items-center gap-3 rounded-[10px] border border-line bg-white/2 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/4">
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-[15px]"
                style={{ background: s.bg, color: s.acc, border: `1px solid ${s.acc}22` }}
              >
                <s.Icon aria-hidden />
              </div>
              <span className="text-[13px] font-medium text-ink">{s.name}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  )
}
