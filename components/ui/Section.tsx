import { FadeUp } from './FadeUp'

export const H2 = 'font-display text-[clamp(32px,4vw,48px)] leading-none'

export const BTN_PRIMARY =
  'inline-flex items-center gap-2 rounded-md bg-accent font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,25,44,0.3)]'
export const BTN_GHOST =
  'inline-flex items-center gap-2 rounded-md border border-white/12 text-ink transition-all hover:-translate-y-0.5 hover:border-white/28'

// Numbered page section ("01 / Projects"). scroll-mt keeps the heading
// visible below the sticky nav when jumping to #id.
export function Section({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-[1000px] scroll-mt-14 px-5 py-15 md:px-10 md:py-20">
      <FadeUp delay={0.05}>
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[3.5px] text-accent">
          <span className="inline-block h-px w-6 bg-accent" />
          {label}
        </div>
      </FadeUp>
      {children}
    </section>
  )
}

export function Divider() {
  return <div className="mx-auto h-px max-w-[1000px] bg-line" />
}
