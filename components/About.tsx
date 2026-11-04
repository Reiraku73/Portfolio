import { MdSmartphone } from 'react-icons/md'
import type { Dictionary } from '@/lib/i18n/dictionaries'

// Stats whose value is an icon instead of text (dictionary: "icon": "<name>").
const STAT_ICONS = { smartphone: MdSmartphone }

type Stat = Dictionary['about']['stats'][number]

function StatValue({ stat }: { stat: Stat }) {
  if (!('icon' in stat)) return stat.value
  const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS]
  return <Icon aria-hidden />
}
import { FadeUp } from './ui/FadeUp'
import { H2, Section } from './ui/Section'

export function About({ label, dict }: { label: string; dict: Dictionary['about'] }) {
  return (
    <Section id="about" label={label}>
      <FadeUp delay={0.12}>
        <h2 className={`${H2} mb-10`}>{dict.title}</h2>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
          <p className="max-w-[480px] text-[15px] leading-[1.8] text-muted">{dict.text}</p>
          <div className="flex shrink-0 flex-row flex-wrap gap-3 md:flex-col">
            {dict.stats.map((stat) => (
              <div key={stat.label} className="min-w-40 rounded-[10px] border border-line bg-surface px-5 py-4">
                <div className="font-display text-[28px] leading-none text-accent">
                  <StatValue stat={stat} />
                </div>
                <div className="mt-1 text-[11px] leading-[1.4] text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </Section>
  )
}
