import { MdArrowForward, MdOpenInNew } from 'react-icons/md'
import { CONTACT } from '@/data/projects'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { FadeUp } from './ui/FadeUp'
import { BTN_GHOST, BTN_PRIMARY, Section } from './ui/Section'

export function Contact({ label, dict }: { label: string; dict: Dictionary['contact'] }) {
  return (
    <Section id="contact" label={label}>
      <FadeUp delay={0.12}>
        <div className="pt-5 pb-10 text-center md:pt-10 md:pb-15">
          <h2 className="font-display text-[clamp(40px,6vw,72px)] leading-none">{dict.title}</h2>
          <p className="mt-3 mb-8 text-[15px] text-muted">{dict.sub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`mailto:${CONTACT.email}`} className={`${BTN_PRIMARY} px-7 py-3.5 text-sm`}>
              {dict.email} <MdArrowForward aria-hidden />
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className={`${BTN_GHOST} px-7 py-3.5 text-sm`}>
              GitHub <MdOpenInNew aria-hidden />
            </a>
          </div>
        </div>
      </FadeUp>
    </Section>
  )
}
